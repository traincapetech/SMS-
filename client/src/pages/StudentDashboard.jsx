import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../componenets/Sidebar";


const StudentDashboard = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const studentData = state?.studentData;

  // Sample notifications (this could be replaced with dynamic data)
  const notifications = [
    {
      id: 1,
      message: "Your final exam for Math is scheduled for next week, February 15th.",
      type: "Exam",
    },
    {
      id: 2,
      message: "Teacher's remark: Excellent performance in your recent History exam. Keep it up!",
      type: "Remark",
    },
    {
      id: 3,
      message: "Don't forget to submit your Science project by February 10th.",
      type: "Reminder",
    },
  ];

  if (!studentData) {
    return (
      <div className="flex min-h-screen justify-center items-center">
        <p className="text-xl font-bold text-gray-800">No student data available</p>
      </div>
    );
  }

  const handleLogout = () => {
    // Optionally, clear data or reset login state if necessary
    navigate("/");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Welcome, {studentData.firstName} {studentData.lastName}
            </h1>
            <p className="text-lg text-gray-600">Your student dashboard.</p>
          </div>

          {/* Notifications Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 mb-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Notifications</h3>
            {notifications.length > 0 ? (
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-md ${
                      notification.type === "Exam"
                        ? "bg-yellow-100 border-l-4 border-yellow-600"
                        : notification.type === "Remark"
                        ? "bg-green-100 border-l-4 border-green-600"
                        : "bg-blue-100 border-l-4 border-blue-600"
                    }`}
                  >
                    <p className="font-medium text-gray-800">{notification.message}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No notifications at the moment.</p>
            )}
          </div>

          {/* Student Information */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Student Profile</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Student ID:</span>
                <span className="text-red-700 font-bold">{studentData.studentId}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Email:</span>
                <span className="text-gray-700">{studentData.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Age:</span>
                <span className="text-gray-700">{studentData.age}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Gender:</span>
                <span className="text-gray-700">{studentData.gender}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Phone:</span>
                <span className="text-gray-700">{studentData.phoneNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Address:</span>
                <span className="text-gray-700">{studentData.address}</span>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          {/* <div className="mt-6 text-center">
            <button
              onClick={() => navigate("/studentProfile")}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
            >
              View Profile
            </button>
            <button
              onClick={() => navigate("/studentGrades")}
              className="ml-4 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
            >
              View Grades
            </button>
          </div> */}

          {/* Logout Button */}
          <div className="mt-6 text-center">
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
