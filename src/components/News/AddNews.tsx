import React from 'react'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'

const AddNews = () => {
  return (
<Link
      to="/newsform"
      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center gap-2"
    >
      Add News
      <Plus size={20} />
    </Link>
  )
}

export default AddNews