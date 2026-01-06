import React from "react";

const CustomerInfo = () => {
  return (
    <div
      className="flex items-center justify-between"
      style={{
        paddingLeft: "1rem",
        paddingRight: "1rem",
        paddingTop: "0.75rem",
        paddingBottom: "0.75rem",
      }}
    >
      <div className="flex flex-col items-start">
        <h1
          className="text-[#ffffff] tracking-wide"
          style={{ fontSize: "1rem", fontWeight: 600 }}
        >
          Customer Name
        </h1>
        <p
          className="text-[#ababab]"
          style={{
            fontSize: "0.75rem",
            fontWeight: 500,
            marginTop: "0.25rem",
          }}
        >
          #101/Dine in
        </p>
        <p
          className="text-[#ababab]"
          style={{
            fontSize: "0.75rem",
            fontWeight: 500,
            marginTop: "0.5rem",
          }}
        >
          Jan 19, 2026 05:34PM{" "}
        </p>
      </div>
      <button
        className="bg-[#fb6100]"
        style={{
          backgroundColor: "#f6b100",
          padding: "0.75rem",
          fontSize: "1.25rem",
          fontWeight: 700,
          borderRadius: "0.5rem",
        }}
      >
        CN
      </button>
    </div>
  );
};

export default CustomerInfo;
