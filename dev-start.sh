#!/bin/bash

# PRessure App Development Startup Script
# This script starts both the Django backend and React frontend

echo "🚀 Starting PRessure App Development Environment"
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to check if virtual environment exists
check_venv() {
    if [ ! -d ".venv" ]; then
        echo -e "${RED}❌ Virtual environment not found!${NC}"
        echo "Please create a virtual environment first:"
        echo "python -m venv .venv"
        exit 1
    fi
}

# Function to start Django backend
start_backend() {
    echo -e "\n${BLUE}🔧 Starting Django Backend...${NC}"
    cd app/backend
    
    # Activate virtual environment
    source ../../.venv/bin/activate
    
    # Run migrations
    echo -e "${YELLOW}📦 Running migrations...${NC}"
    python manage.py migrate
    
    # Start Django server
    echo -e "${GREEN}🌐 Starting Django server on http://127.0.0.1:8000${NC}"
    python manage.py runserver &
    
    # Store the PID for cleanup
    DJANGO_PID=$!
    echo $DJANGO_PID > ../../django.pid
    
    cd ../..
}

# Function to start React frontend
start_frontend() {
    echo -e "\n${BLUE}⚛️  Starting React Frontend...${NC}"
    cd app/frontend
    
    # Install dependencies if node_modules doesn't exist
    if [ ! -d "node_modules" ]; then
        echo -e "${YELLOW}📦 Installing npm dependencies...${NC}"
        npm install
    fi
    
    # Start Vite dev server
    echo -e "${GREEN}🌐 Starting Vite dev server on http://localhost:5173${NC}"
    npm run dev &
    
    # Store the PID for cleanup
    VITE_PID=$!
    echo $VITE_PID > ../../vite.pid
    
    cd ../..
}

# Function to cleanup processes
cleanup() {
    echo -e "\n${YELLOW}🧹 Shutting down servers...${NC}"
    
    if [ -f "django.pid" ]; then
        kill $(cat django.pid) 2>/dev/null
        rm django.pid
    fi
    
    if [ -f "vite.pid" ]; then
        kill $(cat vite.pid) 2>/dev/null
        rm vite.pid
    fi
    
    echo -e "${GREEN}✅ Cleanup complete${NC}"
    exit 0
}

# Set up signal handling for cleanup
trap cleanup SIGINT SIGTERM

# Main execution
main() {
    check_venv
    start_backend
    sleep 3  # Give Django time to start
    start_frontend
    
    echo -e "\n${GREEN}🎉 Both servers are starting up!${NC}"
    echo -e "${GREEN}📊 Backend:  http://127.0.0.1:8000${NC}"
    echo -e "${GREEN}🖥️  Frontend: http://localhost:5173${NC}"
    echo -e "\n${YELLOW}Press Ctrl+C to stop both servers${NC}"
    
    # Wait for processes
    wait
}

# Run main function
main