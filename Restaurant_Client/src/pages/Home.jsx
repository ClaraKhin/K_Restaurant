import React from "react";
import BottomNav from "../components/shared/BottomNav";

const Home = () => {
  return (
    <section className="bg-[#FAF0DC] h-[calc(100vh-5rem)] overflow-hidden flex gap-3">
      {/* Left */}
      <div className="flex-[3] bg-[#2a221e]"></div>

      {/* Right */}
      <div className="flex-[2] bg-[#2a221e]"></div>

      <BottomNav />
    </section>
  );
};

export default Home;
