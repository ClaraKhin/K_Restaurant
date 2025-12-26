import React from "react";
import { popularDishes } from "../../constants";

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
          <h1
            className="text-[#FFFFFF] tracking-wide"
            style={{ fontSize: "1.125rem", fontWeight: "600" }}
          >
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
        <div
          className="overflow-y-scroll"
          style={{ height: "610px", scrollbarWidth: "none" }}
        >
          {popularDishes.map((dish) => {
            return (
              <div
                key={dish.id}
                className="flex items-center gap-5 bg-[#2A221E] rounded-[15px] "
                style={{
                  paddingLeft: "1.5rem",
                  paddingRight: "1.5rem",
                  paddingTop: "1rem",
                  paddingBottom: "1rem",
                  marginLeft: "1.5rem",
                  marginRight: "1.5rem",
                  marginTop: "1rem",
                  marginBottom: "1rem",
                }}
              >
                <h1
                  className="text-[#FFFFFF]"
                  style={{ fontSize: "1.25rem", fontWeight: "700" }}
                >
                  {dish.id < 10 ? `0${dish.id}` : dish.id}
                </h1>
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-[50px] h-[50px] rounded-full"
                />
                <div>
                  <h1
                    className="text-[#FFFFFF] tracking-wide"
                    style={{ fontWeight: "600" }}
                  >
                    {dish.name}
                  </h1>
                  <p
                    className="text-[#FFFFFF] text-sm font-semibold"
                    style={{ marginTop: "0.25rem" }}
                  >
                    <span className="text-[#ababab]">Orders: </span>
                    {dish.numberOfOrders}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PopularDishes;
