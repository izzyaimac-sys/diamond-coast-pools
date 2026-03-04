# AI-Powered Monthly Growth Report System

## Data Input Structure (Auto-Collected via APIs)

```json
{
  "client": {
    "name": "Mike's Pool Service",
    "business_type": "Pool cleaning & maintenance",
    "location": "Danbury, TX",
    "website": "diamondcoastpools.com"
  },
  "month": "March 2024",
  "metrics": {
    "website_visitors": {
      "current": 127,
      "previous": 103,
      "change_percent": 23
    },
    "google_searches_appeared": {
      "current": 412,
      "previous": 358,
      "change_percent": 15
    },
    "quote_requests": {
      "current": 4,
      "previous": 1,
      "change_percent": 300
    },
    "average_review_rating": {
      "current": 4.7,
      "previous": 4.5
    },
    "new_reviews": 2,
    "top_keyword": "pool service pearland",
    "keyword_ranking": 4,
    "site_speed_score": 62,
    "mobile_friendly": true
  },
  "competitor_activity": "None detected",
  "issues_found": [
    "Site loads slow on mobile (4.2 seconds)",
    "Phone number hidden on mobile view"
  ],
  "wins": [
    "Ranking #4 for 'pool service pearland'",
    "Review average increased to 4.7 stars",
    "Quote requests up 300% from last month"
  ]
}
```

---

## AI Prompt Template

```
You are a local business marketing expert writing a monthly growth report for a blue-collar business owner. 

CLIENT INFO:
- Business Name: {{client.name}}
- Type: {{client.business_type}}
- Location: {{client.location}}
- Month: {{month}}

PERFORMANCE DATA:
- Website visitors: {{metrics.website_visitors.current}} ({{metrics.website_visitors.change_percent}}% vs last month)
- Google searches showing their business: {{metrics.google_searches_appeared.current}} ({{metrics.google_searches_appeared.change_percent}}% change)
- Quote requests: {{metrics.quote_requests.current}} ({{metrics.quote_requests.change_percent}}% change)
- Review rating: {{metrics.average_review_rating.current}} stars ({{metrics.new_reviews}} new this month)
- Top keyword ranking: "{{metrics.top_keyword}}" at position {{metrics.keyword_ranking}}
- Site speed: {{metrics.site_speed_score}}/100

WINS THIS MONTH:
{{#each wins}}
- {{this}}
{{/each}}

ISSUES TO FIX:
{{#each issues_found}}
- {{this}}
{{/each}}

Write a 3-section report:

SECTION 1: THE SCOREBOARD (3 bullets with specific numbers, upbeat tone)
SECTION 2: WHAT'S WORKING (2-3 sentences celebrating wins, explain why they matter in plain English)
SECTION 3: NEXT MOVES (2 specific, actionable recommendations - not a list, narrative format)

RULES:
- No jargon (no "SEO," "CTR," "bounce rate")
- Write like you're talking to a friend who owns a business
- Keep it under 200 words total
- Use contractions (you're, it's, we're)
- If numbers are up, be excited. If down, be encouraging but honest
- Never blame them - always "we can fix this" or "here's an opportunity"
- End with one specific action they can take this week (not a question)

EXAMPLE TONE:
"Your website traffic is up 23% this month - that's 24 more potential customers checking you out. Most of that growth is coming from people searching 'pool service pearland' where you're now showing up #4 on Google. That's prime real estate."
```

---

## Sample Output Report

---

**Subject: Your March Growth Report - You're Up 23% 📈**

Hey Mike,

**THE SCOREBOARD**  
• **127 people** visited your website this month (+23% from February)  
• **412 Google searches** showed your business (+15% more eyeballs on you)  
• **4 people requested quotes** — that's 3 more than last month!

**WHAT'S WORKING**  
That "pool service pearland" ranking is paying off — you're sitting at #4 on Google and it's driving real traffic. Your review game is strong too. Jumping from 4.5 to 4.7 stars with 2 new reviews this month builds serious trust. People are finding you AND liking what they see.

**NEXT MOVES**  
Your site takes 4+ seconds to load on phones, and 53% of people bail if it's slow. Let's compress those photos and speed it up. Also, your phone number is buried — most people want to call, not fill out forms. Move that number to the top of your homepage where thumbs can find it.

Hit reply if you want me to tackle the photo compression this week.

— Izzy

---

## Workflow (Your Time: 2 Minutes/Client)

**Monthly (1st of each month):**
1. **Data auto-collects** via APIs (0 mins)
2. **AI generates reports** using prompt above (0 mins)
3. **You batch-review** all reports in one sitting (2 mins each — just check for weirdness)
4. **Auto-send via email** scheduler (0 mins)

**Total time for 20 clients: 40 minutes/month**

---

## Tools to Make This Real

| Step | Tool | Cost |
|------|------|------|
| Data collection | Google Analytics API + GBP API + Make.com | $20/mo |
| AI generation | Claude API or OpenAI API | $20-30/mo |
| Email delivery | ConvertKit or Mailgun | $30/mo |
| Data storage | Airtable (organizes client data) | $20/mo |
| **Total** | | **~$90/mo** |

---

## Revenue Math

**At 20 clients × $149/mo = $2,980/mo revenue**  
**Costs: $90/mo**  
**Your time: 40 mins/month**  
**Profit: $2,890/mo for 40 minutes of work**

That's **$4,335/hour effective rate** on the reporting side.

Then upsell website rebuilds when they're ready.

---

## Next Steps to Test

1. **Build this for Mike manually first** (use his real data, write one report)
2. **Get his feedback** — does this feel valuable? Would he pay $149/mo?
3. **Refine the prompt** based on what resonates
4. **Automate the data collection** once validated

Want me to adjust the tone, add more sections, or build the email template that sends with this report?
