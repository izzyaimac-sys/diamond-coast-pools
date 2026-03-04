# Notion Workspace Template for AutoFlow Weekly

## Workspace Name: AutoFlow Weekly

---

## DATABASE 1: Content Calendar

**Purpose:** Track and manage all newsletter issues from idea to published

### Properties:

| Property Name | Type | Options/Config | Description |
|---------------|------|----------------|-------------|
| Issue # | Number | Format: Number | Sequential issue number |
| Name | Title | - | Issue title/topic |
| Publish Date | Date | Include time | Target send date |
| Status | Select | Idea → Draft → In Review → Scheduled → Published → Archived | Production status |
| Subject Line | Text | - | Email subject |
| Preview Text | Text | - | Preview snippet |
| Word Count | Number | Format: Number | Target/actual length |
| Category | Multi-select | Tools, Workflows, Stories, Deep Dive, Roundup | Content type |
| Author | Person | - | Who's writing |
| Content | Rich Text | - | Full issue content |
| Notes | Rich Text | - | Internal notes |

### Views to Create:
1. **Editorial Calendar** (Calendar view by Publish Date)
2. **By Status** (Board view grouped by Status)
3. **This Week** (Table view filtered: Publish Date is within next 7 days)
4. **Published** (Table view filtered: Status = Published)
5. **Ideas** (Table view filtered: Status = Idea)

---

## DATABASE 2: Content Queue

**Purpose:** Store and prioritize articles from RSS feeds and other sources

### Properties:

| Property Name | Type | Options/Config | Description |
|---------------|------|----------------|-------------|
| Title | Title | - | Article title |
| URL | URL | - | Source link |
| Source | Select | Product Hunt, TechCrunch, Reddit, Twitter, Manual | Where found |
| Date Found | Date | Include time | Auto-populated |
| AI Score | Number | Format: Number (1-10) | Relevance score |
| Relevance | Number | 1-10 scale | For solopreneurs |
| Actionability | Number | 1-10 scale | Can use immediately |
| Novelty | Number | 1-10 scale | New/interesting |
| Summary | Rich Text | - | AI-generated summary |
| Why It Matters | Rich Text | - | AI analysis |
| Status | Select | Pending → Reviewed → Approved → Used → Archived | Workflow status |
| Tags | Multi-select | AI, Automation, Marketing, Sales, Productivity, Finance | Categories |
| Assigned To | Person | - | For team workflow |

### Views to Create:
1. **Top Scored** (Table view sorted by AI Score descending)
2. **Pending Review** (Table view filtered: Status = Pending)
3. **Approved** (Table view filtered: Status = Approved)
4. **By Source** (Board view grouped by Source)
5. **This Week's Finds** (Table view filtered: Date Found is within last 7 days)

---

## DATABASE 3: Subscriber Management

**Purpose:** Track subscriber data and engagement (manual import from Beehiiv)

### Properties:

| Property Name | Type | Options/Config | Description |
|---------------|------|----------------|-------------|
| Email | Email | - | Subscriber email |
| Signup Date | Date | - | When joined |
| Source | Select | Landing Page, Twitter, Referral, LinkedIn, Direct | Acquisition channel |
| Referrer | Text | - | Who referred them |
| Tags | Multi-select | High Engagement, VIP, Beta Tester, Community | Segments |
| Open Rate | Number | Format: Percent | Engagement metric |
| Click Rate | Number | Format: Percent | Engagement metric |
| Last Opened | Date | - | Activity tracking |
| Issues Received | Number | - | Total sends |
| Issues Opened | Number | - | Engagement count |
| Status | Select | Active → Inactive → Unsubscribed → Bounced | Current status |
| Notes | Rich Text | - | Any special notes |

### Views to Create:
1. **All Subscribers** (Table view)
2. **Active** (Table view filtered: Status = Active)
3. **High Engagement** (Table view filtered: Open Rate > 50%)
4. **Recent Signups** (Table view filtered: Signup Date is within last 30 days)
5. **Unsubscribed** (Table view filtered: Status = Unsubscribed)

