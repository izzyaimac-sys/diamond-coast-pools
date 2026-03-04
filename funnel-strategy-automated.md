# Sidecar Growth Funnel — Automated Audit + Self-Serve Signup

## The Vision
- **100% automated free audit** (scales infinitely)
- **Self-serve signup** (no friction for ready buyers)
- **Warm nurture** for the 70% who don't buy immediately
- **Multiple acquisition channels** (walk-in, landing page, email)

---

## The Funnel: Step by Step

### STEP 1: Lead Capture (The "Unlock Your Free Audit" Gate)

**Landing Page:**
```
Get Your Free Website Audit
See how your business is doing online in 60 seconds

[Name]
[Email] 
[Phone]
[Business Name]
[Website URL]

[What's your biggest challenge getting customers online?]
(dropdown: Not showing up on Google / Bad reviews / No website traffic / Don't know)

[UNLOCK MY FREE AUDIT →]
```

**What happens:**
- Info goes to Google Sheet: "Leads"
- Auto-email sends: "Generating your audit... check your inbox in 5 minutes"
- Triggers automated audit (Apps Script + APIs)

---

### STEP 2: Automated Audit Generation (100% Hands-Off)

**The System:**
1. **Input:** Website URL from form
2. **Pull Data:**
   - GA4 (if they have it — try common patterns)
   - Google Business Profile (public data)
   - Website speed test (PageSpeed API)
   - Mobile-friendly check
   - Basic SEO scan (title, meta, headers)
3. **Generate Report:** AI creates personalized audit
4. **Output:** PDF + email

**Time:** 2-3 minutes (fully automated)

---

### STEP 3: The Audit Report (The Hook)

**Format:** Beautiful PDF + summary email

```
SUBJECT: Your [BUSINESS NAME] Website Audit is Ready 🔍

BODY:
Hey [Name],

Your free audit is ready! Here's what I found:

━━━━━━━━━━━━━━━━━━━━━━━
YOUR CURRENT SCORE: 62/100
━━━━━━━━━━━━━━━━━━━━━━━

THE GOOD 👍
• Your Google Business Profile is claimed
• Website loads in 2.3 seconds (pretty good!)
• You have 23 reviews averaging 4.2★

THE OPPORTUNITIES 🎯
• Only 89 people visited your site last month
• You're not showing up for "[SERVICE] near me" searches
• Your phone number is hard to find on mobile

THE FORECAST 📈
If you fix the mobile issue and add 2 blog posts/month:
→ Projected 300+ visitors/month in 90 days
→ Potential 15-20 new customer calls

[VIEW FULL AUDIT REPORT →]

━━━━━━━━━━━━━━━━━━━━━━━

WANT ME TO TRACK THIS MONTHLY?

For $149/month, I'll:
• Send you this report every month
• Monitor your reviews
• Give you 1 specific action item to improve
• Show you exactly what your competitors are doing

[SIGN UP NOW — $149/MO →]

Or reply with questions!

— Martin
Sidecar: Your growth co-pilot
```

**The PDF includes:**
- Score (out of 100)
- Traffic snapshot (or "No data available" if no GA)
- GBP insights (reviews, photos, posts)
- 3 specific issues found
- 1 forecast/scenario
- **Blurred/hidden:** Full competitor analysis, detailed keywords, full roadmap

**The Tease:** They see enough to know there's opportunity, but not the full playbook.

---

### STEP 4: Three Paths (Segmentation)

**PATH A: Ready to Buy (15-20%)**
- Clicks "Sign Up Now" in email
- Stripe checkout page
- Payment successful
- Immediate welcome + onboarding
- **Your involvement: $0**

**PATH B: Interested But Hesitant (40-50%)**
- Opens email
- Clicks report
- Doesn't buy immediately
- **Enters warm email sequence**

**PATH C: Cold Lead (30-40%)**
- Downloads audit
- Never opens email
- **Enters re-engagement sequence**

---

### STEP 5: Self-Serve Onboarding (For Path A Buyers)

**Immediate After Payment:**
1. Stripe webhook triggers welcome sequence
2. Welcome email with:
   - GA4 connection instructions (video + doc)
   - "Your first report arrives on the 1st"
   - Calendly link for optional setup help
3. Add to "Active Clients" Google Sheet

**GA4 Connection Instructions (Detailed):**
```
HOW TO CONNECT YOUR GOOGLE ANALYTICS
(5 minutes, I promise)

STEP 1: Check if you have Google Analytics
• Go to analytics.google.com
• Sign in with your Google account
• Do you see your website listed? 
  YES → Go to Step 3
  NO → Go to Step 2

STEP 2: Set up Google Analytics (if needed)
• Click "Start measuring"
• Account name: [Your Business Name]
• Property name: [Your Website]
• Industry: [Your Industry]
• Time zone: Central Time
• Click "Create"
• Copy the tracking code (looks like G-XXXXXXXX)
• Send it to me OR add it to your website header

STEP 3: Give me access
• In Google Analytics, click "Admin" (gear icon, bottom left)
• Click "Account Access Management"
• Click "Add users"
• Enter: sidecareports@gmail.com
• Permission: Viewer (or Analyst if you want me to help optimize)
• Click "Add"

DONE! You'll get your first report on the 1st of next month.

STUCK? Book a 10-min screenshare: [CALENDLY LINK]
```

**If they don't connect in 48 hours:**
- Auto-reminder email
- Offer: "Stuck? I'll walk you through it — book 10 min"

---

### STEP 6: Warm Email Sequence (For Path B - Hesitant)

**Day 0:** Audit delivered (already sent)

