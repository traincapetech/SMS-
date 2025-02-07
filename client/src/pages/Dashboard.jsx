import React, { useEffect, useState } from "react";
import Sidebar from "../componenets/Sidebar";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    phoneNumber: "",
    email: "",
    address: "",
    grade: "",
    studentId: "",
    password: "",
    profileImage: null,
    fatherName: "",
    motherName: "",
    fatherOccupation: "",
    motherOccupation: "",
    fatherPhoneNumber: "",
    motherPhoneNumber: "",
    pastSchool: "",
  });

  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const generateStudentId = () => {
    const randomId = `S${Math.floor(Math.random() * 10000)}ID`;
    setFormData((prevState) => ({
      ...prevState,
      studentId: randomId,
    }));
  };

  const generatePassword = () => {
    const length = 8;
    const charset =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setFormData((prevState) => ({
      ...prevState,
      password: password,
    }));
  };

  const handleChange = (e, type) => {
    const { value, checked, files } = e.target;

    if (type === "fileUpload" || type === "imageUpload") {
      const file = files[0];
      setFormData({ ...formData, profileImage: file });
    } else {
      setFormData({ ...formData, [e.target.id]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Generate student ID and password first
    generateStudentId();
    generatePassword();

    // Move to the confirmation step after submission
    setCurrentStep(3);
  };

  useEffect(() => {
    if (currentStep === 3 && formData.studentId && formData.password) {
      // Save student data to local storage
      const students = JSON.parse(localStorage.getItem("students")) || [];
      students.push(formData);
      localStorage.setItem("students", JSON.stringify(students));

      // Navigate to the viewStudent page
      navigate("/viewStudent", { state: { studentData: formData } });

      // Optional: Clear form data after submission if needed
      setFormData({
        firstName: "",
        lastName: "",
        age: "",
        gender: "",
        phoneNumber: "",
        email: "",
        address: "",
        grade: "",
        studentId: "",
        password: "",
        profileImage: null,
        fatherName: "",
        motherName: "",
        fatherOccupation: "",
        motherOccupation: "",
        fatherPhoneNumber: "",
        motherPhoneNumber: "",
        pastSchool: "",
      });
    }
  }, [currentStep, formData, navigate]);

  const isFormValid = () => {
    if (currentStep === 1) {
      return (
        formData.firstName &&
        formData.lastName &&
        formData.age &&
        formData.gender &&
        formData.phoneNumber &&
        formData.email &&
        formData.address
      );
    } else if (currentStep === 2) {
      return (
        formData.grade &&
        formData.fatherName &&
        formData.fatherOccupation &&
        formData.fatherPhoneNumber &&
        formData.motherName &&
        formData.motherOccupation &&
        formData.motherPhoneNumber &&
        formData.pastSchool
      );
    }
    return true;
  };

  const handleNextStep = () => {
    if (isFormValid()) {
      setCurrentStep(currentStep + 1);
    } else {
      alert("Please fill in all required fields before proceeding.");
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row min-h-screen">
        <Sidebar />

        <div className="flex-1 w-full justify-center h-fit max-w-7xl p-4 sm:p-8 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="bg-white m-auto p-6 sm:p-8 rounded-lg shadow-2xl h-fit w-full sm:w-3xl transform transition-all duration-300 hover:scale-105">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 w-fit bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Register New Student
            </h2>

            <form onSubmit={handleSubmit}>
              {/* Step 1: Personal Info */}
              {currentStep === 1 && (
                <>
                  <div className="text-2xl sm:text-3xl font-bold mb-6 text-gray-700">
                    Personal Details
                  </div>
                  <div className="space-y-6">
                    {[ 
                      { id: "firstName", label: "First Name", type: "text" },
                      { id: "lastName", label: "Last Name", type: "text" },
                      { id: "email", label: "Email", type: "email" },
                      { id: "age", label: "Age", type: "number" },
                      {
                        id: "gender",
                        label: "Gender",
                        type: "select",
                        options: ["Male", "Female", "Other"],
                      },
                      { id: "phoneNumber", label: "Phone Number", type: "tel" },
                      { id: "address", label: "Address", type: "textarea" },
                    ].map((field) => (
                      <div key={field.id} className="mb-4">
                        <label
                          className="block text-gray-700 font-semibold mb-2"
                          htmlFor={field.id}
                        >
                          {field.label}
                        </label>
                        {field.type === "select" ? (
                          <select
                            id={field.id}
                            value={formData[field.id]}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                [field.id]: e.target.value,
                              })
                            }
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          >
                            <option value="">Select {field.label}</option>
                            {field.options.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        ) : field.type === "textarea" ? (
                          <textarea
                            id={field.id}
                            value={formData[field.id]}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                [field.id]: e.target.value,
                              })
                            }
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        ) : (
                          <input
                            type={field.type}
                            id={field.id}
                            value={formData[field.id]}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                [field.id]: e.target.value,
                              })
                            }
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-2 px-4 rounded-md hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  >
                    Next
                  </button>
                </>
              )}

              {/* Step 2: Father's and Mother's Info */}
              {currentStep === 2 && (
                <>
                  <div className="text-2xl sm:text-3xl font-bold mb-6 text-gray-700">
                    Father's and Mother's Details
                  </div>
                  <div className="space-y-6">
                    {[ 
                      { id: "fatherName", label: "Father's Name", type: "text" },
                      { id: "fatherOccupation", label: "Father's Occupation", type: "text" },
                      { id: "fatherPhoneNumber", label: "Father's Phone Number", type: "tel" },
                      { id: "motherName", label: "Mother's Name", type: "text" },
                      { id: "motherOccupation", label: "Mother's Occupation", type: "text" },
                      { id: "motherPhoneNumber", label: "Mother's Phone Number", type: "tel" },
                      { id: "pastSchool", label: "Past School", type: "text" },
                    ].map((field) => (
                      <div key={field.id} className="mb-4">
                        <label
                          className="block text-gray-700 font-semibold mb-2"
                          htmlFor={field.id}
                        >
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          id={field.id}
                          value={formData[field.id]}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              [field.id]: e.target.value,
                            })
                          }
                          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={handlePreviousStep}
                    className="w-full bg-gray-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 mb-4 transition-all duration-300"
                  >
                    Previous
                  </button>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-2 px-4 rounded-md hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  >
                    Register Student
                  </button>
                </>
              )}

              {/* Step 3: Confirmation */}
              {currentStep === 3 && formData.studentId && formData.password && (
                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-green-500">
                    Registration Successful!
                  </h3>
                  <p>
                    <strong>Student ID:</strong> {formData.studentId}
                  </p>
                  <p>
                    <strong>Password:</strong> {formData.password}
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
