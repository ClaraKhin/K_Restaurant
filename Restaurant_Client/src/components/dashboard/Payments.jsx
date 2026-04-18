import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { getOrders, getReceiptByOrderId } from "../../https";
import ReceiptModal from "../payment/ReceiptModal";
import { formatDate } from "../../utils";

const toMoney = (value) => {
  const numberValue = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(numberValue)) return "0.00";
  return numberValue.toFixed(2);
};

const parseDate = (value) => {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const Payments = () => {
  const [receiptOpen, setReceiptOpen] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [loadingReceipt, setLoadingReceipt] = useState(false);

  const {
    data: resData,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      return await getOrders();
    },
  });

  useEffect(() => {
    if (isError) {
      enqueueSnackbar("Something went wrong while fetching payments", {
        variant: "error",
      });
    }
  }, [isError]);

  const apiOrders = Array.isArray(resData?.data?.data) ? resData.data.data : [];

  const uiPayments = useMemo(() => {
    const filtered = apiOrders;

    const sorted = [...filtered].sort((a, b) => {
      const da = parseDate(a?.createdAt || a?.orderDate) || 0;
      const db = parseDate(b?.createdAt || b?.orderDate) || 0;
      return db - da;
    });

    return sorted.map((order) => {
      const payment = order.paymentData || {};
      const amount =
        payment.stripePaymentAmount ??
        order?.bills?.totalWithTax ??
        order?.bills?.total ??
        0;
      const shortPaymentId = payment.stripePaymentIntentId
        ? `#${String(payment.stripePaymentIntentId).slice(-6)}`
        : "#N/A";
      const shortOrderId = order?._id
        ? `#${String(order._id).slice(-6)}`
        : "#N/A";

      return {
        key: order?._id || Math.random(),
        paymentId: payment.stripePaymentIntentId || "",
        paymentIdText: shortPaymentId,
        orderId: order?._id || null,
        orderIdText: shortOrderId,
        customer: order?.customerDetails?.name || "Unknown",
        method: order?.paymentMethod || "Online",
        amount,
        currency: payment.stripePaymentCurrency || "usd",
        status: payment.stripePaymentStatus || "",
        dateTime: order?.createdAt || order?.orderDate || null,
      };
    });
  }, [apiOrders]);

  const gridCols =
    "minmax(140px,1fr) minmax(120px,1fr) minmax(180px,1.5fr) minmax(120px,1fr) minmax(120px,1fr) minmax(190px,1.6fr) minmax(100px,0.8fr)";

  const handleViewReceipt = async (orderId) => {
    if (!orderId) {
      enqueueSnackbar("Invalid order id", { variant: "error" });
      return;
    }

    setLoadingReceipt(true);
    try {
      const res = await getReceiptByOrderId(orderId);
      setReceipt(res?.data?.receipt ?? null);
      setReceiptOpen(true);
    } catch (err) {
      const msg = err?.response?.data?.message || "Failed to fetch receipt";
      enqueueSnackbar(msg, { variant: "error" });
    } finally {
      setLoadingReceipt(false);
    }
  };

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
        Payments
      </h2>

      <div className="dashboard-grid-scroll overflow-x-auto">
        <div
          className="dashboard-grid-table w-full text-left text-[#f5f5f5]"
          style={{ minWidth: "1000px" }}
        >
          <div
            className="dashboard-grid-header bg-[#2A221E] text-[#ababab]"
            style={{ display: "grid", gridTemplateColumns: gridCols }}
          >
            <div style={{ padding: "0.75rem" }}>Payment ID</div>
            <div style={{ padding: "0.75rem" }}>Order ID</div>
            <div style={{ padding: "0.75rem" }}>Customer</div>
            <div style={{ padding: "0.75rem" }}>Method</div>
            <div style={{ padding: "0.75rem" }}>Amount</div>
            <div style={{ padding: "0.75rem" }}>Date & Time</div>
            <div className="text-center" style={{ padding: "0.75rem" }}>
              Receipts
            </div>
          </div>

          {isFetching ? (
            <div
              className="text-center text-[#ababab]"
              style={{ padding: "1rem" }}
            >
              Loading payments...
            </div>
          ) : uiPayments.length === 0 ? (
            <div
              className="text-center text-[#ababab]"
              style={{ padding: "1rem" }}
            >
              No payments found.
            </div>
          ) : (
            uiPayments.map((p) => {
              const date = parseDate(p.dateTime);
              const dateText = date
                ? `${formatDate(date)} ${date.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}`
                : "Unknown";

              return (
                <div
                  key={p.key}
                  className="dashboard-grid-row border-b border-gray-600 hover:bg-[#2A221E]"
                  style={{
                    display: "grid",
                    gridTemplateColumns: gridCols,
                    alignItems: "center",
                  }}
                >
                  <div
                    data-label="Payment ID"
                    className="text-[#f5f5f5]"
                    style={{ fontWeight: 700, padding: "1rem" }}
                  >
                    {p.paymentIdText}
                  </div>

                  <div
                    data-label="Order ID"
                    className="text-[#f5f5f5]"
                    style={{ fontWeight: 600, padding: "1rem" }}
                  >
                    {p.orderIdText}
                  </div>

                  <div
                    data-label="Customer"
                    className="text-[#f5f5f5]"
                    style={{ fontWeight: 600, padding: "1rem" }}
                  >
                    {p.customer}
                  </div>

                  <div
                    data-label="Method"
                    style={{ padding: "1rem", fontWeight: 600 }}
                  >
                    {p.method}
                  </div>

                  <div
                    data-label="Amount"
                    className="text-[#f5f5f5]"
                    style={{ fontWeight: 700, padding: "1rem" }}
                  >
                    ${toMoney(p.amount)}{" "}
                    {p.currency ? p.currency.toUpperCase() : ""}
                  </div>

                  <div data-label="Date & Time" style={{ padding: "1rem" }}>
                    {dateText}
                  </div>

                  <div
                    data-label="Receipts"
                    className="text-[#f5f5f5]"
                    style={{ fontWeight: 600, padding: "1rem" }}
                  >
                    <button
                      onClick={() => handleViewReceipt(p.orderId)}
                      disabled={loadingReceipt}
                      style={{
                        backgroundColor: "#2e4a40",
                        color: "#02ca3a",
                        padding: "0.5rem 0.75rem",
                        borderRadius: "0.5rem",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      View Receipt
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {receiptOpen && (
        <ReceiptModal
          isOpen={receiptOpen}
          onClose={() => setReceiptOpen(false)}
          onPrint={() => window.print()}
          receipt={receipt}
        />
      )}
    </div>
  );
};

export default Payments;
