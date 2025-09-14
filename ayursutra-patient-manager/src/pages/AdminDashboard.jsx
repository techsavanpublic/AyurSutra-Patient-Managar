import React, { useState, useEffect } from "react";

const API_URL = "http://localhost:3001/doctors";

export default function AdminDashboard() {
  // State for doctors list
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form data & message
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    specialization: "",
    experience: "",
    phone: "",
  });
  const [message, setMessage] = useState("");

  // Which form is active: "add", "update", or null
  const [activeForm, setActiveForm] = useState(null);

  // Selected doctor to update or remove
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);

  // Load doctors from API
  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = () => {
    setLoading(true);
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data);
        setLoading(false);
      })
      .catch(() => {
        setMessage("Failed to load doctors");
        setLoading(false);
      });
  };

  // Handle form input change
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.name === "experience" ? Number(e.target.value) : e.target.value,
    }));
  };

  // Add doctor submit
  const handleAddSubmit = (e) => {
    e.preventDefault();
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to add doctor");
        return res.json();
      })
      .then((newDoctor) => {
        setDoctors((prev) => [...prev, newDoctor]);
        setFormData({
          name: "",
          email: "",
          password: "",
          specialization: "",
          experience: "",
          phone: "",
        });
        setMessage("Doctor account created successfully!");
        setActiveForm(null);
      })
      .catch(() => setMessage("Error creating doctor account"));
  };

  // Remove doctor
  const handleRemoveDoctor = (id) => {
    if (!window.confirm("Are you sure you want to remove this doctor?")) return;

    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete doctor");
        setDoctors((prev) => prev.filter((doc) => doc.id !== id));
        setMessage("Doctor removed successfully!");
      })
      .catch(() => setMessage("Failed to remove doctor"));
  };

  // Load doctor data to update form
  const handleEditClick = (doctor) => {
    setFormData({
      name: doctor.name,
      email: doctor.email,
      password: doctor.password,
      specialization: doctor.specialization,
      experience: doctor.experience,
      phone: doctor.phone,
    });
    setSelectedDoctorId(doctor.id);
    setActiveForm("update");
    setMessage("");
  };

  // Update doctor submit
  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    fetch(`${API_URL}/${selectedDoctorId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update doctor");
        return res.json();
      })
      .then((updatedDoctor) => {
        setDoctors((prev) =>
          prev.map((doc) => (doc.id === selectedDoctorId ? updatedDoctor : doc))
        );
        setMessage("Doctor details updated successfully!");
        setFormData({
          name: "",
          email: "",
          password: "",
          specialization: "",
          experience: "",
          phone: "",
        });
        setSelectedDoctorId(null);
        setActiveForm(null);
      })
      .catch(() => setMessage("Error updating doctor details"));
  };

  // Cancel form (close form)
  const handleCancel = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      specialization: "",
      experience: "",
      phone: "",
    });
    setSelectedDoctorId(null);
    setActiveForm(null);
    setMessage("");
  };

  if (loading) return <p className="p-4">Loading doctors...</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-green-800 mb-8">Admin Dashboard</h1>

        {/* Buttons to toggle forms */}
        {!activeForm && (
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setActiveForm("add")}
              className="bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-2 rounded-lg"
            >
              Add Doctor
            </button>
            <button
              onClick={() => setActiveForm("remove")}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg"
            >
              Remove Doctor
            </button>
            <button
              onClick={() => setActiveForm("updateSelect")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg"
            >
              Update Doctor Details
            </button>
          </div>
        )}

        {/* Add Doctor Form */}
        {activeForm === "add" && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8 max-w-md">
            <h2 className="text-xl font-semibold mb-4">Create Doctor Account</h2>
            {message && <p className="text-green-700 mb-4">{message}</p>}
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Doctor Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                name="specialization"
                placeholder="Specialization"
                value={formData.specialization}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              />
              <input
                type="number"
                name="experience"
                placeholder="Years of Experience"
                value={formData.experience}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                min={0}
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              />
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-2 rounded-lg"
                >
                  Create Doctor
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-300 hover:bg-gray-400 text-black font-semibold px-6 py-2 rounded-lg"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Remove Doctor List */}
        {activeForm === "remove" && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8 max-w-md">
            <h2 className="text-xl font-semibold mb-4">Remove Doctor</h2>
            {message && <p className="text-green-700 mb-4">{message}</p>}
            {doctors.length === 0 ? (
              <p>No doctors to remove.</p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {doctors.map((doc) => (
                  <li
                    key={doc.id}
                    className="py-3 flex justify-between items-center"
                  >
                    <span>
                      {doc.name} ({doc.specialization})
                    </span>
                    <button
                      onClick={() => handleRemoveDoctor(doc.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <button
              onClick={handleCancel}
              className="mt-4 bg-gray-300 hover:bg-gray-400 text-black font-semibold px-6 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        )}

        {/* Select Doctor to Update */}
        {activeForm === "updateSelect" && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8 max-w-md">
            <h2 className="text-xl font-semibold mb-4">Select Doctor to Update</h2>
            {message && <p className="text-green-700 mb-4">{message}</p>}
            {doctors.length === 0 ? (
              <p>No doctors to update.</p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {doctors.map((doc) => (
                  <li
                    key={doc.id}
                    className="py-3 flex justify-between items-center"
                  >
                    <span>
                      {doc.name} ({doc.specialization})
                    </span>
                    <button
                      onClick={() => handleEditClick(doc)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
                    >
                      Update
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <button
              onClick={handleCancel}
              className="mt-4 bg-gray-300 hover:bg-gray-400 text-black font-semibold px-6 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        )}

        {/* Update Doctor Form */}
        {activeForm === "update" && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8 max-w-md">
            <h2 className="text-xl font-semibold mb-4">Update Doctor Details</h2>
            {message && <p className="text-green-700 mb-4">{message}</p>}
            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Doctor Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="specialization"
                placeholder="Specialization"
                value={formData.specialization}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                name="experience"
                placeholder="Years of Experience"
                value={formData.experience}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                min={0}
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg"
                >
                  Update Doctor
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-300 hover:bg-gray-400 text-black font-semibold px-6 py-2 rounded-lg"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Doctors list always visible */}
        <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl">
          <h2 className="text-xl font-semibold mb-4">Existing Doctors</h2>
          {doctors.length === 0 ? (
            <p className="text-gray-600">No doctors available.</p>
          ) : (
            <table className="w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Specialization</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Experience</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Phone</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map((doc) => (
                  <tr key={doc.id}>
                    <td className="border border-gray-300 px-4 py-2">{doc.name}</td>
                    <td className="border border-gray-300 px-4 py-2">{doc.email}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {doc.specialization}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">{doc.experience}</td>
                    <td className="border border-gray-300 px-4 py-2">{doc.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
