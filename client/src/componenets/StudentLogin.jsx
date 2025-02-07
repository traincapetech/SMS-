import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const StudentLogin = () => {
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Retrieve student data from localStorage
    const students = JSON.parse(localStorage.getItem("students")) || [];

    // Find the student with the provided StudentId and password
    const student = students.find(
      (s) => s.studentId === studentId && s.password === password
    );

    if (student) {
      // If credentials are valid, navigate to the student's dashboard or profile page
      navigate("/studentDashboard", { state: { studentData: student } });
    } else {
      // If credentials are invalid, display an error message
      setError("Invalid Student ID or Password");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="m-auto w-full max-w-md p-8 bg-white rounded-lg shadow-2xl transform transition-all duration-300 hover:scale-105">
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Student Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="studentId">
              Student ID
            </label>
            <input
              type="text"
              id="studentId"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your Student ID"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your Password"
              required
            />
          </div>
          {error && (
            <div className="text-red-600 text-center font-semibold">
              {error}
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-2 px-4 rounded-md hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentLogin;
