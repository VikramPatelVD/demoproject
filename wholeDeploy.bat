@echo off
call deploy.bat
echo Starting backend from publish folder...
cd Backend\publish
start dotnet backend.dll
echo Backend running at http://localhost:5000
