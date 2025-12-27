import { useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  CoffeeOutlined,
  MenuOutlined,
  EllipsisOutlined,
  AlertFilled,
} from "@ant-design/icons";

const BottomNav = () => {
  const navigate = useNavigate();
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#1d1716] p-2 h-16 flex justify-around ">
      <button
        onClick={() => navigate("/home")}
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
        className="absolute bottom-6 flex cursor-pointer items-center justify-center w-[50px] h-[50px]"
        style={{
          backgroundColor: "#F6B100",
          padding: "3px",
          borderRadius: "100%",
        }}
      >
        <AlertFilled className="text-2xl inline" />
      </button>
    </div>
  );
};

export default BottomNav;
