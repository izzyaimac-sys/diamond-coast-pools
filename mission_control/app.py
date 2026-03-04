"""
Mission Control Dashboard v3.0
Real-time AI Operations Cockpit
"""

import streamlit as st
import json
from datetime import datetime, timezone, timedelta
from pathlib import Path
from collections import defaultdict

# ============================================================================
# CONFIGURATION
# ============================================================================
DATA_PATH = Path(__file__).parent / "data" / "state.json"
REFRESH_INTERVAL = 30  # seconds

# ============================================================================
# STATE MANAGEMENT
# ============================================================================
@st.cache_data(ttl=5)
def load_data():
    """Load mission control data with caching for performance."""
    if DATA_PATH.exists():
        with open(DATA_PATH, 'r') as f:
            return json.load(f)
    return {"agents": [], "projects": [], "tasks": [], "activity_log": []}

def compute_kpis(data):
    """Compute real-time KPIs from data."""
    active_agents = sum(1 for a in data["agents"] if a["status"] == "working")
    idle_agents = sum(1 for a in data["agents"] if a["status"] == "idle")
    
    # Today's tasks
    today = datetime.now(timezone.utc).date()
    tasks_today = sum(1 for t in data["tasks"] 
                     if t.get("created_at") and 
                     datetime.fromisoformat(t["created_at"].replace('Z', '+00:00')).date() == today)
    
    # Yesterday's tasks for delta
    yesterday = today - timedelta(days=1)
    tasks_yesterday = sum(1 for t in data["tasks"] 
                         if t.get("created_at") and 
                         datetime.fromisoformat(t["created_at"].replace('Z', '+00:00')).date() == yesterday)
    
    tasks_pending = sum(1 for t in data["tasks"] if t["status"] == "pending")
    tasks_in_progress = sum(1 for t in data["tasks"] if t["status"] == "in_progress")
    tasks_completed = sum(1 for t in data["tasks"] if t["status"] == "completed")
    
    # Completed this week vs last week
    week_start = today - timedelta(days=today.weekday())
    last_week_start = week_start - timedelta(days=7)
    tasks_this_week = sum(1 for t in data["tasks"] 
                         if t.get("completed_at") and 
                         datetime.fromisoformat(t["completed_at"].replace('Z', '+00:00')).date() >= week_start)
    tasks_last_week = sum(1 for t in data["tasks"]
                         if t.get("completed_at") and 
                         last_week_start <= datetime.fromisoformat(t["completed_at"].replace('Z', '+00:00')).date() < week_start)
    
    # Revenue potential from active projects
    active_projects = [p for p in data["projects"] if p["status"] in ["in_progress", "research"]]
    revenue_score = sum(3 if p["revenue_potential"] == "$$$" else 2 if p["revenue_potential"] == "$$" else 1 
                       for p in active_projects)
    
    # System health calculation
    if active_agents > 0 and tasks_pending < 10:
        health = "Operational"
        health_color = "good"
    elif active_agents > 0:
        health = "High Load"
        health_color = "warning"
    else:
        health = "Standby"
        health_color = "neutral"
    
    return {
        "active_agents": active_agents,
        "idle_agents": idle_agents,
        "total_agents": len(data["agents"]),
        "tasks_today": tasks_today,
        "tasks_yesterday": tasks_yesterday,
        "tasks_pending": tasks_pending,
        "tasks_in_progress": tasks_in_progress,
        "tasks_completed": tasks_completed,
        "tasks_this_week": tasks_this_week,
        "tasks_last_week": tasks_last_week,
        "total_tasks": len(data["tasks"]),
        "active_projects": len(active_projects),
        "revenue_score": revenue_score,
        "system_health": health,
        "health_color": health_color
    }

def get_next_scheduled_job(data):
    """Find the next upcoming task or scheduled job."""
    upcoming = [t for t in data["tasks"] if t["status"] in ["pending", "in_progress"] and t.get("due_at")]
    if upcoming:
        upcoming.sort(key=lambda x: x.get("due_at", ""))
        next_job = upcoming[0]
        due = datetime.fromisoformat(next_job["due_at"].replace('Z', '+00:00'))
        now = datetime.now(timezone.utc)
        time_until = due - now
        
        if time_until.total_seconds() < 0:
            return f"OVERDUE: {next_job['title'][:30]}...", "danger"
        elif time_until.total_seconds() < 3600:
            return f"Due in {int(time_until.total_seconds() / 60)}m: {next_job['title'][:25]}...", "warning"
        else:
            return f"Next: {next_job['title'][:30]}...", "neutral"
    return "No scheduled jobs", "neutral"

def compute_agent_uptime(agent):
    """Calculate agent uptime percentage."""
    if agent.get("started_at"):
        started = datetime.fromisoformat(agent["started_at"].replace('Z', '+00:00'))
        now = datetime.now(timezone.utc)
        total_time = (now - started).total_seconds()
        
        # If completed, use completed_at
        if agent.get("completed_at"):
            completed = datetime.fromisoformat(agent["completed_at"].replace('Z', '+00:00'))
            total_time = (completed - started).total_seconds()
            return 100  # Completed = 100% uptime for that task
        
        # For active agents, calculate uptime based on last 24h or since started
        window = min(total_time, 86400)  # 24 hours max
        return min(100, int((total_time / window) * 100)) if window > 0 else 100
    return 0

