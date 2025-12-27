import { useState } from "react";
import BottomNav from "../components/shared/BottomNav";
import OrderCard from "../components/orders/OrderCard";
import BackButton from "../components/shared/BackButton";

const Orders = () => {
  const [status, setStatus] = useState("all");
  return (
    <section
      className="bg-[#2a221e] min-h-screen overflow-y-auto"
      style={{
        paddingBottom: "4.5rem",
      }}
    >
      <div
        className="flex items-center justify-between"
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
        <div className="flex items-center justify-around gap-4">
          <button
            onClick={() => setStatus("all")}
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
          paddingLeft: "2.5rem",
          paddingRight: "2.5rem",
          paddingTop: "1rem",
          paddingBottom: "1rem",
          scrollbarWidth: "none",
        }}
      >
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
      </div>

      <BottomNav />
    </section>
  );
};

export default Orders;
