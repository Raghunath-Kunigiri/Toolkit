#!/bin/bash

# PythonToolkit Development Setup Script

echo "🚀 Starting PythonToolkit Development Environment..."

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
echo "📋 Checking prerequisites..."

if ! command_exists python3; then
    echo "❌ Python 3 is not installed. Please install Python 3.8+ first."
    exit 1
fi

if ! command_exists node; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ first."
    exit 1
fi

if ! command_exists npm; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Prerequisites check passed!"

# Function to setup backend
setup_backend() {
    echo "🐍 Setting up backend..."
    cd backend
    
    # Create virtual environment if it doesn't exist
    if [ ! -d "venv" ]; then
        echo "Creating virtual environment..."
        python3 -m venv venv
    fi
    
    # Activate virtual environment
    source venv/bin/activate
    
    # Install dependencies
    echo "Installing Python dependencies..."
    pip install -r requirements.txt
    
    echo "✅ Backend setup complete!"
    cd ..
}

# Function to setup frontend
setup_frontend() {
    echo "⚛️  Setting up frontend..."
    cd frontend
    
    # Install dependencies
    echo "Installing Node.js dependencies..."
    npm install
    
    echo "✅ Frontend setup complete!"
    cd ..
}

# Function to start development servers
start_servers() {
    echo "🚀 Starting development servers..."
    
    # Start backend in background
    echo "Starting backend server..."
    cd backend
    source venv/bin/activate
    python app.py &
    BACKEND_PID=$!
    cd ..
    
    # Give backend time to start
    sleep 3
    
    # Start frontend in background
    echo "Starting frontend server..."
    cd frontend
    npm start &
    FRONTEND_PID=$!
    cd ..
    
    echo "🎉 Development servers started!"
    echo "📱 Frontend: http://localhost:3000"
    echo "🔧 Backend API: http://localhost:8000"
    echo "📚 API Docs: http://localhost:8000/docs"
    echo ""
    echo "Press Ctrl+C to stop servers"
    
    # Wait for interrupt
    trap "echo 'Stopping servers...'; kill $BACKEND_PID $FRONTEND_PID; exit 0" INT
    wait
}

# Main script
case "$1" in
    "setup")
        setup_backend
        setup_frontend
        ;;
    "start")
        start_servers
        ;;
    "backend")
        setup_backend
        cd backend
        source venv/bin/activate
        python app.py
        ;;
    "frontend")
        setup_frontend
        cd frontend
        npm start
        ;;
    *)
        echo "Usage: $0 {setup|start|backend|frontend}"
        echo ""
        echo "Commands:"
        echo "  setup    - Install all dependencies"
        echo "  start    - Start both backend and frontend servers"
        echo "  backend  - Start only the backend server"
        echo "  frontend - Start only the frontend server"
        echo ""
        echo "Example: $0 setup && $0 start"
        exit 1
        ;;
esac 