def estimate_eta(agent):
    """Estimate completion time based on progress."""
    if agent.get("started_at") and agent.get("progress", 0) > 0:
        started = datetime.fromisoformat(agent["started_at"].replace('Z', '+00:00'))
        now = datetime.now(timezone.utc)
        elapsed = (now - started).total_seconds()
        progress = agent["progress"]
        
        if progress > 0:
            total_estimated = elapsed / (progress / 100)
            remaining = total_estimated - elapsed
            
            if remaining < 60:
                return "< 1 min"
            elif remaining < 3600:
                return f"~{int(remaining / 60)}m"
            else:
                return f"~{int(remaining / 3600)}h {int((remaining % 3600) / 60)}m"
    return "Calculating..."

# ============================================================================
# PAGE SETUP
# ============================================================================
st.set_page_config(
    page_title="Mission Control",
    page_icon="🚀",
    layout="wide",
    initial_sidebar_state="expanded"
)

# ============================================================================
# ENHANCED CSS
# ============================================================================
st.markdown("""
<style>
    /* Base theme */
    .stApp {
        background: linear-gradient(135deg, #0a0e14 0%, #111827 100%) !important;
        color: #F0F6FC;
    }
    
    /* Remove default padding */
    .block-container {
        padding-top: 1rem !important;
        padding-bottom: 2rem !important;
        max-width: 1400px !important;
    }
    
    /* Hide streamlit branding */
    #MainMenu, footer, header {visibility: hidden !important;}
    
    /* Sidebar styling */
    [data-testid="stSidebar"] {
        background: linear-gradient(180deg, #0d1117 0%, #161b22 100%) !important;
        border-right: 1px solid #30363D;
    }
    
    [data-testid="stSidebar"] [data-testid="stMarkdown"] {
        color: #F0F6FC;
    }
    
    /* Metric cards - enhanced */
    [data-testid="stMetric"] {
        background: linear-gradient(145deg, #161b22 0%, #0d1117 100%) !important;
        border: 1px solid #30363D;
        border-radius: 12px !important;
        padding: 16px !important;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        transition: all 0.2s ease;
    }
    
    [data-testid="stMetric"]:hover {
        border-color: #00D9FF50;
        box-shadow: 0 4px 16px rgba(0, 217, 255, 0.1);
    }
    
    [data-testid="stMetricLabel"] {
        color: #8B949E !important;
        font-size: 0.75rem !important;
        font-weight: 500 !important;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }
    
    [data-testid="stMetricValue"] {
        color: #F0F6FC !important;
        font-size: 2rem !important;
        font-weight: 700 !important;
    }
    
    [data-testid="stMetricDelta"] {
        font-size: 0.875rem !important;
        font-weight: 500 !important;
    }
    
    /* Agent cards - enhanced */
    .agent-card {
        background: linear-gradient(145deg, #161b22 0%, #0d1117 100%);
        border: 1px solid #30363D;
        border-radius: 16px;
        padding: 24px;
        margin-bottom: 20px;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
        transition: all 0.3s ease;
    }
    
    .agent-card:hover {
        border-color: #00D9FF40;
        box-shadow: 0 4px 20px rgba(0, 217, 255, 0.15);
        transform: translateY(-2px);
    }
    
    .agent-card.active {
        border-left: 4px solid #00D9FF;
    }
    
    .agent-card.idle {
        border-left: 4px solid #6B7280;
    }
    
    .agent-card.completed {
        border-left: 4px solid #10B981;
    }
    
    /* Progress bar - thicker with glow */
    .progress-container {
        background: #21262D;
        height: 10px;
        border-radius: 5px;
        overflow: hidden;
        margin: 12px 0;
        box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.4);
    }
    
    .progress-bar {
        height: 100%;
        border-radius: 5px;
        transition: width 0.5s ease;
        box-shadow: 0 0 10px currentColor;
    }
    
    .progress-bar.working {
        background: linear-gradient(90deg, #00D9FF, #00B4D8);
        color: #00D9FF;
    }
    
    .progress-bar.completed {
        background: linear-gradient(90deg, #10B981, #059669);
        color: #10B981;
    }
    
    /* Status badges */
    .status-badge {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 6px 12px;
        border-radius: 20px;
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }
    
    .status-badge::before {
        content: '';
        width: 8px;
        height: 8px;
        border-radius: 50%;
        animation: pulse 2s infinite;
    }
    
    .status-badge.working {
        background: #00D9FF20;
        color: #00D9FF;
        border: 1px solid #00D9FF40;
    }
    
    .status-badge.working::before {
        background: #00D9FF;
    }
    
    .status-badge.idle {
        background: #6B728020;
        color: #6B7280;
        border: 1px solid #6B728040;
    }
    
    .status-badge.idle::before {
        background: #6B7280;
        animation: none;
    }
    
    .status-badge.completed {
        background: #10B98120;
        color: #10B981;
        border: 1px solid #10B98140;
    }
    
    .status-badge.completed::before {
        background: #10B981;
        animation: none;
    }
    
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.4; }
    }
    
    /* System status indicator */
    .system-status {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 16px;
        border-radius: 8px;
        font-size: 0.875rem;
        font-weight: 500;
    }
    
    .system-status.good {
        background: #10B98120;
        color: #10B981;
        border: 1px solid #10B98140;
    }
    
    .system-status.warning {
        background: #F59E0B20;
        color: #F59E0B;
        border: 1px solid #F59E0B40;
    }
    
    .system-status.neutral {
        background: #6B728020;
        color: #6B7280;
        border: 1px solid #6B728040;
    }
    
    /* Section headers */
    .section-header {
        color: #F0F6FC;
        font-size: 1.25rem;
        font-weight: 700;
        margin: 32px 0 16px 0;
        padding-bottom: 8px;
        border-bottom: 1px solid #30363D;
    }
    
    /* Info pills */
    .info-pill {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        background: #21262D;
        padding: 4px 10px;
        border-radius: 6px;
        font-size: 0.75rem;
        color: #8B949E;
    }
    
    /* Activity log items */
    .activity-item {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        padding: 12px 0;
        border-bottom: 1px solid #21262D;
    }
    
    .activity-icon {
        width: 32px;
        height: 32px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1rem;
        background: #21262D;
    }
    
    /* Timestamp */
    .timestamp {
        color: #6B7280;
        font-size: 0.75rem;
        font-family: 'SF Mono', monospace;
    }
    
    /* Tabs styling */
    .stTabs [data-testid="stTab"] {
        color: #8B949E !important;
        font-weight: 500 !important;
    }
    
    .stTabs [aria-selected="true"] {
        color: #00D9FF !important;
        border-bottom-color: #00D9FF !important;
    }
    
    /* Buttons */
    .stButton > button {
        background: linear-gradient(145deg, #21262D, #1a1f26) !important;
        color: #F0F6FC !important;
        border: 1px solid #30363D !important;
        border-radius: 8px !important;
        font-weight: 500 !important;
        transition: all 0.2s ease !important;
    }
    
    .stButton > button:hover {
        background: #30363D !important;
        border-color: #00D9FF60 !important;
        box-shadow: 0 0 12px rgba(0, 217, 255, 0.2) !important;
    }
</style>
""", unsafe_allow_html=True)

