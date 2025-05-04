// import React, { useState, useEffect } from "react";
// import Sidebar from "../components/Sidebar";
// import withAuth from "../utils/withAuth";
// import axios from "axios";
// import Card from "../common/Card"; // Import the Card component
// import StatusChart from "../components/Dashboard/StatusChart";

// const Dashboard = () => {
//   // State to store the total number of articles, authors, and categories
//   const [totalArticles, setTotalArticles] = useState<number>(0);
//   const [totalAuthors, setTotalAuthors] = useState<number>(0);
//   const [totalCategories, setTotalCategories] = useState<number>(0);

//   useEffect(() => {
//     // Fetch the total number of articles
//     axios
//       .get("https://6810f7e927f2fdac24138508.mockapi.io/news") // Replace with your actual articles API endpoint
//       .then((response) => {
//         setTotalArticles(response.data.length); // Assuming the response contains an array of news articles
//       })
//       .catch((error) => {
//         console.error("Error fetching total articles:", error);
//       });
//     axios
//       .get("https://680faee267c5abddd1963e2d.mockapi.io/api/authors") // Replace with your actual authors API endpoint
//       .then((response) => {
//         setTotalAuthors(response.data.length); // Assuming the response contains an array of authors
//       })
//       .catch((error) => {
//         console.error("Error fetching total authors:", error);
//       });

//     // Fetch the total number of categories
//     axios
//       .get("https://680faee267c5abddd1963e2d.mockapi.io/api/news") // Replace with your actual categories API endpoint
//       .then((response) => {
//         setTotalCategories(response.data.length); // Assuming the response contains an array of categories
//       })
//       .catch((error) => {
//         console.error("Error fetching total categories:", error);
//       });
//   }, []);

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <Sidebar />
//       <main className="flex-1 p-6">
//         <h1 className="text-2xl font-semibold mb-6">Admin Dashboard</h1>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//           <Card name="Total Articles" value={totalArticles} />
//           <Card name="Total Authors" value={totalAuthors} />
//           <Card name="Total Categories" value={totalCategories} />
//         </div>
        
//         <StatusChart/>
//       </main>
//     </div>
//   );
// };

// export default withAuth(Dashboard);
import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import withAuth from "../utils/withAuth";
import axios from "axios";
import Card from "../common/Card"; // Import the Card component
import StatusChart from "../components/Dashboard/StatusChart";

const Dashboard = () => {
  // State to store the total number of articles, authors, and categories
  const [totalArticles, setTotalArticles] = useState<number>(0);
  const [totalAuthors, setTotalAuthors] = useState<number>(0);
  const [totalCategories, setTotalCategories] = useState<number>(0);

  useEffect(() => {
    // Fetch the total number of articles
    axios
      .get("https://6810f7e927f2fdac24138508.mockapi.io/news") // Replace with your actual articles API endpoint
      .then((response) => {
        setTotalArticles(response.data.length); // Assuming the response contains an array of news articles
      })
      .catch((error) => {
        console.error("Error fetching total articles:", error);
      });
    axios
      .get("https://680faee267c5abddd1963e2d.mockapi.io/api/authors") // Replace with your actual authors API endpoint
      .then((response) => {
        setTotalAuthors(response.data.length); // Assuming the response contains an array of authors
      })
      .catch((error) => {
        console.error("Error fetching total authors:", error);
      });

    // Fetch the total number of categories
    axios
      .get("https://680faee267c5abddd1963e2d.mockapi.io/api/news") // Replace with your actual categories API endpoint
      .then((response) => {
        setTotalCategories(response.data.length); // Assuming the response contains an array of categories
      })
      .catch((error) => {
        console.error("Error fetching total categories:", error);
      });
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card 
            name="Total Articles" 
            value={totalArticles} 
            // extraClasses="hover:bg-blue-50 hover:shadow-xl transition-all duration-300"
          />
          <Card 
            name="Total Authors" 
            value={totalAuthors} 
            // extraClasses="hover:bg-green-50 hover:shadow-xl transition-all duration-300"
          />
          <Card 
            name="Total Categories" 
            value={totalCategories} 
            // extraClasses="hover:bg-yellow-50 hover:shadow-xl transition-all duration-300"
          />
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-4 mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Recent Activity</h2>

          <div className="bg-gray-50 p-4 rounded-lg mb-4 hover:bg-gray-100 transition-all duration-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">📰 Recently Published Articles</h3>
            <ul className="list-disc pl-6 text-gray-600">
              <li>“Tech Trends 2025” – Published today</li>
              <li>“AI in Daily Life” – Published yesterday</li>
              <li>“Climate Change Updates” – Published 2 days ago</li>
            </ul>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg mb-4 hover:bg-gray-100 transition-all duration-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">📁 Latest Categories</h3>
            <ul className="list-disc pl-6 text-gray-600">
              <li>Technology – Added 2 days ago</li>
              <li>Science – Added last week</li>
              <li>Education – Added this month</li>
            </ul>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-all duration-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">👤 New Authors</h3>
            <ul className="list-disc pl-6 text-gray-600">
              <li>Ravi Shrestha – Joined today</li>
              <li>Namrata Basnet – Joined yesterday</li>
              <li>Rajan Khadka – Joined 3 days ago</li>
            </ul>
          </div>
        </div>

        <StatusChart />
      </main>
    </div>
  );
};

export default withAuth(Dashboard);
