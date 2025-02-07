import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../componenets/Sidebar";

const ViewStudent = () => {
  const [students, setStudents] = useState([]);
  const [sortCriteria, setSortCriteria] = useState("firstName");
  const [filterGender, setFilterGender] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Get the list of students from localStorage
    const storedStudents = JSON.parse(localStorage.getItem("students")) || [];
    setStudents(storedStudents);
  }, []);

  const handleStudentClick = (student) => {
    // Navigate to detailed view for a selected student
    navigate("/viewStudent", { state: { studentData: student } });
  };

  const handleDeleteStudent = (studentId) => {
    const updatedStudents = students.filter((student) => student.studentId !== studentId);
    setStudents(updatedStudents);
    localStorage.setItem("students", JSON.stringify(updatedStudents));
  };

  // Filter and sort students based on criteria
  const filteredStudents = students
    .filter((student) => (filterGender ? student.gender === filterGender : true))
    .sort((a, b) => {
      if (sortCriteria === "firstName") {
        return a.firstName.localeCompare(b.firstName);
      } else if (sortCriteria === "lastName") {
        return a.lastName.localeCompare(b.lastName);
      } else if (sortCriteria === "age") {
        return a.age - b.age;
      }
      return 0;
    });

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              All Registered Students
            </h1>
            <p className="text-lg text-gray-600">View and manage all registered student details.</p>
          </div>

          {/* Sorting and Filtering Controls */}
          <div className="flex justify-between mb-6 p-4 rounded-lg">
            <div>
              <label className="mr-2 font-semibold text-gray-700">Sort by:</label>
              <select
                className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={sortCriteria}
                onChange={(e) => setSortCriteria(e.target.value)}
              >
                <option value="firstName">First Name</option>
                <option value="lastName">Last Name</option>
                <option value="age">Age</option>
              </select>
            </div>

            <div className="flex space-x-4">
              <div>
                <label className="mr-2 font-semibold text-gray-700">Filter by Gender:</label>
                <select
                  className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filterGender}
                  onChange={(e) => setFilterGender(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
          </div>

          {/* Student Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents.map((student, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
                onClick={() => handleStudentClick(student)}
              >
                {/* Profile Picture */}
                {student.profileImage && (
                  <div className="flex justify-center mb-4">
                    <img
                      src={URL.createObjectURL(student.profileImage)}
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
                    />
                  </div>
                )}

                <h3 className="text-2xl font-bold text-gray-800 text-center mb-4">
                  {student.firstName} {student.lastName}
                </h3>

                <div className="space-y-3">
                  {[
                    { label: "Email", value: student.email },
                    { label: "Age", value: student.age },
                    { label: "Gender", value: student.gender },
                    { label: "Phone", value: student.phoneNumber },
                    { label: "Address", value: student.address },
                    { label: "Father's Name", value: student.fatherName },
                    { label: "Mother's Name", value: student.motherName },
                    { label: "Father's Occupation", value: student.fatherOccupation },
                    { label: "Mother's Occupation", value: student.motherOccupation },
                    { label: "Past School", value: student.pastSchool },
                    { label: "Student ID", value: student.studentId, className: "text-blue-600 font-bold" },
                    { label: "Password", value: student.password, className: "text-green-600 font-bold" },
                  ].map((field, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span className="font-medium text-gray-600">{field.label}:</span>
                      <span className={field.className || "text-gray-700"}>{field.value || "Not provided"}</span>
                    </div>
                  ))}
                </div>

                {/* Delete Button */}
                <div className="text-center mt-6">
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent navigating to student detail view
                      handleDeleteStudent(student.studentId);
                    }}
                    className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
                  >
                    Delete Student
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewStudent;
