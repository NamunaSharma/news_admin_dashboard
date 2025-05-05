import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import withAuth from "../utils/withAuth";
import axios from "axios";
import Card from "../common/Card"; // Import the Card component
import StatusChart from "../components/Dashboard/StatusChart";
import RecentNews from "../components/Dashboard/RecentNews";
const Dashboard = () => {
  // State to store the total number of articles, authors, and categories
  const [totalArticles, setTotalArticles] = useState<number>(0);
  const [totalAuthors, setTotalAuthors] = useState<number>(0);
  const [totalCategories, setTotalCategories] = useState<number>(0);

  useEffect(() => {
    axios
      .get("https://6810f7e927f2fdac24138508.mockapi.io/news")
      .then((response) => {
        setTotalArticles(response.data.length);
      })
      .catch((error) => {
        console.error("Error fetching total articles:", error);
      });
    axios
      .get("https://680faee267c5abddd1963e2d.mockapi.io/api/authors") // Replace with your actual authors API endpoint
      .then((response) => {
        setTotalAuthors(response.data.length);
      })
      .catch((error) => {
        console.error("Error fetching total authors:", error);
      });

    axios
      .get("https://680faee267c5abddd1963e2d.mockapi.io/api/news")
      .then((response) => {
        setTotalCategories(response.data.length);
      })
      .catch((error) => {
        console.error("Error fetching total categories:", error);
      });
  }, []);

  return (
    <div className="flex h-screen ">
      <Sidebar />
      <main className="flex-1 p-10">
        <h1 className="text-2xl font-semibold mb-6">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card name="Total Articles" value={totalArticles} />
          <Card name="Total Authors" value={totalAuthors} />
          <Card name="Total Categories" value={totalCategories} />
        </div>
<div className="flex gap-4">
        <StatusChart />
        <RecentNews/>
        </div>
      </main>
    </div>
  );
};

export default withAuth(Dashboard);
    