# InSync Landing Page

A modern, responsive landing page for the InSync music discovery app, featuring a dark glassmorphic design with gradient accents.

## 🎨 Design

The landing page matches the InSync iOS app design system:
- **Colors**: Dark background (#0A0118) with gradient accents (Pink #FF53C0 to Cyan #60FFCA)
- **Style**: Glassmorphic cards with backdrop blur effects
- **Typography**: SF Pro Display (system fonts)
- **Responsive**: Fully responsive design for mobile, tablet, and desktop

## 📁 Project Structure

```
insync_landing/
├── index.html              # Main landing page
├── privacy-policy.html     # Privacy policy page
├── terms.html              # Terms of service & copyright
├── bug-report.html         # Bug report submission form
├── css/
│   └── styles.css          # All styles (matching app design)
├── js/
│   └── main.js             # Interactive features & smooth scrolling
├── images/
│   └── screenshots/        # App screenshot placeholders
├── vercel.json             # Vercel deployment configuration
└── README.md               # This file
```

## 🚀 Quick Start

### Option 1: Open Locally

Simply open `index.html` in your web browser:
```bash
cd insync_landing
open index.html
```

### Option 2: Local Development Server

Using Python:
```bash
cd insync_landing
python3 -m http.server 8000
# Visit http://localhost:8000
```

Using Node.js (with `http-server`):
```bash
npm install -g http-server
cd insync_landing
http-server
```

## 📸 Adding Screenshots

Replace the placeholder divs with your actual app screenshots:

1. **Take screenshots** from your iOS simulator or device
2. **Export screenshots** to `images/screenshots/` folder
3. **Update the HTML** - Replace placeholder divs with:

```html
<!-- Replace this: -->
<div class="screenshot-placeholder">
    <p>Add your main app screenshot here</p>
    <span>screenshots/main-hero.png</span>
</div>

<!-- With this: -->
<img src="images/screenshots/main-hero.png" alt="InSync App" style="width: 100%; height: 100%; object-fit: cover; border-radius: 30px;">
```

### Recommended Screenshots:

- **Hero image** (`main-hero.png`): Main app view, 1170x2532px (iPhone aspect ratio)
- **Map view** (`map-view.png`): Live listener map feature
- **Groups** (`groups.png`): Groups/chat rooms view
- **Messages** (`messages.png`): Direct messages interface
- **Spotify integration** (`spotify.png`): Spotify connection view
- **Privacy settings** (`privacy.png`): Privacy controls
- **Notifications** (`notifications.png`): Notification center
- **Gallery images** (`gallery-1.png` through `gallery-4.png`): Various feature highlights

## 🌐 Deployment

### Deploy to Vercel (Recommended - Free)

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   cd insync_landing
   vercel
   ```

3. **Follow prompts:**
   - Link to existing project or create new
   - Confirm project settings
   - Deploy!

4. **Custom domain** (optional):
   ```bash
   vercel domains add yourdomain.com
   ```

### Deploy to GitHub Pages

1. **Create a new repository** on GitHub

2. **Push the landing page:**
   ```bash
   cd insync_landing
   git init
   git add .
   git commit -m "Initial landing page"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/insync-landing.git
   git push -u origin main
   ```

3. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Source: Deploy from branch `main`
   - Folder: `/` (root)
   - Save

4. **Access at:** `https://YOUR_USERNAME.github.io/insync-landing/`

### Deploy to Netlify

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Deploy:**
   ```bash
   cd insync_landing
   netlify deploy
   ```

3. **For production:**
   ```bash
   netlify deploy --prod
   ```

## 🔧 Customization

### Update App Store Link

Replace the `#` in the download buttons with your actual App Store URL:

```html
<!-- In index.html -->
<a href="YOUR_APP_STORE_URL" class="btn btn-primary">
    Download on App Store
</a>
```

### Update Contact Email

Replace `support@insyncapp.com` throughout the site with your actual support email.

### Bug Report Form Setup

The bug report form is currently set up with a simulated submission. To make it functional:

#### Option 1: Formspree (Easiest)
1. Sign up at [https://formspree.io](https://formspree.io)
2. Create a new form and get your form ID
3. Update `bug-report.html`:
   ```html
   <form id="bugReportForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

#### Option 2: Your Backend API
Update the JavaScript in `bug-report.html`:
```javascript
const response = await fetch('YOUR_API_ENDPOINT', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
});
```

#### Option 3: EmailJS
1. Sign up at [https://www.emailjs.com](https://www.emailjs.com)
2. Follow their integration guide
3. Update the form submission handler

## 📱 Features

### Main Landing Page (index.html)
- Hero section with animated gradient orbs
- Features grid with 6 key features
- Screenshot gallery with placeholders
- App Store download CTA
- Responsive navigation
- Smooth scrolling

### Privacy Policy (privacy-policy.html)
- Complete privacy policy from your PRIVACY_POLICY.md
- Formatted with proper sections
- Highlights for important information
- Responsive design

### Terms of Service (terms.html)
- Comprehensive terms and copyright information
- User responsibilities and guidelines
- Legal protections

### Bug Report (bug-report.html)
- Detailed bug submission form
- Category selection
- Device and version tracking
- Steps to reproduce section
- Form validation
- Success/error messaging

## 🎯 TODO Before Launch

- [ ] Replace screenshot placeholders with actual app screenshots
- [ ] Add your real App Store URL
- [ ] Update support@insyncapp.com to your real email
- [ ] Set up bug report form backend (Formspree, EmailJS, or custom)
- [ ] Test on mobile devices
- [ ] Verify all links work
- [ ] Add favicon and app icons
- [ ] Set up analytics (Google Analytics, Plausible, etc.)
- [ ] Test form submissions
- [ ] Add meta tags for social sharing (Open Graph, Twitter Cards)

## 📊 Analytics (Optional)

### Add Google Analytics
Add to `<head>` in all HTML files:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR_GA_ID');
</script>
```

### Add Plausible Analytics (Privacy-friendly alternative)
```html
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
```

## 🔒 Security Headers

Security headers are configured in `vercel.json`:
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block

## 📄 License

Copyright © 2024 InSync. All rights reserved.

## 🆘 Support

For questions about the landing page:
- Check this README
- Review the code comments
- Test locally before deploying

For app-related questions:
- Visit the bug report page
- Email support@insyncapp.com
