import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext"; // Adjust the import path as necessary

const LoginPage = () => {
  const { login, isLoading, isLoggedIn } = useAuth();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, isLoading, navigate]);
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
    } catch (error) {
      alert("Login failed. Check credentials.");
    }
  };
  if (isLoading) return null;
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white w-full h-[80vh] rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden m-20">
        <div className="flex flex-col justify-center items-center p-10">
          <div className="w-full max-w-md">
            <h1 className="text-3xl font-bold text-blue-900 mb-6 text-center">
              Welcome Back
            </h1>
            <form onSubmit={handleSubmit} className="space-y-5 w-full">
              <div>
                <label className="block text-blue-700 mb-1">Username</label>
                <input
                  type="text"
                  value={username}
                  placeholder="Enter your username"
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-blue-700 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Login
              </button>
            </form>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <img
            src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg"
            alt="Login Illustration"
            className="w-full max-w-sm object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
