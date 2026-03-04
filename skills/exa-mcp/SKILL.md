---
name: exa-mcp
description: Exa AI MCP server for web search, company research, people search, and deep research. Use when you need AI-powered search with citations, company intelligence, or comprehensive research reports.
homepage: https://exa.ai
metadata:
  openclaw:
    emoji: 🔎
    os: [darwin, linux, windows]
    requires:
      env: [EXA_API_KEY]
    mcp:
      url: https://mcp.exa.ai/mcp
      tools:
        - web_search_exa
        - web_search_advanced_exa
        - get_code_context_exa
        - crawling_exa
        - company_research_exa
        - people_search_exa
        - deep_researcher_start
        - deep_researcher_check
---

# Exa MCP Skill

AI-powered web search and research tools via Exa. Exa is a search engine built specifically for AI — it finds relevant content and returns structured data with citations.

## When to Use

- **Web search** — Need current information from the web with citations
- **Company research** — Deep dive into a company (funding, news, competitors)
- **People search** — Find information about individuals (executives, founders)
- **Deep research** — Comprehensive research reports on any topic
- **Code context** — Find relevant code examples and documentation
- **Web crawling** — Extract content from specific URLs

## Prerequisites

**API Key Required:**
1. Get an API key from [Exa.ai](https://exa.ai)
2. Set environment variable: `EXA_API_KEY=your_key`

Or configure via OpenClaw:
```bash
openclaw configure --section exa
```

## Tools

### web_search_exa
Basic web search with AI-powered relevance ranking.

**Use when:** General web search, finding sources, quick lookups

### web_search_advanced_exa
Advanced search with filters (date, domain, content type).

**Use when:** Need specific date ranges, exclude domains, find academic papers

### get_code_context_exa
Search for code examples and technical documentation.

**Use when:** Looking for implementation examples, API docs, code snippets

### crawling_exa
Extract structured content from a specific URL.

**Use when:** You have a URL and want the full content parsed and structured

### company_research_exa
Deep research on a company — funding, news, competitors, key people.

**Use when:** Due diligence, competitive analysis, partnership research

### people_search_exa
Find information about individuals — background, affiliations, news.

**Use when:** Researching founders, executives, potential hires

### deep_researcher_start
Launch a comprehensive research job on a topic.

**Use when:** You need a full research report, not just quick answers

**Returns:** A job ID to check status

### deep_researcher_check
Check the status of a deep research job.

**Use when:** Following up on a research job started earlier

## Tool Selection Guide

| Need | Tool |
|------|------|
| Quick web search | `web_search_exa` |
| Search with date/domain filters | `web_search_advanced_exa` |
| Find code examples | `get_code_context_exa` |
| Extract content from URL | `crawling_exa` |
| Company intelligence | `company_research_exa` |
| Person/executive research | `people_search_exa` |
| Full research report | `deep_researcher_start` → `deep_researcher_check` |

## Example Usage

**Web search:**
```json
{
  "tool": "web_search_exa",
  "query": "latest AI agent frameworks 2025"
}
```

**Company research:**
```json
{
  "tool": "company_research_exa",
  "company": "Anthropic"
}
```

**Deep research:**
```json
// Start research
{
  "tool": "deep_researcher_start",
  "query": "autonomous AI agents for business automation"
}

// Check status (use job ID from start response)
{
  "tool": "deep_researcher_check",
  "job_id": "job_abc123"
}
```

## MCP Configuration

Add to your OpenClaw MCP config:

```json
{
  "mcpServers": {
    "exa": {
      "url": "https://mcp.exa.ai/mcp?tools=web_search_exa,web_search_advanced_exa,get_code_context_exa,crawling_exa,company_research_exa,people_search_exa,deep_researcher_start,deep_researcher_check",
      "env": {
        "EXA_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

## Tips

- **Citations included:** All results include source URLs for fact-checking
- **Relevance ranking:** Exa uses AI to rank by semantic relevance, not just keywords
- **Deep research is async:** Start it, then check back — can take minutes for comprehensive reports
- **Combine tools:** Use `web_search_exa` to find sources, then `crawling_exa` to extract full content

## Pricing

Exa has a free tier with generous limits. Check [exa.ai/pricing](https://exa.ai/pricing) for current rates.
