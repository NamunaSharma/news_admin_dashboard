import React, { useEffect, useState } from "react";
import withAuth from "../utils/withAuth";
import Sidebar from "../components/Sidebar";
import AddNews from "../components/News/AddNews";
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
        getNews(); // Refresh news list after deletion
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
    keywords: string,
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

  return (
    <div className="flex justify-between">
      <Sidebar />
      <div className="flex flex-1 flex-col bg-gray-100 px-10 py-6">
        <div className="flex justify-between mb-10">
          <h1 className="text-3xl font-bold gap-4">News</h1>
          <AddNews />
        </div>
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full table-auto border-collapse text-sm text-gray-700">
            <thead className="bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase">
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
              {news.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{item.title}</td>
                  <td className="px-4 py-2">{item.description}</td>
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
                        className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600"
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
                            item.keywords,
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

export default withAuth(NewsPage);
