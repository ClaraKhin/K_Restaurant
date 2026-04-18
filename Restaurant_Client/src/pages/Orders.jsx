import { useState } from "react";
import BottomNav from "../components/shared/BottomNav";
import OrderCard from "../components/orders/OrderCard";
import BackButton from "../components/shared/BackButton";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getOrders } from "../https";
import { enqueueSnackbar } from "notistack";

const Orders = () => {
  const [status, setStatus] = useState("all");

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

  if (isError) {
    enqueueSnackbar("Something went wrong!", { variant: "error" });
  }

  const orders = resData?.data?.data ?? [];

  const filteredOrders = orders.filter((order) => {
    if (status === "all") return true;

    if (status === "progress") {
      return (
        order.orderStatus === "In Progress" ||
        order.orderStatus === "Pending Payment"
      );
    }

    if (status === "ready") return order.orderStatus === "Ready";
    if (status === "completed") return order.orderStatus === "Completed";

    return true;
  });
  return (
    <section
      className="bg-[#2a221e] min-h-screen overflow-y-auto"
      style={{
        paddingBottom: "4.5rem",
      }}
    >
      <div
        className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
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
            Orders
          </h1>
        </div>
        <div className="flex w-full flex-wrap items-center justify-start gap-2 sm:gap-4 lg:w-auto lg:justify-around">
          <button
            onClick={() => setStatus("all")}
            className="text-sm sm:text-base"
            style={{
              color: status === "all" ? "#2a221e" : "#FFFFFF",
              backgroundColor: status === "all" ? "#FAF0DC" : "",
              fontSize: "1.125rem",
              fontWeight: "600",
              paddingLeft: "1.25rem",
              paddingRight: "1.25rem",
              paddingTop: "0.5rem",
              paddingBottom: "0.5rem",
              borderRadius: "0.5rem",
              cursor: "pointer",
            }}
          >
            All
          </button>
          <button
            onClick={() => setStatus("progress")}
            className="text-sm sm:text-base"
            style={{
              color: status === "progress" ? "#2a221e" : "#FFFFFF",
              backgroundColor: status === "progress" ? "#FAF0DC" : "",
              fontSize: "1.125rem",
              fontWeight: "600",
              paddingLeft: "1.25rem",
              paddingRight: "1.25rem",
              paddingTop: "0.5rem",
              paddingBottom: "0.5rem",
              cursor: "pointer",
              borderRadius: "0.5rem",
            }}
          >
            In Progress
          </button>
          <button
            onClick={() => setStatus("ready")}
            className="text-sm sm:text-base"
            style={{
              color: status === "ready" ? "#2a221e" : "#FFFFFF",
              backgroundColor: status === "ready" ? "#FAF0DC" : "",
              fontSize: "1.125rem",
              fontWeight: "600",
              paddingLeft: "1.25rem",
              paddingRight: "1.25rem",
              paddingTop: "0.5rem",
              paddingBottom: "0.5rem",
              cursor: "pointer",
              borderRadius: "0.5rem",
            }}
          >
            Ready
          </button>
          <button
            onClick={() => setStatus("completed")}
            className="text-sm sm:text-base"
            style={{
              color: status === "completed" ? "#2a221e" : "#FFFFFF",
              backgroundColor: status === "completed" ? "#FAF0DC" : "",
              fontSize: "1.125rem",
              fontWeight: "600",
              paddingLeft: "1.25rem",
              paddingRight: "1.25rem",
              paddingTop: "0.5rem",
              paddingBottom: "0.5rem",
              cursor: "pointer",
              borderRadius: "0.5rem",
            }}
          >
            Completed
          </button>
        </div>
      </div>
      <div
        className="flex flex-wrap gap-6 items-center justify-center h-[calc(100vh-9rem-2rem)] overflow-y-scroll"
        style={{
          paddingLeft: "1rem",
          paddingRight: "1rem",
          paddingTop: "1rem",
          paddingBottom: "1rem",
          scrollbarWidth: "none",
        }}
      >
        {isPending ? (
          <p className="text-[#ababab]" style={{ fontSize: "1rem" }}>
            Loading orders...
          </p>
        ) : filteredOrders.length === 0 ? (
          <p className="text-[#ababab]" style={{ fontSize: "1rem" }}>
            No orders found.
          </p>
        ) : (
          filteredOrders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))
        )}
      </div>

      <BottomNav />
    </section>
  );
};

export default Orders;
