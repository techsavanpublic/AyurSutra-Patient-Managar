// src/pages/PatientDashboard.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { mockData } from "../utils/mockData";

export default function PatientDashboard() {
  const { currentUser } = useAuth();
  const [appointments, setAppointments] = useState(
    mockData.appointments.filter((a) => a.patientId === currentUser?.id)
  );
  const [reminders, setReminders] = useState(
    mockData.reminders.filter((r) => r.patientId === currentUser?.id)
  );

  const cancelAppointment = (id) => {
    setAppointments((prev) =>
      prev.map((appt) =>
        appt.id === id ? { ...appt, status: "cancelled" } : appt
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-green-800 mb-8">
          Patient Dashboard
        </h1>

        {/* Profile Card */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Profile</h2>
          <p>
            <span className="font-medium">Name:</span> {currentUser?.name}
          </p>
          <p>
            <span className="font-medium">Email:</span> {currentUser?.email}
          </p>
          <p>
            <span className="font-medium">Phone:</span> {currentUser?.phone}
          </p>
          <p>
            <span className="font-medium">Age:</span> {currentUser?.age}
          </p>
          <p>
            <span className="font-medium">Prakriti:</span>{" "}
            {currentUser?.prakriti}
          </p>
          <Link
            to="/patient/profile"
            className="text-green-700 hover:underline mt-2 inline-block"
          >
            Edit Profile →
          </Link>
        </div>

        {/* Appointments */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">My Appointments</h2>
          {appointments.length === 0 ? (
            <p className="text-gray-500">No appointments scheduled.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {appointments.map((appt) => {
                const doctor = mockData.doctors.find((d) => d.id === appt.doctorId);
                return (
                  <li key={appt.id} className="py-3 flex justify-between items-center">
                    <div>
                      <p className="font-medium">
                        {doctor?.name} — {appt.type}
                      </p>
                      <p className="text-sm text-gray-600">
                        {appt.date} at {appt.time} | Status:{" "}
                        <span className="capitalize">{appt.status}</span>
                      </p>
                    </div>
                    {appt.status !== "cancelled" && (
                      <button
                        onClick={() => cancelAppointment(appt.id)}
                        className="text-red-600 hover:underline text-sm"
                      >
                        Cancel
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Reminders */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">My Reminders</h2>
          {reminders.length === 0 ? (
            <p className="text-gray-500">No reminders set.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {reminders.map((rem) => (
                <li key={rem.id} className="py-3">
                  <p className="font-medium">{rem.title}</p>
                  <p className="text-sm text-gray-600">{rem.description}</p>
                  <p className="text-xs text-gray-500">
                    {rem.frequency} at {rem.time}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
