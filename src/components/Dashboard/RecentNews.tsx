import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RecentNews = () => {
  const [recentNews, setRecentNews] = useState<any[]>([]);
  const [totalArticles, setTotalArticles] = useState<number>(0);

  useEffect(() => {
    axios
      .get("https://6810f7e927f2fdac24138508.mockapi.io/news")
      .then((response) => {
        const data = response.data;
        setTotalArticles(data.length);

        const sortedNews = [...data].sort((a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        setRecentNews(sortedNews.slice(0, 5));
      })
      .catch((error) => {
        console.error("Error fetching recent news:", error);
      });
  }, []);

  return (
        <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Recent News</h2>
          <ul className="space-y-3">
            {recentNews.map((news) => (
              <li
                key={news.id}
                className="border border-gray-200 p-4 rounded-md hover:bg-gray-100 transition duration-200"
              >
                <p className="text-lg font-medium text-gray-900">{news.title}</p>
              </li>
            ))}
          </ul>
        </div>
      );
    };
    
    export default RecentNews;

