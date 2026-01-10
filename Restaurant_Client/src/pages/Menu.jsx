import React from "react";
import {
  ScheduleOutlined,
  DeleteOutlined,
  FolderAddOutlined,
} from "@ant-design/icons";
import BottomNav from "../components/shared/BottomNav";
import BackButton from "../components/shared/BackButton";
import MenuContainer from "../components/menu/MenuContainer";
import CustomerInfo from "../components/menu/CustomerInfo";
import CartInfo from "../components/menu/CartInfo";
import BillInfo from "../components/menu/BillInfo";
import { useSelector } from "react-redux";

const Menu = () => {
  const customerData = useSelector((state) => state.customer); // Access the customer data
  return (
    <section
      className="bg-[#2a221e] min-h-screen overflow-y-auto flex gap-3"
      style={{
        paddingBottom: "4.5rem",
      }}
    >
      {/* Left */}
      <div className="flex-[3]">
        <div
          className="flex items-center justify-between"
          style={{
            paddingLeft: "2rem",
            paddingRight: "2rem",
            paddingTop: "1rem",
            paddingBottom: "1rem",
            marginTop: "0.5rem",
          }}
        >
          <div className="flex items-center gap-4">
            <BackButton />
            <h1
              className="text-[#FFFFFF] tracking-wide"
              style={{ fontSize: "1.5rem", fontWeight: 700 }}
            >
              Menu
            </h1>
          </div>
          <div className="flex items-center justify-around gap-4">
            <div className="flex items-center gap-3 cursor-pointer">
              <ScheduleOutlined
                style={{ color: "#FFFFFF" }}
                className="text-4xl"
              />
              <div className="flex flex-col items-start ">
                <h1
                  className=" text-[#FFFFFF]"
                  style={{ fontSize: "1rem", fontWeight: 600 }}
                >
                  {customerData.customerName || "Customer Name"}
                </h1>
                <p
                  className="text-[#ababab]"
                  style={{ fontSize: "0.75rem", fontWeight: 500 }}
                >
                  {customerData.tableNo || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <MenuContainer />
      </div>

      {/* Right */}
      <div
        className="flex-[1] bg-[#1D1716] rounded-lg h-[780px]"
        style={{
          marginTop: "1rem",
          marginRight: "0.75rem",

          paddingTop: "0.5rem",
        }}
      >
        {/* Customer Info*/}
        <CustomerInfo />
        <hr style={{ borderTop: "2px solid #2a2a2a" }} />
        {/* Cart Items */}
        <CartInfo />
        {/* Bills */}
        <BillInfo />
      </div>

      <BottomNav />
    </section>
  );
};

export default Menu;
