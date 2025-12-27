import React from "react";
import { CheckOutlined } from "@ant-design/icons";

const OrderList = () => {
  return (
    <div
      className="flex items-center gap-6 "
      style={{ marginBottom: "0.5rem" }}
    >
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
            8 Items
          </p>
        </div>

        <div>
          <h1
            className="text-[#f6b100]"
            style={{
              fontWeight: "600",
              border: "1px solid #f6b100",
              borderRadius: "0.5rem",
              padding: "0.5rem 1rem",
            }}
          >
            Table No: 3
          </h1>
        </div>
        <div className="flex flex-col items-end gap-1">
          <p className=" text-green-600 ">
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
  );
};

export default OrderList;
