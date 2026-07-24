@echo off
REM Creates a local superuser (idempotent) and starts PocketBase with SQLite in pb_data/
cd /d "%~dp0"

if not exist "pocketbase.exe" (
  echo pocketbase.exe not found in apps\pocketbase
  echo Download from https://github.com/pocketbase/pocketbase/releases
  exit /b 1
)

if not exist "pb_data\data.db" (
  echo Initializing local SQLite database and default admin...
  pocketbase.exe superuser upsert dev@localhost.local LocalDevPass123!
)

echo.
echo PocketBase local SQLite: .\pb_data\
echo Admin UI: http://127.0.0.1:8090/_/
echo API:      http://127.0.0.1:8090
echo Login:    dev@localhost.local / LocalDevPass123!
echo.
pocketbase.exe serve --http=127.0.0.1:8090
