import React from "react";
import Hero from "../components/Hero";
import Blogs from "./blogs/Blogs";

const Home = () => {
  return (
    <div className="bg-white text-primary container mx-auto mt-8 p-8">
      <Hero />
      {/* <hr /> */}
      <Blogs />
    </div>
  );
};

export default Home;
