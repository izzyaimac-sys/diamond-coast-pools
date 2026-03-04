# Google Apps Script Backend Setup (15 minutes)

## Step 1: Create the Google Sheet

1. Go to https://sheets.google.com
2. Create new blank spreadsheet
3. Name it: "Sidecar Leads"
4. **Copy the Sheet ID from URL:**
   - URL looks like: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`
   - Copy the long string between `/d/` and `/edit`
   - Save it somewhere — you'll need it

## Step 2: Create the Apps Script

1. In your Google Sheet, click **Extensions → Apps Script**
2. Delete the default `myFunction()` code
3. **Copy and paste the entire code** from `sidecar-backend.gs`
4. **Replace CONFIG values:**
   ```javascript
   const CONFIG = {
     SHEET_ID: 'YOUR_ACTUAL_SHEET_ID_HERE',  // Paste from Step 1
     EMAIL_TO: 'your-real-email@gmail.com',  // Where YOU get alerts
     EMAIL_FROM: 'Sidecar <noreply@sidecarhq.com>'
   };
   ```

## Step 3: Authorize the Script

1. Click **Save** (floppy disk icon)
2. Click **Run** (play icon) next to `testSubmit`
3. Click through the authorization prompts:
   - "Review Permissions"
   - Choose your Google account
   - Click "Advanced" → "Go to [Script Name] (unsafe)"
   - Click "Allow"
4. Check your email — you should get test notifications!

## Step 4: Deploy as Web App

1. Click **Deploy → New Deployment**
2. Click **Select Type → Web App**
3. Fill in:
   - **Description:** "Sidecar Landing Page Form Handler"
   - **Execute as:** Me
   - **Who has access:** Anyone
4. Click **Deploy**
5. Copy the **Web App URL** (looks like: `https://script.google.com/macros/s/AKfycbx.../exec`)
6. **Save this URL** — you'll paste it in the landing page

## Step 5: Update Landing Page

1. Open `index.html` from your landing page
2. Find the form tag:
   ```html
   <form id="auditForm" action="...">
   ```
3. Replace the action with your Web App URL:
   ```html
   <form id="auditForm" action="https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec" method="POST">
   ```
4. Save, commit, push to GitHub
5. Redeploy to Railway

## Step 6: Test End-to-End

1. Open your live landing page
2. Fill out the form with test data
3. Submit
4. Check:
   - [ ] Thank you page shows
   - [ ] Data appears in Google Sheet
   - [ ] You get notification email
   - [ ] Test email gets confirmation email

## What Happens When Someone Submits

**The Flow:**
1. User fills form → Clicks submit
2. JavaScript sends data to your Apps Script URL
3. Apps Script saves to Google Sheet
4. You get email notification
5. User gets confirmation email
6. Lead status: "New Lead - Audit Pending"

## Next: Generate the Audit

After this is working, we'll add the `generateAudit()` function that:
1. Pulls website data
2. Generates score
3. Creates PDF report
4. Emails report to lead

**But first:** Get this basic form capture working!

## Troubleshooting

**"Authorization required" error:**
- Run the script manually first (Step 3)
- It will prompt for permissions

**Emails not sending:**
- Check spam folder
- Make sure Gmail daily limit not exceeded (100 emails/day for free accounts)

**Data not saving:**
- Check Sheet ID is correct
- Check script has access to Sheets

**Form not submitting:**
- Check Web App URL is correct in HTML
- Check form uses `method="POST"`

## Your URLs After Setup

| Component | URL |
|-----------|-----|
| Google Sheet | https://docs.google.com/spreadsheets/d/YOUR_ID |
| Apps Script Editor | https://script.google.com/home/projects/YOUR_PROJECT |
| Web App Endpoint | https://script.google.com/macros/s/YOUR_SCRIPT/exec |
| Landing Page | https://sidecar-landing-production.up.railway.app |

## Time Check

- Create Sheet: 2 min
- Setup Apps Script: 5 min
- Deploy Web App: 3 min
- Update landing page: 3 min
- Test: 2 min

**Total: 15 minutes**

**Go do it! Your form will be LIVE and capturing leads! 🎯**