# ============================================================================
# LOAD DATA
# ============================================================================
data = load_data()
kpis = compute_kpis(data)
next_job_msg, next_job_status = get_next_scheduled_job(data)

# Get working agents
working_agents = [a for a in data["agents"] if a["status"] == "working"]

# ============================================================================
# SIDEBAR NAVIGATION
# ============================================================================
with st.sidebar:
    # Logo/Brand
    st.markdown("""
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #30363D;">
        <span style="font-size: 2rem;">🚀</span>
        <div>
            <div style="color: #F0F6FC; font-size: 1.25rem; font-weight: 700;">Mission Control</div>
            <div style="color: #6B7280; font-size: 0.75rem;">AI Operations Cockpit</div>
        </div>
    </div>
    """, unsafe_allow_html=True)
    
    # Navigation
    st.markdown("<div style='color: #6B7280; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px;'>Navigation</div>", unsafe_allow_html=True)
    
    nav_options = [
        ("📊", "Dashboard", "dashboard"),
        ("📁", "Projects", "projects"),
        ("📋", "Tasks", "tasks"),
        ("📅", "Schedule", "schedule"),
        ("📡", "Activity", "activity"),
    ]
    
    if "active_tab" not in st.session_state:
        st.session_state.active_tab = "dashboard"
    
    for icon, label, key in nav_options:
        is_active = st.session_state.active_tab == key
        btn_type = "primary" if is_active else "secondary"
        if st.button(f"{icon} {label}", key=f"nav_{key}", use_container_width=True, type=btn_type):
            st.session_state.active_tab = key
            st.session_state.selected_project = None
            st.rerun()
    
    # System Status in Sidebar
    st.markdown("<div style='margin-top: 32px;'></div>", unsafe_allow_html=True)
    st.markdown("<div style='color: #6B7280; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px;'>System Status</div>", unsafe_allow_html=True)
    
    health_class = kpis["health_color"]
    st.markdown(f"""
    <div class="system-status {health_class}">
        <span>●</span>
        <span>{kpis['system_health']}</span>
    </div>
    """, unsafe_allow_html=True)
    
    # Quick stats in sidebar
    st.markdown(f"""
    <div style="margin-top: 16px; padding: 16px; background: #161b22; border-radius: 12px; border: 1px solid #30363D;">
        <div style="color: #6B7280; font-size: 0.75rem; margin-bottom: 8px;">Fleet Status</div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="color: #8B949E; font-size: 0.875rem;">Active</span>
            <span style="color: #00D9FF; font-weight: 600;">{kpis['active_agents']}</span>
        </div>
        <div style="display: flex; justify-content: space-between;">
            <span style="color: #8B949E; font-size: 0.875rem;">Idle</span>
            <span style="color: #6B7280; font-weight: 600;">{kpis['idle_agents']}</span>
        </div>
    </div>
    """, unsafe_allow_html=True)
    
    # Footer
    st.markdown("""
    <div style="position: fixed; bottom: 20px; left: 20px; right: 20px;">
        <div style="color: #6B7280; font-size: 0.75rem; text-align: center;">
            <div style="margin-bottom: 4px; font-style: italic;">"An autonomous organization of AI agents"</div>
            <div>Mission Control v3.0</div>
        </div>
    </div>
    """, unsafe_allow_html=True)

# ============================================================================
# MAIN CONTENT
# ============================================================================

# --- INTELLIGENCE HEADER ---
header_col1, header_col2, header_col3 = st.columns([2, 1, 1])

