import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { getReceiptByOrderId, verifyPayment } from "../https";
import ReceiptModal from "../components/payment/ReceiptModal";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const orderId = searchParams.get("order_id");
  const paymentMethod = searchParams.get("payment_method");
  const [status, setStatus] = useState("loading"); // loading | success | error
  const [details, setDetails] = useState({
    paymentId: null,
    orderId: null,
    receipt: null,
  });
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuccessDetails = async () => {
      if (!sessionId && !orderId) {
        enqueueSnackbar("Missing payment reference from redirect URL.", {
          variant: "error",
        });
        setStatus("error");
        return;
      }

      try {
        if (sessionId) {
          const { data } = await verifyPayment(sessionId);
          const payload = {
            paymentId: data.paymentId,
            orderId: data.orderId,
            receipt: data.receipt ?? null,
          };

          setDetails(payload);
          console.log("Stripe paymentId:", payload.paymentId);
          console.log("OrderId (metadata.orderId):", payload.orderId);
          enqueueSnackbar("Payment confirmed!", { variant: "success" });
          setStatus("success");
          setIsReceiptOpen(Boolean(payload.receipt));
          return;
        }

        const { data } = await getReceiptByOrderId(orderId);
        const payload = {
          paymentId: null,
          orderId: data.orderId,
          receipt: data.receipt ?? null,
        };

        setDetails(payload);
        enqueueSnackbar("Cash order created successfully!", {
          variant: "success",
        });
        setStatus("success");
        setIsReceiptOpen(Boolean(payload.receipt));
      } catch (err) {
        const message =
          err?.response?.data?.message ||
          "Unable to load the receipt. Please contact support.";
        enqueueSnackbar(message, { variant: "error" });
        setStatus("error");
      }
    };

    fetchSuccessDetails();
  }, [sessionId, orderId]);

  const successTitle =
    paymentMethod === "Cash" && !sessionId
      ? "Cash Order Created"
      : "Payment Successful";
  const successMessage =
    paymentMethod === "Cash" && !sessionId
      ? "Your cash order has been placed successfully. The invoice is ready for printing and reconciliation."
      : "Thanks for your payment. The order and payment references are stored for reconciliation.";
  const loadingTitle = sessionId
    ? "Confirming Payment..."
    : "Preparing Invoice...";
  const loadingMessage = sessionId
    ? "We are fetching your Stripe session details."
    : "We are fetching your cash order receipt details.";
  const errorTitle = sessionId
    ? "Could Not Confirm Payment"
    : "Could Not Load Invoice";
  const errorMessage = sessionId
    ? "We could not find a valid session. Please check your payment status in the orders page or try again."
    : "We could not find a valid order receipt. Please check your order in the orders page or try again.";

  const handlePrintReceipt = () => {
    window.print();
  };

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
              {loadingTitle}
            </h1>
            <p className="text-[#d7d7d7]">{loadingMessage}</p>
          </>
        )}

        {status === "success" && (
          <>
            <h1
              className="text-white text-2xl font-bold"
              style={{ marginBottom: "1rem" }}
            >
              {successTitle}
            </h1>
            <p className="text-[#d7d7d7]" style={{ marginBottom: "1rem" }}>
              {successMessage}
            </p>
            {/* <div className="bg-[#2a221e] rounded-md p-4 text-left text-sm text-[#d7d7d7] space-y-2 mb-6">
              <p>
                <span className="text-[#F6B100] font-semibold">Order ID:</span>
                {details.orderId || "Not available"}
              </p>
              <p>
                <span className="text-[#F6B100] font-semibold">
                  Payment Reference:
                </span>{" "}
                {details.paymentId || "N/A"}
              </p>
            </div> */}
            <div className="flex gap-3">
              {/* <button
                onClick={() => setIsReceiptOpen(true)}
                className="w-full"
                style={{
                  backgroundColor: "#025cca",
                  color: "#FFFFFF",
                  padding: "0.75rem",
                  fontWeight: "600",
                  borderRadius: "0.375rem",
                  cursor: "pointer",
                }}
              >
                View Invoice
              </button> */}
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
            <h1 className="text-white text-2xl font-bold mb-4">{errorTitle}</h1>
            <p className="text-[#d7d7d7] mb-6">{errorMessage}</p>
            <button
              onClick={() => navigate("/menu")}
              className="w-full bg-[#F6B100] text-[#1F1F1F] font-semibold py-3 rounded-md hover:opacity-90 transition-opacity"
            >
              Back to Menu
            </button>
          </>
        )}
      </div>

      <ReceiptModal
        isOpen={isReceiptOpen}
        onClose={() => setIsReceiptOpen(false)}
        onPrint={handlePrintReceipt}
        receipt={details.receipt}
      />
    </section>
  );
};

export default PaymentSuccess;
