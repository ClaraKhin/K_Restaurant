import React from "react";

const MiniCard = ({ title, icon, number, footerNum }) => {
  return (
    <div
      className="bg-[#1d1716] rounded-lg w-[50%]"
      style={{ padding: "1.2rem" }}
    >
      <div className="flex items-start justify-between">
        <h1
          className="text-[#FFFFFF] font-semibold tracking-wide"
          style={{ fontSize: "1.125rem" }}
        >
          {title}
        </h1>
        <button
          style={{
            backgroundColor: title === "Total Earnings" ? "#02ca3a" : "#f6b100",
            padding: "0.4rem",
            borderRadius: "0.5rem",
            width: "3.125rem",
            color: "#FFFFFF",
            fontSize: "1.5rem",
            cursor: "pointer",
          }}
        >
          {icon}
        </button>
      </div>
      <div>
        <h1
          className="text-[#FFFFFF] font-bold"
          style={{ marginTop: "1.25rem", fontSize: "2.25rem" }}
        >
          {number}
        </h1>
        <h1
          className="text-[#FFFFFF]"
          style={{ marginTop: "5px", fontSize: "1.125rem" }}
        >
          <span className="text-[#02ca3a]">{footerNum}%</span> than yesterday
        </h1>
      </div>
    </div>
  );
};

export default MiniCard;
