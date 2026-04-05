import { useState } from "react";
import { useSelector } from "react-redux";
import { getTotalPrice } from "../../redux/slices/cartSlice";
import { enqueueSnackbar } from "notistack";
import { createOrderStripe } from "../../https/index";

const BillInfo = () => {
  const [paymentMethod, setPaymentMethod] = useState();
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const cartData = useSelector((state) => state.cart);
  const customerData = useSelector((state) => state.customer);
  const total = useSelector(getTotalPrice);
  const taxRate = 5.25;
  const tax = (total * taxRate) / 100;
  const totalPriceWithTax = total + tax;

  const handlePlaceOrder = async () => {
    if (isPlacingOrder) return;

    if (!paymentMethod) {
      enqueueSnackbar("Please select a payment method!", {
        variant: "warning",
      });
      return;
    }

    // Cash Payment
    if (paymentMethod === "Cash") {
      const orderData = {
        customerDetails: {
          name: customerData.customerName,
          phone: customerData.customerPhone,
          guests: customerData.guests,
        },
        orderStatus: "In Progress",
        bills: {
          total,
          tax,
          totalWithTax: totalPriceWithTax,
        },
        items: cartData,
        table: customerData.table.tableId,
        paymentMethod,
      };
      console.log("Order Data:", orderData);
      return;
    }

    // Online Payment with Stripe
    if (paymentMethod === "Online") {
      setIsPlacingOrder(true);
      try {
        const { data } = await createOrderStripe({ amount: totalPriceWithTax });
        console.log("Stripe Session Created:", data);

        if (!data?.url) {
          enqueueSnackbar("Payment URL not found", { variant: "error" });
          return;
        }

        window.location.assign(data.url);
      } catch (err) {
        console.error(err);
        const message =
          err?.response?.data?.message || "Failed to start payment";
        enqueueSnackbar(message, { variant: "error" });
      } finally {
        setIsPlacingOrder(false);
      }
    }
  };
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
          onClick={() => setPaymentMethod("Cash")}
          style={{
            backgroundColor: paymentMethod === "Cash" ? "#3d3d3d" : "#2A221E",
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
          onClick={() => setPaymentMethod("Online")}
          style={{
            backgroundColor: paymentMethod === "Online" ? "#3d3d3d" : "#2A221E",
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
          onClick={handlePlaceOrder}
          disabled={isPlacingOrder}
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
            cursor: isPlacingOrder ? "not-allowed" : "pointer",
            opacity: isPlacingOrder ? 0.7 : 1,
          }}
        >
          {isPlacingOrder ? "Processing..." : "Place Order"}
        </button>
      </div>
    </>
  );
};

export default BillInfo;
