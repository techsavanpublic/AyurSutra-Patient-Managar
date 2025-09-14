// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { mockData } from "../utils/mockData";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate session restore
    const storedUser = window.sessionUser || null;
    setCurrentUser(storedUser);
    setIsLoading(false);
  }, []);

  const login = (email, password) => {
    // Admin
    if (
      email === mockData.admin.email &&
      password === mockData.admin.password
    ) {
      const user = mockData.admin;
      setCurrentUser(user);
      window.sessionUser = user;
      return { success: true, user };
    }

    // Doctor
    const doctor = mockData.doctors.find(
      (d) => d.email === email && d.password === password
    );
    if (doctor) {
      setCurrentUser(doctor);
      window.sessionUser = doctor;
      return { success: true, user: doctor };
    }

    // Patient
    const patient = mockData.patients.find(
      (p) => p.email === email && p.password === password
    );
    if (patient) {
      setCurrentUser(patient);
      window.sessionUser = patient;
      return { success: true, user: patient };
    }

    return { success: false, message: "Invalid credentials" };
  };

  const register = (userData) => {
    const emailExists = [
      ...mockData.doctors,
      ...mockData.patients,
      mockData.admin,
    ].some((user) => user.email === userData.email);

    if (emailExists) {
      return { success: false, message: "Email already exists" };
    }

    const newPatient = {
      id: mockData.patients.length + 1,
      ...userData,
      role: "patient",
    };

    mockData.patients.push(newPatient);
    setCurrentUser(newPatient);
    window.sessionUser = newPatient;
    return { success: true, user: newPatient };
  };

  const logout = () => {
    setCurrentUser(null);
    window.sessionUser = null;
  };

  const createDoctorAccount = (doctorData) => {
    if (!currentUser || currentUser.role !== "admin") {
      return { success: false, message: "Unauthorized" };
    }

    const emailExists = [
      ...mockData.doctors,
      ...mockData.patients,
      mockData.admin,
    ].some((user) => user.email === doctorData.email);

    if (emailExists) {
      return { success: false, message: "Email already exists" };
    }

    const newDoctor = {
      id: mockData.doctors.length + 1,
      ...doctorData,
      role: "doctor",
    };

    mockData.doctors.push(newDoctor);
    return { success: true, doctor: newDoctor };
  };

  const value = {
    currentUser,
    login,
    logout,
    register,
    createDoctorAccount,
    isLoading,
    role: currentUser?.role || "guest",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
