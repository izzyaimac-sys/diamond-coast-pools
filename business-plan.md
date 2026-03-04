# Growth Reports for Local Business — Business Plan

**One-liner:** Monthly AI-generated growth reports for blue-collar businesses that don't understand digital marketing, with an upsell path to website rebuilds.

---

## The Problem

- 46% of small businesses have no website
- Of those that do, most have terrible Wix templates that don't convert
- Local business owners are "blue collar" — they hate tech, don't understand SEO, and feel dumb asking for help
- Agencies charge $500-2k/mo for complex retainers they don't understand
- They want **clarity** and **growth**, not homework

---

## The Solution

### Tier 1: Monthly Growth Reports ($99-149/mo)
- AI-generated report sent 1st of every month
- Shows: traffic, Google visibility, reviews, what improved, what to fix
- Written in plain English (no "SEO," "CTR," jargon)
- **Months 1-6 (Trust Building):** DIY action items with benefits — "Move your phone number to the top. Most visitors are mobile and want to call quickly — making it easy means more calls, more jobs."
- **Month 6+ (Upsell):** After trust established, introduce "Want me to handle this for you?" offers
- **Your time:** 2 mins/client/month (spot-check AI output)

### Tier 2: Website Rebuild ($1,500-3k one-time)
- Offered after 6 months of reports (trust established)
- Uses pre-built templates (Next.js, fast, modern)
- **Your time:** 2-3 hours per site

### Tier 3: Full Service ($299-499/mo)
- Reports + unlimited small fixes + priority support
- For clients who want hands-off
- **Your time:** 1-2 hours/client/month

---

## Revenue Model

### Conservative Scenario (Year 1)

| Month | Clients | Avg Price | Monthly Revenue | Annual Revenue |
|-------|---------|-----------|-----------------|----------------|
| 1-3 | 3 | $99 | $297 | $891 |
| 4-6 | 8 | $125 | $1,000 | $3,000 |
| 7-9 | 12 | $149 | $1,788 | $5,364 |
| 10-12 | 15 | $149 | $2,235 | $6,705 |
| **Rebuilds** | 6 | $2,000 | - | $12,000 |
| **YEAR 1 TOTAL** | | | | **~$28,000** |

### Target Scenario (Year 1)

| Month | Clients | Avg Price | Monthly Revenue |
|-------|---------|-----------|-----------------|
| 6 | 10 | $149 | $1,490 |
| 12 | 20 | $149 | $2,980 |
| Rebuilds | 10 | $2,000 | $20,000 |
| **YEAR 1 TOTAL** | | | **~$40,000** |

### Lifestyle Goal (Year 2-3)

| Tier | Clients | Price | Monthly Revenue | Your Time/Week |
|------|---------|-------|-----------------|----------------|
| Growth Reports | 20 | $149 | $2,980 | 40 mins |
| Full Service | 5 | $399 | $1,995 | 5-10 hrs |
| Rebuilds | 2/mo | $2,000 | $4,000 | 6 hrs |
| **MONTHLY** | | | **$8,975** | **12 hrs** |
| **ANNUAL** | | | **$107,700** | **~600 hrs** |

**Path to $200k:** Add 10 more full-service clients or raise prices to $199-299.

---

## Costs

### Infrastructure (Monthly)

| Item | Cost | Notes |
|------|------|-------|
| Airtable Pro | $20 | Data storage, 5,000 records |
| Make.com (Zapier alt) | $20-50 | Automation workflows |
| Claude API | $20-30 | AI report generation |
| ConvertKit/Mailgun | $30 | Email delivery |
| Railway/Vercel hosting | $20 | Website hosting for clients |
| Domain (annual) | $12/yr | Your business domain |
| **TOTAL MONTHLY** | **~$110-150** | |
| **ANNUAL** | **~$1,500** | |

### One-Time Costs

| Item | Cost |
|------|------|
| Development time | Free (your time) |
| Template builds | Free (your time) |
| **Total Investment** | **~$1,500 first year** |

### Profit Margins

- **At 20 clients:** $2,980 revenue - $150 costs = **$2,830 profit (95% margin)**
- **At 20 clients + 5 full-service:** $4,975 revenue - $150 costs = **$4,825 profit (97% margin)**
- **Effective hourly rate:** $200-400/hour once automated

---

## Time Commitment

### Build Phase (First 4-6 Weeks)
**2-3 hours/day, 4-5 days/week**
- Total: 40-60 hours to full system
- Done in evenings after baby sleeps
- Full system operational by Week 4-6

### Operating Phase (Ongoing)
**4-6 hours/week**
- Monday morning: Batch-process "YES" responses (1-2 hrs)
- Thursday evening: Review next week's reports (30 mins)
- As needed: Sales calls, website builds (2-3 hrs/week)

---

