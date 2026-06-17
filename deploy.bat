@echo off
cd frontend
set REACT_APP_API_URL=/api/users
call npm run build
xcopy /E /I /Y build ..\backend\wwwroot
cd ..\backend
dotnet publish -c Release -o publish
