// Netlify serverless function to submit bug reports to GitHub Issues
// Environment variables needed:
// - GITHUB_TOKEN: Personal access token with 'repo' scope
// - GITHUB_REPO: Repository name (e.g., "username/insync")

const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    const {
      email,
      title,
      description,
      steps,
      priority,
      userAgent,
      platform,
      screenSize,
      appVersion
    } = JSON.parse(event.body);

    // Validate required fields
    if (!email || !title || !description) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Missing required fields'
        })
      };
    }

    // Build GitHub issue body
    const issueBody = `
## Bug Report

**Reporter:** ${email}
**Priority:** ${getPriorityEmoji(priority)} ${priority.toUpperCase()}

---

### Description
${description}

${steps ? `### Steps to Reproduce\n${steps}\n` : ''}

---

### Device Information
- **Platform:** ${platform}
- **Screen Size:** ${screenSize}
- **User Agent:** ${userAgent}
- **App Version:** ${appVersion}

---

*This bug report was submitted via the InSync bug report form*
`;

    // Determine labels based on priority
    const labels = ['bug', 'user-reported'];
    if (priority === 'critical' || priority === 'high') {
      labels.push('priority-high');
    }

    // Create GitHub issue
    const githubResponse = await fetch(
      `https://api.github.com/repos/${process.env.GITHUB_REPO}/issues`,
      {
        method: 'POST',
        headers: {
          'Authorization': `token ${process.env.GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.github.v3+json'
        },
        body: JSON.stringify({
          title: `[Bug] ${title}`,
          body: issueBody,
          labels: labels
        })
      }
    );

    if (!githubResponse.ok) {
      const errorData = await githubResponse.json();
      console.error('GitHub API Error:', errorData);
      throw new Error(`GitHub API error: ${errorData.message}`);
    }

    const issueData = await githubResponse.json();

    // Optional: Send confirmation email to user
    // await sendConfirmationEmail(email, issueData.html_url, issueData.number);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        issueNumber: issueData.number,
        issueUrl: issueData.html_url,
        message: 'Bug report submitted successfully'
      })
    };

  } catch (error) {
    console.error('Error submitting bug report:', error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: error.message || 'Failed to submit bug report'
      })
    };
  }
};

// Helper function to get priority emoji
function getPriorityEmoji(priority) {
  const emojis = {
    'low': '🟢',
    'medium': '🟡',
    'high': '🟠',
    'critical': '🔴'
  };
  return emojis[priority] || '⚪';
}

// Optional: Function to send confirmation email
// You can integrate this with SendGrid, AWS SES, etc.
/*
async function sendConfirmationEmail(email, issueUrl, issueNumber) {
  // Example with SendGrid:
  // const sgMail = require('@sendgrid/mail');
  // sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  // const msg = {
  //   to: email,
  //   from: 'support@insync-live.app',
  //   subject: `Bug Report #${issueNumber} Received`,
  //   html: `
  //     <h2>Thank you for reporting a bug!</h2>
  //     <p>We've created issue <a href="${issueUrl}">#${issueNumber}</a> to track this.</p>
  //     <p>You can follow progress on GitHub or we'll email you when it's resolved.</p>
  //   `
  // };

  // await sgMail.send(msg);
}
*/
