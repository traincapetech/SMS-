import React from "react";
import { Routes, Route } from "react-router-dom";
// import TeacherPanel from "../componenets/TeacherPanel";
import Dashboard from "../pages/Dashboard";
import Assignments from "../pages/Assignments";
import TeacherDashboard from "../pages/TeacherDashboard";
import ClassesPage from "../pages/ClassesPage";
import ViewStudent from "../pages/ViewStudent";
import StudentLogin from "../componenets/studentLogin";
import StudentDashboard from "../pages/StudentDashboard";


const AllRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/viewStudent" element={<ViewStudent />} />
      <Route path="/assignments" element={<Assignments />} />
      <Route path="/teacherLogin" element={<StudentLogin />} />
      <Route path="/teacherDashboard" element={<TeacherDashboard />} />
      <Route path="/StudentDashboard" element={<StudentDashboard />} />
      <Route path="/classes" element={<ClassesPage />} />
    </Routes>
  );
};

export default AllRoute;
