import React, { useEffect, useState } from "react";
import withAuth from "../utils/withAuth";
import Sidebar from "../components/Sidebar";
import AddNews from "../components/News/AddNews";
import Search from "../common/Search";
import axios from "axios";
import { Link } from "react-router-dom";

type NewsArticle = {
  id: string;
  title: string;
  description: string;
  excerpt: string;
  featured_image: string;
  category: string;
  tags: string;
  author: string;
  published_at: string;
  status: string;
  meta_title: string;
  meta_description: string;
  keywords: string;
  og_image: string;
};

const NewsPage = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const getNews = () => {
    axios
      .get("https://6810f7e927f2fdac24138508.mockapi.io/news")
      .then((res) => {
        setNews(res.data);
      })
      .catch((err) => {
        console.error("Error fetching news", err);
      });
  };

  const handleDelete = (id: string) => {
    axios
      .delete(`https://6810f7e927f2fdac24138508.mockapi.io/news/${id}`)
      .then(() => {
        getNews();
      })
      .catch((err) => {
        console.error("Error deleting news", err);
      });
  };

  const setItemToLocalStorage = (
    id: string,
    title: string,
    description: string,
    excerpt: string,
    featured_image: string,
    category: string,
    tags: string,
    author: string,
    published_at: string,
    status: string,
    meta_title: string,
    meta_description: string,
    keywords: string
  ) => {
    localStorage.setItem("id", id);
    localStorage.setItem("title", title);
    localStorage.setItem("description", description);
    localStorage.setItem("excerpt", excerpt);
    localStorage.setItem("featured_image", featured_image);
    localStorage.setItem("category", category);
    localStorage.setItem("tags", tags);
    localStorage.setItem("author", author);
    localStorage.setItem("published_at", published_at);
    localStorage.setItem("status", status);
    localStorage.setItem("meta_title", meta_title);
    localStorage.setItem("meta_description", meta_description);
    localStorage.setItem("keywords", keywords);
  };

  useEffect(() => {
    getNews();
  }, []);

  const filteredNews = news
    .filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((item) =>
      statusFilter === "All" ? true : item.status == statusFilter
    );

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-[#F8FAFC] px-6 py-4 overflow-y-auto">
        <div className="flex justify-between mb-10">
          <h1 className="text-3xl font-semibold text-[#1E293B] mb-6">News</h1>

          <AddNews />
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
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        <div className="overflow-auto max-h-[500px] bg-white shadow-md rounded-lg mt-4">
          <table className="min-w-full table-auto border-collapse text-sm text-slate-700">
            <thead className="bg-slate-100 text-xs font-medium uppercase text-slate-500">
              <tr>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Excerpt</th>
                <th className="px-4 py-2">Featured Image</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Tags</th>
                <th className="px-4 py-2">Author</th>
                <th className="px-4 py-2">Published At</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Meta Title</th>
                <th className="px-4 py-2">Meta Description</th>
                <th className="px-4 py-2">Keywords</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredNews.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50 border-b border-slate-200"
                >
                  <td className="px-4 py-2">{item.title}</td>
                  <td className="px-5 py-4">
                    {item.description.length > 50
                      ? item.description.substring(0, 50) + "..."
                      : item.description}
                  </td>
                  <td className="px-4 py-2">{item.excerpt}</td>
                  <td className="px-4 py-2">
                    <img
                      src={item.featured_image}
                      alt="featured"
                      className="w-8 h-8 rounded-full"
                    />
                  </td>
                  <td className="px-4 py-2">{item.category}</td>
                  <td className="px-4 py-2">{item.tags}</td>
                  <td className="px-4 py-2">{item.author}</td>
                  <td className="px-4 py-2">{item.published_at}</td>
                  <td className="px-4 py-2">{item.status}</td>
                  <td className="px-4 py-2">{item.meta_title}</td>
                  <td className="px-4 py-2">{item.meta_description}</td>
                  <td className="px-4 py-2">{item.keywords}</td>
                  <td className="px-4 py-2 text-center">
                    <Link to="/updatenews">
                      <button
                        className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 transition"
                        onClick={() =>
                          setItemToLocalStorage(
                            item.id,
                            item.title,
                            item.description,
                            item.excerpt,
                            item.featured_image,
                            item.category,
                            item.tags,
                            item.author,
                            item.published_at,
                            item.status,
                            item.meta_title,
                            item.meta_description,
                            item.keywords
                          )
                        }
                      >
                        Edit
                      </button>
                    </Link>
                    <button
                      className="ml-2 px-3 py-1 bg-rose-100 text-rose-700 rounded-md hover:bg-rose-200 transition"
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

export default withAuth(NewsPage);
