import React from "react";
import BottomNav from "../components/shared/BottomNav";
import Greetings from "../components/home/Greetings";
import MiniCard from "../components/home/MiniCard";
import RecentOrders from "../components/home/RecentOrders";
import PopularDishes from "../components/home/PopularDishes";
import { DollarOutlined, HourglassOutlined } from "@ant-design/icons";

const Home = () => {
  return (
    <section
      className="flex min-h-screen flex-col gap-3 overflow-y-auto bg-[#2a221e] lg:flex-row"
      style={{
        paddingBottom: "4.5rem",
      }}
    >
      {/* Left */}
      <div className="w-full lg:flex-[3]">
        <Greetings />
        <div
          className="flex w-full flex-col gap-3 sm:flex-row sm:items-center"
          style={{
            paddingLeft: "1rem",
            paddingRight: "1rem",
            marginTop: "1.25rem",
          }}
        >
          <MiniCard
            title="Total Earnings"
            icon={<DollarOutlined />}
            number={512}
            footerNum={1.6}
          />
          <MiniCard
            title="In Progress"
            icon={<HourglassOutlined />}
            number={16}
            footerNum={3.6}
          />
        </div>
        <RecentOrders />
      </div>

      {/* Right */}
      <div
        className="w-full lg:flex-[2] lg:px-0 lg:pr-6"
        style={{
          paddingLeft: "0.7rem",
          paddingRight: "0.7rem",
        }}
      >
        <PopularDishes />
      </div>

      <BottomNav />
    </section>
  );
};

export default Home;