with header_col1:
    st.markdown(f"""
    <div style="margin-bottom: 8px;">
        <span style="color: #F0F6FC; font-size: 1.75rem; font-weight: 700;">Operations Overview</span>
    </div>
    <div style="display: flex; gap: 12px; align-items: center;">
        <span class="info-pill">🕐 Last update: {datetime.now(timezone.utc).strftime('%H:%M:%S UTC')}</span>
        <span class="info-pill">👤 Martin (CEO)</span>
    </div>
    """, unsafe_allow_html=True)

with header_col2:
    job_color = {"danger": "#EF4444", "warning": "#F59E0B", "neutral": "#6B7280"}.get(next_job_status, "#6B7280")
    st.markdown(f"""
    <div style="background: #161b22; border: 1px solid #30363D; border-radius: 12px; padding: 16px; text-align: center;">
        <div style="color: #6B7280; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Next Milestone</div>
        <div style="color: {job_color}; font-size: 0.875rem; font-weight: 500;">{next_job_msg}</div>
    </div>
    """, unsafe_allow_html=True)

with header_col3:
    workload = "High" if kpis["active_agents"] >= 3 else "Normal" if kpis["active_agents"] >= 1 else "Idle"
    workload_color = "#EF4444" if workload == "High" else "#00D9FF" if workload == "Normal" else "#6B7280"
    st.markdown(f"""
    <div style="background: #161b22; border: 1px solid #30363D; border-radius: 12px; padding: 16px; text-align: center;">
        <div style="color: #6B7280; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Workload</div>
        <div style="color: {workload_color}; font-size: 1.25rem; font-weight: 700;">{workload}</div>
        <div style="color: #6B7280; font-size: 0.75rem;">{kpis['active_agents']} agents active</div>
    </div>
    """, unsafe_allow_html=True)

st.markdown("<div style='margin: 24px 0;'></div>", unsafe_allow_html=True)

# --- METRICS ROW WITH DELTAS ---
metrics_cols = st.columns(6)

with metrics_cols[0]:
    delta = kpis["active_agents"] - kpis.get("idle_agents", 0)
    delta_str = f"+{delta}" if delta > 0 else str(delta)
    st.metric(
        label="🤖 Active Agents",
        value=kpis["active_agents"],
        delta=delta_str,
        delta_color="normal"
    )

with metrics_cols[1]:
    today_delta = kpis["tasks_today"] - kpis["tasks_yesterday"]
    st.metric(
        label="📋 Tasks Today",
        value=kpis["tasks_today"],
        delta=today_delta if today_delta != 0 else None,
        delta_color="normal"
    )

with metrics_cols[2]:
    pending_delta = kpis["tasks_pending"] - kpis["tasks_in_progress"]
    st.metric(
        label="⏳ Pending",
        value=kpis["tasks_pending"],
        delta=f"-{abs(pending_delta)}" if pending_delta < 0 else f"+{pending_delta}",
        delta_color="inverse"
    )

with metrics_cols[3]:
    st.metric(
        label="🔥 In Progress",
        value=kpis["tasks_in_progress"],
        delta=None
    )

with metrics_cols[4]:
    week_delta = kpis["tasks_this_week"] - kpis["tasks_last_week"]
    st.metric(
        label="✅ Completed",
        value=kpis["tasks_completed"],
        delta=f"{week_delta} this week",
        delta_color="normal" if week_delta >= 0 else "inverse"
    )

with metrics_cols[5]:
    st.metric(
        label="💰 Rev Score",
        value=kpis["revenue_score"],
        delta=f"{kpis['active_projects']} projects",
        delta_color="normal"
    )

st.markdown("<div style='margin: 8px 0;'></div>", unsafe_allow_html=True)

# --- CONTENT TABS ---
tabs = st.tabs(["🎯 Overview", "📁 Projects", "📋 Tasks", "📅 Schedule", "📡 Activity Log"])

