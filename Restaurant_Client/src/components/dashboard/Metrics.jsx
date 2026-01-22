import React from "react";
import { DownCircleOutlined } from "@ant-design/icons";
import { metricsData, itemsData } from "../../constants";

const Metrics = () => {
  return (
    <div
      style={{
        maxWidth: "1280px",
        width: "100%",
        marginLeft: "auto",
        marginRight: "auto",
        paddingTop: "0.5rem",
        paddingBottom: "0.5rem",
        paddingLeft: window.innerWidth >= 768 ? "1rem" : "1.5rem",
        paddingRight: window.innerWidth >= 768 ? "1rem" : "1.5rem",
      }}
    >
      <div className="flex justify-between items-center">
        <div>
          <h2
            className="text-[#f5f5f5]"
            style={{ fontWeight: 600, fontSize: "1.25rem" }}
          >
            Overall Performance
          </h2>
          <p className="text-[#ababab]" style={{ fontSize: "0.875rem" }}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque aut
            earum praesentium. Ipsam delectus nemo sed voluptate fugiat quos,
            eum odit!
          </p>
        </div>
        <button
          className="flex items-center"
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "0.375rem",
            color: "#f5f5f5",
            backgroundColor: "#1D1716",
            gap: "1rem",
            cursor: "pointer",
          }}
        >
          Last 1 month
          <DownCircleOutlined style={{ fontSize: "1.3rem" }} />
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4" style={{ marginTop: "1.5rem" }}>
        {metricsData.map((metric, index) => {
          return (
            <div
              key={index}
              className="rounded-lg "
              style={{
                backgroundColor: metric.color,
                padding: "1rem",
                boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
              }}
            >
              <div className="flex justify-between items-center">
                <p className="font-medium text-xs text-[#f5f5f5]">
                  {metric.title}
                </p>
                <div className="flex items-center gap-1">
                  <svg
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    style={{ color: metric.isIncrease ? "#f5f5f5" : "red" }}
                  >
                    <path
                      d={metric.isIncrease ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                    />
                  </svg>
                  <p
                    style={{
                      color: metric.isIncrease ? "#f5f5f5" : "red",
                      fontWeight: 500,
                      fontSize: "0.75rem",
                      lineHeight: "1rem",
                    }}
                  >
                    {metric.percentage}
                  </p>
                </div>
              </div>
              <p
                className="font-semibold text-2xl text-[#f5f5f5]"
                style={{ marginTop: "0.25rem" }}
              >
                {metric.value}
              </p>
            </div>
          );
        })}
      </div>

      <div
        className="flex flex-col justify-between"
        style={{ marginTop: "2.3rem" }}
      >
        <div>
          <h2
            className="text-[#f5f5f5]"
            style={{ fontWeight: 600, fontSize: "1.25rem" }}
          >
            Item Details
          </h2>
          <p className="text-[#ababab]" style={{ fontSize: "0.875rem" }}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque aut
            earum praesentium. Ipsam delectus nemo sed voluptate fugiat quos,
            eum odit!
          </p>
        </div>

        <div className="grid grid-cols-4 gap-4" style={{ marginTop: "1.5rem" }}>
          {itemsData.map((item, index) => {
            return (
              <div
                key={index}
                className="rounded-lg"
                style={{
                  backgroundColor: item.color,
                  boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                  padding: "1rem",
                }}
              >
                <div className="flex justify-between items-center">
                  <p className="font-medium text-xs text-[#f5f5f5]">
                    {item.title}
                  </p>
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-3 h-3 text-white"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    >
                      <path d="M5 15l7-7 7 7" />
                    </svg>
                    <p className="font-medium text-xs text-[#f5f5f5]">
                      {item.percentage}
                    </p>
                  </div>
                </div>
                <p
                  className=" font-semibold text-2xl text-[#f5f5f5]"
                  style={{ marginTop: "0.25rem" }}
                >
                  {item.value}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Metrics;
