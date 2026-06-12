cd frontend
start cmd /k $env:REACT_APP_API_URL="/api/users"
npm run build
start cmd xcopy /E /I /Y build ..\Backend\wwwroot
cd ..\backend
start cmd dotnet publish -c Release -o publish