# --- TAB 1: OVERVIEW (AGENT FLEET) ---
with tabs[0]:
    st.markdown("<div class='section-header'>Agent Fleet Status</div>", unsafe_allow_html=True)
    
    if not data["agents"]:
        st.info("🚀 No agents deployed. The fleet is standing by.")
    else:
        # Display agents in 2 columns
        agent_cols = st.columns(2)
        
        for idx, agent in enumerate(data["agents"]):
            with agent_cols[idx % 2]:
                status = agent["status"]
                status_class = status.lower()
                card_class = f"agent-card {status_class}"
                
                # Calculate metrics
                uptime = compute_agent_uptime(agent)
                eta = estimate_eta(agent) if status == "working" else "—"
                progress = agent.get("progress", 0)
                
                # Role based on agent name
                role = "Builder" if "Builder" in agent["name"] else "Researcher" if "Researcher" in agent["name"] else "Planner" if "Planner" in agent["name"] else "Agent"
                
                # Status color for progress bar
                progress_class = "working" if status == "working" else "completed" if status == "completed" else "working"
                
                st.markdown(f"""
                <div class="{card_class}">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;">
                        <div>
                            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                                <span style="background: #00D9FF15; color: #00D9FF; font-family: monospace; font-size: 0.625rem; font-weight: 700; padding: 2px 6px; border-radius: 4px;">AGENT-{agent['id'].split('-')[1]}</span>
                                <span class="status-badge {status_class}">{status}</span>
                            </div>
                            <div style="color: #F0F6FC; font-size: 1.1rem; font-weight: 600;">{agent['name']}</div>
                            <div style="color: #8B949E; font-size: 0.875rem;">{role}</div>
                        </div>
                    </div>
                    
                    <div style="color: #F0F6FC; font-size: 0.9375rem; margin-bottom: 16px; line-height: 1.5;">
                        {agent.get('task') or 'No active task assigned'}
                    </div>
                    
                    <div style="display: flex; gap: 16px; margin-bottom: 16px;">
                        <div style="flex: 1;">
                            <div style="color: #6B7280; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Uptime</div>
                            <div style="color: #F0F6FC; font-size: 1.125rem; font-weight: 600;">{uptime}%</div>
                        </div>
                        <div style="flex: 1;">
                            <div style="color: #6B7280; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">ETA</div>
                            <div style="color: #00D9FF; font-size: 1.125rem; font-weight: 600;">{eta}</div>
                        </div>
                    </div>
                    
                    {f'''
                    <div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                            <span style="color: #8B949E; font-size: 0.75rem;">Progress</span>
                            <span style="color: #00D9FF; font-size: 0.75rem; font-weight: 600;">{progress}%</span>
                        </div>
                        <div class="progress-container">
                            <div class="progress-bar {progress_class}" style="width: {progress}%;"></div>
                        </div>
                    </div>
                    ''' if status == "working" else ''}
                </div>
                """, unsafe_allow_html=True)
    
    # Recent Activity Preview
    st.markdown("<div class='section-header'>Recent Activity</div>", unsafe_allow_html=True)
    
    recent_activity = data["activity_log"][:5]
    if recent_activity:
        for activity in recent_activity:
            icon = {"agent_started": "🟢", "agent_completed": "✅", "task_created": "📝", 
                    "task_completed": "✔️", "project_created": "📁", "project_updated": "📂",
                    "task_updated": "🔄", "system": "⚡"}.get(activity["type"], "📌")
            
            time_str = datetime.fromisoformat(activity["timestamp"].replace('Z', '+00:00')).strftime("%H:%M")
            
            st.markdown(f"""
            <div class="activity-item">
                <div class="activity-icon">{icon}</div>
                <div style="flex: 1;">
                    <div style="color: #F0F6FC; font-size: 0.9375rem;">{activity['message']}</div>
                    <div class="timestamp">{activity['type'].replace('_', ' ').title()} · {time_str}</div>
                </div>
            </div>
            """, unsafe_allow_html=True)
    else:
        st.info("No recent activity to display.")

# --- TAB 2: PROJECTS ---
with tabs[1]:
    st.markdown(f"<div class='section-header'>Business Portfolio ({len(data['projects'])} Active)</div>", unsafe_allow_html=True)
    
    # Filter buttons
    filter_cols = st.columns(5)
    
    filter_options = ["All", "In Progress", "Research", "Planning", "Backlog"]
    if "project_filter" not in st.session_state:
        st.session_state.project_filter = "All"
    
    for idx, (col, label) in enumerate(zip(filter_cols, filter_options)):
        with col:
            is_active = st.session_state.project_filter == label
            btn_type = "primary" if is_active else "secondary"
            if st.button(label, key=f"filter_{label}", use_container_width=True, type=btn_type):
                st.session_state.project_filter = label
                st.rerun()
    
    # Filter projects
    filtered_projects = data["projects"]
    if st.session_state.project_filter == "In Progress":
        filtered_projects = [p for p in data["projects"] if p["status"] == "in_progress"]
    elif st.session_state.project_filter == "Research":
        filtered_projects = [p for p in data["projects"] if p["status"] == "research"]
    elif st.session_state.project_filter == "Planning":
        filtered_projects = [p for p in data["projects"] if p["status"] == "planning"]
    elif st.session_state.project_filter == "Backlog":
        filtered_projects = [p for p in data["projects"] if p["status"] == "backlog"]
    
    # Project cards
    if not filtered_projects:
        st.info("No projects in this category.")
    else:
        project_cols = st.columns(2)
        for idx, project in enumerate(filtered_projects):
            with project_cols[idx % 2]:
                status = project["status"]
                status_colors = {
                    "in_progress": ("#00D9FF", "#00D9FF20", "#00D9FF40"),
                    "research": ("#F59E0B", "#F59E0B20", "#F59E0B40"),
                    "planning": ("#8B5CF6", "#8B5CF620", "#8B5CF640"),
                    "backlog": ("#6B7280", "#6B728020", "#6B728040"),
                    "completed": ("#10B981", "#10B98120", "#10B98140")
                }
                color, bg, border = status_colors.get(status, ("#6B7280", "#6B728020", "#6B728040"))
                
                # Count tasks for this project
                project_tasks = [t for t in data["tasks"] if t.get("project") == project["name"]]
                task_count = len(project_tasks)
                completed_tasks = len([t for t in project_tasks if t["status"] == "completed"])
                
                st.markdown(f"""
                <div class="agent-card" style="border-left: 4px solid {color};">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                        <div>
                            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                                <span style="background: {bg}; color: {color}; font-family: monospace; font-size: 0.625rem; font-weight: 700; padding: 2px 6px; border-radius: 4px;">{project['ref']}</span>
                                <span style="background: {bg}; color: {color}; padding: 4px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; border: 1px solid {border};">{status.replace('_', ' ')}</span>
                            </div>
                            <div style="color: #F0F6FC; font-size: 1.1rem; font-weight: 600;">{project['name']}</div>
                        </div>
                        <div style="background: #21262D; padding: 4px 10px; border-radius: 6px; font-size: 0.875rem; color: #F0F6FC; font-weight: 600;">
                            {project['revenue_potential']}
                        </div>
                    </div>
                    
                    <div style="color: #8B949E; font-size: 0.9375rem; margin-bottom: 16px; line-height: 1.5;">
                        {project['description']}
                    </div>
                    
                    <div style="display: flex; gap: 16px; align-items: center;">
                        <div style="display: flex; align-items: center; gap: 6px;">
                            <span style="color: #6B7280; font-size: 0.75rem;">Tasks:</span>
                            <span style="color: #F0F6FC; font-size: 0.875rem; font-weight: 600;">{completed_tasks}/{task_count}</span>
                        </div>
                        <div style="flex: 1; background: #21262D; height: 6px; border-radius: 3px; overflow: hidden;">
                            <div style="width: {(completed_tasks / task_count * 100) if task_count > 0 else 0}%; height: 100%; background: {color}; border-radius: 3px;"></div>
                        </div>
                        <span style="background: {bg}; color: {color}; padding: 2px 8px; border-radius: 4px; font-size: 0.625rem; text-transform: uppercase; letter-spacing: 0.5px;">{project['priority']}</span>
                    </div>
                </div>
                """, unsafe_allow_html=True)

