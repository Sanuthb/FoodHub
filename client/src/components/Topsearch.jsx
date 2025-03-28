import React from "react";
import { Link } from "react-router-dom";

const Topsearch = () => {
  const menuitems = [
    { image: "/assets/topsearch/1.avif" },
    { image: "/assets/topsearch/2.avif" },
    { image: "/assets/topsearch/3.avif" },
    { image: "/assets/topsearch/4.avif" },
    { image: "/assets/topsearch/5.avif" },
    { image: "/assets/topsearch/6.avif" },
    { image: "/assets/topsearch/7.avif" },
  ];

  return (
    <div className="px-20 flex flex-col items-center justify-center bg-gray-100">
      <div className="shadow-lg border-[.1rem] border-gray-300 rounded-xl mt-10 bg-white">
        <div className="p-2">
          <h1 className="text-2xl font-medium">What's on your mind?</h1>
        </div>
        <div className="flex gap-2 justify-center bg-white">
          {menuitems.map((menu, index) => (
            <div key={index} className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2">
              <Link to="/menu">
                <img
                  src={menu.image}
                  alt={`Image ${index + 1}`}
                  className="w-full h-auto object-cover rounded-lg"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Topsearch;
