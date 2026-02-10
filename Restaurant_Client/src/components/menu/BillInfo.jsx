import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTotalPrice } from "../../redux/slices/cartSlice";
import { enqueueSnackbar } from "notistack";
import axios from "axios";
import { loadScript } from "@stripe/stripe-js";
import { createOrderStripe } from "../../https";
import { removeItem } from "../../redux/slices/cartSlice";
import { removeCustomer } from "../../redux/slices/customerSlice";
import { useMutation } from "@tanstack/react-query";

const stripePromise = loadScript(import.meta.env.STRIPE_PUBLISHABLE_KEY);

const BillInfo = () => {
  const [paymentMethod, setPaymentMethod] = useState();
  const [orderInfo, setOrderInfo] = useState();
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cart);
  const total = useSelector(getTotalPrice);
  const taxRate = 5.25;
  const tax = (total * taxRate) / 100;
  const totalPriceWithTax = total + tax;

  const orderMutation = useMutation({
    mutationFn: (reqData) => addOrder(reqData),
    onSuccess: (res) => {
      const { data } = res.data;
      setOrderInfo(data);

      // Update Table
      const tableData = {
        status: "Booked",
        orderId: data._id,
        tableId: data.table,
      };
      tableUpdateMutation.mutate(tableData);

      enqueueSnackbar("Order Placed!", { variant: "success" });
      setShowInvoice(true);
    },
    onError: (error) => {
      console.log(error);
      enqueueSnackbar("Failed to place order!", { variant: "error" });
    },
  });

  const tableUpdateMutation = useMutation({
    mutationFn: (reqData) => updateTable(reqData),
    onSuccess: () => {
      dispatch(removeCustomer());
      dispatch(removeItem());
    },
    onError: (error) => console.log(error),
  });

  const handlePlaceOrder = async () => {
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
          totalWithTax,
        },
        items: cartData,
        table: customerData.table.tableId,
        paymentMethod,
      };
      orderMutation.mutate(orderData);
      return;
    }

    // Online Payment with Stripe
    if (paymentMethod === "Online") {
      try {
        const { data } = await createOrderStripe({ amount: totalPriceWithTax });
        if (!data) {
          enqueueSnackbar("Failed to create Stripe payment!", {
            variant: "error",
          });
          return;
        }

        const stripe = window.Stripe(
          import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
        );

        const { error, paymentIntent } = await stripe.confirmCardPayment(
          data.order.client_secret,
          {
            payment_method: {
              card: { token: data.token }, // If using tokenized card input
              billing_details: { name: customerData.customerName },
            },
          }
        );

        if (error) {
          enqueueSnackbar("Payment failed. Please try again.", {
            variant: "error",
          });
        } else {
          enqueueSnackbar("Payment successful!", { variant: "success" });

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
              totalWithTax,
            },
            items: cartData,
            table: customerData.table.tableId,
            paymentMethod,
            paymentData: {
              stripe_payment_id: paymentIntent.id,
            },
          };

          orderMutation.mutate(orderData);
        }
      } catch (err) {
        console.log(err);
        enqueueSnackbar("Stripe payment failed. Please try again.", {
          variant: "error",
        });
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
