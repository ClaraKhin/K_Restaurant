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
      className="flex min-h-screen flex-col gap-3 overflow-y-auto bg-[#2a221e] lg:flex-row"
      style={{
        paddingBottom: "4.5rem",
      }}
    >
      {/* Left */}
      <div className="w-full lg:flex-[3]">
        <div
          className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
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
          <div className="flex items-center justify-around gap-4 sm:w-auto sm:justify-around">
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
        className="mx-4 mb-24 w-auto rounded-lg bg-[#1D1716] lg:mb-0 lg:mr-3 lg:ml-0 lg:h-[780px] lg:flex-[1]"
        style={{
          marginTop: "1rem",
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
