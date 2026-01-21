import React from "react";
import {
  SearchOutlined,
  BellOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import logo from "../../assets/images/Golden_Dynasty.png";
import { useSelector } from "react-redux";

const Header = () => {
  const userData = useSelector((state) => state.user);
  return (
    <header
      className="flex justify-between items-center  bg-[#1d1716]"
      style={{
        paddingLeft: "1rem",
        paddingRight: "1rem",
        paddingTop: "1rem",
        paddingBottom: "1rem",
      }}
    >
      {/* logo */}
      <div className="flex items-center gap-2 ">
        <img src={logo} alt="logo" className="h-15 w-15 rounded-full" />
        <h1
          className="text-[#FFFFFF]"
          style={{ fontSize: "1.25rem", fontWeight: "600" }}
        >
          Golden Dynasty
        </h1>
      </div>
      {/* Search */}
      <div
        className="flex items-center gap-4 bg-[#2a221e] rounded-[15px] w-[500px]"
        style={{
          paddingLeft: "1.25rem",
          paddingRight: "1.25rem",
          paddingTop: "0.5rem",
          paddingBottom: "0.5rem",
        }}
      >
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
            <h1
              className=" text-[#FFFFFF]"
              style={{ fontSize: "1rem", fontWeight: 600 }}
            >
              {userData.name || "Test User"}
            </h1>
            <p
              className="text-[#ababab]"
              style={{ fontSize: "0.75rem", fontWeight: 500 }}
            >
              {userData.role || "Role"}
            </p>
          </div>

          <LogoutOutlined className="text-2xl" style={{ color: "#FFFFFF", marginLeft: "0.5rem" }} />
        </div>
      </div>
    </header>
  );
};

export default Header;
