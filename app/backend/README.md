# Backend (Django) — local development

Quick steps to set up and run the Django backend in PowerShell on Windows.

1. Create and activate a virtual environment (PowerShell)

```powershell
cd '\PRessureApp\app\backend'
python -m venv .venv
# If PowerShell blocks script execution, run once:
# Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip setuptools wheel
```

2. Install Python dependencies

```powershell
pip install -r ..\..\requirements.txt
```

3. Configure environment

- Copy `.env.example` to `.env` and edit if needed. The project reads settings from environment when configured.

4. Run migrations and create a superuser

```powershell
python manage.py migrate
python manage.py createsuperuser
```

5. Start the development server

```powershell
python manage.py runserver 127.0.0.1:8000
```

Notes

- Default DB: sqlite (db.sqlite3 in the backend folder). To use Postgres, set `DATABASE_URL` in `.env`.
- CORS is configured for Vite dev server default origin `http://localhost:5173` in `api/settings`.

## Auth (session + CSRF) quickstart

Endpoints under `/api/users/auth/`:

- `GET /api/users/auth/csrf/` — sets CSRF cookie
- `POST /api/users/auth/register/` — create user (auto-login)
- `POST /api/users/auth/login/` — login (session cookie)
- `POST /api/users/auth/logout/` — logout
- `GET /api/users/auth/me/` — current user (requires auth)

Global permissions: `IsAuthenticatedOrReadOnly`. Authentication: DRF `SessionAuthentication` (unsafe methods require both session cookie and `X-CSRFToken`).

### PowerShell-native (recommended)

```powershell
$session = New-Object Microsoft.PowerShell.Commands.WebRequestSession
Invoke-WebRequest -UseBasicParsing -WebSession $session -Uri http://127.0.0.1:8000/api/users/auth/csrf/
$csrf = ($session.Cookies.GetCookies("http://127.0.0.1:8000") | Where-Object { $_.Name -eq "csrftoken" }).Value

$body = @{ username = "admin"; password = "admin" } | ConvertTo-Json -Compress
Invoke-RestMethod -Method Post -WebSession $session -Headers @{ "X-CSRFToken" = $csrf } -ContentType "application/json" -Body $body -Uri http://127.0.0.1:8000/api/users/auth/login/

Invoke-RestMethod -WebSession $session -Uri http://127.0.0.1:8000/api/users/auth/me/

# Protected POST example (requires session + CSRF)
Invoke-RestMethod -Method Post -WebSession $session -Headers @{ "X-CSRFToken" = $csrf } -ContentType "application/json" -Body "{}" -Uri http://127.0.0.1:8000/api/workouts/protected-write/
```

### Using curl.exe

```powershell
$jar = "$env:TEMP\cookies.txt"
curl.exe -i -c $jar http://127.0.0.1:8000/api/users/auth/csrf/
$csrf = (Get-Content $jar) -match 'csrftoken' | ForEach-Object { ($_ -split "`t")[-1] } | Select-Object -Last 1

$json = '{"username":"admin","password":"admin"}'
curl.exe -i -b $jar -c $jar -H "Content-Type: application/json" -H "X-CSRFToken: $csrf" --data-raw $json http://127.0.0.1:8000/api/users/auth/login/

curl.exe -i -b $jar http://127.0.0.1:8000/api/users/auth/me/

# Protected POST
curl.exe -i -b $jar -c $jar -H "Content-Type: application/json" -H "X-CSRFToken: $csrf" -X POST -d '{}' http://127.0.0.1:8000/api/workouts/protected-write/
```

Tips

- For development from the Vite frontend, use `credentials: 'include'` and send `X-CSRFToken` with the cookie value. CORS is configured to allow credentials.
- In production, set `CSRF_COOKIE_SECURE = True`, `SESSION_COOKIE_SECURE = True`, and `CSRF_TRUSTED_ORIGINS` to your domain(s).
