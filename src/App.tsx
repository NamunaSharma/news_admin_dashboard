import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ProvideAuth from "./components/AuthContext"; // Make sure path is correct
import NewsPage from "./pages/NewsPage";
import CategoryPage from "./pages/CategoryPage";
import SettingsPage from "./pages/SettingsPage";
import AuthorsPage from "./pages/AuthorsPage";
import FormCategory from "./components/Categories/FormCategory";
import UpdateCategories from "./components/Categories/UpdateCategories";
import UpdateAuthor from "./components/Authors/UpdateAuthors";
import AuthorForm from "./components/Authors/AuthorsForm";
import NewsForm from "./components/News/NewsForm";
import UpdateNews from "./components/News/UpdateNews";

const App = () => {
  return (
    <ProvideAuth>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/authors" element={<AuthorsPage />} />
        <Route path="/categories" element={<CategoryPage />} />
        <Route path="/form-category" element={<FormCategory />} />
        <Route path="/updatecategory" element={<UpdateCategories />} />
        <Route path="/updateauthor" element={<UpdateAuthor />} />
        <Route path="/authorsform" element={<AuthorForm />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/newsform" element={<NewsForm />} />
        <Route path="/updatenews" element={<UpdateNews/>} />

      </Routes>
    </ProvideAuth>
  );
};

export default App;
