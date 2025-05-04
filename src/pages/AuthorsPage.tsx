import React, { useState, useEffect } from "react";
import withAuth from "../utils/withAuth";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { Link } from "react-router-dom";

// Define Author type
interface Author {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

const AuthorsPage: React.FC = () => {
  const [data, setData] = useState<Author[]>([]);

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

  return (
    <div className="flex justify-between">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gray-100 px-10 py-6">
        <div className="flex justify-between mb-10">
          <h1 className="text-3xl font-bold">Authors</h1>
          <Link
            to="/authorsform"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add Author
          </Link>
        </div>
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase">
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
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-gray-100">
                  <td className="px-6 py-4">{item.id}</td>
                  <td className="px-6 py-4">{item.name}</td>
                  <td className="px-6 py-4">{item.email}</td>
                  <td className="px-6 py-4">{item.role}</td>
                  <td className="px-6 py-4">{item.status}</td>
                  <td className="px-6 py-4 text-center">
                    <Link to="/updateauthor">
                      <button
                        className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600"
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
  );
};

export default withAuth(AuthorsPage);
