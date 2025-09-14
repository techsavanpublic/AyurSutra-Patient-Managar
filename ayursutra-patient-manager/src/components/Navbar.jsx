// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { currentUser, logout, role } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-green-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Home */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-xl font-bold text-yellow-300">
              🕉️ AyurVeda Platform
            </Link>

            {/* Role-based menus */}
            {role === "patient" && (
              <div className="hidden md:flex space-x-4">
                <Link to="/appointments" className="hover:text-yellow-300">
                  Appointments
                </Link>
                <Link to="/therapies" className="hover:text-yellow-300">
                  Therapies
                </Link>
                <Link to="/reminders" className="hover:text-yellow-300">
                  Reminders
                </Link>
              </div>
            )}

            {role === "doctor" && (
              <div className="hidden md:flex space-x-4">
                <Link to="/patients" className="hover:text-yellow-300">
                  Patients
                </Link>
                <Link to="/appointments" className="hover:text-yellow-300">
                  Appointments
                </Link>
              </div>
            )}

            {role === "admin" && (
              <div className="hidden md:flex space-x-4">
                <Link to="/manage-doctors" className="hover:text-yellow-300">
                  Manage Doctors
                </Link>
                <Link to="/all-patients" className="hover:text-yellow-300">
                  All Patients
                </Link>
              </div>
            )}
          </div>

          {/* Right side: user or login/register */}
          <div className="flex items-center space-x-4">
            {currentUser ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm">
                  Welcome,{" "}
                  <span className="font-semibold text-yellow-300">
                    {currentUser.name}
                  </span>
                  <span className="ml-2 text-xs bg-yellow-600 px-2 py-1 rounded">
                    {role.toUpperCase()}
                  </span>
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded text-sm transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link
                  to="/login"
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-sm"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
