import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { verifyPayment } from "../https";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState("loading"); // loading | success | error
  const [details, setDetails] = useState({ paymentId: null, orderId: null });
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionId) {
      enqueueSnackbar("Missing Stripe session_id from redirect URL.", {
        variant: "error",
      });
      setStatus("error");
      return;
    }

    const fetchSession = async () => {
      try {
        const { data } = await verifyPayment(sessionId);
        const payload = {
          paymentId: data.paymentId,
          orderId: data.orderId,
        };

        setDetails(payload);
        console.log("Stripe paymentId:", payload.paymentId);
        console.log("OrderId (metadata.orderId):", payload.orderId);
        enqueueSnackbar("Payment confirmed!", { variant: "success" });
        setStatus("success");
      } catch (err) {
        const message =
          err?.response?.data?.message ||
          "Unable to confirm payment. Please contact support.";
        enqueueSnackbar(message, { variant: "error" });
        setStatus("error");
      }
    };

    fetchSession();
  }, [sessionId, enqueueSnackbar, verifyPayment]);

  return (
    <section className="bg-[#2a221e] min-h-screen flex flex-col items-center justify-center text-center">
      <div
        className="bg-[#1D1716] rounded-lg max-w-md w-full shadow-lg"
        style={{ padding: "2rem" }}
      >
        {status === "loading" && (
          <>
            <h1
              className="text-white text-2xl font-bold"
              style={{ marginBottom: "1rem" }}
            >
              Confirming Payment...
            </h1>
            <p className="text-[#d7d7d7]">
              We are fetching your Stripe session details.
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <h1
              className="text-white text-2xl font-bold"
              style={{ marginBottom: "1rem" }}
            >
              Payment Successful
            </h1>
            <p className="text-[#d7d7d7]" style={{ marginBottom: "1rem" }}>
              Thanks for your payment. The order and payment references are
              stored for reconciliation.
            </p>
            {/* <div className="bg-[#2a221e] rounded-md p-4 text-left text-sm text-[#d7d7d7] space-y-2 mb-6">
              <p>
                <span className="text-[#F6B100] font-semibold">
                  Payment ID:
                </span>{" "}
                {details.paymentId || "Not available"}
              </p>
              <p>
                <span className="text-[#F6B100] font-semibold">Order ID:</span>{" "}
                {details.orderId || "Not available"}
              </p>
            </div> */}
            <div className="flex gap-3">
              <button
                onClick={() => navigate("/orders")}
                className="w-full"
                style={{
                  backgroundColor: "#2A221E",
                  color: "#FFFFFF",
                  padding: "0.75rem",
                  fontWeight: "600",
                  borderRadius: "0.375rem",
                  cursor: "pointer",
                  transition: "opacity 0.2s ease-in-out",
                  "&:hover": {
                    opacity: "0.9",
                  },
                }}
              >
                View Orders
              </button>
              <button
                onClick={() => navigate("/menu")}
                className="w-full"
                style={{
                  backgroundColor: "#2A221E",
                  color: "#FFFFFF",
                  padding: "0.75rem",
                  fontWeight: "600",
                  borderRadius: "0.375rem",
                  cursor: "pointer",
                  transition: "opacity 0.2s ease-in-out",
                  "&:hover": {
                    opacity: "0.9",
                  },
                }}
              >
                Back to Menu
              </button>
            </div>
          </>
        )}

        {status === "error" && (
          <>
            <h1 className="text-white text-2xl font-bold mb-4">
              Could Not Confirm Payment
            </h1>
            <p className="text-[#d7d7d7] mb-6">
              We could not find a valid session. Please check your payment
              status in the orders page or try again.
            </p>
            <button
              onClick={() => navigate("/menu")}
              className="w-full bg-[#F6B100] text-[#1F1F1F] font-semibold py-3 rounded-md hover:opacity-90 transition-opacity"
            >
              Back to Menu
            </button>
          </>
        )}
      </div>
    </section>
  );
};

export default PaymentSuccess;
