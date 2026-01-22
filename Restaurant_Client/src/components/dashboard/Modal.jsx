import { useState } from "react";
import { motion } from "framer-motion";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { addTable } from "../../https";
import { enqueueSnackbar } from "notistack";

const Modal = ({ setTableModalOpen }) => {
  const [tableData, setTableData] = useState({
    tableNo: "",
    seats: "",
  });
  const [closeBtnHover, setCloseBtnHover] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTableData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(tableData);
    tableMutation.mutate(tableData);
  };

  const handleCloseModal = () => {
    setTableModalOpen(false);
  };

  const tableMutation = useMutation({
    mutationFn: (reqData) => addTable(reqData),
    onSuccess: (data) => {
      setTableModalOpen(false);
      enqueueSnackbar(data.message, { variant: "success" });
    },
    onError: (error) => {
      const { data } = error.response;
      enqueueSnackbar(data.message, { variant: "error" });
      console.log(error);
    },
  });

  return (
    <div
      className="flex items-center justify-center z-50"
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: "rgba(0, 0, 0, 0.72)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="bg-[#3A322E] rounded-lg w-96 "
        style={{
          padding: "1.5rem",
          boxShadow:
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(29, 23, 22, 0.5)",
        }}
      >
        {/* Modal Header */}

        <div
          className="flex items-center justify-between"
          style={{ marginBottom: "1rem" }}
        >
          <h2
            className="text-[#f5f5f5] "
            style={{
              fontSize: "1.25rem",
              fontWeight: 600,
              lineHeight: "1.75rem",
            }}
          >
            Add Table
          </h2>
          <button
            onClick={handleCloseModal}
            onMouseEnter={() => setCloseBtnHover(true)}
            onMouseLeave={() => setCloseBtnHover(false)}
            style={{
              transition: "color 0.2s",
              cursor: "pointer",
              color: closeBtnHover ? "#ef4444" : "#f5f5f5",
            }}
          >
            <CloseCircleOutlined style={{ fontSize: "1.5rem" }} />
          </button>
        </div>

        {/* Modal Body */}

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          style={{ marginTop: "2.5rem" }}
        >
          <div>
            <label
              className="block text-[#ababab]"
              style={{
                marginBottom: "0.5rem",
                marginTop: "1rem",
                fontSize: "0.875rem",
                lineHeight: "1.25rem",
                fontWeight: 500,
              }}
            >
              Table Number
            </label>
            <div
              className="flex items-center rounded-lg bg-[#1D1716]"
              style={{
                paddingTop: "1.25rem",
                paddingBottom: "1.25rem",
                paddingLeft: "1rem",
                paddingRight: "1rem",
              }}
            >
              <input
                type="number"
                name="tableNo"
                value={tableData.tableNo}
                onChange={handleInputChange}
                className="focus:outline-none"
                style={{ flex: 1, color: "#ffffff" }}
                required
              />
            </div>
          </div>

          <div>
            <label
              className="block text-[#ababab]"
              style={{
                marginBottom: "0.5rem",
                marginTop: "1rem",
                fontSize: "0.875rem",
                lineHeight: "1.25rem",
                fontWeight: 500,
              }}
            >
              Number Of Seats
            </label>
            <div
              className="flex items-center rounded-lg bg-[#1D1716]"
              style={{
                paddingTop: "1.25rem",
                paddingBottom: "1.25rem",
                paddingLeft: "1rem",
                paddingRight: "1rem",
              }}
            >
              <input
                type="number"
                name="seats"
                value={tableData.seats}
                onChange={handleInputChange}
                className="focus:outline-none"
                style={{ flex: 1, color: "#ffffff" }}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            style={{
              backgroundColor: "#FACC15",
              width: "100%",
              marginTop: "1.5rem",
              paddingTop: "0.75rem",
              paddingBottom: "0.75rem",
              fontSize: "1.125rem",
              color: "#111827",
              fontWeight: 700,
              borderRadius: "0.5rem",
              cursor: "pointer",
            }}
          >
            Add Table
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Modal;
