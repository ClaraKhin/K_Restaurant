import { useState } from "react";

const Modal = ({ title, onClose, isOpen, children }) => {
  const [hover, setHover] = useState(false);

  if (!isOpen) return null;
  return (
    <div
      className="flex items-center justify-center"
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(160, 160, 160, 0.3)",
        backdropFilter: "blur(4px)",
        zIndex: 50,
      }}
    >
      <div
        className="bg-[#1D1716] w-[500px] rounded-lg shadow-lg w-full max-w-lg"
        style={{ marginLeft: "1rem", marginRight: "1rem", padding: "1rem" }}
      >
        <div
          className="flex justify-between items-center"
          style={{ borderBottom: "1px solid #6B7280" }}
        >
          <h2
            className="text-[#ffffff]"
            style={{ fontSize: "1.25rem", fontWeight: 600 }}
          >
            {title}
          </h2>
          <button
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className=" cursor-pointer "
            style={{
              fontSize: "1.5rem",
              fontWeight: 600,
              color: hover ? "  #D1D5DB" : "#6B7280",
              transition: "color 0.2s ease",
            }}
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div style={{ padding: "1rem" }}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
