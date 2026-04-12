import { useEffect, useMemo, useState } from "react";
import { RetweetOutlined } from "@ant-design/icons";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { getOrders, updateOrder } from "../../https";
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

const getOrderTimestamp = (order) => {
  const createdAt = getTimeValue(order?.createdAt);
  const orderDate = getTimeValue(order?.orderDate);
  return createdAt || orderDate;
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
const STATUS_OPTIONS = ["In Progress", "Ready", "Completed"];

const RecentOrders = () => {
  const queryClient = useQueryClient();
  const [hoverOrderKey, setHoverOrderKey] = useState(null);
  const [updatingOrderId, setUpdatingOrderId] = useState(null);

  const statusMutation = useMutation({
    mutationFn: ({ orderId, orderStatus }) =>
      updateOrder(orderId, { orderStatus }),
    onMutate: async ({ orderId, orderStatus }) => {
      setUpdatingOrderId(orderId);
      await queryClient.cancelQueries({ queryKey: ["orders"] });

      const previous = queryClient.getQueryData(["orders"]);

      queryClient.setQueryData(["orders"], (old) => {
        const oldOrders = Array.isArray(old?.data?.data) ? old.data.data : null;
        if (!old || !oldOrders) return old;

        const nextOrders = oldOrders.map((order) =>
          order?._id === orderId ? { ...order, orderStatus } : order
        );

        return {
          ...old,
          data: {
            ...old.data,
            data: nextOrders,
          },
        };
      });

      return { previous };
    },
    onError: (error, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["orders"], context.previous);
      }

      const message =
        error?.response?.data?.message || "Failed to update status";
      enqueueSnackbar(message, { variant: "error" });
    },
    onSuccess: (res) => {
      const message = res?.data?.message || "Order status updated";
      enqueueSnackbar(message, { variant: "success" });
    },
    onSettled: () => {
      setUpdatingOrderId(null);
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["orders-all"] });
    },
  });

  const handleStatusChange = (orderId, nextStatus) => {
    if (!orderId) {
      enqueueSnackbar("Invalid order id", { variant: "error" });
      return;
    }

    if (!STATUS_OPTIONS.includes(nextStatus)) {
      enqueueSnackbar("Invalid status", { variant: "error" });
      return;
    }

    statusMutation.mutate({ orderId, orderStatus: nextStatus });
  };

  const {
    data: resData,
    isError,
    isPending,
  } = useQuery({
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
      (a, b) => getOrderTimestamp(b) - getOrderTimestamp(a)
    );

    return sorted.map((order, index) => {
      const orderId = typeof order?._id === "string" ? order._id : null;
      const orderIdText = orderId ? `#${orderId.slice(-6)}` : "#N/A";

      const customerName = order?.customerDetails?.name ?? "Unknown";
      const customerPhone = order?.customerDetails?.phone ?? "";
      const customerGuests = order?.customerDetails?.guests;

      const rawStatus =
        typeof order?.orderStatus === "string" ? order.orderStatus : "";
      const status =
        rawStatus === "Pending Payment" ||
        rawStatus === "In Progress" ||
        rawStatus === "Ready" ||
        rawStatus === "Completed"
          ? rawStatus
          : "In Progress";

      const dateTimeText = formatDateTime(order?.createdAt || order?.orderDate);

      const items = Array.isArray(order?.items) ? order.items : [];

      const tableNo =
        order?.table && typeof order.table === "object"
          ? order.table.tableNo
          : null;
      const tableText = tableNo ? `Table - ${tableNo}` : "Take away";

      const subtotal = order?.bills?.total ?? 0;
      const tax = order?.bills?.tax ?? 0;
      const total = order?.bills?.totalWithTax ?? order?.bills?.total ?? 0;

      return {
        key: orderId ?? index,
        orderId,
        orderIdText,
        customerName,
        customerPhone,
        customerGuests,
        status,
        dateTimeText,
        items,
        tableText,
        paymentMethod: order?.paymentMethod ?? "",
        subtotal,
        tax,
        total,
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
        <div
          className="w-full text-left text-[#f5f5f5]"
          style={{ minWidth: "1100px" }}
        >
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
            uiOrders.map((order) => {
              const isPendingPayment = order.status === "Pending Payment";
              const isUpdatingThisOrder =
                statusMutation.isPending && updatingOrderId === order.orderId;

              const statusColor =
                order.status === "Ready" || order.status === "Completed"
                  ? "#22c55e"
                  : "#facc15";

              return (
                <div
                  key={order.key}
                  className="border-b border-gray-600 hover:bg-[#2A221E]"
                  style={{
                    display: "grid",
                    gridTemplateColumns: gridCols,
                    alignItems: "center",
                  }}
                >
                  <div
                    className="text-[#f5f5f5]"
                    style={{ fontWeight: 700, padding: "1rem" }}
                  >
                    {order.orderIdText}
                  </div>

                  <div
                    className="text-[#f5f5f5]"
                    style={{ fontWeight: 600, padding: "1rem" }}
                  >
                    {order.customerName}
                  </div>

                  <div
                    style={{
                      padding: "1rem",
                      maxWidth: "170px",
                      fontWeight: 600,
                    }}
                  >
                    {isPendingPayment ? (
                      <span
                        className="inline-flex items-center justify-center"
                        style={{
                          padding: "0.5rem 0.75rem",
                          borderRadius: "0.5rem",
                          border: "2px solid #939191",
                          backgroundColor: "#2A221E",
                          color: "#facc15",
                          fontWeight: 600,
                          width: "100%",
                        }}
                      >
                        Pending Payment
                      </span>
                    ) : (
                      <select
                        style={{
                          backgroundColor: "#2A221E",
                          color: statusColor,
                          border: "2px solid #939191",
                          borderRadius: "0.5rem",
                          padding: "0.5rem",
                          outline: "none",
                          width: "100%",
                          cursor:
                            statusMutation.isPending || !order.orderId
                              ? "not-allowed"
                              : "pointer",
                          opacity:
                            statusMutation.isPending || !order.orderId
                              ? 0.7
                              : 1,
                        }}
                        value={
                          STATUS_OPTIONS.includes(order.status)
                            ? order.status
                            : "In Progress"
                        }
                        disabled={statusMutation.isPending || !order.orderId}
                        onChange={(e) =>
                          handleStatusChange(order.orderId, e.target.value)
                        }
                      >
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
                    )}
                    {isUpdatingThisOrder && (
                      <div
                        className="text-[#ababab]"
                        style={{ fontSize: "0.75rem", marginTop: "0.35rem" }}
                      >
                        Saving...
                      </div>
                    )}
                  </div>

                  <div style={{ padding: "1rem" }}>{order.dateTimeText}</div>

                  <div style={{ padding: "1rem" }}>
                    <div className="flex flex-col gap-2">
                      <div
                        className="text-[#f5f5f5]"
                        style={{ fontWeight: 600 }}
                      >
                        {(Array.isArray(order.items) ? order.items.length : 0) +
                          " Items"}
                      </div>
                      {Array.isArray(order.items) && order.items.length > 0 ? (
                        <ul
                          className="text-[#ababab]"
                          style={{
                            fontSize: "0.875rem",
                            lineHeight: "1.25rem",
                            listStyleType: "disc",
                            paddingLeft: "1.25rem",
                          }}
                        >
                          {order.items.map((item, itemIndex) => {
                            const itemName =
                              typeof item?.name === "string" && item.name.trim()
                                ? item.name
                                : "Item";
                            const qty = getItemQuantity(item);
                            const lineTotal = getItemLineTotal(item);
                            return (
                              <li
                                key={
                                  item?.id ?? `${order.key}-item-${itemIndex}`
                                }
                              >
                                {itemName} × {qty} — ${toMoney(lineTotal)}
                              </li>
                            );
                          })}
                        </ul>
                      ) : (
                        <div
                          className="text-[#ababab]"
                          style={{ fontSize: "0.875rem" }}
                        >
                          No items
                        </div>
                      )}
                    </div>
                  </div>

                  <div
                    className="text-[#f5f5f5]"
                    style={{ fontWeight: 600, padding: "1rem" }}
                  >
                    {order.tableText}
                  </div>

                  <div
                    className="text-[#f5f5f5]"
                    style={{ fontWeight: 700, padding: "1rem" }}
                  >
                    ${toMoney(order.total)}
                  </div>

                  <div className="text-center" style={{ padding: "1rem" }}>
                    <button
                      onMouseEnter={() => setHoverOrderKey(order.key)}
                      onMouseLeave={() => setHoverOrderKey(null)}
                      className="text-blue-400 hover:text-blue-500 transition"
                      style={{
                        color:
                          hoverOrderKey === order.key ? "#2679fd" : "#9dc9ff",
                        transition: "color 0.2s",
                        cursor: "pointer",
                      }}
                    >
                      <RetweetOutlined style={{ fontSize: "1.5rem" }} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentOrders;
