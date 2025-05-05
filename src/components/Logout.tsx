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
        className="bg-[#F57C00] hover:bg-orange-900 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
      >
        Logout
      </button>
  );
};

export default withAuth(Logout);
