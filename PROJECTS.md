# PROJECTS.md — The Big Board

> *"If it's not in here, it doesn't exist."* — COO Izzy

---

## Quick Reference

| REF | Project | Status | Next Action |
|-----|---------|--------|-------------|
| REF-001 | Mission Control Dashboard | ✅ Live | Monitor & iterate |
| REF-002 | Infrastructure Stack | ✅ Configured | Ready for projects |
| REF-003 | Business Model Research | 🟡 Active | Pick a direction |
| REF-004 | [Reserved] | — | — |

---

## Active Projects

### REF-001 — Mission Control Dashboard
**What:** Streamlit dashboard for tracking AI workforce / sub-agents  
**Why:** Proof of concept + operational visibility  
**Stack:** Python, Streamlit  
**URL:** http://localhost:8501  
**Status:** ✅ Complete (v2.0) · Last updated 2026-02-27

**Features v2.0:**
- **Metric-first design** — Live KPIs at top (Agents, Tasks, Revenue Score)
- **Clean, high-contrast UI** — Reduced gradients, GitHub-inspired dark theme
- **Button-based navigation** — Clear primary actions (Dashboard | Projects | Tasks | Activity)
- **Clickable project cards** — View Tasks / Add Task buttons on each project
- **Live system status** — Operational/Standby indicator with timestamp
- **Filter buttons** — Quick status filtering (All | In Progress | Research | Planning | Backlog)
- **Modularized code** — Separated state, UI components, sections
- **Mission statement** — Moved to footer, prioritizes operational data
- REF codes on all project and task cards
- **4 Views:** Dashboard | Projects | Tasks | Activity
- Future: Real-time updates, deployment status, database backend

---

### REF-002 — Infrastructure Stack
**What:** Core services wired up and ready  
**Why:** Foundation for any business we build  
**Status:** ✅ Complete

| Service | Status | Account |
|---------|--------|---------|
| GitHub | ✅ | Connected |
| Railway | ✅ | Token saved |
| Stripe | ✅ | Test mode (`acct_1T35am476dHo3PPh`) |
| Resend | ✅ | 100 emails/day free |
| Supabase | ✅ | `hhvutsqmtxcxrehngknf.supabase.co` |

**Notes:**
- All env files stored in workspace
- Ready to deploy real apps
- Stripe test mode = safe to experiment with payments

---

### REF-003 — Business Model Research
**What:** Find a lifestyle business that runs autonomously with low cost  
**Why:** Need a direction that fits Martin's constraints (9-5 job, new baby)  
**Status:** 🟡 Active — evaluating options

**Criteria (saved to notes):**
- Low startup cost (infrastructure <$50/month)
- Low maintenance / autonomous (AI handles 90%+)
- Lifestyle-friendly (<2 hrs/week once running)
- Revenue within 3-6 months

**Research Completed:**
| REF | Research | Output | Status |
|-----|----------|--------|--------|
| RESEARCH-001 | Top 5 Micro-SaaS Opportunities 2025 | `~/notes/RESEARCH-001-microsaas-opportunities-2025.md` | ✅ Complete |

**Active Tasks:**
- [ ] Review RESEARCH-001 findings (Due: Feb 28)
- [ ] Select 1-2 opportunities to prototype (Due: Mar 1)

**Candidates (sub-REFs for tracking):**

| REF | Model | Description | Status |
|-----|-------|-------------|--------|
| REF-003A | Micro-SaaS Toolkit | Automation tools for solopreneurs | Research |
| REF-003B | Content/IP Empire | AI-powered content generation | Research |
| REF-003C | Digital Products | Templates, guides, digital assets | Planning |
| REF-003D | Newsletter Network | Curated niche newsletters | Backlog |
| REF-003E | Affiliate Sites | SEO review/comparison sites | Backlog |

**Next Action:** Review RESEARCH-001 findings, pick 1-2 opportunities to prototype

---

## On Deck

### REF-004 — [Next Project]
**Status:** 🔵 Not started  
**Depends on:** REF-003 decision

---

## Archive

*Nothing here yet — but soon!*

---

## How to Use This

**Adding a project:**
- I add it here with next REF number
- I update this file as status changes

**Talking about projects:**
> "What's the status on REF-003?"
> "Update REF-001 to add a deployments tab"
> "REF-004 is blocked, need Martin's input"

**Daily standup (optional):**
- I can check this file during heartbeats
- Surface what's stuck, what's moving

---

*Last updated: 2026-02-27 by Izzy (COO)* 🤙
