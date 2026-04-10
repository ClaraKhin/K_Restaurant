import React from "react";
import { CheckOutlined } from "@ant-design/icons";
import { formatDate, getAvatarName } from "../../utils";

const parseDate = (value) => {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const OrderCard = ({ order }) => {
  const customerName = order?.customerDetails?.name || "";
  const displayCustomerName = customerName || "Unknown";
  const initials = getAvatarName(customerName) || "N/A";

  const shortOrderId = order?._id ? order._id.slice(-6) : String(order?.id || "");
  const orderRef = shortOrderId ? `#${shortOrderId}` : "#N/A";

  const tableNo =
    order?.table && typeof order.table === "object" ? order.table.tableNo : null;
  const orderType = order?.table ? "Dine in" : "Take away";
  const orderMeta = tableNo ? `${orderRef}/ ${orderType} · Table ${tableNo}` : `${orderRef}/ ${orderType}`;

  const status = order?.orderStatus || "Unknown";

  const statusMeta = (() => {
    switch (status) {
      case "Pending Payment":
        return {
          pillClassName: "text-[#F6B100] bg-[#664a04]",
          dotClassName: "bg-[#F6B100]",
          subtext: "Awaiting Payment",
          showCheck: false,
        };
      case "In Progress":
        return {
          pillClassName: "text-[#F6B100] bg-[#664a04]",
          dotClassName: "bg-[#F6B100]",
          subtext: "In Progress",
          showCheck: false,
        };
      case "Ready":
        return {
          pillClassName: "text-green-600 bg-[#2e4a40]",
          dotClassName: "bg-green-600",
          subtext: "Ready To Serve",
          showCheck: true,
        };
      case "Completed":
        return {
          pillClassName: "text-blue-400 bg-[#1f2a3a]",
          dotClassName: "bg-blue-400",
          subtext: "Completed",
          showCheck: true,
        };
      default:
        return {
          pillClassName: "text-[#ababab] bg-[#2A221E]",
          dotClassName: "bg-[#ababab]",
          subtext: "Status Unknown",
          showCheck: false,
        };
    }
  })();

  const orderDate = parseDate(order?.orderDate);
  const createdAt = parseDate(order?.createdAt);
  const dateToShow =
    orderDate && createdAt ? (orderDate > createdAt ? orderDate : createdAt) : orderDate || createdAt;

  const formattedDateTime = dateToShow
    ? `${formatDate(dateToShow)} ${dateToShow.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })}`
    : "Unknown date";

  const itemsCount = Array.isArray(order?.items) ? order.items.length : 0;
  const total = order?.bills?.totalWithTax ?? order?.bills?.total ?? 0;
  const totalNumber = typeof total === "number" ? total : Number(total);
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
          {initials}
        </button>
        <div className="flex items-center justify-between w-[100%]">
          <div className="flex flex-col items-start gap-1">
            <h1
              className="text-[#FFFFFF] tracking-wide"
              style={{ fontWeight: "600", fontSize: "1.125rem" }}
            >
              {displayCustomerName}
            </h1>
            <p className="text-[#ababab]" style={{ fontSize: "0.875rem" }}>
              {orderMeta}
            </p>
          </div>

          <div className="flex flex-col items-end gap-1">
            <p
              className={`${statusMeta.pillClassName} rounded-lg`}
              style={{
                paddingLeft: "0.5rem",
                paddingRight: "0.5rem",
                paddingTop: "0.25rem",
                paddingBottom: "0.25rem",
              }}
            >
              {statusMeta.showCheck && (
                <>
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
                </>
              )}
              {status}
            </p>
            <p
              className="text-[#ababab] items-center flex"
              style={{ fontSize: "0.875rem" }}
            >
              <span
                className={`w-[1rem] h-[1rem] rounded-full inline-block ${statusMeta.dotClassName}`}
                style={{ marginRight: "0.5rem" }}
              ></span>
              {statusMeta.subtext}
            </p>
          </div>
        </div>
      </div>
      <div
        className="flex items-center justify-between text-[#ababab]"
        style={{ marginTop: "1rem" }}
      >
        <p>{formattedDateTime}</p>
        <p>{itemsCount} Items</p>
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
          ${Number.isFinite(totalNumber) ? totalNumber.toFixed(2) : "0.00"}
        </p>
      </div>
    </div>
  );
};

export default OrderCard;
