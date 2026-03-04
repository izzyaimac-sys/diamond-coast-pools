# Mission Control API Specification v1.0

**Purpose:** API-first architecture enabling rapid iteration from Streamlit MVP → React v2  
**Principle:** Frontend is disposable, backend is permanent  
**Target:** Ship Streamlit in 1 week, migrate to React in 2-3 weeks without touching backend

---

## Architecture Principles

1. **Backend owns all state** — No business logic in frontend
2. **RESTful JSON API** — Standard HTTP methods, predictable URLs
3. **Versioned from day 1** — `/api/v1/` prefix for future evolution
4. **Authentication via JWT** — Stateless, works with any frontend
5. **SSE for real-time** — Server-Sent Events push updates, frontend just listens
6. **Database-agnostic SQLAlchemy** — Switch SQLite → Postgres later without code changes

---

## API ENDPOINTS

### Health & System

```http
GET /api/v1/health
```
**Response:**
```json
{
  "status": "healthy",
  "version": "1.0.0",
  "database": "connected",
  "timestamp": "2026-02-27T20:51:00Z"
}
```
**Use:** Docker health checks, uptime monitoring

---

### Authentication

```http
POST /api/v1/auth/setup
```
**Body:** `{ "password": "secure-password" }`  
**Response:** `{ "token": "jwt-token", "message": "Initial setup complete" }`  
**Use:** First-run wizard, creates admin user

```http
POST /api/v1/auth/login
```
**Body:** `{ "password": "secure-password" }`  
**Response:** `{ "token": "jwt-token" }`  
**Use:** Regular login

**Header for all protected routes:** `Authorization: Bearer <jwt-token>`

---

### License Management

```http
POST /api/v1/license/activate
```
**Body:** `{ "license_key": "MC-PRO-XXXX-XXXX-XXXX" }`  
**Response:**
```json
{
  "valid": true,
  "tier": "pro",
  "activated_at": "2026-02-27T20:51:00Z",
  "features": ["unlimited_agents", "cost_tracking", "alerts"]
}
```
**Use:** Unlock Pro features, stored locally in DB

```http
GET /api/v1/license/status
```
**Response:** Same as activate, returns current license state

---

### Agents

```http
GET /api/v1/agents
```
**Query params:** `?status=working&limit=50&offset=0`  
**Response:**
```json
{
  "agents": [
    {
      "id": "agent-001",
      "name": "Research Bot",
      "status": "working",
      "role": "researcher",
      "task": "Analyzing competitors",
      "progress": 45,
      "started_at": "2026-02-27T19:00:00Z",
      "uptime_seconds": 5460,
      "estimated_completion": "2026-02-27T21:00:00Z",
      "project_id": "proj-001",
      "cost_today": 0.45,
      "tokens_today": 12500
    }
  ],
  "total": 15,
  "filtered": 3
}
```

```http
GET /api/v1/agents/{agent_id}
```
**Response:** Full agent details including:
- Task history (last 20)
- Tool calls (last 50)
- Error logs (last 10)
- Cost breakdown by model
- Token usage by hour

```http
GET /api/v1/agents/{agent_id}/timeline
```
**Query params:** `?hours=24`  
**Response:** Chronological event stream for visualization

---

### Tasks

```http
GET /api/v1/tasks
```
**Query params:** `?status=pending&project_id=proj-001&priority=high`  
**Response:**
```json
{
  "tasks": [
    {
      "id": "task-001",
      "title": "Research competitors",
      "description": "Analyze top 5 competitors",
      "status": "in_progress",
      "priority": "high",
      "project_id": "proj-001",
      "project_name": "SaaS Research",
      "assigned_to": "agent-001",
      "created_at": "2026-02-27T18:00:00Z",
      "due_at": "2026-02-28T18:00:00Z",
      "completed_at": null,
      "cost": 0.23,
      "tags": ["research", "competitive-analysis"]
    }
  ],
  "stats": {
    "pending": 5,
    "in_progress": 3,
    "completed": 12,
    "total": 20
  }
}
```

```http
POST /api/v1/tasks
```
**Body:** Task creation payload  
**Response:** Created task with ID

```http
PATCH /api/v1/tasks/{task_id}
```
**Body:** `{ "status": "completed", "completed_at": "2026-02-27T20:51:00Z" }`  
**Use:** Update task status, assignee, priority

