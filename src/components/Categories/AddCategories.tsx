import React from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const AddCategories = () => {
  const navigate = useNavigate();

  return (
    <Link
      to="/form-category"
      className="bg-[#1B1F3B] hover:bg-blue-950 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center gap-2"
    >
      Add Category
      <Plus size={20} />
    </Link>
  );
};

export default AddCategories;
