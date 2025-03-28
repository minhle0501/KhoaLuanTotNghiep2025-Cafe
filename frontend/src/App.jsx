import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Product from "./page/Product";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import { assets } from "./assets/assets";
import SearchBar from "./components/SearchBar";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

//nơi chứa các components chính và định tuyến router
const App = () => {
  return (
    <div>
      <div
        className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]"
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.450), rgba(0, 0, 0, 0.500)), url(${assets.a_cup})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        <NavBar />
        <SearchBar />
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:productId" element={<Product />} />
          </Routes>
        </>
      </div>

      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <Footer />
      </div>
    </div>
  );
};

export default App;