```http
GET /api/v1/tasks/kanban
```
**Response:** Pre-grouped by status for kanban view
```json
{
  "pending": [...],
  "in_progress": [...],
  "completed": [...]
}
```

---

### Projects

```http
GET /api/v1/projects
```
**Query params:** `?status=in_progress`  
**Response:**
```json
{
  "projects": [
    {
      "id": "proj-001",
      "ref": "REF-001",
      "name": "SaaS Research",
      "description": "Competitive analysis project",
      "status": "in_progress",
      "priority": "high",
      "revenue_potential": "$$$",
      "task_count": 15,
      "completed_tasks": 8,
      "cost_to_date": 12.50,
      "created_at": "2026-02-20T00:00:00Z",
      "updated_at": "2026-02-27T20:00:00Z"
    }
  ]
}
```

```http
GET /api/v1/projects/{project_id}/metrics
```
**Response:** Aggregated stats (cost, tasks, agent hours)

---

### Cost Tracking

```http
GET /api/v1/costs/summary
```
**Response:**
```json
{
  "today": 4.56,
  "yesterday": 3.21,
  "this_week": 28.90,
  "this_month": 89.40,
  "projected_monthly": 125.00,
  "budget_set": 150.00,
  "budget_remaining": 60.60,
  "alert_threshold": 80
}
```

```http
GET /api/v1/costs/daily
```
**Query params:** `?days=30`  
**Response:** Array of daily costs for charts
```json
[
  { "date": "2026-02-27", "cost": 4.56, "tokens": 45000 },
  { "date": "2026-02-26", "cost": 3.21, "tokens": 32000 }
]
```

```http
GET /api/v1/costs/by-agent
```
**Response:** Cost breakdown per agent

```http
GET /api/v1/costs/by-model
```
**Response:** Cost breakdown per LLM model

```http
POST /api/v1/costs/budget
```
**Body:** `{ "monthly_budget": 150.00, "alert_threshold": 80 }`  
**Use:** Set budget alerts

---

### Activity & Events

```http
GET /api/v1/activity
```
**Query params:** `?type=agent&limit=50&since=2026-02-27T00:00:00Z`  
**Response:**
```json
{
  "events": [
    {
      "id": "evt-001",
      "type": "agent_started",
      "message": "Research Bot started task",
      "agent_id": "agent-001",
      "task_id": "task-001",
      "timestamp": "2026-02-27T20:51:00Z",
      "metadata": {}
    }
  ],
  "has_more": true
}
```

```http
GET /api/v1/activity/stream
```
**Protocol:** Server-Sent Events (SSE)  
**Use:** Real-time updates to frontend
```
event: agent_started
data: {"agent_id": "agent-001", "timestamp": "..."}
```

---

### Telemetry Ingestion (OpenClaw Plugin)

```http
POST /api/v1/telemetry/events
```
**Headers:** `X-API-Key: <telemetry-key>` (separate from user auth)  
**Body:**
```json
{
  "events": [
    {
      "type": "agent_started",
      "agent_id": "agent-001",
      "agent_name": "Research Bot",
      "task": "Analyzing competitors",
      "timestamp": "2026-02-27T20:51:00Z",
      "metadata": {}
    },
    {
      "type": "llm_call",
      "agent_id": "agent-001",
      "model": "gpt-4",
      "input_tokens": 1500,
      "output_tokens": 800,
      "cost": 0.06,
      "timestamp": "2026-02-27T20:51:30Z"
    },
    {
      "type": "tool_call",
      "agent_id": "agent-001",
      "tool": "web_search",
      "parameters": {"query": "competitor analysis"},
      "timestamp": "2026-02-27T20:51:45Z"
    },
    {
      "type": "agent_completed",
      "agent_id": "agent-001",
      "task": "Analyzing competitors",
      "success": true,
      "timestamp": "2026-02-27T21:00:00Z"
    },
    {
      "type": "error",
      "agent_id": "agent-001",
      "error_type": "rate_limit",
      "message": "OpenAI rate limit exceeded",
      "timestamp": "2026-02-27T21:05:00Z"
    }
  ]
}
```
**Response:** `{ "received": 5, "stored": 5 }`

---

### Settings & Configuration

