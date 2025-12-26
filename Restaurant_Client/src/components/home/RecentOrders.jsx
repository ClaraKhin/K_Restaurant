import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import OrderList from "./OrderList";

const RecentOrders = () => {
  return (
    <div
      style={{
        marginTop: "1.25rem",
        paddingLeft: "1rem",
        paddingRight: "1rem",
      }}
    >
      <div className="bg-[#1D1716] w-full rounded-lg h-[396px]">
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
            Recent Orders
          </h1>
          <a
            href=""
            className="text-sm font-semibold"
            style={{ color: "#025cca" }}
          >
            View all
          </a>
        </div>

        <div
          className="flex items-center gap-4 bg-[#2a221e] rounded-[15px] mx-6"
          style={{
            paddingLeft: "1rem",
            paddingRight: "1rem",
            paddingTop: "1rem",
            paddingBottom: "1rem",
            marginLeft: "1rem",
            marginRight: "1rem",
          }}
        >
          <SearchOutlined
            style={{ color: "#FFFFFF", marginLeft: "10px" }}
            className="text-xl"
          />
          <input
            type="text"
            placeholder="Search recent orders"
            style={{ color: "#FFFFFF", padding: "2px" }}
            className="outline-none input-search w-[100%]"
          />
        </div>

        {/* Order List */}
        <div
          style={{
            marginTop: "1rem",
            paddingLeft: "1.5rem",
            paddingRight: "1.5rem",
            overflowY: "scroll",
            height: "240px",
            scrollbarWidth: "none",
          }}
        >
          <OrderList />
          <OrderList />
          <OrderList />
          <OrderList />
          <OrderList />
        </div>
      </div>
    </div>
  );
};

export default RecentOrders;
