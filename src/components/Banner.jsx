import React from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div>
      <div
        className="bg-cover bg-center h-auto text-white py-24 px-10 object-fill"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80)",
        }}>
        <div className="md:w-1/2">
          <p className="text-3xl font-bold">InsightfulJourney</p>
          <p className="text-2xl leading-none">
            Your Gateway to Informative and Engaging Content
          </p>
          <p className="text-2xl mb-10 leading-none">
            Explore, Learn, and Share Experiences
          </p>
          <Link
            to="/create"
            className="bg-purple-800 py-4 px-8 text-white font-bold uppercase text-xs rounded hover:bg-gray-200 hover:text-gray-800">
            Add Blog
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
