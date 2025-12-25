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
      className="bg-[#2a221e] min-h-screen overflow-y-auto flex gap-3"
      style={{
        paddingBottom: "4.4rem",
      }}
    >
      {/* Left */}
      <div className="flex-[3]">
        <Greetings />
        <div
          className="flex items-center w-full gap-3"
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
      <div className="flex-[2]">
        <PopularDishes />
      </div>

      <BottomNav />
    </section>
  );
};

export default Home;
