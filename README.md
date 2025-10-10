# PRessureApp

Full stack fitness tracking platform

## Local development quickstart

This repository contains a Django backend (`app/backend`) and a React + Vite frontend (`app/frontend`).

High-level steps:

1. Backend: create a Python virtual environment, install dependencies, run migrations, start the Django dev server (127.0.0.1:8000).
2. Frontend: install Node dependencies and run the Vite dev server (127.0.0.1:5173). Vite proxies `/api` to the backend.

See more detailed, platform-specific instructions in the component READMEs:

- `app/backend/README.md` — backend env, venv, migrations, runserver (PowerShell examples).
- `app/frontend/README.md` — Node install, npm install, and `npm run dev` (Vite) with `.env.example` guidance.

Environment example files:

- `app/backend/.env.example`
- `app/frontend/.env.example`

If you want, run the helper script `dev-start.sh` (UNIX shell) or open both READMEs for PowerShell commands.
