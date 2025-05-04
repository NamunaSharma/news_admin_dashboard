import React, { useCallback, useState } from "react";
import Sidebar from "../Sidebar";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormCategory = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "",
    color: "#ffffff",
    icon: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const navigate = useNavigate(); // Changed to `navigate`

  const onDrop = useCallback((files: File[]) => {
    if (files.length > 0) {
      setImage(files[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if form fields are valid before proceeding
    if (
      !formData.title ||
      !formData.description ||
      !formData.color ||
      !formData.status ||
      !formData.icon ||
      !image
    ) {
      alert("Please enter both Title and Image.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      const base64Image = reader.result as string;

      // Send the form data via axios only after successful validation
      axios({
        method: "post",
        url: "https://680faee267c5abddd1963e2d.mockapi.io/api/news",
        data: {
          title: formData.title,
          description: formData.description,
          status: formData.status,
          color: formData.color,
          icon: formData.icon,
          image: base64Image,
        },
      }).then(() => {
        navigate("/categories"); // Corrected: navigate() instead of Table()
      });
    };

    if (image) {
      reader.readAsDataURL(image);
    }
  };

  return (
    <div className="flex justify-between">
      <Sidebar />
      <div className="bg-white flex flex-1 flex-col bg-gray-100 px-10 py-6">
        <h2 className="text-sky-600 text-2xl font-bold mb-6">
          Add New Category
        </h2>

        <form className="w-full max-w-96" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              placeholder="Enter the title"
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Image</label>
            <div
              className="p-4 border border-gray-200 mb-2"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p>Drag 'n' drop image or click to select</p>
              )}
            </div>
            {image && (
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="w-48 h-48 object-cover mt-2"
              />
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter description"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
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
              name="color"
              value={formData.color}
              onChange={(e) =>
                setFormData({ ...formData, color: e.target.value })
              }
              className="w-full border rounded-md h-12"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Icon</label>
            <input
              type="text"
              name="icon"
              value={formData.icon}
              onChange={(e) =>
                setFormData({ ...formData, icon: e.target.value })
              }
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter icon name or URL"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-200 mt-4"
          >
            Save Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormCategory;
