@echo off
call publish.bat
echo Starting backend from publish folder...
cd Backend\publish
start dotnet backend.dll
echo Backend running at http://localhost:5000
echo Press any key to stop server...
pause >nul
taskkill /f /im dotnet.exe