# --- TAB 3: TASKS ---
with tabs[2]:
    st.markdown("<div class='section-header'>Task Queue</div>", unsafe_allow_html=True)
    
    # Task stats
    task_stats_cols = st.columns(4)
    with task_stats_cols[0]:
        st.metric(label="Pending", value=kpis["tasks_pending"])
    with task_stats_cols[1]:
        st.metric(label="In Progress", value=kpis["tasks_in_progress"])
    with task_stats_cols[2]:
        st.metric(label="Completed", value=kpis["tasks_completed"])
    with task_stats_cols[3]:
        completion_rate = (kpis["tasks_completed"] / kpis["total_tasks"] * 100) if kpis["total_tasks"] > 0 else 0
        st.metric(label="Completion Rate", value=f"{completion_rate:.0f}%")
    
    st.markdown("<div style='margin: 16px 0;'></div>", unsafe_allow_html=True)
    
    # Project filter for tasks
    all_projects = ["All Projects"] + list(set(t.get("project", "Unassigned") for t in data["tasks"] if t.get("project")))
    selected_project = st.selectbox("Filter by Project", all_projects, key="task_project_filter")
    
    # Filter tasks
    filtered_tasks = data["tasks"]
    if selected_project != "All Projects":
        filtered_tasks = [t for t in data["tasks"] if t.get("project") == selected_project]
    
    # Sort by status (pending/in_progress first) then by due date
    status_order = {"in_progress": 0, "pending": 1, "completed": 2}
    filtered_tasks.sort(key=lambda x: (status_order.get(x["status"], 3), x.get("due_at", "")))
    
    # Task list
    if not filtered_tasks:
        st.info("No tasks found for the selected filter.")
    else:
        for task in filtered_tasks:
            status = task["status"]
            priority = task.get("priority", "medium")
            
            status_icons = {
                "pending": "⏳",
                "in_progress": "🔥",
                "completed": "✅"
            }
            
            priority_colors = {
                "high": "#EF4444",
                "medium": "#F59E0B",
                "low": "#6B7280"
            }
            
            status_colors = {
                "pending": "#F59E0B",
                "in_progress": "#00D9FF",
                "completed": "#10B981"
            }
            
            # Format due date
            due_str = ""
            if task.get("due_at"):
                due = datetime.fromisoformat(task["due_at"].replace('Z', '+00:00'))
                now = datetime.now(timezone.utc)
                if due < now and status != "completed":
                    overdue = now - due
                    if overdue.days > 0:
                        due_str = f"⚠️ Overdue {overdue.days}d"
                    else:
                        due_str = f"⚠️ Due in {int(overdue.total_seconds() / 60)}m"
                else:
                    days_until = (due.date() - now.date()).days
                    if days_until == 0:
                        due_str = "Today"
                    elif days_until == 1:
                        due_str = "Tomorrow"
                    else:
                        due_str = f"{days_until} days"
            
            assigned = task.get("assigned_to", "Unassigned")
            if not assigned:
                assigned = "Unassigned"
            
            st.markdown(f"""
            <div class="activity-item" style="background: #161b22; padding: 16px; border-radius: 12px; margin-bottom: 12px; border: 1px solid #30363D;">
                <div style="width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.25rem; background: {status_colors.get(status, '#6B7280')}20; color: {status_colors.get(status, '#6B7280')};">
                    {status_icons.get(status, "📋")}
                </div>
                <div style="flex: 1;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                        <div style="color: #F0F6FC; font-size: 1rem; font-weight: 500;">{task['title']}</div>
                        <span style="background: {priority_colors.get(priority, '#6B7280')}20; color: {priority_colors.get(priority, '#6B7280')}; padding: 2px 8px; border-radius: 4px; font-size: 0.625rem; text-transform: uppercase; letter-spacing: 0.5px;">{priority}</span>
                    </div>
                    <div style="display: flex; gap: 16px; margin-top: 8px; align-items: center;">
                        <span class="info-pill">📁 {task.get('project', 'Unassigned')}</span>
                        <span class="info-pill">👤 {assigned}</span>
                        {f'<span class="info-pill" style="color: {"#EF4444" if "Overdue" in due_str else "#F59E0B" if due == "Today" else "#8B949E"}">📅 {due_str}</span>' if due_str else ''}
                    </div>
                </div>
            </div>
            """, unsafe_allow_html=True)

