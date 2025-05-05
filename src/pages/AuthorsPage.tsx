import React, { useState, useEffect } from "react";
import withAuth from "../utils/withAuth";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { Link } from "react-router-dom";
import Search from "../common/Search";

interface Author {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

const AuthorsPage: React.FC = () => {
  const [data, setData] = useState<Author[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState("All");

  const handleDelete = (id: string): void => {
    axios
      .delete(`https://680faee267c5abddd1963e2d.mockapi.io/api/authors/${id}`)
      .then(() => {
        getAuthors();
      })
      .catch((err) => {
        console.error("Error deleting author", err);
      });
  };

  const getAuthors = (): void => {
    axios
      .get<Author[]>("https://680faee267c5abddd1963e2d.mockapi.io/api/authors")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching authors", err);
      });
  };

  const setItemToLocalStorage = (
    id: string,
    name: string,
    email: string,
    role: string,
    status: string
  ): void => {
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("role", role);
    localStorage.setItem("status", status);
  };

  useEffect(() => {
    getAuthors();
  }, []);

  const filteredauthors = data
    .filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((item) =>
      statusFilter === "All" ? true : item.status === statusFilter
    );

  return (
    <div className="flex justify-between">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-slate-50 px-10 py-6">
        <div className="flex justify-between mb-10">
          <h1 className="text-3xl font-semibold text-slate-800">Authors</h1>
          <Link
            to="/authorsform"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-200"
          >
            Add Author
          </Link>
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

        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full text-sm text-slate-700">
            <thead className="bg-slate-200 text-left text-xs font-semibold text-slate-600 uppercase">
              <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredauthors.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-100 transition duration-150"
                >
                  <td className="px-6 py-4">{item.id}</td>
                  <td className="px-6 py-4">{item.name}</td>
                  <td className="px-6 py-4">{item.email}</td>
                  <td className="px-6 py-4">{item.role}</td>
                  <td className="px-6 py-4">{item.status}</td>
                  <td className="px-6 py-4 text-center">
                    <Link to="/updateauthor">
                      <button
                        className="p-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition duration-200"
                        onClick={() =>
                          setItemToLocalStorage(
                            item.id,
                            item.name,
                            item.email,
                            item.role,
                            item.status
                          )
                        }
                      >
                        Edit
                      </button>
                    </Link>
                    <button
                      className="ml-2 p-2 bg-rose-600 text-white rounded-md hover:bg-rose-700 transition duration-200"
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

export default withAuth(AuthorsPage);
