import React, { use } from "react";
import { useSelector } from "react-redux";
import { getTotalPrice } from "../../redux/slices/cartSlice";

const BillInfo = () => {
  const cartData = useSelector((state) => state.cart);
  const total = useSelector(getTotalPrice);
  const taxRate = 5.25;
  const tax = (total * taxRate) / 100;
  const totalPriceWithTax = total + tax;
  return (
    <>
      <div
        className="flex items-center justify-between"
        style={{
          paddingLeft: "1.25rem",
          paddingRight: "1.25rem",
          marginTop: "0.5rem",
        }}
      >
        <p
          className="text-[#ababab]"
          style={{ fontSize: "0.75rem", fontWeight: 500, marginTop: "0.5rem" }}
        >
          Items({cartData.length})
        </p>
        <h1
          className="text-[#ffffff]"
          style={{ fontSize: "1rem", fontWeight: 700 }}
        >
          ${total.toFixed(2)}
        </h1>
      </div>

      <div
        className="flex items-center justify-between"
        style={{
          paddingLeft: "1.25rem",
          paddingRight: "1.25rem",
          marginTop: "0.5rem",
        }}
      >
        <p
          className="text-[#ababab]"
          style={{ fontSize: "0.75rem", fontWeight: 500, marginTop: "0.5rem" }}
        >
          Tax
        </p>
        <h1
          className="text-[#ffffff]"
          style={{ fontSize: "1rem", fontWeight: 700 }}
        >
          ${tax.toFixed(2)}
        </h1>
      </div>

      <div
        className="flex items-center justify-between"
        style={{
          paddingLeft: "1.25rem",
          paddingRight: "1.25rem",
          marginTop: "0.5rem",
        }}
      >
        <p
          className="text-[#ababab]"
          style={{ fontSize: "0.75rem", fontWeight: 500, marginTop: "0.5rem" }}
        >
          Total With Tax
        </p>
        <h1
          className="text-[#ffffff]"
          style={{ fontSize: "1rem", fontWeight: 700 }}
        >
          ${totalPriceWithTax.toFixed(2)}
        </h1>
      </div>

      <div
        className="flex items-center gap-3"
        style={{
          paddingLeft: "1.25rem",
          paddingRight: "1.25rem",
          marginTop: "1rem",
        }}
      >
        <button
          style={{
            backgroundColor: "#2A221E",
            color: "#FAF0DC",
            paddingLeft: "1rem",
            paddingRight: "1rem",
            paddingTop: "0.75rem",
            paddingBottom: "0.75rem",
            width: "100%",
            borderRadius: "0.5rem",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Cash
        </button>
        <button
          style={{
            backgroundColor: "#2A221E",
            color: "#FAF0DC",
            paddingLeft: "1rem",
            paddingRight: "1rem",
            paddingTop: "0.75rem",
            paddingBottom: "0.75rem",
            width: "100%",
            borderRadius: "0.5rem",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Online
        </button>
      </div>

      <div
        className="flex items-center gap-3"
        style={{
          paddingLeft: "1.25rem",
          paddingRight: "1.25rem",
          marginTop: "1rem",
        }}
      >
        <button
          style={{
            backgroundColor: "#025cca",
            color: "#FAF0DC",
            paddingLeft: "1rem",
            paddingRight: "1rem",
            paddingTop: "0.75rem",
            paddingBottom: "0.75rem",
            width: "100%",
            borderRadius: "0.5rem",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Print Receipt
        </button>
        <button
          style={{
            backgroundColor: "#F6B100",
            color: "#1F1F1F",
            paddingLeft: "1rem",
            paddingRight: "1rem",
            paddingTop: "0.75rem",
            paddingBottom: "0.75rem",
            width: "100%",
            borderRadius: "0.5rem",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Place Order
        </button>
      </div>
    </>
  );
};

export default BillInfo;
