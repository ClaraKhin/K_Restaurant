import Modal from "../shared/Modal";

const toMoney = (value) => {
  const amount = Number(value);
  return Number.isFinite(amount) ? amount.toFixed(2) : "0.00";
};

const ReceiptModal = ({ isOpen, onClose, onPrint, receipt }) => {
  const items = Array.isArray(receipt?.items) ? receipt.items : [];
  const customerDetails = receipt?.customerDetails ?? {};
  const bills = receipt?.bills ?? {};
  const shortOrderId = receipt?.orderId
    ? `#${String(receipt.orderId).slice(-6)}`
    : "N/A";

  return (
    <>
      <Modal title="Order Receipt" isOpen={isOpen} onClose={onClose}>
        <div className=" flex flex-col gap-3">
          <div
            className=" rounded-lg border border-[#3a2f2a]"
            style={{
              padding: "1rem",
              backgroundColor: "#17110f",
            }}
          >
            <div
              className="flex items-center justify-between gap-4"
              style={{ marginBottom: "1rem" }}
            >
              <div className="flex flex-col items-start">
                <h3
                  className="text-[#FAF0DC]"
                  style={{ fontSize: "1.125rem", fontWeight: 700 }}
                >
                  Invoice Receipt
                </h3>
                <p
                  className="text-[#ababab] text-sm text-left"
                  style={{ marginTop: "0.3rem" }}
                >
                  Paid order summary for printing and reconciliation.
                </p>
              </div>
              <div className="text-right">
                <p className="text-[#F6B100]" style={{ fontWeight: 700 }}>
                  {shortOrderId}
                </p>
                <p className="text-[#ababab]" style={{ marginTop: "0.35rem" }}>
                  {receipt?.table?.tableNo
                    ? `Table ${receipt.table.tableNo}`
                    : "Take away"}
                </p>
              </div>
            </div>

            <div
              className="grid grid-cols-2 gap-3 text-sm"
              style={{ marginBottom: "1rem" }}
            >
              <div className="flex flex-col items-start">
                <p className="text-[#8b8b8b]">Order ID</p>
                <p className="text-[#ffffff] " style={{ fontSize: "0.75rem" }}>
                  {receipt?.orderId || "N/A"}
                </p>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-[#8b8b8b]">Payment Method</p>
                <p className="text-[#ffffff]" style={{ fontSize: "0.75rem" }}>
                  {receipt?.paymentMethod || "N/A"}
                </p>
              </div>
              <div className="flex flex-col items-start">
                <p className="text-[#8b8b8b]">Name</p>
                <p className="text-[#ffffff]" style={{ fontSize: "0.75rem" }}>
                  {customerDetails?.name || "N/A"}
                </p>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-[#8b8b8b]">Phone</p>
                <p className="text-[#ffffff]" style={{ fontSize: "0.75rem" }}>
                  {customerDetails?.phone || "N/A"}
                </p>
              </div>
              <div className="flex flex-col items-start">
                <p className="text-[#8b8b8b]">Guests</p>
                <p className="text-[#ffffff]" style={{ fontSize: "0.75rem" }}>
                  {customerDetails?.guests ?? 0}
                </p>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-[#8b8b8b]">StripePaymentIntentId</p>
                <p className="text-[#ffffff] " style={{ fontSize: "0.75rem" }}>
                  {receipt?.stripePaymentIntentId || "N/A"}
                </p>
              </div>
            </div>

            <div
              className="rounded-lg"
              style={{
                border: "1px solid #3a2f2a",
                overflow: "hidden",
                marginBottom: "1.5rem",
              }}
            >
              <div
                className="grid grid-cols-[1.6fr_0.6fr_0.8fr_0.8fr] text-[#F6B100]"
                style={{
                  padding: "0.75rem 1rem",
                  backgroundColor: "#211917",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                }}
              >
                <p>Item</p>
                <p
                  className="text-center"
                  style={{ fontSize: "0.9rem", fontWeight: 600 }}
                >
                  Qty
                </p>
                <p
                  className="text-right"
                  style={{ fontSize: "0.9rem", fontWeight: 600 }}
                >
                  Price
                </p>
                <p className="text-right" style={{ fontSize: "0.9rem" }}>
                  Total
                </p>
              </div>

              {items.length === 0 ? (
                <div style={{ padding: "1rem" }} className="text-[#ababab]">
                  No items found for this order.
                </div>
              ) : (
                items.map((item, index) => (
                  <div
                    key={`${item.name}-${index}`}
                    className="grid grid-cols-[1.6fr_0.6fr_0.8fr_0.8fr] text-[#ffffff]"
                    style={{
                      padding: "0.75rem 1rem",
                      fontSize: "0.8rem",
                      borderTop: index === 0 ? "none" : "1px solid #2d2420",
                    }}
                  >
                    <p>{item?.name || "Unknown item"}</p>
                    <p className="text-center" style={{ fontSize: "0.8rem" }}>
                      {item?.quantity ?? 0}
                    </p>
                    <p className="text-right" style={{ fontSize: "0.8rem" }}>
                      ${toMoney(item?.pricePerQuantity)}
                    </p>
                    <p className="text-right" style={{ fontSize: "0.8rem" }}>
                      ${toMoney(item?.price)}
                    </p>
                  </div>
                ))
              )}
            </div>

            <div className="flex justify-end">
              <div className="w-full max-w-[260px] space-y-2">
                <div
                  className="flex items-center justify-between text-[#ababab]"
                  style={{ fontWeight: 600, fontSize: "0.875rem" }}
                >
                  <span>Subtotal</span>
                  <span>${toMoney(bills?.total)}</span>
                </div>
                <div
                  className="flex items-center justify-between text-[#ababab]"
                  style={{ fontWeight: 600, fontSize: "0.875rem" }}
                >
                  <span>Tax</span>
                  <span>${toMoney(bills?.tax)}</span>
                </div>
                <div
                  className="flex items-center justify-between text-[#FAF0DC]"
                  style={{
                    marginTop: "0.5rem",
                    paddingTop: "0.75rem",
                    borderTop: "1px solid #3a2f2a",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                  }}
                >
                  <span>Grand Total</span>
                  <span>${toMoney(bills?.totalWithTax)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="receipt-print-hidden flex items-center justify-around gap-3">
            <button
              onClick={onClose}
              style={{
                backgroundColor: "#2A221E",
                color: "#FAF0DC",
                padding: "0.75rem 1rem",
                borderRadius: "0.5rem",
                fontWeight: 600,
                cursor: "pointer",
                width: "100%",
              }}
            >
              Cancel
            </button>
            <button
              onClick={onPrint}
              style={{
                backgroundColor: "#025cca",
                color: "#FAF0DC",
                padding: "0.75rem 1rem",
                borderRadius: "0.5rem",
                fontWeight: 600,
                cursor: "pointer",
                width: "100%",
              }}
            >
              Print Receipt
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ReceiptModal;
