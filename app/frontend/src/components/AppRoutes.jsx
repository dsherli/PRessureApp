import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Page components (implementations live in ../pages)
import Shell from "./Shell";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Workout from "../pages/Workout";
import History from "../pages/History";
import Profile from "../pages/Profile";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Unathenticated */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Authenticated layout */}
      <Route element={<Shell />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/workout/:id" element={<Workout />} />
        <Route path="/history" element={<History />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* Redirect or 404 */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
}
