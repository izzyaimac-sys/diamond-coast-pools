# Sidecar Landing Page + Backend — Railway Deployment Guide

## Architecture Overview

| Component | Platform | Why |
|-----------|----------|-----|
| **Landing Page** | Railway (static) OR Carrd/Netlify | Simple HTML, fast deploy |
| **Form Backend** | Google Apps Script | Free, handles form submission |
| **Audit Automation** | Google Apps Script | Triggers on form submit |
| **Website Templates** | Railway (Next.js) | Full stack, scalable |
| **Database** | Railway PostgreSQL | Production data |
| **Client Sites** | Railway | Deploy from templates |

---

## Option A: Deploy Landing Page on Railway (Recommended)

### Step 1: Create Railway Project

1. Go to https://railway.app
2. Sign up/login
3. Click "New Project"
4. Choose "Deploy from GitHub repo"

### Step 2: Create GitHub Repo

1. Go to https://github.com/new
2. Repo name: `sidecar-landing`
3. Make it private
4. Create repo

### Step 3: Add Files to Repo

Create these files in your repo:

**`index.html`** (the landing page from landing-page.html)

**`railway.toml`:**
```toml
[build]
builder = "nixpacks"

[deploy]
startCommand = "python -m http.server $PORT"
```

**`Dockerfile`** (alternative to nixpacks):
```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Step 4: Deploy to Railway

1. In Railway dashboard, click "New"
2. Select your GitHub repo `sidecar-landing`
3. Railway auto-detects and deploys
4. Get your URL: `sidecar-landing-production.up.railway.app`
5. (Optional) Add custom domain in Settings

### Step 5: Custom Domain

1. In Railway project, go to Settings
2. Click "Custom Domain"
3. Add your domain: `audit.sidecarhq.com`
4. Copy the CNAME record
5. Add CNAME in your DNS provider (Cloudflare, GoDaddy, etc.)
6. Wait for SSL certificate (auto-generated)

---

## Option B: Deploy as Next.js App on Railway (More Flexible)

If you want to add backend API later:

### Create Next.js Landing Page

**`package.json`:**
```json
{
  "name": "sidecar-landing",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}
```

**`pages/index.js`:** (Convert your HTML to React)

```javascript
export default function LandingPage() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    // Submit to Google Form
    const response = await fetch('YOUR_GOOGLE_FORM_URL', {
      method: 'POST',
      body: formData,
      mode: 'no-cors'
    });
    
    // Redirect to thank you page
    window.location.href = '/thank-you';
  };

  return (
    <div style={{background: 'linear-gradient(135deg, #0D7377 0%, #095a5d 100%)', minHeight: '100vh'}}>
      {/* Your landing page content here */}
      <form onSubmit={handleSubmit}>
        {/* Form fields */}
      </form>
    </div>
  );
}
```

**`pages/thank-you.js`:**
```javascript
export default function ThankYou() {
  return (
    <div style={{textAlign: 'center', padding: '100px 20px', color: 'white'}}>
      <h1>🎉 Audit Generating!</h1>
      <p>Check your email in 5 minutes.</p>
    </div>
  );
}
```

**`railway.toml`:**
```toml
[build]
builder = "nixpacks"

[deploy]
startCommand = "npm start"
```

### Deploy

1. Push to GitHub
2. Railway auto-deploys on every push
3. URL: `sidecar-landing-production.up.railway.app`

---

## Option C: Static HTML on Railway (Simplest)

### Project Structure

```
sidecar-landing/
├── index.html          (your landing page)
├── package.json        (minimal)
├── railway.toml
└── Dockerfile
```

**`package.json`:**
```json
{
  "name": "sidecar-landing",
  "version": "1.0.0",
  "scripts": {
    "start": "npx serve -s . -l $PORT"
  },
  "dependencies": {
    "serve": "^14.0.0"
  }
}
```

**`railway.toml`:**
```toml
[build]
builder = "nixpacks"
```

**Deploy:**
1. Push to GitHub
2. Railway detects Node.js app
3. Auto-deploys

---

## The Backend on Railway (Audit Generation API)

When you're ready to move off Google Apps Script:

### Create Express API

**`server.js`:**
```javascript
const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Receive form submission from landing page
app.post('/api/lead', async (req, res) => {
  const { name, email, phone, business, website, challenge } = req.body;
  
  // Save to database
  const lead = await prisma.lead.create({
    data: {
      name,
      email,
      phone,
      business,
      website,
      challenge,
      status: 'new'
    }
  });
  
  // Trigger audit generation
  await generateAudit(lead);
  
  // Send confirmation email
  await sendConfirmationEmail(lead);
  
  res.json({ success: true, leadId: lead.id });
});

