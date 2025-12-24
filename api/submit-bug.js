// Vercel serverless function to submit bug reports to GitHub Issues
// Environment variables needed (set in Vercel dashboard):
// - GITHUB_TOKEN: Personal access token with 'repo' scope
// - GITHUB_REPO: Repository name (e.g., "username/insync")

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
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
    } = req.body;

    // Validate required fields
    if (!email || !title || !description) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
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

    return res.status(200).json({
      success: true,
      issueNumber: issueData.number,
      issueUrl: issueData.html_url,
      message: 'Bug report submitted successfully'
    });

  } catch (error) {
    console.error('Error submitting bug report:', error);

    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to submit bug report'
    });
  }
}

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
