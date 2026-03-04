# Phase 2: Trust Building — Google Docs Edition
(Low-tech, high-touch, no code needed)

## Philosophy: Manual Before Automation
**Rule:** If a process happens < 10 times, use Google Docs.  
**Only build software when it hurts.**

---

## Sprint 6: Client Onboarding (Google Docs)

### What You Need
1. **Welcome Packet** (Google Doc)
2. **Onboarding Checklist** (Google Sheet)
3. **Data Collection Form** (Google Form)
4. **First Report Walkthrough Script** (Google Doc)

### 1. Welcome Packet Template
**File:** `Sidecar Client Welcome - [CLIENT NAME].docx`

```
WELCOME TO SIDECAR, [CLIENT NAME]!

What Happens Next:
□ We'll connect your Google Analytics (I'll send you instructions)
□ First report arrives on the 1st of next month
□ We'll schedule a 15-min walkthrough call
□ You get my direct email for questions

What You Get Every Month:
• Website traffic report
• Google Business Profile insights
• Review monitoring
• 1 specific action item to improve

Your Login Info:
• Admin Dashboard: [URL]
• Password: [TEMP PASSWORD] (change this!)

Questions? Reply to any email or text me: [YOUR PHONE]

— Martin
Sidecar: Your growth co-pilot
```

**Time to customize:** 5 minutes per client

---

### 2. Onboarding Checklist (Google Sheet)
**Columns:** Client Name | Status | Date | Notes

**Checklist Items:**
- [ ] Welcome email sent (Day 0)
- [ ] GA4 connection instructions sent (Day 1)
- [ ] Google Business Profile access granted (Day 3)
- [ ] First mock report generated (Day 7)
- [ ] Walkthrough call scheduled (Day 10)
- [ ] First real report delivered (Day 30)
- [ ] 30-day check-in (Day 30)

**Automation:** Conditional formatting turns row green when all checked

---

### 3. Data Collection Form (Google Form)
**Fields:**
- Business Name
- Website URL
- Current Google Analytics Property ID (if any)
- Google Business Profile URL
- Primary service area (cities/neighborhoods)
- Top 3 competitors
- What's your biggest challenge with getting customers?
- Who's your ideal customer?

**Output:** Auto-populates into Google Sheet

---

### 4. First Report Walkthrough Script
**File:** `First Report Call Script.docx`

```
OPENING (2 min):
"Hey [Name], thanks for jumping on. I wanted to walk through your 
first report so you know what you're looking at."

REPORT WALKTHROUGH (10 min):
• "Here's your traffic..."
• "Here's what I'm seeing..."
• "This month's action item is..."

QUESTIONS (3 min):
• "Any questions about the report?"
• "Does this level of detail work, or want more/less?"
• "What's your biggest challenge I can help with?"

CLOSE (1 min):
• "Next report comes 1st of next month"
• "Email me anytime with questions"
• "Thanks for trusting Sidecar!"
```

---

## Sprint 7: Real Data (Hybrid Google Sheets + Code)

### What Actually Needs Code vs Docs

**NEEDS CODE:**
- Google Analytics 4 API connection
- Google Business Profile API connection
- Data pulling (automated)

**GOOGLE SHEETS IS FINE:**
- Data storage (the metrics)
- Report formatting
- Client list management
- Review tracking

### The Setup

**Sheet 1: Monthly Metrics (Auto-populated)**
| Client | Month | Visitors | Searches | Reviews | Rating |
|--------|-------|----------|----------|---------|--------|
| Mike | 2024-03 | 145 | 234 | 4 | 4.8 |

**Sheet 2: Report Queue (Manual)**
| Client | Month | Status | Report Text | Date Sent |
|--------|-------|--------|-------------|-----------|
| Mike | Mar | Ready | [AI text] | 2024-03-01 |

**Sheet 3: Review Monitor (Manual)**
| Client | Platform | Review | Rating | Date | Responded? |
|--------|----------|--------|--------|------|------------|
| Mike | Google | "Great service!" | 5★ | 3/1 | Yes |

### Minimal Code Approach

**Option A: Google Apps Script (what we have)**
- Add GA4 API calls to existing script
- Pull real data instead of mock
- Push to Google Sheet

**Option B: Make.com / Zapier ($9-20/mo)**
- GA4 → Google Sheets (automated)
- GBP → Google Sheets (automated)
- Less code, small cost

**My recommendation:** Stick with Google Apps Script (free, already working)

