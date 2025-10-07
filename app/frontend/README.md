# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Local development (install & run)

Follow these steps in PowerShell to start the frontend dev server (Vite):

```powershell
cd '\PRessureApp\app\frontend'
# Install Node.js (if not installed) from https://nodejs.org (LTS recommended)
npm install
npm run dev
```

- The dev server runs by default at http://localhost:5173 and proxies `/api` to the Django backend at `http://127.0.0.1:8000` per `vite.config.js`.
- Copy `.env.example` to `.env` to override `VITE_API_BASE` if your backend is running on a non-default host/port.
