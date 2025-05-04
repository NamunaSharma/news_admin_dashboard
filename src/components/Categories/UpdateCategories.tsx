import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UpdateCategories = () => {
  const [id, setId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [color, setColor] = useState<string>("#ffffff");
  const [icon, setIcon] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    setId(localStorage.getItem("id") || "");
    setTitle(localStorage.getItem("title") || "");
    setDescription(localStorage.getItem("description") || "");
    setStatus(localStorage.getItem("status") || "");
    setColor(localStorage.getItem("color") || "#ffffff");
    setIcon(localStorage.getItem("icon") || "");
  }, []);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form reload
    axios
      .put(`https://680faee267c5abddd1963e2d.mockapi.io/api/news/${id}`, {
        title,
        description,
        status,
        color,
        icon,
      })
      .then(() => {
        navigate("/categories");
      })
      .catch((error) => {
        console.error("Error updating category:", error);
      });
  };

  return (
    <div className="flex justify-between">
      <Sidebar />
      <div className="bg-white flex flex-1 flex-col bg-gray-100 px-10 py-6">
        <h2 className="text-sky-600 text-2xl font-bold mb-6">
          Update Category
        </h2>

        <form className="w-full max-w-96" onSubmit={handleUpdate}>
          <div>
            <label className="block text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={title}
              placeholder="Enter the title"
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter description"
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

          <div>
            <label className="block text-gray-700 mb-2">Color</label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full border rounded-md h-12"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Icon</label>
            <input
              type="text"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter icon name or URL"
            />
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

export default UpdateCategories;
