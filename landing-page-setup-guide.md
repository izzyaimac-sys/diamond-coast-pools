# Sidecar Landing Page Setup Guide

## Step 1: Create the Google Form (Data Capture)

1. Go to https://forms.google.com
2. Create new form: "Sidecar Free Website Audit Request"
3. Add these fields:

### Form Fields:
- **Full Name** (Short answer, Required)
- **Email Address** (Short answer, Required)  
- **Phone Number** (Short answer, Required)
- **Business Name** (Short answer, Required)
- **Website URL** (Short answer, Required)
- **Biggest Challenge** (Multiple choice, Required):
  - Not showing up on Google
  - Bad reviews hurting business
  - Website not getting traffic
  - Don't know what competitors are doing
  - Something else

### Settings:
- **Collect email addresses:** OFF (you're already asking)
- **Limit to 1 response:** OFF
- **Show progress bar:** ON

### Response Settings:
- Click "Responses" tab
- Click spreadsheet icon (create new spreadsheet)
- Name: "Sidecar Leads"

## Step 2: Get Your Form URL

1. Click "Send" button
2. Click link icon
3. Copy the URL (looks like: https://docs.google.com/forms/d/e/.../viewform)
4. This is your FORM_ACTION_URL

## Step 3: Find Entry IDs (For HTML Form)

1. Open your form
2. Click "Send" → Link icon
3. Copy the URL
4. Paste it in a text editor
5. Look for `entry.123456789` (these are your field IDs)

**Alternative method:**
1. Open form preview
2. Right-click → Inspect
3. Look at form HTML
4. Find `name="entry.XXXXXXXXX"` for each field

## Step 4: Update the HTML

1. Open `landing-page.html`
2. Find: `action="YOUR_GOOGLE_FORM_URL"`
3. Replace with your actual form URL
4. Update all `name="entry.XXXXX"` with your actual entry IDs

## Step 5: Deploy the Landing Page

### Option A: Carrd.co (Easiest)
1. Go to https://carrd.co
2. Sign up ($19/year)
3. Create new site
4. Choose "Blank"
5. Add "Embed" element
6. Paste your HTML
7. Publish to: sidecaraudit.carrd.co

### Option B: Netlify (Free)
1. Go to https://netlify.com
2. Drag and drop your HTML file
3. Get free URL: sidecar-audit.netlify.app
4. Or connect your own domain

### Option C: Vercel (Free)
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel` in your folder
3. Get free URL

## Step 6: Set Up Automation (Apps Script)

### When Form is Submitted:

1. Open your "Sidecar Leads" Google Sheet
2. Click Extensions → Apps Script
3. Delete default code
4. Paste this:

```javascript
function onFormSubmit(e) {
  // Get form data
  const timestamp = e.values[0];
  const name = e.values[1];
  const email = e.values[2];
  const phone = e.values[3];
  const business = e.values[4];
  const website = e.values[5];
  const challenge = e.values[6];
  
  // 1. Send confirmation email
  sendConfirmationEmail(name, email, business);
  
  // 2. Generate audit (or queue it)
  generateAudit(name, email, business, website);
  
  // 3. Add to CRM/tracking
  addToCRM(name, email, business, phone, challenge);
}

function sendConfirmationEmail(name, email, business) {
  const subject = `${name}, your audit is generating...`;
  const body = `
    Hey ${name},
    
    Thanks for requesting a free website audit for ${business}.
    
    Your audit is being generated right now and will arrive in your inbox within 5 minutes.
    
    What to expect:
    • Your current online score (out of 100)
    • What's working well
    • 3 opportunities to improve
    • 90-day growth forecast
    
    Talk soon,
    Martin
    Sidecar: Your growth co-pilot
  `;
  
  GmailApp.sendEmail(email, subject, body);
}

function generateAudit(name, email, business, website) {
  // This will be your audit generation code
  // For now, just log it
  console.log(`Generating audit for ${business} (${website})`);
  
  // TODO: Add your audit generation logic here
  // 1. Pull website data (speed, mobile, SEO)
  // 2. Generate score
  // 3. Create PDF report
  // 4. Send email with report + pitch
}

function addToCRM(name, email, business, phone, challenge) {
  // Add to separate CRM sheet
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let crmSheet = ss.getSheetByName("CRM");
  
  if (!crmSheet) {
    crmSheet = ss.insertSheet("CRM");
    crmSheet.appendRow(["Date", "Name", "Email", "Phone", "Business", "Website", "Challenge", "Status"]);
  }
  
  crmSheet.appendRow([
    new Date(),
    name,
    email,
    phone,
    business,
    website,
    challenge,
    "New Lead - Audit Pending"
  ]);
}

// Set up the trigger
function createFormTrigger() {
  const form = FormApp.getActiveForm();
  ScriptApp.newTrigger('onFormSubmit')
    .forForm(form)
    .onFormSubmit()
    .create();
}
```

5. Save project
6. Run `createFormTrigger()` once
7. Authorize permissions

## Step 7: Test the Flow

1. Open your landing page URL
2. Fill out the form with test data
3. Submit
4. Check:
   - [ ] Form submits successfully
   - [ ] Data appears in Google Sheet
   - [ ] Confirmation email arrives
   - [ ] CRM sheet created with data

## Step 8: The Audit Email (What Gets Sent After)

Create this as a template in Gmail or add to Apps Script:

**Subject:** Your [BUSINESS] Website Audit is Ready 🔍

**Body:**
```
Hey [NAME],

Your free audit is ready!

YOUR GROWTH SCORE: [X]/100

THE GOOD 👍
• [Positive finding 1]
• [Positive finding 2]

THE OPPORTUNITIES 🎯
• [Issue 1]
• [Issue 2]  
• [Issue 3]

YOUR 90-DAY FORECAST 📈
If you fix [main issue]:
→ Projected [X]% increase in website visitors
→ Potential [Y] additional customer inquiries

[VIEW FULL REPORT →]

---

WANT ME TO TRACK THIS MONTHLY?

For $149/month, I'll send you this report every month with:
• Traffic trends
• Competitor monitoring
• 1 specific action item to implement
• How many customers that could bring you

[SIGN UP NOW - $149/MO →]

Annual plan: $1,490/year (2 months free)

Questions? Just reply or text me: [YOUR PHONE]

— Martin
Sidecar: Your growth co-pilot
```

## Domain Options

**Free:**
- sidecar-audit.netlify.app
- sidecar-audit.vercel.app
- sidecar-audit.carrd.co

**Paid ($12/year):**
- sidecarhq.com/audit (if you own sidecarhq.com)
- getsidecar.com
- yourgrowthco-pilot.com

## Quick Checklist

- [ ] Google Form created with all 6 fields
- [ ] Form responses go to Google Sheet
- [ ] Got form URL and entry IDs
- [ ] Updated HTML with your form URL
- [ ] Landing page deployed (Netlify/Vercel/Carrd)
- [ ] Apps Script automation set up
- [ ] Tested full flow end-to-end
- [ ] Works on mobile
- [ ] Ready to drive traffic

## Time Estimate

- Google Form: 15 min
- HTML customization: 30 min
- Deployment: 15 min
- Automation script: 30 min
- Testing: 15 min

**Total: 2 hours to be LIVE**

---

**NEXT:** Build the audit generation logic (the actual report creation)