# --- TAB 4: SCHEDULE ---
with tabs[3]:
    st.markdown("<div class='section-header'>Mission Timeline</div>", unsafe_allow_html=True)
    
    now = datetime.now(timezone.utc)
    today = now.date()
    week_start = today - timedelta(days=today.weekday())
    week_end = week_start + timedelta(days=6)
    next_week_start = week_end + timedelta(days=1)
    next_week_end = next_week_start + timedelta(days=6)
    
    # Overdue tasks
    overdue_tasks = [t for t in data["tasks"] 
                     if t.get("due_at") and 
                     datetime.fromisoformat(t["due_at"].replace('Z', '+00:00')).date() < today and
                     t["status"] != "completed"]
    
    if overdue_tasks:
        st.markdown("<div style='color: #EF4444; font-size: 1rem; font-weight: 600; margin-bottom: 12px;'>⚠️ Overdue Tasks</div>", unsafe_allow_html=True)
        for task in overdue_tasks:
            due = datetime.fromisoformat(task["due_at"].replace('Z', '+00:00'))
            days_overdue = (today - due.date()).days
            st.markdown(f"""
            <div class="activity-item" style="background: #EF444410; padding: 12px 16px; border-radius: 8px; margin-bottom: 8px; border: 1px solid #EF444440;">
                <span style="color: #EF4444; font-weight: 600;">⚠️ {days_overdue}d overdue</span>
                <span style="color: #F0F6FC; margin-left: 12px;">{task['title']}</span>
                <span style="color: #6B7280; margin-left: auto;">{task.get('project', 'Unassigned')}</span>
            </div>
            """, unsafe_allow_html=True)
        st.markdown("<div style='margin: 16px 0;'></div>", unsafe_allow_html=True)
    
    # This Week
    st.markdown("<div style='color: #00D9FF; font-size: 1rem; font-weight: 600; margin-bottom: 12px;'>📅 This Week ({week_start.strftime('%b %d')} - {week_end.strftime('%b %d')})</div>", unsafe_allow_html=True)
    
    this_week_tasks = [t for t in data["tasks"]
                       if t.get("due_at") and
                       week_start <= datetime.fromisoformat(t["due_at"].replace('Z', '+00:00')).date() <= week_end]
    
    if this_week_tasks:
        # Group by day
        days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        for i, day_name in enumerate(days):
            day_date = week_start + timedelta(days=i)
            day_tasks = [t for t in this_week_tasks 
                         if datetime.fromisoformat(t["due_at"].replace('Z', '+00:00')).date() == day_date]
            
            if day_tasks:
                is_today = day_date == today
                day_color = "#00D9FF" if is_today else "#F0F6FC"
                st.markdown(f"""
                <div style="margin-bottom: 16px;">
                    <div style="color: {day_color}; font-weight: 600; margin-bottom: 8px; padding-bottom: 4px; border-bottom: 1px solid #30363D;">
                        {day_name} {day_date.strftime('%m/%d')} {' (Today)' if is_today else ''}
                    </div>
                """, unsafe_allow_html=True)
                
                for task in day_tasks:
                    status_icon = "✅" if task["status"] == "completed" else "🔥" if task["status"] == "in_progress" else "⏳"
                    st.markdown(f"""
                    <div style="display: flex; align-items: center; gap: 8px; padding: 8px 0; padding-left: 16px; border-left: 2px solid {'#10B981' if task['status'] == 'completed' else '#00D9FF' if task['status'] == 'in_progress' else '#F59E0B'};">
                        <span>{status_icon}</span>
                        <span style="color: #F0F6FC;">{task['title']}</span>
                        <span style="color: #6B7280; font-size: 0.75rem; margin-left: auto;">{task.get('project', '')}</span>
                    </div>
                    """, unsafe_allow_html=True)
                
                st.markdown("</div>", unsafe_allow_html=True)
    else:
        st.info("No tasks scheduled for this week.")
    
    st.markdown("<div style='margin: 24px 0;'></div>", unsafe_allow_html=True)
    
    # Next Week
    st.markdown("<div style='color: #8B5CF6; font-size: 1rem; font-weight: 600; margin-bottom: 12px;'>📅 Next Week ({next_week_start.strftime('%b %d')} - {next_week_end.strftime('%b %d')})</div>", unsafe_allow_html=True)
    
    next_week_tasks = [t for t in data["tasks"]
                       if t.get("due_at") and
                       next_week_start <= datetime.fromisoformat(t["due_at"].replace('Z', '+00:00')).date() <= next_week_end]
    
    if next_week_tasks:
        for i, day_name in enumerate(days):
            day_date = next_week_start + timedelta(days=i)
            day_tasks = [t for t in next_week_tasks 
                         if datetime.fromisoformat(t["due_at"].replace('Z', '+00:00')).date() == day_date]
            
            if day_tasks:
                st.markdown(f"""
                <div style="margin-bottom: 16px;">
                    <div style="color: #8B949E; font-weight: 600; margin-bottom: 8px; padding-bottom: 4px; border-bottom: 1px solid #30363D;">
                        {day_name} {day_date.strftime('%m/%d')}
                    </div>
                """, unsafe_allow_html=True)
                
                for task in day_tasks:
                    status_icon = "✅" if task["status"] == "completed" else "🔥" if task["status"] == "in_progress" else "⏳"
                    st.markdown(f"""
                    <div style="display: flex; align-items: center; gap: 8px; padding: 8px 0; padding-left: 16px; border-left: 2px solid {'#10B981' if task['status'] == 'completed' else '#8B5CF6'};">
                        <span>{status_icon}</span>
                        <span style="color: #F0F6FC;">{task['title']}</span>
                        <span style="color: #6B7280; font-size: 0.75rem; margin-left: auto;">{task.get('project', '')}</span>
                    </div>
                    """, unsafe_allow_html=True)
                
                st.markdown("</div>", unsafe_allow_html=True)
    else:
        st.info("No tasks scheduled for next week.")

