import React, { useState } from 'react';
import Sidebar from '../componenets/Sidebar';

const Assignments = () => {
  // State to hold uploaded PDFs
  const [files, setFiles] = useState([]);
  const [fileInput, setFileInput] = useState(null);

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      // Create a file URL and add it to the files array
      const fileUrl = URL.createObjectURL(file);
      setFiles([...files, { name: file.name, url: fileUrl }]);
      setFileInput(null); 
    } else {
      alert('Please upload a valid PDF file.');
    }
  };

  // Handle file deletion
  const handleDeleteFile = (fileUrl) => {
    setFiles(files.filter((file) => file.url !== fileUrl));
  };

  return (
    <>
    <div className='flex'>
    <div>
      <Sidebar />
    </div>
    <div className="p-8 h-screen w-full">
      <h2 className="text-2xl font-semibold mb-6">Upload Assignments</h2>

      {/* Upload Form */}
      <div className="mb-6">
        <label
          htmlFor="upload-pdf"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Upload PDF Assignment
        </label>
        <input
          type="file"
          id="upload-pdf"
          accept="application/pdf"
          onChange={handleFileUpload}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-md p-2"
        />
      </div>

      {/* Display List of Uploaded PDFs */}
      <div className="space-y-4">
        {files.length > 0 ? (
          files.map((file, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline"
                >
                  {file.name}
                </a>
              </div>
              <button
                onClick={() => handleDeleteFile(file.url)}
                className="bg-red-600 text-white py-1 px-4 rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No assignments uploaded yet.</p>
        )}
      </div>
    </div>
    </div>
    </>
  );
};

export default Assignments;
