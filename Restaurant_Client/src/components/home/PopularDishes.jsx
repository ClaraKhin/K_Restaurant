import React from "react";

const PopularDishes = () => {
  return (
    <div
      className="mt-6"
      style={{ marginTop: "1.5rem", paddingRight: "1.5rem" }}
    >
      <div className="bg-[#1d1716] w-full rounded-lg">
        <div
          className="flex justify-between items-center"
          style={{
            paddingLeft: "1.5rem",
            paddingRight: "1.5rem",
            paddingTop: "1rem",
            paddingBottom: "1rem",
          }}
        >
          <h1 className="text-[#FFFFFF] text-lg font-semibold tracking-wide">
            Popular Dishes
          </h1>
          <a
            href=""
            className="text-sm font-semibold"
            style={{ color: "#025cca" }}
          >
            View all
          </a>
        </div>
        {/* Dishes */}
        <div>
            
        </div>
      </div>
    </div>
  );
};

export default PopularDishes;