---

## DATABASE 4: SOPs & Templates

**Purpose:** Document all processes and reusable templates

### Properties:

| Property Name | Type | Options/Config | Description |
|---------------|------|----------------|-------------|
| Name | Title | - | Process/template name |
| Category | Select | Content, Technical, Marketing, Operations, Design | Type |
| Status | Select | Draft → Active → Needs Update → Archived | State |
| Priority | Select | High → Medium → Low | Importance |
| Content | Rich Text | - | Full SOP/template |
| Related Tools | Multi-select | Make, Beehiiv, Notion, OpenAI, etc. | Tools used |
| Last Updated | Date | - | Maintenance tracking |
| Owner | Person | - | Responsible party |
| Checklist | Checkbox | - | Is this a checklist? |

### Views to Create:
1. **All SOPs** (Table view)
2. **By Category** (Board view grouped by Category)
3. **Active Only** (Table view filtered: Status = Active)
4. **Needs Update** (Table view filtered: Status = Needs Update)
5. **Checklists** (Table view filtered: Checklist = checked)

---

## DATABASE 5: Tool Stack

**Purpose:** Track all tools, costs, and renewals

### Properties:

| Property Name | Type | Options/Config | Description |
|---------------|------|----------------|-------------|
| Tool Name | Title | - | Product name |
| Category | Select | AI, Automation, Design, Email, Social, Finance, Productivity | Type |
| Monthly Cost | Number | Format: Currency USD | Recurring cost |
| Annual Cost | Formula | prop("Monthly Cost") * 12 | Auto-calculated |
| Billing Cycle | Select | Monthly → Annual → Free | Payment frequency |
| Renewal Date | Date | - | Next payment due |
| Status | Select | Active → Trial → Cancelled → Considering | Current state |
| Login URL | URL | - | Access link |
| API Key Location | Text | - | Where stored |
| Notes | Rich Text | - | Usage notes |
| Owner | Person | - | Who manages |

### Views to Create:
1. **All Tools** (Table view)
2. **Monthly Costs** (Table view with sum of Monthly Cost)
3. **Upcoming Renewals** (Calendar view by Renewal Date)
4. **Active Tools** (Table view filtered: Status = Active)
5. **By Category** (Board view grouped by Category)

---

## PAGE STRUCTURE

### Home Page
**Title:** 🚀 AutoFlow Weekly - Command Center

**Content:**
```
# 🚀 AutoFlow Weekly
## AI & Automation Newsletter for Solopreneurs

### 📊 Quick Stats
- [Subscribers: X] [Open Rate: X%] [This Week's Issue: #X]

### 📅 This Week
- Next Issue: [Link to Content Calendar]
- Status: [Status from Content Calendar]
- Publish Date: [Date]

### 🔗 Quick Links
- [Beehiiv Dashboard]
- [Make.com Scenarios]
- [Twitter Account]
- [Analytics]

### 📋 Active Projects
[Linked view of Content Calendar - This Week]

### 📝 Latest Content Queue
[Linked view of Content Queue - Top Scored]
```

---

### Content Hub (Page)
**Title:** 📝 Content Hub

**Sub-pages:**
1. **Editorial Calendar** (Linked database view)
2. **Content Queue** (Linked database view)
3. **Published Issues** (Archive)
4. **Ideas & Brainstorming** (Free-form page)

---

### Operations Hub (Page)
**Title:** ⚙️ Operations Hub

**Sub-pages:**
1. **SOPs & Templates** (Linked database view)
2. **Tool Stack** (Linked database view)
3. **Subscriber Analytics** (Linked database view)
4. **Automation Workflows** (Documentation)

---

### Automation Workflows (Page)
**Title:** 🤖 Automation Workflows

