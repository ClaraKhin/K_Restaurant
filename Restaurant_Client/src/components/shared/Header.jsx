import React from "react";
import { SearchOutlined, BellOutlined, UserOutlined } from "@ant-design/icons";
import logo from "../../assets/images/Golden_Dynasty.png";

const Header = () => {
  return (
    <header
      className="flex justify-between items-center py-4 px-8 bg-[#1d1716]"
      style={{
        paddingLeft: "1rem",
        paddingRight: "1rem",
        paddingTop: "0.5rem",
        paddingBottom: "0.5rem",
      }}
    >
      {/* logo */}
      <div className="flex items-center gap-2 ">
        <img src={logo} alt="logo" className="h-15 w-15 rounded-full" />
        <h1 className="text-lg font-semibold text-[#FFFFFF]">Golden Dynasty</h1>
      </div>
      {/* Search */}
      <div className="flex items-center gap-4 bg-[#2a221e] px-5 py-2 rounded-[15px] w-[500px]">
        <SearchOutlined
          style={{ color: "#FFFFFF", marginLeft: "10px" }}
          className="text-xl"
        />
        <input
          type="text"
          placeholder="Search"
          style={{ color: "#FFFFFF", padding: "5px" }}
          className="outline-none input-search "
        />
      </div>
      {/* Logged User Info */}
      <div className="flex items-center gap-4">
        <BellOutlined style={{ color: "#FFFFFF" }} className="text-2xl" />

        <div className="flex items-center gap-3 cursor-pointer">
          <UserOutlined style={{ color: "#FFFFFF" }} className="text-2xl" />
          <div className="flex flex-col items-start ">
            <h1 className="text-md text-[#FFFFFF] font-semibold">Khin</h1>
            <p className="text-xs text-[#ababab] font-medium">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
