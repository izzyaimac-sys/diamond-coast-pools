# 🚀 Mission Control

Martin's AI Workforce Command Center — A professional Streamlit dashboard for managing AI agents, business projects, and task queues.

## Features

### 🤖 Active Agents
Real-time monitoring of AI sub-agents with status indicators, current tasks, and progress tracking.

### 📁 Projects
Track Martin's 5 business model explorations:
- Micro-SaaS Toolkit
- Content/IP Empire
- Digital Products
- Newsletter Network
- Affiliate Sites

### 📋 Task Queue
Complete task management with priorities, assignments, due dates, and status tracking.

### 📡 Activity Log
Chronological feed of all system activities with timestamps and categorization.

## Quick Start

```bash
# Navigate to the mission control directory
cd /Users/izzymacair/.openclaw/workspace/mission_control

# Run the start script
./start.sh
```

The dashboard will open automatically at `http://localhost:8501`

## Manual Start

```bash
# Install dependencies
pip install -r requirements.txt

# Launch the app
streamlit run app.py
```

## File Structure

```
mission_control/
├── app.py              # Main Streamlit application
├── start.sh            # Launch script with auto-setup
├── requirements.txt    # Python dependencies
├── data/
│   └── state.json      # Data persistence file
└── README.md           # This file
```

## Data Format

The dashboard reads from `data/state.json` which contains:
- `agents`: Array of active AI agents
- `projects`: Array of business projects
- `tasks`: Array of tasks with assignments
- `activity_log`: Timestamped system events

## Design

NASA-inspired dark theme with:
- Deep space background gradients
- Cyan accent colors (#00D9FF)
- Glass-morphism card effects
- Real-time status indicators
- Responsive grid layout

## Customization

Edit `data/state.json` to update:
- Agent status and tasks
- Project information
- Task queue
- Activity history

The dashboard will reflect changes immediately on refresh.

---

Built with ❤️ by OpenClaw for Martin