---

## Sprint 8: Retention (Google Docs + Calendar)

### 30-60-90 Day Check-ins

**Calendar Reminders:**
- Day 30: Check-in call
- Day 60: Quick email
- Day 90: Survey + ask for referral
- Day 120: If no reply to 3 reports, win-back sequence

### Email Templates (Google Doc)

**Day 30 Check-in:**
```
Subject: How's your first month going?

Hey [Name],

You've been getting Sidecar reports for a month now. 
Quick questions:

1. Are the reports helpful?
2. Any questions about your numbers?
3. Anything you want me to track that I'm not?

Hit reply and let me know!

— Martin
```

**Day 90 Survey:**
```
Subject: Quick favor?

Hey [Name],

Been 3 months! Mind answering 3 quick questions?

1. On a scale of 1-10, how valuable are these reports?
2. Have you implemented any of the action items?
3. Would you recommend Sidecar to another business owner?

Thanks!
Martin

P.S. — Know anyone who needs this? I give $50 credit for referrals.
```

**Win-back (if no reply to 3 reports):**
```
Subject: Should I pause your reports?

Hey [Name],

I noticed you haven't opened the last few reports. No worries if 
busy, but want to make sure you're getting value.

Options:
1. Keep going as-is
2. Pause until you're ready
3. Quick call to see what's not working

Just hit reply with 1, 2, or 3.

— Martin
```

---

## The Google Docs Stack for Phase 2

| Need | Google Tool | Time to Setup |
|------|-------------|---------------|
| Welcome packet | Docs | 1 hour (template) |
| Onboarding tracking | Sheets | 30 min |
| Data collection | Forms | 30 min |
| Call scripts | Docs | 30 min |
| Monthly metrics | Sheets | 1 hour |
| Review monitoring | Sheets | 30 min |
| Email templates | Docs | 1 hour |
| **TOTAL SETUP** | | **5 hours** |

---

## What This Looks Like Day-to-Day

**1st of Month (Report Day):**
1. Open Google Sheet → Run Apps Script → Pull real data
2. AI generates reports (already built)
3. Quick review of each report (10 min)
4. Send via Apps Script (automated)

**Weekly (30 min):**
- Check Google Sheet for new reviews
- Check who hasn't opened reports
- Send 1-2 check-in emails

**New Client (30 min):**
1. Duplicate Welcome Packet template
2. Customize with their name
3. Send welcome email
4. Add to Onboarding Checklist Sheet
5. Send Google Form for data collection

**Total Time per Week (10 clients):** ~2-3 hours

---

## When to Upgrade from Google Docs

| Trigger | Current | Upgrade To |
|---------|---------|------------|
| 20+ clients | Google Sheets | Airtable/Notion |
| Weekly review takes > 2 hrs | Manual check | Automated alerts |
| Clients want portal | Email reports | Web dashboard |
| 50+ email templates | Google Docs | Email automation (Mailchimp) |

**Rule:** When Google Docs makes you want to scream, THEN build software.

---

## Phase 2 Build Plan (Google Docs Edition)

### Week 1: Setup (5 hours)
- [ ] Create Welcome Packet template
- [ ] Create Onboarding Checklist Sheet
- [ ] Create Data Collection Form
- [ ] Write call scripts
- [ ] Write 30-60-90 day email templates

### Week 2: Connect Real Data (4 hours)
- [ ] Add GA4 API to existing Apps Script
- [ ] Add GBP API to existing Apps Script
- [ ] Test with Mike's real data
- [ ] Update report to use real numbers

### Week 3: Test with First 3 Clients (2 hours)
- [ ] Onboard 3 new clients
- [ ] Send first real-data reports
- [ ] Get feedback
- [ ] Refine templates

### Week 4: Scale to 10 Clients (2 hours/week ongoing)
- [ ] Use templates for new clients
- [ ] Monthly: Generate & send reports (1 hour)
- [ ] Weekly: Check-ins & review monitoring (30 min)

---

## Bottom Line

**Can you do Phase 2 with Google Docs?** YES.

**Should you?** YES, until you have 10-20 clients.

**Why?**
- 5 hours setup vs 50 hours coding
- Works perfectly for low volume
- Lets you validate before building
- Easy to customize per client
- Free

**The only code you need:**
- GA4/GBP API connections (add to existing script)
- Everything else = Google Docs

**Want me to build the Google Docs templates?** 📝
