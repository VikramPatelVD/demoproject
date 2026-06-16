@echo off
echo Starting Full Stack Application...

:: Start the Backend in a new window
start "Backend" cmd /k "cd backend && dotnet run"

:: Start the Frontend in a new window
start "Frontend" cmd /k "cd frontend && npm start"

echo Both servers are starting in separate windows.