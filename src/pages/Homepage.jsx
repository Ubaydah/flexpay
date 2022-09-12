import React from "react";
import Hero from "../components/Hero";
import Navbar from "../components/HomeNav";

const Homepage = () => {
  return (
    <div className="h-screen lg:overflow-hidden w-full">
      <Navbar />
      <Hero />
    </div>
  );
};

export default Homepage;