// Generate audit report
async function generateAudit(lead) {
  // Pull website data
  // Generate score
  // Create PDF
  // Save to storage
  // Queue email
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

**`package.json`:**
```json
{
  "name": "sidecar-api",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.0",
    "@prisma/client": "^5.0.0",
    "puppeteer": "^21.0.0"
  }
}
```

**`prisma/schema.prisma`:**
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Lead {
  id        String   @id @default(cuid())
  name      String
  email     String
  phone     String
  business  String
  website   String
  challenge String
  status    String   @default("new")
  createdAt DateTime @default(now())
  reports   Report[]
}

model Report {
  id        String   @id @default(cuid())
  leadId    String
  lead      Lead     @relation(fields: [leadId], references: [id])
  score     Int
  insights  String   @db.Text
  pdfUrl    String?
  createdAt DateTime @default(now())
}
```

**`railway.toml`:**
```toml
[build]
builder = "nixpacks"

[deploy]
startCommand = "npm start"
```

### Deploy Backend

1. Push to GitHub
2. Railway deploys
3. Add PostgreSQL database in Railway dashboard
4. Run: `railway run npx prisma migrate dev`
5. API live at: `sidecar-api-production.up.railway.app`

---

## Railway Environment Variables

Set these in Railway dashboard:

```
DATABASE_URL=postgresql://...
OPENAI_API_KEY=sk-...
SMTP_HOST=smtp.sendgrid.net
SMTP_USER=apikey
SMTP_PASS=...
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

---

## Complete Railway Project Structure (All Services)

```
sidecar/
├── landing/              # Static landing page
│   ├── index.html
│   ├── package.json
│   └── railway.toml
├── api/                  # Backend API (optional)
│   ├── server.js
│   ├── package.json
│   ├── prisma/
│   │   └── schema.prisma
│   └── railway.toml
└── templates/            # Website templates
    ├── service/
    ├── restaurant/
    └── autoshop/
```

Each folder = separate Railway service

---

## Railway CLI Commands

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link project
railway link

# Deploy
railway up

# View logs
railway logs

# Add database
railway add --database postgres

# Environment variables
railway variables

# Open dashboard
railway open
```

---

## Domain Setup for All Services

**Main domain:** sidecarhq.com

| Service | URL |
|---------|-----|
| Landing page | audit.sidecarhq.com |
| API | api.sidecarhq.com |
| Client portal | app.sidecarhq.com |
| Service template demo | demo-service.sidecarhq.com |
| Restaurant template demo | demo-restaurant.sidecarhq.com |
| Auto shop template demo | demo-autoshop.sidecarhq.com |

**Set up in Railway:**
1. Go to each service Settings
2. Add custom domain
3. Add CNAME in DNS provider
4. Railway auto-provisions SSL

---

## Cost Estimate (Railway)

| Component | Cost/Month |
|-----------|------------|
| Landing page (static) | Free tier |
| API server | $5-10 |
| PostgreSQL | $5 |
| 3 website template demos | $15-20 |
| **TOTAL** | **~$30/mo** |

Free tier: $5 credit/month, enough for landing + 1 small service

---

## Your Deployment Checklist

**TODAY:**
- [ ] Create Railway account
- [ ] Create GitHub repo: `sidecar-landing`
- [ ] Add landing page HTML + railway.toml
- [ ] Deploy landing page
- [ ] Add custom domain: audit.sidecarhq.com

**THIS WEEK:**
- [ ] Deploy service template demo
- [ ] Deploy restaurant template demo  
- [ ] Deploy autoshop template demo
- [ ] Set up custom domains for all

**NEXT WEEK:**
- [ ] Create API project (when ready to scale)
- [ ] Add PostgreSQL
- [ ] Move off Google Apps Script

---

## Quick Start (Do This Now)

**10 minutes to be LIVE:**

```bash
# 1. Create folder
mkdir sidecar-landing
cd sidecar-landing

# 2. Copy landing page HTML
cp ../landing-page.html index.html

# 3. Create railway.toml
cat > railway.toml << 'EOF'
[build]
builder = "nixpacks"
EOF

# 4. Create package.json
cat > package.json << 'EOF'
{
  "name": "sidecar-landing",
  "scripts": {
    "start": "npx serve -s . -l $PORT"
  },
  "dependencies": {
    "serve": "^14.0.0"
  }
}
EOF

# 5. Initialize git
git init
git add .
git commit -m "Initial commit"

# 6. Push to GitHub
git remote add origin https://github.com/YOUR_USERNAME/sidecar-landing.git
git push -u origin main

# 7. Deploy to Railway
railway login
railway init
railway up

# 8. Get your URL
railway open
```

**Your landing page is now LIVE on Railway! 🚀**

---

**Ready to deploy? Or want me to set up the backend API next?**
