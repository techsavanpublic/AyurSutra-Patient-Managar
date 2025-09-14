// src/pages/TherapyDetail.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { mockData } from "../utils/mockData";

export default function TherapyDetail() {
  const { id } = useParams();
  const therapy = mockData.therapyTypes.find((t) => t.id === Number(id));

  if (!therapy) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-xl">
        Therapy not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-green-800 mb-4">
          {therapy.name}
        </h1>
        <p className="text-gray-700 mb-6">{therapy.guidelines}</p>

        <div className="space-x-4">
          <Link
            to="/patient/dashboard"
            className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-lg"
          >
            Back to Dashboard
          </Link>
          <Link
            to="/reminders"
            className="bg-yellow-500 hover:bg-yellow-600 text-green-900 font-semibold px-6 py-2 rounded-lg"
          >
            Set Reminder
          </Link>
        </div>
      </div>
    </div>
  );
}
