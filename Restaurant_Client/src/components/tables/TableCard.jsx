import React from "react";
import { useNavigate } from "react-router-dom";
// import { CheckOutlined } from "@ant-design/icons";
import { getBgColor } from "../../utils";
import { useDispatch } from "react-redux";
import { ArrowRightOutlined } from "@ant-design/icons";
import { updateTable } from "../../redux/slices/customerSlice";

const TableCard = ({ name, status, initials, seats }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = (name) => {
    if (status === "Booked") return;
    dispatch(updateTable({ tableNo: name }));
    navigate(`/menu`);
  };
  return (
    <div
      onClick={() => handleClick(name)}
      className="w-[450px] bg-[#1d1716] hover:bg-[#3A322E] rounded-lg cursor-pointer"
      style={{ padding: "1rem" }}
    >
      <div
        className="flex items-center justify-between "
        style={{ paddingLeft: "0.25rem", paddingRight: "0.25rem" }}
      >
        <h1
          className="text-[#FFFFFF]"
          style={{ fontSize: "1.25rem", fontWeight: 600 }}
        >
          Table
          <ArrowRightOutlined
            style={{
              color: "#ababab",
              marginLeft: "0.5rem ",
              marginRight: "0.5rem",
            }}
          />
          {name}
        </h1>
        <p
          className={`${
            status === "Booked"
              ? "text-green-600 bg-[#2e4a40]"
              : "bg-[#664a04] text-[#FFFFFF]"
          } rounded-lg`}
          style={{
            paddingLeft: "0.5rem",
            paddingRight: "0.5rem",
            paddingTop: "0.25rem",
            paddingBottom: "0.25rem",
          }}
        >
          {status}
        </p>
      </div>
      <div
        className="flex items-center justify-center"
        style={{ marginTop: "1rem", marginBottom: "1rem" }}
      >
        <h1
          className={
            "text-[#FFFFFF] rounded-full w-[60px] h-[60px] items-center justify-center flex"
          }
          style={{ padding: "1rem", backgroundColor: getBgColor() }}
        >
          {initials}
        </h1>
      </div>
      <p
        className="text-[#ababab]"
        style={{ fontSize: "0.75rem", lineHeight: "1rem" }}
      >
        Seats: <span className="text-[#FFFFFF]">{seats}</span>
      </p>
    </div>
  );
};

export default TableCard;
