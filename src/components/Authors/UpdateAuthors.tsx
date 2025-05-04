import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UpdateAuthor = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setId(localStorage.getItem("id") || "");
    setName(localStorage.getItem("name") || "");
    setEmail(localStorage.getItem("email") || "");
    setRole(localStorage.getItem("role") || "");
    setStatus(localStorage.getItem("status") || "");
  }, []);

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .put(`https://680faee267c5abddd1963e2d.mockapi.io/api/authors/${id}`, {
        name,
        email,
        role,
        status,
      })
      .then(() => {
        navigate("/authors");
      })
      .catch((error) => {
        console.error("Error updating author:", error);
      });
  };

  return (
    <div className="flex justify-between">
      <Sidebar />
      <div className="bg-white flex flex-1 flex-col bg-gray-100 px-10 py-6">
        <h2 className="text-sky-600 text-2xl font-bold mb-6">Update Author</h2>

        <form className="w-full max-w-96" onSubmit={handleUpdate}>
          <div>
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={name}
              placeholder="Enter name"
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Role</label>
            <input
              type="text"
              value={role}
              placeholder="Enter role"
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
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
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateAuthor;
