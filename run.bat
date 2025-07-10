@echo off
setlocal

REM PythonToolkit Development Setup Script for Windows

echo 🚀 Starting PythonToolkit Development Environment...

REM Function to check if command exists
where python >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Python is not installed. Please install Python 3.8+ first.
    pause
    exit /b 1
)

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 16+ first.
    pause
    exit /b 1
)

where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

echo ✅ Prerequisites check passed!

if "%1"=="setup" goto setup
if "%1"=="start" goto start
if "%1"=="backend" goto backend
if "%1"=="frontend" goto frontend
goto usage

:setup
echo 🐍 Setting up backend...
cd backend

if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)

call venv\Scripts\activate.bat

echo Installing Python dependencies...
pip install -r requirements.txt

echo ✅ Backend setup complete!
cd ..

echo ⚛️  Setting up frontend...
cd frontend

echo Installing Node.js dependencies...
npm install

echo ✅ Frontend setup complete!
cd ..

echo 🎉 Setup complete! Run 'run.bat start' to start the servers.
pause
exit /b 0

:start
echo 🚀 Starting development servers...

echo Starting backend server...
cd backend
call venv\Scripts\activate.bat
start "Backend" python app.py
cd ..

echo Waiting for backend to start...
timeout /t 3 /nobreak >nul

echo Starting frontend server...
cd frontend
start "Frontend" npm start
cd ..

echo 🎉 Development servers started!
echo 📱 Frontend: http://localhost:3000
echo 🔧 Backend API: http://localhost:8000
echo 📚 API Docs: http://localhost:8000/docs
echo.
echo Press any key to stop servers...
pause

REM Kill the started processes
taskkill /f /im python.exe >nul 2>nul
taskkill /f /im node.exe >nul 2>nul
exit /b 0

:backend
echo 🐍 Setting up and starting backend...
cd backend

if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)

call venv\Scripts\activate.bat
echo Installing Python dependencies...
pip install -r requirements.txt
echo Starting backend server...
python app.py
cd ..
exit /b 0

:frontend
echo ⚛️  Setting up and starting frontend...
cd frontend
echo Installing Node.js dependencies...
npm install
echo Starting frontend server...
npm start
cd ..
exit /b 0

:usage
echo Usage: %0 {setup^|start^|backend^|frontend}
echo.
echo Commands:
echo   setup    - Install all dependencies
echo   start    - Start both backend and frontend servers
echo   backend  - Start only the backend server
echo   frontend - Start only the frontend server
echo.
echo Example: %0 setup
echo          %0 start
pause
exit /b 1 