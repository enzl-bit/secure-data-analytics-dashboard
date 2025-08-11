import React from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import UploadPage from "./pages/UploadPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("access_token");
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="p-4 bg-white shadow mb-6">
        <div className="max-w-4xl mx-auto flex gap-4">
          <Link to="/" className="text-blue-600">
            Upload
          </Link>
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
          <Link to="/register" className="text-blue-600">
            Register
          </Link>
        </div>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <UploadPage />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}
