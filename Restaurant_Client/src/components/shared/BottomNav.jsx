import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  CoffeeOutlined,
  MenuOutlined,
  EllipsisOutlined,
  AlertFilled,
} from "@ant-design/icons";
import Modal from "./Modal";

const BottomNav = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const [guestCount, setGuestCount] = useState(0);
  const navigate = useNavigate();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const guestIncrement = () =>
    setGuestCount((prev) => (prev >= 6 ? 6 : prev + 1));
  const guestDecrement = () => {
    setGuestCount((prev) => (prev > 0 ? prev - 1 : 0));
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#1d1716] p-2 h-16 flex justify-around ">
      <button
        onClick={() => navigate("/")}
        className="flex cursor-pointer items-center justify-center w-[200px]"
        style={{
          backgroundColor: "#FAF0DC",
          borderRadius: "20px",
        }}
      >
        <HomeOutlined
          className="text-2xl inline"
          style={{ color: "#2a221e", marginRight: "5px" }}
        />
        <p className="text-[#2a221e]">Home</p>
      </button>
      <button
        onClick={() => navigate("/orders")}
        className="flex cursor-pointer items-center justify-center w-[200px]"
      >
        <MenuOutlined
          className="text-2xl inline"
          style={{ color: "#FAF0DC", marginRight: "5px" }}
        />
        <p className="text-[#FAF0DC]">Orders</p>
      </button>
      <button
        onClick={() => navigate("/tables")}
        className="flex cursor-pointer items-center justify-center w-[200px]"
      >
        <CoffeeOutlined
          className="text-3xl inline"
          style={{ color: "#FAF0DC", marginRight: "5px" }}
        />
        <p className="text-[#FAF0DC]">Tables</p>
      </button>
      <button className="flex cursor-pointer items-center justify-center w-[200px]">
        <EllipsisOutlined
          className="text-2xl inline rounded-full "
          style={{
            color: "#FAF0DC",
            border: "2px solid #FAF0DC",
            padding: "2px",
            marginRight: "5px",
          }}
        />
        <p className="text-[#FAF0DC]">More</p>
      </button>

      <button
        onClick={openModal}
        className="absolute bottom-6 flex cursor-pointer items-center justify-center w-[50px] h-[50px]"
        style={{
          backgroundColor: "#F6B100",
          padding: "3px",
          borderRadius: "100%",
        }}
      >
        <AlertFilled className="text-2xl inline" />
      </button>

      <Modal title="Alert" isOpen={isModalOpen} onClose={closeModal}>
        <div>
          <label
            className="block text-[#ababab]"
            style={{
              fontSize: "0.875rem",
              fontWeight: 500,
              marginBottom: "0.5rem",
            }}
          >
            Customer Name
          </label>
          <div
            className="flex items-center rounded-lg"
            style={{
              backgroundColor: "#2A221E",
              paddingTop: "0.75rem",
              paddingBottom: "0.75rem",
              paddingLeft: "1rem",
              paddingRight: "1rem",
            }}
          >
            <input
              type="text"
              placeholder="Enter Customer Name"
              id=""
              className="bg-transparent focus:outline-none"
              style={{
                color: "#FFFFFF",
                flex: "1",
              }}
            />
          </div>
        </div>

        <div>
          <label
            className="block text-[#ababab]"
            style={{
              fontSize: "0.875rem",
              fontWeight: 500,
              marginBottom: "0.5rem",
              marginTop: "0.75rem",
            }}
          >
            Customer Phone
          </label>
          <div
            className="flex items-center rounded-lg"
            style={{
              backgroundColor: "#2A221E",
              paddingTop: "0.75rem",
              paddingBottom: "0.75rem",
              paddingLeft: "1rem",
              paddingRight: "1rem",
            }}
          >
            <input
              type="number"
              placeholder="+95-1234567890"
              id=""
              className="bg-transparent focus:outline-none"
              style={{
                color: "#FFFFFF",
                flex: "1",
              }}
            />
          </div>
        </div>

        <div>
          <label
            className="block text-[#ababab]"
            style={{
              fontSize: "0.875rem",
              fontWeight: 500,
              marginTop: "0.5rem",
              marginBottom: "0.5rem",
            }}
          >
            Guest
          </label>
          <div
            className="flex items-center justify-between rounded-lg"
            style={{
              backgroundColor: "#2A221E",
              paddingLeft: "1rem",
              paddingRight: "1rem",
              paddingTop: "0.75rem",
              paddingBottom: "0.75rem",
            }}
          >
            <button
              onClick={guestDecrement}
              style={{
                color: "#F59E0B",
                fontSize: "1.5rem",
                cursor: "pointer",
              }}
            >
              &minus;
            </button>
            <span className="text-[#FFFFFF]">{guestCount} Persons</span>
            <button
              onClick={guestIncrement}
              style={{
                color: "#F59E0B",
                fontSize: "1.5rem",
                cursor: "pointer",
              }}
            >
              &#43;
            </button>
          </div>
        </div>
        <button
          onClick={() => navigate("/tables")}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className="w-full cursor-pointer"
          style={{
            backgroundColor: hover ? "#B45309" : "#F59E0B",
            color: "#FFFFFF",
            paddingTop: "0.75rem",
            paddingBottom: "0.75rem",
            marginTop: "2rem",
            borderRadius: "0.5rem",
          }}
        >
          Create Order
        </button>
      </Modal>
    </div>
  );
};

export default BottomNav;
