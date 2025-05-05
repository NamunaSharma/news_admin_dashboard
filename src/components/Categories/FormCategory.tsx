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
  const navigate = useNavigate();

  const onDrop = useCallback((files: File[]) => {
    if (files.length > 0) {
      setImage(files[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.description ||
      !formData.color ||
      !formData.status ||
      !formData.icon ||
      !image
    ) {
      alert("Please fill all fields and upload an image.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      const base64Image = reader.result as string;

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
        navigate("/categories");
      });
    };

    if (image) {
      reader.readAsDataURL(image);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-1 items-center justify-center bg-gray-100 p-6">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
          <h2 className="text-sky-600 text-2xl font-bold mb-6 text-center">
            Add New Category
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 ">
            <div>
              <label className="block text-gray-700 mb-1">Title</label>
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
              <label className="block text-gray-700 mb-1">Image</label>
              <div
                {...getRootProps()}
                className="border border-gray-300 rounded-md p-4 text-center cursor-pointer hover:bg-gray-50"
              >
                <input {...getInputProps()} />
                <p className="text-gray-500">
                  {isDragActive ? "Drop the image here..." : "Drag & drop or click to select image"}
                </p>
              </div>
              {image && (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  className="w-32 h-32 object-cover mt-2 rounded"
                />
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="Enter description"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Status</label>
              <select
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
              <label className="block text-gray-700 mb-1">Color</label>
              <input
                type="color"
                value={formData.color}
                onChange={(e) =>
                  setFormData({ ...formData, color: e.target.value })
                }
                className="w-full h-12 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Icon</label>
              <input
                type="text"
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
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
            >
              Save Category
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormCategory;