## Technical Sprints (Build Plan)

### Sprint 1: Data Collection ✅ COMPLETE (Feb 28)
- Google Sheets with Clients, Monthly Metrics, Reports tabs
- Google Apps Script pulling data automatically
- Mock data generation for testing
- Monthly trigger scheduled (1st of month at 9 AM)
- **Deliverable:** Live data feeding into Sheet

### Sprint 2: AI Report Generation ✅ COMPLETE (Feb 28)
- OpenAI GPT-3.5 integration
- Custom prompt engineered for blue-collar tone
- Report format: Scoreboard / What's Working / Next Moves
- Auto-saves to Reports tab
- **Deliverable:** Click button, get human-sounding report

### Sprint 3: Email Delivery ✅ COMPLETE (March 1)
- **Brand:** Sidecar — "Your growth co-pilot"
- **Visual identity:** Teal (#0D7377), Cream (#FDF6E3), Coral (#FF6B6B)
- Branded HTML email template
- Sends from Apps Script to client email (Column F)
- Report format optimized for Tier 1 (DIY action items, no upsell CTA)
- **Deliverable:** Scheduled monthly email delivery working

### Sprint 4: "YES" Response Workflow ⏸️ SKIPPED (for now)
- **Decision:** Build at Month 6 when ready for Tier 2/3 upsells
- **Reason:** Trust-building phase first — no "Hit reply" CTAs in Tier 1
- **Future:** Will parse YES replies and create tasks when upsell offers begin

### Sprint 5: Website Templates ⏸️ PENDING
- Template A: Service businesses (pools, landscaping, HVAC)
- Template B: Trades/contractors
- Template C: Professional services
- Build content swap system
- Write documentation
- **Deliverable:** New site from template in 2-3 hours

**Total Build Time: 50 hours (4-6 weeks at 2-3 hrs/day)**

---

## Go-to-Market Plan

### Phase 1: Validation (Week 1-2)
- Build first report manually for Mike
- Get feedback: "Would you pay $149/mo for this monthly?"
- Refine based on his input
- **Goal:** One paying customer, proof of concept

### Phase 2: Beta (Week 3-8)
- Build system (Sprints 1-4)
- Ask Mike for 2-3 referrals
- Offer first month free or discounted to 3-5 beta clients
- **Goal:** 5 clients, system stress-tested

### Phase 3: Scale (Month 3-6)
- Launch with simple landing page
- Warm outreach: friends, family, local business owners
- LinkedIn/Instagram content showing before/after audits
- **Goal:** 10-15 clients, $1,500-2,200/mo revenue

### Phase 4: Optimize (Month 6-12)
- Raise prices to $199/mo
- Add full-service tier at $399/mo
- First website rebuilds ($1,500-3k each)
- Consider first VA/part-time help
- **Goal:** 15-20 clients, $3,000-5,000/mo revenue

---

## Competitive Advantage

| Competitor | Price | Your Edge |
|------------|-------|-----------|
| WebFX, big agencies | $500-2k/mo | You're 10x cheaper, simpler |
| DIY tools (SEMrush) | $100-300/mo | You do it for them, explain it |
| Freelancers on Fiverr | $50-200/project | You have ongoing relationship |
| Other local SEO agencies | $199-500/mo | You speak blue-collar, not tech |

**Your moat:** Personal relationship + AI-powered delivery + blue-collar language

---

## Risks & Mitigation

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Too many "YES" responses | Medium | Cap clients at 20, raise prices |
| Client churn | Medium | Monthly value, 6-month rebuild pitch |
| Technical failures | Low | Test thoroughly, keep manual backup |
| Time creep | High | Batch everything, strict boundaries |
| Burnout | Medium | Start slow, 4-6 hrs/week max ongoing |

---

## Success Metrics

### Month 1-3
- [ ] 1 paying client (Mike or referral)
- [ ] System 50% built (Sprints 1-2 done)
- [ ] First $500 in revenue

### Month 6
- [ ] 10 clients at $125-149/mo
- [ ] System 100% automated
- [ ] First website rebuild sold
- [ ] $1,500/mo revenue

### Month 12
- [ ] 15-20 clients
- [ ] 3-5 full-service clients at $299+/mo
- [ ] 5-10 website rebuilds completed
- [ ] $3,000-5,000/mo revenue
- [ ] Operating 4-6 hrs/week

---

## The Bottom Line

**Investment:** $1,500 first year + 50-60 hours build time + 4-6 hrs/week ongoing

**Return:** $40-50k Year 1 potential, $100k+ Year 2 potential

**Lifestyle:** Location independent, 4-6 hours/week, work when baby sleeps

**Exit option:** Sell client book to agency for 1-2x annual revenue once at $100k+/year

---

**Next Action:** Start Sprint 1 (Data Collection) tonight or this week.
