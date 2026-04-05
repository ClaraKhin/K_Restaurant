import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

const PaymentCancel = () => {
  const navigate = useNavigate();

  useEffect(() => {
    enqueueSnackbar("Payment was cancelled. You can try again.", {
      variant: "warning",
    });

    const timer = setTimeout(() => navigate("/menu"), 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <section
      className="bg-[#2a221e] min-h-screen flex flex-col items-center justify-center text-center px-6"
    >
      <div className="bg-[#1D1716] rounded-lg p-8 max-w-md w-full shadow-lg">
        <h1 className="text-white text-2xl font-bold mb-4">
          Payment Cancelled
        </h1>
        <p className="text-[#d7d7d7] mb-6">
          You were returned from Stripe without completing payment. You can go back to the order and try again.
        </p>
        <button
          onClick={() => navigate("/menu")}
          className="w-full bg-[#F6B100] text-[#1F1F1F] font-semibold py-3 rounded-md hover:opacity-90 transition-opacity"
        >
          Back to Place Order
        </button>
      </div>
    </section>
  );
};

export default PaymentCancel;
