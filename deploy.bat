@echo off
title Build & Deploy Automation
echo ============================================
echo   Running full build + publish pipeline
echo ============================================

REM ----- 1. Set environment variable for React build -----
set REACT_APP_API_URL=/api/users

REM ----- 2. Move to frontend folder and build -----
cd /d "%~dp0frontend"
if %errorlevel% neq 0 ( echo [ERROR] frontend folder missing & pause & exit /b 1 )
echo [1/3] Building React app...
call npm run build
if %errorlevel% neq 0 ( echo Build failed & pause & exit /b %errorlevel% )

REM ----- 3. Copy build output to Backend\wwwroot -----
echo [2/3] Copying build files to ..\Backend\wwwroot...
xcopy /E /I /Y build "..\Backend\wwwroot"
if %errorlevel% neq 0 ( echo Xcopy failed & pause & exit /b %errorlevel% )

REM ----- 4. Publish .NET backend -----
cd /d "%~dp0Backend"
echo [3/3] Publishing .NET Core app (Release)...
dotnet publish -c Release -o publish
if %errorlevel% neq 0 ( echo Publish failed & pause & exit /b %errorlevel% )

echo ============================================
echo   ✅ ALL STEPS COMPLETED SUCCESSFULLY
echo ============================================
pause