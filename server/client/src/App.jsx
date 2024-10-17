import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Footer1 from "./components/Footer1";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import BlogDetails from "./pages/blogs/BlogDetails";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import ManageItems from "./pages/admin/manageItems/ManageItems";
import AddNewPost from "./pages/admin/addNewPost/AddNewPost";
import Users from "./pages/admin/users/Users";
import UpdateItems from "./pages/admin/manageItems/UpdateItems";

const App = () => {
  return (
    <div className="bg-bgPrimary min-h-screen flex flex-col">
      <Router>
        <Nav />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/privacy-policy" element={<Privacy />} />
            <Route path="/contact-us" element={<Contact />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/blogs/:id" element={<BlogDetails />} />
            <Route element={<AdminLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/manage-items" element={<ManageItems />} />
              <Route path="/dashboard/add-new-post" element={<AddNewPost />} />
              <Route path="/dashboard/users" element={<Users />} />
              <Route
                path="/dashboard/update-items/:id"
                element={<UpdateItems />}
              />
            </Route>
          </Routes>
        </div>
        <Footer1 />
      </Router>
    </div>
  );
};

export default App;
