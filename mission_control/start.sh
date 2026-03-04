#!/bin/bash

# Mission Control Dashboard Startup Script
# Martin's AI Workforce Command Center

echo "🚀 Starting Mission Control..."
echo "================================"

# Check if we're in the right directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Check if Python is available
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi

# Check if virtual environment exists, create if not
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "📥 Installing dependencies..."
pip install -q -r requirements.txt

# Launch the dashboard
echo ""
echo "✅ Mission Control is ready!"
echo "🌐 Opening dashboard at: http://localhost:8501"
echo ""
echo "Press Ctrl+C to stop the server"
echo "================================"

# Start Streamlit
streamlit run app.py --server.port=8501 --server.address=localhost
