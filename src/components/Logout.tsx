import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import withAuth from "../utils/withAuth";
const Logout: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
      >
        Logout
      </button>
  );
};

export default withAuth(Logout);
