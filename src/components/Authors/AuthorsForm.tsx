import React, { useCallback, useState } from "react";
import Sidebar from "../Sidebar";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthorForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    status: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.role || !formData.status) {
      alert("Please fill in all fields.");
      return;
    }

    axios.post("https://680faee267c5abddd1963e2d.mockapi.io/api/authors", formData)
      .then(() => {
        navigate("/authors");
      })
      .catch((err) => {
        console.error("Error submitting form", err);
      });
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-1 items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-sky-600 text-2xl font-bold mb-6">Add New Author</h2>
        <form className="space-y-4 " onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              placeholder="Enter name"
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              placeholder="Enter email"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Role</label>
            <input
              type="text"
              value={formData.role}
              placeholder="Enter role"
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full border border-gray-300 rounded-md p-2"
            >
              <option value="">Select status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-200 mt-4"
          >
            Save Author
          </button>
        </form>
        </div>
      </div>
    </div>
  );
};

export default AuthorForm;