@echo off
cd frontend
call npm run build
xcopy /E /I /Y build ..\backend\wwwroot
cd ..\backend
dotnet publish -c Release -o publish
