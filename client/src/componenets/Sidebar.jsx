import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ onSelect }) => {
  return (
    <div className="md:w-64 w-full bg-blue-700 text-white p-6 md:min-h-screen h-auto">
      <h1 className="text-2xl font-semibold mb-6 border-b">Teacher Dashboard</h1>
      <ul className="space-y-4">
        <li>
          <Link
            to="/"
            className="block hover:bg-indigo-700 p-2 rounded-md"
            onClick={() => onSelect('dashboard')}
          >
            Register
          </Link>
        </li>
        <li>
          <Link
            to="/assignments" 
            className="block hover:bg-indigo-700 p-2 rounded-md"
            onClick={() => onSelect('assignments')}
          >
            Assignments
          </Link>
        </li>
        <li>
          <Link
            to="/viewStudent"
            className="block hover:bg-indigo-700 p-2 rounded-md"
            onClick={() => onSelect('views')}
          >
            View Student
          </Link>
        </li>
        <li>
          <Link
            to="/teacherLogin"
            className="block hover:bg-indigo-700 p-2 rounded-md"
            onClick={() => onSelect('views')}
          >
            Student Login
          </Link>
        </li>
        {/* <li>
          <Link
            to="/classes"
            className="block hover:bg-indigo-700 p-2 rounded-md"
            onClick={() => onSelect('views')}
          >
            Classes
          </Link>
        </li> */}
      </ul>
    </div>
  );
};

export default Sidebar;
