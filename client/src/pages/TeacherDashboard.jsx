import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const TeacherDashboard = () => {
  const { state } = useLocation();
  const teacherData = state?.teacherData;

  const [quizTitle, setQuizTitle] = useState("");
  const [quizQuestions, setQuizQuestions] = useState([
    { question: "", options: ["", "", "", ""], correctAnswer: "" },
  ]);
  const [selectedClass, setSelectedClass] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleAddQuestion = () => {
    setQuizQuestions([
      ...quizQuestions,
      { question: "", options: ["", "", "", ""], correctAnswer: "" },
    ]);
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...quizQuestions];
    updatedQuestions[index][field] = value;
    setQuizQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...quizQuestions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuizQuestions(updatedQuestions);
  };

  const handleSubmitQuiz = (e) => {
    e.preventDefault();

    // Validate quiz data
    if (!quizTitle || !selectedClass || quizQuestions.some(q => !q.question || q.options.some(opt => !opt) || !q.correctAnswer)) {
      alert("Please fill in all fields for the quiz.");
      return;
    }

    // Create quiz object
    const quiz = {
      title: quizTitle,
      class: selectedClass,
      questions: quizQuestions,
      createdBy: teacherData.teacherId,
    };

    // Save quiz to localStorage
    const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
    quizzes.push(quiz);
    localStorage.setItem("quizzes", JSON.stringify(quizzes));

    // Reset form and show success message
    setQuizTitle("");
    setQuizQuestions([{ question: "", options: ["", "", "", ""], correctAnswer: "" }]);
    setSelectedClass("");
    setSuccessMessage("Quiz created successfully!");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="my-5 md:mx-14 mx-2 w-full p-3 md:p-8 bg-white rounded-lg shadow-2xl">
        <h2 className="md:text-6xl text-lg font-bold text-center mb-6  bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Teacher Details
        </h2>

        {/* Teacher Details */}
        <div className="space-y-4 mb-8">
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700 text-xl">Name:</span>
            <span className="text-gray-800 font-bold text-xl">
              {teacherData.firstName} {teacherData.lastName}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700 text-xl">Email:</span>
            <span className="text-gray-800 text-xl">{teacherData.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700 ">Teacher ID:</span>
            <span className="text-blue-600 font-bold">{teacherData.teacherId}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">Classes Assigned:</span>
            <span className="text-gray-800">{teacherData.classesAssigned.join(", ")}</span>
          </div>
        </div>

        {/* Quiz Creation Form */}
        <form onSubmit={handleSubmitQuiz} className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Create a Quiz</h3>

          {/* Quiz Title */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="quizTitle">
              Quiz Title
            </label>
            <input
              type="text"
              id="quizTitle"
              value={quizTitle}
              onChange={(e) => setQuizTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter quiz title"
              required
            />
          </div>

          {/* Select Class */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="selectedClass">
              Select Class
            </label>
            <select
              id="selectedClass"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select a class</option>
              {teacherData.classesAssigned.map((cls, index) => (
                <option key={index} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
          </div>

          {/* Quiz Questions */}
          {quizQuestions.map((question, questionIndex) => (
            <div key={questionIndex} className="space-y-4  p-4 rounded-lg">
              <div>
                <label className="block text-red-500 text-2xl font-semibold mb-2">
                  Question {questionIndex + 1}
                </label>
                <input
                  type="text"
                  value={question.question}
                  onChange={(e) =>
                    handleQuestionChange(questionIndex, "question", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter question"
                  required
                />
              </div>

              {/* Options */}
              <div className="space-y-2">
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex}>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Option {optionIndex + 1}
                    </label>
                    <input
                      type="text"
                      value={option}
                      onChange={(e) =>
                        handleOptionChange(questionIndex, optionIndex, e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={`Enter option ${optionIndex + 1}`}
                      required
                    />
                  </div>
                ))}
              </div>

              {/* Correct Answer */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Correct Answer
                </label>
                <select
                  value={question.correctAnswer}
                  onChange={(e) =>
                    handleQuestionChange(questionIndex, "correctAnswer", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select the correct answer</option>
                  {question.options.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}

          {/* Add Question Button */}
          <button
            type="button"
            onClick={handleAddQuestion}
            className="w-full bg-gray-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-300"
          >
            Add Question
          </button>

          {/* Submit Quiz Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-2 px-4 rounded-md hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          >
            Create Quiz
          </button>
        </form>

        {/* Success Message */}
        {successMessage && (
          <div className="mt-6 text-center text-green-600 font-semibold">
            {successMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;