# --- TAB 5: ACTIVITY LOG ---
with tabs[4]:
    st.markdown("<div class='section-header'>Mission Activity Log</div>", unsafe_allow_html=True)
    
    # Activity stats
    activity_counts = defaultdict(int)
    for activity in data["activity_log"]:
        activity_counts[activity["type"]] += 1
    
    stats_cols = st.columns(4)
    with stats_cols[0]:
        st.metric(label="Agents Started", value=activity_counts.get("agent_started", 0))
    with stats_cols[1]:
        st.metric(label="Agents Completed", value=activity_counts.get("agent_completed", 0))
    with stats_cols[2]:
        st.metric(label="Projects Created", value=activity_counts.get("project_created", 0))
    with stats_cols[3]:
        st.metric(label="Tasks Completed", value=activity_counts.get("task_completed", 0) + activity_counts.get("task_created", 0))
    
    st.markdown("<div style='margin: 16px 0;'></div>", unsafe_allow_html=True)
    
    # Activity filter
    activity_types = ["All"] + list(set(a["type"] for a in data["activity_log"]))
    selected_type = st.selectbox("Filter by Type", activity_types, key="activity_filter")
    
    # Filter activities
    filtered_activities = data["activity_log"]
    if selected_type != "All":
        filtered_activities = [a for a in data["activity_log"] if a["type"] == selected_type]
    
    if not filtered_activities:
        st.info("No activity records found.")
    else:
        for activity in filtered_activities:
            icon = {
                "agent_started": "🟢",
                "agent_completed": "✅", 
                "task_created": "📝",
                "task_completed": "✔️",
                "project_created": "📁",
                "project_updated": "📂",
                "task_updated": "🔄",
                "system": "⚡"
            }.get(activity["type"], "📌")
            
            # Format timestamp
            ts = datetime.fromisoformat(activity["timestamp"].replace('Z', '+00:00'))
            now = datetime.now(timezone.utc)
            time_diff = now - ts
            
            if time_diff.days > 0:
                time_str = f"{time_diff.days}d ago"
            elif time_diff.seconds >= 3600:
                time_str = f"{time_diff.seconds // 3600}h ago"
            else:
                time_str = f"{time_diff.seconds // 60}m ago"
            
            full_time = ts.strftime("%Y-%m-%d %H:%M UTC")
            
            st.markdown(f"""
            <div class="activity-item" style="padding: 16px; background: #161b22; border-radius: 12px; margin-bottom: 12px; border: 1px solid #30363D;">
                <div class="activity-icon" style="background: {{
                    'agent_started': '#00D9FF20',
                    'agent_completed': '#10B98120',
                    'task_created': '#F59E0B20',
                    'task_completed': '#10B98120',
                    'project_created': '#8B5CF620',
                    'project_updated': '#6B728020',
                    'system': '#EF444420'
                }}.get('{activity['type']}', '#21262D'); color: {{
                    'agent_started': '#00D9FF',
                    'agent_completed': '#10B981',
                    'task_created': '#F59E0B',
                    'task_completed': '#10B981',
                    'project_created': '#8B5CF6',
                    'project_updated': '#6B7280',
                    'system': '#EF4444'
                }}.get('{activity['type']}', '#F0F6FC');">
                    {icon}
                </div>
                <div style="flex: 1;">
                    <div style="color: #F0F6FC; font-size: 0.9375rem; line-height: 1.5;">{activity['message']}</div>
                    <div style="display: flex; gap: 12px; margin-top: 8px; align-items: center;">
                        <span style="background: #21262D; color: #8B949E; padding: 2px 8px; border-radius: 4px; font-size: 0.625rem; text-transform: uppercase; letter-spacing: 0.5px;">{activity['type'].replace('_', ' ').title()}</span>
                        <span class="timestamp" title="{full_time}">{time_str}</span>
                    </div>
                </div>
            </div>
            """, unsafe_allow_html=True)

# Auto-refresh
st.markdown("<div style='margin: 32px 0;'></div>", unsafe_allow_html=True)
st.caption(f"🔄 Auto-refresh every {REFRESH_INTERVAL} seconds · Last updated {datetime.now(timezone.utc).strftime('%H:%M:%S UTC')}")