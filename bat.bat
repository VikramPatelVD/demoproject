@echo off
echo === Starting Build Process ===

echo.
echo [1/3] Building React Frontend...
cd frontend
set REACT_APP_API_URL=/api/users
call npm run build

echo.
echo [2/3] Copying files to Backend...
xcopy /E /I /Y build ..\backend\wwwroot

echo.
echo [3/3] Publishing .NET Backend...
cd ..\backend
dotnet publish -c Release -o publish

echo.
echo === Build Complete! ===
echo pause