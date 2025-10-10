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
