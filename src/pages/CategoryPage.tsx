import React, { useState, useEffect } from "react";
import withAuth from "../utils/withAuth";
import Sidebar from "../components/Sidebar";
import AddCategories from "../components/Categories/AddCategories";
import axios from "axios";
import { Link } from "react-router-dom";
import AddAuthors from "../components/Authors/AddAuthors";

type Category = {
  id: string;
  title: string;
  description: string;
  status: string;
  color: string;
  icon: string;
  image?: string;
};

const CategoryPage = () => {
  const [data, setData] = useState<Category[]>([]);

  const handleDelete = (id: string) => {
    axios
      .delete(`https://680faee267c5abddd1963e2d.mockapi.io/api/news/${id}`)
      .then(() => {
        getCategory(); // Refresh data after delete
      })
      .catch((err) => {
        console.error("Error deleting category", err);
      });
  };

  function getCategory() {
    axios
      .get("https://680faee267c5abddd1963e2d.mockapi.io/api/news")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching categories", err);
      });
  }
  const setItemToLocalStorage = (
    id: string,
    title: string,
    description: string,
    status: string,
    color: string,
    icon: string,
    image?: string
  ) => {
    localStorage.setItem("id", id);
    localStorage.setItem("title", title);
    localStorage.setItem("description", description);
    localStorage.setItem("status", status);
    localStorage.setItem("color", color);
    localStorage.setItem("icon", icon);
    localStorage.setItem("image", image || "");
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <>
      <div className="flex justify-between">
        <Sidebar />
        <div className="flex flex-1 flex-col bg-gray-100 px-10 py-6">
          <div className="flex justify-between mb-10">
            <h1 className="text-3xl font-bold gap-4">Categories</h1>
            <AddCategories />
          </div>
          <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase">
                <tr>
                  <th className="px-6 py-3">ID</th>
                  <th className="px-6 py-3">Category</th>
                  <th className="px-6 py-3">Description</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Color</th>
                  <th className="px-6 py-3">Icon</th>
                  <th className="px-6 py-3">Image</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-100">
                    <td className="px-6 py-4">{item.id}</td>
                    <td className="px-6 py-4">{item.title}</td>
                    <td className="px-6 py-4">{item.description}</td>
                    <td className="px-6 py-4">{item.status}</td>
                    <td className="px-6 py-4">{item.color}</td>
                    <td className="px-6 py-4">{item.icon}</td>
                    <td className="px-6 py-4">
                      <img
                        src={item.image}
                        alt="image"
                        className="w-8 h-8 rounded-full"
                      />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Link to="/updatecategory">
                        <button
                          className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                          onClick={() =>
                            setItemToLocalStorage(
                              item.id,
                              item.title,
                              item.description,
                              item.status,
                              item.color,
                              item.icon,
                              item.image || ""
                            )
                          }
                        >
                          Edit
                        </button>
                      </Link>
                      <button
                        className="ml-2 p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default withAuth(CategoryPage);
