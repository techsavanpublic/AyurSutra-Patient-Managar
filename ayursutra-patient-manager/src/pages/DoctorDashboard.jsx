// src/pages/DoctorDashboard.jsx
import React, { useState } from "react";
import { mockData } from "../utils/mockData";
import { useAuth } from "../context/AuthContext";

export default function DoctorDashboard() {
  const { currentUser } = useAuth();
  const [appointments, setAppointments] = useState(
    mockData.appointments.filter((a) => a.doctorId === currentUser?.id)
  );

  const updateStatus = (id, status) => {
    setAppointments((prev) =>
      prev.map((appt) =>
        appt.id === id ? { ...appt, status: status } : appt
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-green-800 mb-8">
          Doctor Dashboard
        </h1>

        {/* Profile Info */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Profile</h2>
          <p>
            <span className="font-medium">Name:</span> {currentUser?.name}
          </p>
          <p>
            <span className="font-medium">Specialization:</span>{" "}
            {currentUser?.specialization}
          </p>
          <p>
            <span className="font-medium">Experience:</span>{" "}
            {currentUser?.experience} years
          </p>
          <p>
            <span className="font-medium">Phone:</span> {currentUser?.phone}
          </p>
        </div>

        {/* Appointments */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">My Appointments</h2>
          {appointments.length === 0 ? (
            <p className="text-gray-500">No appointments scheduled.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {appointments.map((appt) => {
                const patient = mockData.patients.find(
                  (p) => p.id === appt.patientId
                );
                return (
                  <li
                    key={appt.id}
                    className="py-3 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium">
                        {patient?.name} — {appt.type}
                      </p>
                      <p className="text-sm text-gray-600">
                        {appt.date} at {appt.time} | Status:{" "}
                        <span className="capitalize">{appt.status}</span>
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      {appt.status !== "confirmed" && (
                        <button
                          onClick={() => updateStatus(appt.id, "confirmed")}
                          className="text-green-600 hover:underline text-sm"
                        >
                          Confirm
                        </button>
                      )}
                      {appt.status !== "completed" && (
                        <button
                          onClick={() => updateStatus(appt.id, "completed")}
                          className="text-blue-600 hover:underline text-sm"
                        >
                          Complete
                        </button>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