**Day 3:** Value add
```
Subject: [Name], I found something else...

Hey [Name],

Been thinking about your audit. One more thing:

Your competitor [COMPETITOR NAME] is ranking #1 for "[KEYWORD]" 
because they have 47 more Google reviews than you.

Quick win: Send a follow-up text to your last 20 happy customers 
asking for a Google review. Could get you 5-10 reviews this week.

Want me to track this stuff monthly so you know what competitors 
are doing? It's $149/mo.

[YES, SIGN ME UP →]

— Martin
```

**Day 7:** Social proof
```
Subject: How [SIMILAR BUSINESS] got 40% more calls

Hey [Name],

One of my clients — [Mike from Diamond Coast Pools] — was in 
your exact situation 6 months ago.

His website was getting ~100 visitors/month.

After 6 months of monthly tweaks (the kind I send in these reports):
→ Now gets 340 visitors/month
→ 15-20 more quote requests per month
→ Hired 2 new employees to handle demand

The difference? He knew what to fix and when.

Want the same insights for your business?

[START MY MONTHLY REPORTS →]

— Martin
```

**Day 14:** Last chance
```
Subject: Should I close your audit file?

Hey [Name],

Haven't heard back after your audit. No worries — busy running 
a business!

Two options:

1. Not interested → I'll close your file, no hard feelings
2. Still thinking → Reply with "tell me more" and I'll answer 
   any questions

Either way, here's a free resource that might help:
[LINK: "5 Free Ways to Get More Google Reviews"]

— Martin
```

**Day 30:** Long-term nurture (if no reply)
→ Add to monthly newsletter list
→ Send tips, case studies
→ Stay top of mind

---

## Multi-Channel Acquisition

### Channel 1: Walk-In (High Touch)
**Script:**
```
"Hey, I'm Martin. I help local businesses get found online. 
I built a tool that audits your website in 60 seconds and shows 
you exactly what to fix to get more customers.

Mind if I show you? It takes 2 minutes."

[Show them the landing page on your phone]

[Walk them through filling out the form]

[Show them the automated email]

[If interested: "Want me to send you the full audit? Just need 
your email."]
```

**Advantage:** Personal, high conversion, immediate trust

---

### Channel 2: Landing Page (Low Touch)
**Traffic sources:**
- Google Ads: "Free website audit [city]"
- Facebook/Instagram ads
- Local Facebook groups
- Nextdoor
- Google Business Profile post

**Conversion:** 5-15% of visitors fill out form

---

### Channel 3: Cold Email (Medium Touch)
**Target:** Businesses you find online that need help
**Tool:** Hunter.io or Apollo.io to find emails
**Template:**
```
Subject: Quick question about [BUSINESS NAME]

Hey [Name],

I was looking at [BUSINESS NAME]'s website and noticed something:

[1 specific issue — slow load time, no mobile optimization, etc.]

I built a free tool that audits your entire online presence 
(website, Google ranking, reviews) in 60 seconds.

Want me to run it for you? Just reply with "yes" and I'll send 
the link.

No pitch, just free insights.

— Martin
Sidecar
```

**Follow-up:** If they reply "yes" → send landing page

---

## The Tech Stack (Minimal)

| Need | Tool | Cost |
|------|------|------|
| Landing page | Carrd.co or Webflow | $19/year |
| Form capture | Google Forms or Tally.so | Free |
| Lead storage | Google Sheets | Free |
| Audit automation | Google Apps Script | Free |
| Payment | Stripe | 2.9% + $0.30 |
| Email sequences | Mailchimp (free tier) or Gmail + Apps Script | Free-$20/mo |
| Calendar booking | Calendly (free) | Free |
| **TOTAL** | | **~$40/mo** |

---

## Metrics to Track (Google Sheet Dashboard)

| Metric | Target |
|--------|--------|
| Landing page visitors/day | 10-20 |
| Form completion rate | 10-15% |
| Audit delivery rate | 100% (automated) |
| Audit-to-signup rate | 15-25% |
| Cost per acquisition | <$50 |
| Monthly churn | <5% |

---

## The Beauty of This System

**Scales infinitely:**
- 10 audits/day? Automated
- 100 audits/day? Automated
- You only touch the high-value interactions (sales calls, strategy)

**Qualifies leads:**
- People who fill out form = interested
- People who pay immediately = hot
- People who need nurture = warm

**No friction for buyers:**
- Ready to buy? Self-serve in 2 minutes
- Need convincing? Get nurtured
- Just curious? Get value, stay in orbit

---

## Your Action Plan This Week

**Day 1-2: Build the machine**
- [ ] Create landing page (Carrd or simple HTML)
- [ ] Set up Google Form → Sheet automation
- [ ] Write audit report template
- [ ] Connect audit automation (Apps Script)
- [ ] Set up Stripe

**Day 3-4: Test the flow**
- [ ] Run audit on your own site
- [ ] Run audit on a friend's business
- [ ] Fix any broken pieces

**Day 5-7: Get first lead**
- [ ] Walk into 2-3 local businesses
- [ ] Or email 10 businesses
- [ ] Get 1 person through the full funnel

**Goal:** First paying customer by Friday

---

## Questions for You

1. **For the audit automation:** Do you want to build the scraping/API connections yourself, or use tools like Screaming Frog API, PageSpeed API, etc.?

2. **For the forecast:** Should it be AI-generated ("If you do X, expect Y") or template-based (fill in the blanks)?

3. **For competitor data:** How deep do you want to go? Just "they have more reviews" or full keyword analysis?

4. **For payment:** Stripe only, or also offer PayPal, Venmo, check for old-school business owners?

Ready to build this? 🚀
