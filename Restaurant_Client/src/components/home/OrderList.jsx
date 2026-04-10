import React, { useEffect, useMemo, useState } from "react";
import { CheckOutlined } from "@ant-design/icons";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getOrders } from "../../https";

// Helper for initials (replace with getAvatarName if available)
function getAvatarName(name = "") {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}
function toTime(date) {
  const t = new Date(date).getTime();
  return isNaN(t) ? 0 : t;
}

// Status meta for UI
const statusMeta = {
  Ready: {
    color: "text-green-600",
    dot: "bg-green-600 text-green-600",
    subtext: "Ready To Serve",
    showCheck: 2,
  },
  "In Progress": {
    color: "text-yellow-500",
    dot: "bg-yellow-500 text-yellow-500",
    subtext: "Preparing",
    showCheck: 1,
  },
  Pending: {
    color: "text-gray-400",
    dot: "bg-gray-400 text-gray-400",
    subtext: "Pending",
    showCheck: 0,
  },
};

const OrderList = () => {
  const {
    data: resData,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: () => getOrders(),
    placeholderData: keepPreviousData,
  });

  const apiOrders = useMemo(
    () => (Array.isArray(resData?.data?.data) ? resData.data.data : []),
    [resData]
  );

  const sorted = useMemo(
    () =>
      [...apiOrders].sort((a, b) => toTime(b.createdAt) - toTime(a.createdAt)),
    [apiOrders]
  );

  const topNine = useMemo(() => sorted.slice(0, 9), [sorted]);

  const uiOrders = useMemo(
    () =>
      topNine.map((order) => {
        const customerName = order?.customerDetails?.name || "Unknown";
        const itemsCount = Array.isArray(order.items) ? order.items.length : 0;
        const tableText = order?.table?.tableNo
          ? `Table No: ${order.table.tableNo}`
          : "Take away";
        const status = order?.orderStatus || "Pending";
        const meta = statusMeta[status] || statusMeta["Pending"];
        return {
          key: order._id,
          initials: getAvatarName(customerName),
          customerName,
          itemsCountText: `${itemsCount} Item${itemsCount === 1 ? "" : "s"}`,
          tableText,
          statusText: status,
          statusColor: meta.color,
          statusDot: meta.dot,
          statusSubtext: meta.subtext,
          showCheck: meta.showCheck,
        };
      }),
    [topNine]
  );

  if (isPending) {
    return (
      <div className="text-[#ababab] text-center py-8">Loading orders...</div>
    );
  }
  if (isError) {
    return (
      <div className="text-[#ababab] text-center py-8">
        Something went wrong!
      </div>
    );
  }
  if (uiOrders.length === 0) {
    return (
      <div className="text-[#ababab] text-center py-8">No orders found.</div>
    );
  }

  return (
    <>
      {uiOrders.map((order) => (
        <div
          key={order.key}
          className="flex items-center gap-6"
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
            {order.initials}
          </button>
          <div className="flex items-center justify-between w-[100%]">
            <div className="flex flex-col items-start gap-1">
              <h1
                className="text-[#FFFFFF] tracking-wide"
                style={{ fontWeight: "600", fontSize: "1.125rem" }}
              >
                {order.customerName}
              </h1>
              <p className="text-[#ababab]" style={{ fontSize: "0.875rem" }}>
                {order.itemsCountText}
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
                {order.tableText}
              </h1>
            </div>
            <div className="flex flex-col items-end gap-1">
              <p className={order.statusColor}>
                {order.showCheck >= 1 && (
                  <CheckOutlined
                    style={{
                      display: "inline",
                      marginRight: order.showCheck === 2 ? "-0.7rem" : "0.5rem",
                      fontSize: "1.3rem",
                    }}
                  />
                )}
                {order.showCheck === 2 && (
                  <CheckOutlined
                    style={{
                      display: "inline",
                      marginRight: "0.5rem",
                      fontSize: "1.3rem",
                    }}
                  />
                )}
                {order.statusText}
              </p>
              <p
                className="text-[#ababab] items-center flex"
                style={{ fontSize: "0.875rem" }}
              >
                <span
                  className={`${order.statusDot} w-[1rem] h-[1rem] rounded-full inline-block`}
                  style={{ marginRight: "0.5rem" }}
                ></span>
                {order.statusSubtext}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default OrderList;
