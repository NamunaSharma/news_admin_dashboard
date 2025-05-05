import React, { useState, useEffect } from "react";
import withAuth from "../utils/withAuth";
import Sidebar from "../components/Sidebar";
import AddCategories from "../components/Categories/AddCategories";
import axios from "axios";
import { Link } from "react-router-dom";
import AddAuthors from "../components/Authors/AddAuthors";
import Search from "../common/Search";
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
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState("All");

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

  const filteredCategory = data
    .filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((item) =>
      statusFilter === "All" ? true : item.status === statusFilter
    );

  return (
    <div className="flex justify-between">
      <Sidebar />
      <div className="flex flex-1 flex-col bg-[#f1f5f9] px-10 py-6 text-gray-800">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-semibold text-[#111827]">Categories</h1>
          <AddCategories />
        </div>
        <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <div className="mb-4">
          <label className="mr-2 font-medium">Filter by Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="overflow-x-auto bg-white shadow-lg rounded-xl border border-gray-200">
          <table className="min-w-full text-sm text-gray-800 table-auto">
            <thead className="bg-[#e5e7eb] text-xs font-semibold text-gray-600 uppercase">
              <tr>
                <th className="px-5 py-3 text-left">ID</th>
                <th className="px-5 py-3 text-left">Category</th>
                <th className="px-5 py-3 text-left">Description</th>
                <th className="px-5 py-3 text-left">Status</th>
                <th className="px-5 py-3 text-left">Color</th>
                <th className="px-5 py-3 text-left">Icon</th>
                <th className="px-5 py-3 text-left">Image</th>
                <th className="px-5 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategory.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-[#f9fafb] border-t align-middle"
                >
                  <td className="px-5 py-4 whitespace-nowrap">{item.id}</td>
                  <td className="px-5 py-4 whitespace-nowrap">{item.title}</td>
                  <td className="px-5 py-4">{item.description}</td>
                  <td className="px-5 py-4">
                    <span className="px-2 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-medium">
                      {item.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className="inline-block w-4 h-4 rounded-full border border-gray-300"
                      style={{ backgroundColor: item.color }}
                      title={item.color}
                    ></span>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">{item.icon}</td>
                  <td className="px-5 py-4">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt="Category"
                        className="w-8 h-8 rounded-full object-cover border border-gray-300"
                      />
                    ) : (
                      <span className="text-gray-400 text-xs">No Image</span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-center whitespace-nowrap">
                    <Link to="/updatecategory">
                      <button
                        className="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
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
                      className="ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
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
  );
};

export default withAuth(CategoryPage);
