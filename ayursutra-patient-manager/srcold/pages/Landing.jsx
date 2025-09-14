import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 space-y-6">
      <h1 className="text-4xl font-bold text-teal-600">Welcome to Ayurveda Patient Platform</h1>
      <p className="text-center text-gray-700 max-w-md">
        Connect with certified Ayurveda doctors, schedule appointments, and manage your health seamlessly.
      </p>
      <div className="space-x-4">
        <Link to="/register" className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700">
          Register
        </Link>
        <Link to="/login" className="bg-gray-200 text-teal-600 px-4 py-2 rounded hover:bg-gray-300">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Landing;  
