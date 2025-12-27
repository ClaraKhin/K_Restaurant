import React from "react";
import { CheckOutlined } from "@ant-design/icons";

const OrderCard = () => {
  return (
    <div
      className="w-[450px] bg-[#1d1716] rounded-lg"
      style={{ padding: "1rem", marginBottom: "1rem" }}
    >
      <div className="flex items-center gap-5">
        <button
          style={{
            backgroundColor: "#f6b100",
            padding: "1rem",
            fontWeight: "700",
            fontSize: "1.25rem",
            borderRadius: "0.5rem",
          }}
        >
          AM
        </button>
        <div className="flex items-center justify-between w-[100%]">
          <div className="flex flex-col items-start gap-1">
            <h1
              className="text-[#FFFFFF] tracking-wide"
              style={{ fontWeight: "600", fontSize: "1.125rem" }}
            >
              Clara Khin
            </h1>
            <p className="text-[#ababab]" style={{ fontSize: "0.875rem" }}>
              #101/ Dine in
            </p>
          </div>

          <div className="flex flex-col items-end gap-1">
            <p
              className=" text-green-600 bg-[#2e4a40] rounded-lg "
              style={{
                paddingLeft: "0.5rem",
                paddingRight: "0.5rem",
                paddingTop: "0.25rem",
                paddingBottom: "0.25rem",
              }}
            >
              <CheckOutlined
                style={{
                  display: "inline",
                  marginRight: "-0.7rem",
                  fontSize: "1.3rem",
                }}
              />
              <CheckOutlined
                style={{
                  display: "inline",
                  marginRight: "0.5rem",
                  fontSize: "1.3rem",
                }}
              />
              Ready
            </p>
            <p
              className="text-[#ababab] items-center flex"
              style={{ fontSize: "0.875rem" }}
            >
              <span
                className="bg-green-600 text-green-600 w-[1rem] h-[1rem] rounded-full inline-block"
                style={{ marginRight: "0.5rem" }}
              ></span>
              Ready To Serve
            </p>
          </div>
        </div>
      </div>
      <div
        className="flex items-center justify-center text-[#ababab] "
        style={{ marginTop: "1rem" }}
      >
        <p>January 18, 2025 08:32 PM </p>
        <p>8 Items</p>
      </div>
      <hr
        style={{
          color: "#FAF0DC",
          width: "100%",
          marginTop: "1rem",
          border: "1px solid #6B7280",
        }}
      />
      <div
        className="flex items-center justify-between"
        style={{ marginTop: "1rem" }}
      >
        <h1
          className="text-[#FFFFFF]"
          style={{ fontSize: "1.125rem", fontWeight: 600 }}
        >
          Total
        </h1>
        <p
          className="text-[#ffffff]"
          style={{ fontSize: "1.125rem", fontWeight: 600 }}
        >
          $250.00
        </p>
      </div>
    </div>
  );
};

export default OrderCard;
