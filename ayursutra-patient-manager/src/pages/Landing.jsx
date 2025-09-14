// src/pages/Landing.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Landing() {
  const { currentUser, role } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50">
      {/* Hero Section */}
      <div className="relative bg-green-800 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            🕉️ Welcome to AyurVeda Platform
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Experience the ancient wisdom of Ayurveda with modern healthcare
            technology. Connect with certified practitioners for personalized
            healing journeys.
          </p>
          {!currentUser && (
            <div className="space-x-4">
              <Link
                to="/register"
                className="bg-yellow-500 hover:bg-yellow-600 text-green-900 font-semibold px-8 py-3 rounded-lg text-lg transition-colors"
              >
                Start Your Journey
              </Link>
              <Link
                to="/login"
                className="border-2 border-white hover:bg-white hover:text-green-800 font-semibold px-8 py-3 rounded-lg text-lg transition-colors"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Dashboard Preview for Logged-in Users */}
      {currentUser && (
        <div className="py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8 text-green-800">
              Welcome back, {currentUser.name}!
            </h2>

            {role === "patient" && (
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                  <h3 className="font-semibold text-lg mb-2">
                    Upcoming Appointments
                  </h3>
                  <p className="text-gray-600">
                    You have 2 upcoming consultations
                  </p>
                  <Link
                    to="/appointments"
                    className="text-blue-600 hover:underline mt-2 inline-block"
                  >
                    View All →
                  </Link>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                  <h3 className="font-semibold text-lg mb-2">
                    Today's Reminders
                  </h3>
                  <p className="text-gray-600">3 wellness activities scheduled</p>
                  <Link
                    to="/reminders"
                    className="text-green-600 hover:underline mt-2 inline-block"
                  >
                    View Reminders →
                  </Link>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
                  <h3 className="font-semibold text-lg mb-2">
                    Recommended Therapies
                  </h3>
                  <p className="text-gray-600">Personalized treatment plans</p>
                  <Link
                    to="/therapies"
                    className="text-purple-600 hover:underline mt-2 inline-block"
                  >
                    Explore Therapies →
                  </Link>
                </div>
              </div>
            )}

            {role === "doctor" && (
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="font-semibold text-lg mb-2">Today's Schedule</h3>
                  <p className="text-gray-600">
                    5 patient consultations scheduled
                  </p>
                  <Link
                    to="/appointments"
                    className="text-blue-600 hover:underline mt-2 inline-block"
                  >
                    View Schedule →
                  </Link>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="font-semibold text-lg mb-2">Patient Management</h3>
                  <p className="text-gray-600">Manage ongoing treatments</p>
                  <Link
                    to="/patients"
                    className="text-green-600 hover:underline mt-2 inline-block"
                  >
                    View Patients →
                  </Link>
                </div>
              </div>
            )}

            {role === "admin" && (
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="font-semibold text-lg mb-2">Doctor Management</h3>
                  <p className="text-gray-600">Create and manage doctor accounts</p>
                  <Link
                    to="/manage-doctors"
                    className="text-blue-600 hover:underline mt-2 inline-block"
                  >
                    Manage Doctors →
                  </Link>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="font-semibold text-lg mb-2">Platform Overview</h3>
                  <p className="text-gray-600">Monitor platform activities</p>
                  <Link
                    to="/all-patients"
                    className="text-green-600 hover:underline mt-2 inline-block"
                  >
                    View All Patients →
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-green-800">
            Why Choose Our Platform?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-6xl mb-4">🌿</div>
              <h3 className="text-xl font-semibold mb-3">Authentic Ayurveda</h3>
              <p className="text-gray-600">
                Connect with certified Ayurvedic practitioners who follow
                traditional methods combined with modern healthcare standards.
              </p>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-4">💊</div>
              <h3 className="text-xl font-semibold mb-3">Personalized Treatment</h3>
              <p className="text-gray-600">
                Receive customized treatment plans based on your unique
                constitution (Prakriti) and current health condition.
              </p>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-4">📱</div>
              <h3 className="text-xl font-semibold mb-3">Digital Wellness</h3>
              <p className="text-gray-600">
                Track your progress, set reminders for medications, and stay
                connected with your healthcare team.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
