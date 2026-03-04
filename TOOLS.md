# TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## What Goes Here

Things like:

- Camera names and locations
- SSH hosts and aliases
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## Examples

```markdown
### Cameras

- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH

- home-server → 192.168.1.100, user: admin

### TTS

- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

---

Add whatever helps you do your job. This is your cheat sheet.

---

## OpenClaw Connection Details (Saved 2026-02-26)

**For Chrome Extension / Browser Relay:**
- **WebSocket URL:** `ws://127.0.0.1:18789`
- **Gateway Token:** `87d0e136f2be07de9b99c25d89c57da2071fefb223905e94`
- **Dashboard:** http://127.0.0.1:18789/

Use these to connect the OpenClaw browser extension when it disconnects.

---

## API Rate Limits & Budget

**Rate Limiting:**
- 5 seconds minimum between API calls
- 10 seconds between web searches
- Max 5 searches per batch, then 2-minute break
- Batch similar work (one request for 10 leads, not 10 requests)
- If 429 error: STOP, wait 5 minutes, retry

**Budget:**
- Daily: $5 (warning at 75%)
- Monthly: $200 (warning at 75%)

---

## MCP Servers

### Exa AI Search
**Location:** `skills/exa-mcp/SKILL.md`  
**URL:** `https://mcp.exa.ai/mcp`  
**Tools:** web_search_exa, company_research_exa, people_search_exa, deep_researcher_start, etc.

**Requires:** `EXA_API_KEY` 

**Use for:** AI-powered web search with citations, company research, people search, deep research reports

**Status:** ✅ Configured (`~/.config/openclaw/mcp.json`)

---

## Local LLM (Ollama)

**Setup:** Running on external NVMe (`/Volumes/External NVME/ollama-models`)

**Installed Model:**
- `llama3.1:8b` — 4.9 GB, good general purpose model

**How to use:**
```bash
# Start server (if not running)
ollama serve

# Run a query
ollama run llama3.1:8b "your prompt here"

# List models
ollama list

# Pull more models
ollama pull llama3.2:3b  # smaller, faster
ollama pull qwen2.5:7b   # good for coding
```

**Use when:**
- You want 100% private/local inference (no API calls)
- You have sensitive data you don't want to send to cloud APIs
- You want to experiment with different models
- Internet is down but you need AI assistance

**Note:** First run loads the model into RAM (~5-8GB), subsequent runs are fast.

---

## AI Model Hierarchy & Workflow

**How I choose which AI to use:**

| Priority | Model | Use For | Cost | When |
|----------|-------|---------|------|------|
| **1st** | **Ollama (local)** | Sensitive data, bulk testing, private work | $0 | Privacy matters, offline, sensitive business data |
| **2nd** | **Kimi (Moonshot)** | Default reasoning, research, writing | Free tier | 90% of daily work |
| **3rd** | **OpenAI API** | Images (DALL-E), complex tasks, premium features | ~$0.01-0.10/call | Visuals, DALL-E 3, GPT-4 when needed |

### **OpenAI API Key**
**Key:** `sk-proj-...` (stored securely, rotate at platform.openai.com)  
**Use for:** DALL-E 3 image generation, GPT-4 when Kimi insufficient  
**Cost tracking:** Check usage at platform.openai.com/usage  
**Rate limits:** Pay-as-you-go, monitor spend

### **Decision Tree:**
```
Need images/visuals? → OpenAI DALL-E
Sensitive/private data? → Ollama (local)
General work? → Kimi (default)
Kimi not cutting it? → OpenAI GPT-4
```

**I decide automatically** based on the task. You can also request a specific model:
- *"Use Ollama for this"* → Private/local
- *"Generate an image"* → OpenAI DALL-E
- *"Default"* → Kimi