**Content:**
```
# Automation Workflows

## 1. Daily Content Curation
**Status:** [Active / In Development]
**Trigger:** Daily 6:00 AM PST
**Tools:** Make.com, OpenAI, Notion

### Workflow:
[Flowchart or description]

### Make.com Scenario Link:
[Link to scenario]

### Troubleshooting:
- Issue: [Common problem]
- Solution: [How to fix]

---

## 2. Weekly Newsletter Generation
**Status:** [Active / In Development]
**Trigger:** Sunday 8:00 AM PST
**Tools:** Make.com, OpenAI, Beehiiv

[Continue for all workflows...]
```

---

## SETUP INSTRUCTIONS

### Step 1: Create Workspace
1. Go to notion.so
2. Create new workspace named "AutoFlow Weekly"
3. Invite team members (if applicable)

### Step 2: Create Databases
1. Create each database above
2. Set up all properties with correct types
3. Configure options for Select/Multi-select fields
4. Create formulas for calculated fields

### Step 3: Create Views
1. For each database, create the views listed
2. Apply filters and sorts as specified
3. Save views with descriptive names

### Step 4: Create Pages
1. Create main pages (Home, Content Hub, Operations Hub)
2. Add linked database views to pages
3. Write initial content for each page
4. Set up navigation/links

### Step 5: Integrations
1. **Make.com Integration:**
   - Create Notion integration at notion.so/my-integrations
   - Copy Internal Integration Token
   - Add to Make.com Notion modules
   - Share databases with integration

2. **Browser Extension:**
   - Install Notion Web Clipper
   - Use to save articles directly to Content Queue

### Step 6: Templates
1. Create templates for:
   - New newsletter issue (in Content Calendar)
   - New SOP (in SOPs database)
   - New content item (in Content Queue)

---

## SAMPLE TEMPLATE: New Newsletter Issue

**Template Name:** Newsletter Issue Template
**Database:** Content Calendar

**Content:**
```
## Subject Line Options:
- Option 1: 
- Option 2: 
- Option 3: 

## Preview Text:

## Outline:
- [ ] Introduction/hook
- [ ] Main point 1
- [ ] Main point 2
- [ ] Main point 3
- [ ] Action item/quick win
- [ ] Closing/CTA

## Resources Needed:
- [ ] Tool screenshots
- [ ] Links to tools
- [ ] Case study/example

## Checklist:
- [ ] Draft written
- [ ] Edited for clarity
- [ ] Links checked
- [ ] Preview text added
- [ ] Scheduled in Beehiiv
```

---

## SAMPLE TEMPLATE: Content Queue Item

**Template Name:** New Content Item
**Database:** Content Queue

**Auto-fill:**
- Date Found: @Today
- Status: Pending
- AI Score: [blank - to be filled by Make.com]

**Content:**
```
## Article Summary:
[AI will fill this]

## Why It Matters for Solopreneurs:
[AI will fill this]

## Potential Angle for Newsletter:
[Human to fill after review]

## Related Tools Mentioned:
- 
- 

## Similar Content:
[Link to related items in Content Queue]
```

---

## INTEGRATION WITH MAKE.COM

### Required Connections:
1. Notion (Internal Integration Token)
2. OpenAI (API Key)
3. RSS Aggregator (built-in)
4. Beehiiv (API Key when available)

### Database IDs Needed for Make.com:
After creating databases, get their IDs from URLs:
- Content Calendar ID: [To fill]
- Content Queue ID: [To fill]
- Subscriber Management ID: [To fill]

Store these in Make.com variables for easy reference.

---

## MAINTENANCE SCHEDULE

**Weekly:**
- Review Content Queue (approve/reject items)
- Update Content Calendar with new issues
- Check Tool Stack for any changes

**Monthly:**
- Review SOPs for accuracy
- Update subscriber segments
- Archive old Content Queue items
- Review database views for usefulness

**Quarterly:**
- Full database cleanup
- Archive old published issues
- Update integrations if needed
- Backup important data

