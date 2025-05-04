import React from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const AddAuthors = () => {
  const navigate = useNavigate();

  return (
    <Link
      to="/authorsform"
      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center gap-2"
    >
      Add Authors
      <Plus size={20} />
    </Link>
  );
};

export default AddAuthors;
