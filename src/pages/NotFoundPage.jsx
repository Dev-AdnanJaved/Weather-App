import React from "react";
import { Link } from "react-router-dom";
import DefaultBG from "../assets/backgrounds/bg.jpg";

const NotFound = () => {
  return (
    <div
      className="min-h-screen flex items-center bg-center bg-no-repeat bg-cover  justify-center p-8"
      style={{
        backgroundImage: `url(${DefaultBG})`,
      }}
    >
      <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl p-12 text-center flex flex-col items-center gap-6 max-w-lg">
        <h1 className="text-6xl font-extrabold text-white">404</h1>
        <p className="text-white/80 text-xl">
          Oops! The city you are looking for cannot be found.
        </p>
        <Link
          to="/weather/lahore"
          className="px-6 py-3 bg-white/20 hover:bg-white/30 transition text-white font-semibold rounded-lg"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
