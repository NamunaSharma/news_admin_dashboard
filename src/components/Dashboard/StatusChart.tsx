import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Cell,
  Legend,
  Tooltip,
} from "recharts";
import axios from "axios";

const StatusChart = () => {
  const [statusData, setStatusData] = useState([
    { name: "Draft", value: 0 },
    { name: "Published", value: 0 },
  ]);

  // Fetch data using axios
  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await axios.get(
          "https://6810f7e927f2fdac24138508.mockapi.io/news"
        );
        const news = response.data;
        const draftCount = news.filter(
          (item: { status: string }) => item.status === "draft"
        ).length;
        const publishedCount = news.filter(
          (item: { status: string }) => item.status === "published"
        ).length;

        setStatusData([
          { name: "Draft", value: draftCount },
          { name: "Published", value: publishedCount },
        ]);
      } catch (error) {
        console.error("Error fetching news data", error);
      }
    };

    fetchNewsData();
  }, []);

  return (
    <div className="h-80 p-6">
           <h2>News Status</h2>
      <ResponsiveContainer width="50%" height="100%">
     
        <PieChart>
          <Pie
            data={statusData}
            dataKey="value"
            nameKey="name"
            cx="20%"
            cy="50%"
            outerRadius="70%"
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
          >
            {statusData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={index === 0 ? "#FF8042" : "#00C49F"}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#333",
              borderRadius: "8px",
              borderColor: "#4B5563",
            }}
          />
          {/* <Legend /> */}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatusChart;
