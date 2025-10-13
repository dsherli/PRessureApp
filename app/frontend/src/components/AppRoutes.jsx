import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Page components (implementations live in ../pages)
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Workout from "../pages/Workout";
import History from "../pages/History";
import Profile from "../pages/Profile";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/workout/:id" element={<Workout />} />
      <Route path="/history" element={<History />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<div>Not Found</div>} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