```http
GET /api/v1/settings
```
**Response:** All user-configurable settings
```json
{
  "general": {
    "timezone": "America/Los_Angeles",
    "date_format": "MM/DD/YYYY",
    "currency": "USD"
  },
  "notifications": {
    "email_enabled": false,
    "webhook_url": null,
    "alert_on_failure": true,
    "alert_on_budget": true
  },
  "display": {
    "refresh_interval": 30,
    "compact_mode": false
  }
}
```

```http
PUT /api/v1/settings
```
**Body:** Partial settings update (merge, don't replace)

---

## DATABASE SCHEMA

### Core Tables

```sql
-- Users (single user for v1, multi-user foundation for v2)
CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    password_hash TEXT NOT NULL,  -- bcrypt
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- License
CREATE TABLE licenses (
    id INTEGER PRIMARY KEY,
    license_key TEXT UNIQUE NOT NULL,
    tier TEXT NOT NULL CHECK (tier IN ('free', 'pro')),
    activated_at TIMESTAMP,
    expires_at TIMESTAMP,  -- NULL for lifetime
    is_active BOOLEAN DEFAULT TRUE
);

-- Agents
CREATE TABLE agents (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT,
    status TEXT NOT NULL CHECK (status IN ('idle', 'working', 'completed', 'error', 'stalled')),
    current_task TEXT,
    progress INTEGER CHECK (progress BETWEEN 0 AND 100),
    started_at TIMESTAMP,
    completed_at TIMESTAMP,
    project_id TEXT REFERENCES projects(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tasks
CREATE TABLE tasks (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT NOT NULL CHECK (status IN ('pending', 'in_progress', 'completed', 'failed')),
    priority TEXT CHECK (priority IN ('critical', 'high', 'medium', 'low')),
    project_id TEXT REFERENCES projects(id),
    assigned_to TEXT REFERENCES agents(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    due_at TIMESTAMP,
    completed_at TIMESTAMP,
    cost REAL DEFAULT 0
);

-- Projects
CREATE TABLE projects (
    id TEXT PRIMARY KEY,
    ref TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    status TEXT NOT NULL CHECK (status IN ('research', 'planning', 'in_progress', 'backlog', 'completed')),
    priority TEXT,
    revenue_potential TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Events (telemetry from OpenClaw)
CREATE TABLE events (
    id TEXT PRIMARY KEY,
    type TEXT NOT NULL,
    agent_id TEXT REFERENCES agents(id),
    task_id TEXT REFERENCES tasks(id),
    message TEXT,
    metadata TEXT,  -- JSON
    timestamp TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cost tracking
CREATE TABLE costs (
    id INTEGER PRIMARY KEY,
    agent_id TEXT REFERENCES agents(id),
    task_id TEXT REFERENCES tasks(id),
    model TEXT,
    input_tokens INTEGER,
    output_tokens INTEGER,
    cost REAL NOT NULL,
    timestamp TIMESTAMP NOT NULL
);

-- Settings
CREATE TABLE settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,  -- JSON
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Daily aggregates (for fast dashboard queries)
CREATE TABLE daily_costs (
    date DATE PRIMARY KEY,
    total_cost REAL DEFAULT 0,
    total_tokens INTEGER DEFAULT 0,
    agent_count INTEGER DEFAULT 0,
    task_count INTEGER DEFAULT 0
);
```

---

## REAL-TIME ARCHITECTURE

### Server-Sent Events (SSE)

**Endpoint:** `GET /api/v1/events/stream`

**Event Types:**
```
event: agent_status_changed
data: {"agent_id": "...", "status": "working", "timestamp": "..."}

event: task_created
data: {"task_id": "...", "title": "...", "timestamp": "..."}

event: task_completed
data: {"task_id": "...", "agent_id": "...", "timestamp": "..."}

event: cost_updated
data: {"today_cost": 4.56, "timestamp": "..."}

event: alert
data: {"type": "budget_threshold", "message": "80% of budget used", "timestamp": "..."}
```

**Frontend Usage:**
```javascript
const eventSource = new EventSource('/api/v1/events/stream');
eventSource.addEventListener('agent_status_changed', (e) => {
  const data = JSON.parse(e.data);
  updateAgentCard(data.agent_id, data.status);
});
```

---

## FRONTEND MIGRATION PATH

### Streamlit MVP (Week 1)

```python
# Streamlit app.py pattern
import requests

def get_agents():
    response = requests.get(
        "http://localhost:8080/api/v1/agents",
        headers={"Authorization": f"Bearer {st.session_state.token}"}
    )
    return response.json()["agents"]

# Display using Streamlit components
agents = get_agents()
for agent in agents:
    st.metric(agent["name"], agent["status"])
```

**Key:** Streamlit is just a thin HTTP client. No business logic.

### React v2 (Weeks 4-6)

```typescript
// React hook pattern (reuses same API)
const useAgents = () => {
  return useQuery({
    queryKey: ['agents'],
    queryFn: () => api.get('/agents').then(r => r.data.agents),
    refetchInterval: 30000  // Same 30s refresh
  });
};

// Component (replaces st.metric with proper React)
const AgentCard = ({ agent }) => (
  <div className="agent-card">
    <h3>{agent.name}</h3>
    <StatusBadge status={agent.status} />
  </div>
);
```

**Migration is frontend-only. Backend stays untouched.**

---

## ERROR HANDLING

### HTTP Status Codes

| Code | Use Case |
|------|----------|
| 200 | Success |
| 201 | Created |
| 400 | Bad request (validation error) |
| 401 | Unauthorized (invalid/missing token) |
| 403 | Forbidden (valid token, insufficient tier) |
| 404 | Not found |
| 429 | Rate limited |
| 500 | Server error |

### Error Response Format

```json
{
  "error": {
    "code": "INVALID_LICENSE",
    "message": "License key is invalid or expired",
    "details": {
      "key": "MC-PRO-XXXX",
      "reason": "already_activated"
    }
  }
}
```

---

## RATE LIMITING

**Telemetry endpoint:** 1000 requests/minute per IP  
**API endpoints:** 100 requests/minute per user  
**Auth endpoints:** 10 requests/minute per IP (prevent brute force)

---

## CACHING STRATEGY

**Database query caching:**
- Daily cost aggregates: Cache 5 minutes
- Agent list: Cache 10 seconds
- Activity feed: No cache (real-time)

**HTTP caching headers:**
```
Cache-Control: private, max-age=10
```

---

## DEPLOYMENT NOTES

### Docker Structure

```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy application
COPY backend/ ./backend/
COPY frontend/ ./frontend/  # Streamlit for v1

# Database volume
VOLUME ["/data"]

# Environment
ENV DATABASE_URL="sqlite:////data/mission_control.db"
ENV PORT=8080

EXPOSE 8080

CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8080"]
```

### Environment Variables

```bash
# Required
DATABASE_URL=sqlite:////data/mission_control.db
JWT_SECRET_KEY=<random-32-char-string>

# Optional
PORT=8080
LOG_LEVEL=info
TELEMETRY_API_KEY=<separate-key-for-openclaw-plugin>

# For Pro features (future)
RESEND_API_KEY=<for-email-alerts>
```

---

## TESTING STRATEGY

### Backend Tests
- Unit tests: Cost calculation, license validation
- Integration tests: Full telemetry flow
- API contract tests: Verify JSON schemas

### Frontend Tests (React v2)
- Component tests: Agent cards, task boards
- Integration tests: API mocking with MSW
- E2E tests: Critical user flows

---

## DOCUMENTATION

### API Docs (Auto-generated)
- Swagger UI at `/docs`
- ReDoc at `/redoc`
- OpenAPI schema at `/openapi.json`

### Developer Docs
- Postman collection
- Example curl commands
- Webhook payload schemas

---

## VERSIONING STRATEGY

**URL versioning:** `/api/v1/`  
**Breaking changes → v2:**  
- New base path: `/api/v2/`
- Old v1 supported for 6 months
- Deprecation warnings in headers

**Non-breaking additions:**  
- New fields in responses (ignored by old clients)
- New endpoints (new URLs)
- New query parameters (optional)

---

## SUMMARY

This API specification enables:

1. **Week 1:** Build FastAPI + Streamlit (API is the foundation)
2. **Week 2:** Ship MVP with Gumroad
3. **Week 4-6:** Build React frontend, swap Streamlit → React
4. **Backend never changes** during migration

**The bet:** API-first architecture means v2 is a frontend upgrade, not a rebuild. 2-3 weeks to React, not 2-3 months.

**Ready to build?** This spec is the blueprint.
