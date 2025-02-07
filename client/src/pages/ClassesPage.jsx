import React, { useState } from "react";
import Sidebar from "../componenets/Sidebar";

const ClassesPage = () => {
  // Retrieve teachers and quizzes data from localStorage
  const teachers = JSON.parse(localStorage.getItem("teachers")) || [];
  const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];

  // Create a map to group teachers by their assigned classes
  const classesMap = teachers.reduce((acc, teacher) => {
    teacher.classesAssigned.forEach((cls) => {
      if (!acc[cls]) {
        acc[cls] = [];
      }
      acc[cls].push(teacher);
    });
    return acc;
  }, {});

  // State to track the selected class
  const [selectedClass, setSelectedClass] = useState(null);

  // Function to handle class card click
  const handleClassClick = (className) => {
    setSelectedClass(className);
  };

  // Get quizzes for the selected class
  const classQuizzes = selectedClass
    ? quizzes.filter((quiz) => quiz.class === selectedClass)
    : [];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 p-8 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Classes and Assigned Teachers
            </h1>
            <p className="text-lg text-gray-600">
              View all classes and the teachers assigned to them.
            </p>
          </div>

          {/* Classes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(classesMap).map(([className, teachers]) => (
              <div
                key={className}
                onClick={() => handleClassClick(className)}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 cursor-pointer"
              >
                <h3 className="text-2xl font-bold text-gray-800 text-center mb-4">
                  {className}
                </h3>

                {/* List of Teachers Assigned to the Class */}
                <div className="space-y-3">
                  {teachers.map((teacher, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      {/* Profile Picture (if available) */}
                      {teacher.profileImageUrl && (
                        <img
                          src={teacher.profileImageUrl}
                          alt="Profile"
                          className="w-10 h-10 rounded-full object-cover border-2 border-blue-100"
                        />
                      )}
                      <div>
                        <p className="font-semibold text-gray-700">
                          {teacher.firstName} {teacher.lastName}
                        </p>
                        <p className="text-sm text-gray-500">
                          {teacher.subjects.join(", ")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Display Quizzes for Selected Class */}
          {selectedClass && (
            <div className="mt-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Quizzes for {selectedClass}
              </h2>
              {classQuizzes.length > 0 ? (
                classQuizzes.map((quiz, quizIndex) => (
                  <div
                    key={quizIndex}
                    className="bg-white p-6 rounded-lg shadow-md mb-6"
                  >
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                      {quiz.title}
                    </h3>
                    <div className="space-y-4">
                      {quiz.questions.map((question, questionIndex) => (
                        <div key={questionIndex} className="space-y-2">
                          <p className="font-semibold text-gray-700">
                            Question {questionIndex + 1}: {question.question}
                          </p>
                          <ul className="list-disc list-inside">
                            {question.options.map((option, optionIndex) => (
                              <li
                                key={optionIndex}
                                className={`text-gray-600 ${
                                  option === question.correctAnswer
                                    ? "font-bold text-green-600"
                                    : ""
                                }`}
                              >
                                {option}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No quizzes available for this class.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassesPage;
