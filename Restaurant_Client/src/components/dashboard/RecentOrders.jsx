import { useEffect, useMemo, useState } from "react";
import { RetweetOutlined } from "@ant-design/icons";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { getOrders } from "../../https";
import { formatDate } from "../../utils";

const parseDate = (value) => {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const getTimeValue = (value) => {
  const date = parseDate(value);
  return date ? date.getTime() : 0;
};

const formatDateTime = (value) => {
  const date = parseDate(value);
  if (!date) return "Unknown";

  return `${formatDate(date)} ${date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })}`;
};

const toMoney = (value) => {
  const numberValue = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(numberValue)) return "0.00";
  return numberValue.toFixed(2);
};

const EMPTY_ORDERS = [];

const RecentOrders = () => {
  const [hoverText, setHoverText] = useState(null);

  const handleStatusChange = () => {};

  const { data: resData, isError, isPending } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      return await getOrders();
    },
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (isError) {
      enqueueSnackbar("Something went wrong!", { variant: "error" });
    }
  }, [isError]);

  const apiOrders = Array.isArray(resData?.data?.data)
    ? resData.data.data
    : EMPTY_ORDERS;

  const uiOrders = useMemo(() => {
    const sorted = [...apiOrders].sort(
      (a, b) => getTimeValue(b?.createdAt) - getTimeValue(a?.createdAt)
    );

    const topFive = sorted.slice(0, 5);

    return topFive.map((order, index) => {
      const orderIdText =
        typeof order?._id === "string" ? `#${order._id.slice(-6)}` : "#N/A";

      const customerText = order?.customerDetails?.name ?? "Unknown";
      const rawStatus = order?.orderStatus;
      const status =
        rawStatus === "Pending Payment" ||
        rawStatus === "In Progress" ||
        rawStatus === "Ready" ||
        rawStatus === "Completed"
          ? rawStatus
          : "In Progress";

      const dateTimeText = formatDateTime(order?.createdAt);

      const itemsCount = Array.isArray(order?.items) ? order.items.length : 0;
      const itemsText = `${itemsCount} Items`;

      const tableNo =
        order?.table && typeof order.table === "object"
          ? order.table.tableNo
          : null;
      const tableText = tableNo ? `Table - ${tableNo}` : "Take away";

      const total =
        order?.bills?.totalWithTax ?? order?.bills?.total ?? 0;
      const totalText = `₹${toMoney(total)}`;

      return {
        key: order?._id ?? index,
        orderIdText,
        customerText,
        status,
        dateTimeText,
        itemsText,
        tableText,
        totalText,
      };
    });
  }, [apiOrders]);

  const gridCols =
    "minmax(100px,0.9fr) minmax(160px,1.4fr) minmax(140px,1.1fr) minmax(190px,1.6fr) minmax(120px,1fr) minmax(120px,1fr) minmax(110px,0.9fr) minmax(80px,0.5fr)";

  return (
    <div
      className=" bg-[#1D1716] "
      style={{
        width: "100%",
        maxWidth: "100%",
        margin: "0 auto",
        padding: "1rem",
        borderRadius: "0.5rem",
      }}
    >
      <h2
        className="text-[#f5f5f5] "
        style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "1rem" }}
      >
        Recent Orders
      </h2>

      <div className="overflow-x-auto">
        <div className="w-full text-left text-[#f5f5f5]" style={{ minWidth: "1100px" }}>
          <div
            className="bg-[#2A221E] text-[#ababab]"
            style={{ display: "grid", gridTemplateColumns: gridCols }}
          >
            <div style={{ padding: "0.75rem" }}>Order ID</div>
            <div style={{ padding: "0.75rem" }}>Customer</div>
            <div style={{ padding: "0.75rem" }}>Status</div>
            <div style={{ padding: "0.75rem" }}>Date & Time</div>
            <div style={{ padding: "0.75rem" }}>Items</div>
            <div style={{ padding: "0.75rem" }}>Table No</div>
            <div style={{ padding: "0.75rem" }}>Total</div>
            <div className="text-center" style={{ padding: "0.75rem" }}>
              Action
            </div>
          </div>

          {isPending ? (
            <div
              className="text-center text-[#ababab]"
              style={{ padding: "1rem" }}
            >
              Loading orders...
            </div>
          ) : isError ? (
            <div
              className="text-center text-[#ababab]"
              style={{ padding: "1rem" }}
            >
              Something went wrong!
            </div>
          ) : uiOrders.length === 0 ? (
            <div
              className="text-center text-[#ababab]"
              style={{ padding: "1rem" }}
            >
              No orders found.
            </div>
          ) : (
            uiOrders.map((order, index) => (
              <div
                key={order.key}
                className="border-b border-gray-600 hover:bg-[#2A221E]"
                style={{
                  display: "grid",
                  gridTemplateColumns: gridCols,
                  alignItems: "center",
                }}
              >
                <div style={{ padding: "1rem" }}>{order.orderIdText}</div>
                <div style={{ padding: "1rem" }}>{order.customerText}</div>
                <div style={{ padding: "1rem" }}>
                  <select
                    style={{
                      backgroundColor: "#2A221E",
                      color:
                        order.status === "Ready" || order.status === "Completed"
                          ? "#22c55e"
                          : "#facc15",
                      border: "2px solid #939191",
                      borderRadius: "0.5rem",
                      padding: "0.5rem",
                      outline: "none",
                    }}
                    value={order.status}
                    onChange={(e) => handleStatusChange(index, e.target.value)}
                  >
                    <option className="text-yellow-500" value="Pending Payment">
                      Pending Payment
                    </option>
                    <option className="text-yellow-500" value="In Progress">
                      In Progress
                    </option>
                    <option className="text-green-500" value="Ready">
                      Ready
                    </option>
                    <option className="text-green-500" value="Completed">
                      Completed
                    </option>
                  </select>
                </div>
                <div style={{ padding: "1rem" }}>{order.dateTimeText}</div>
                <div style={{ padding: "1rem" }}>{order.itemsText}</div>
                <div style={{ padding: "1rem" }}>{order.tableText}</div>
                <div style={{ padding: "1rem" }}>{order.totalText}</div>
                <div className="text-center" style={{ padding: "1rem" }}>
                  <button
                    onMouseEnter={() => setHoverText(index)}
                    onMouseLeave={() => setHoverText(null)}
                    className="text-blue-400 hover:text-blue-500 transition"
                    style={{
                      color: hoverText === index ? "#2679fd" : "#9dc9ff",
                      transition: "color 0.2s",
                      cursor: "pointer",
                    }}
                  >
                    <RetweetOutlined style={{ fontSize: "1.5rem" }} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentOrders;
