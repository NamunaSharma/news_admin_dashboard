import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UpdateNews = () => {
  const [id, setId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [excerpt, setExcerpt] = useState<string>("");
  const [featuredImage, setFeaturedImage] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [publishedAt, setPublishedAt] = useState<string>("");
  const [status, setStatus] = useState<string>("draft");
  const [metaTitle, setMetaTitle] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    setId(localStorage.getItem("id") || "");
    setTitle(localStorage.getItem("title") || "");
    setDescription(localStorage.getItem("description") || "");
    setExcerpt(localStorage.getItem("excerpt") || "");
    setFeaturedImage(localStorage.getItem("featured_image") || "");
    setCategory(localStorage.getItem("category") || "");
    setTags(localStorage.getItem("tags") || "");
    setAuthor(localStorage.getItem("author") || "");
    setPublishedAt(localStorage.getItem("published_at") || "");
    setStatus(localStorage.getItem("status") || "draft");
    setMetaTitle(localStorage.getItem("meta_title") || "");
  }, []);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();

    axios
      .put(`https://6810f7e927f2fdac24138508.mockapi.io/news/${id}`, {
        title,
        description,
        excerpt,
        featured_image: featuredImage,
        category,
        tags,
        author,
        published_at: publishedAt,
        status,
        meta_title: metaTitle,
      })
      .then(() => {
        navigate("/news");
      })
      .catch((error) => {
        console.error("Error updating news:", error);
      });
  };

  return (
    <div className="flex justify-between">
      <Sidebar />
      <div className="bg-white flex flex-1 flex-col bg-gray-100 px-10 py-6">
        <h2 className="text-sky-600 text-2xl font-bold mb-6">Update News</h2>

        <form className="w-full max-w-96" onSubmit={handleUpdate}>
          <div>
            <label className="block text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Excerpt</label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Short summary"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              Featured Image URL
            </label>
            <input
              type="text"
              value={featuredImage}
              onChange={(e) => setFeaturedImage(e.target.value)}
              placeholder="Image URL"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Category name"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Tags</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Comma-separated tags"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Author name"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Published At</label>
            <input
              type="datetime-local"
              value={publishedAt}
              onChange={(e) => setPublishedAt(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Meta Title</label>
            <input
              type="text"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              placeholder="Meta title for SEO"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-200 mt-4"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateNews;
