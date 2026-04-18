import React, { useState } from "react";
import {
  SearchOutlined,
  BellOutlined,
  UserOutlined,
  LogoutOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import logo from "../../assets/images/Golden_Dynasty.png";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../../https/index";
import { removeUser } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

const Header = () => {
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutMutation = useMutation({
    mutationFn: () => logout(),
    onSuccess: (data) => {
      console.log(data);
      dispatch(removeUser());
      navigate("/auth");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openUserModal = () => setIsModalOpen(true);
  const closeUserModal = () => setIsModalOpen(false);
  return (
    <>
      <header
        className="flex flex-col gap-4 bg-[#1d1716] lg:flex-row lg:items-center lg:justify-between"
        style={{
          paddingLeft: "1rem",
          paddingRight: "1rem",
          paddingTop: "1rem",
          paddingBottom: "1rem",
        }}
      >
        {/* logo */}
        <div
          onClick={() => navigate("/")}
          className="flex w-full cursor-pointer items-center justify-center gap-2 sm:justify-start lg:w-auto"
        >
          <img
            src={logo}
            alt="logo"
            className="h-12 w-12 rounded-full sm:h-15 sm:w-15"
          />
          <h1
            className="text-[#FFFFFF]"
            style={{ fontSize: "1.25rem", fontWeight: "600" }}
          >
            Golden Dynasty
          </h1>
        </div>
        {/* Search */}
        <div
          className="flex w-full items-center gap-3 rounded-[15px] bg-[#2a221e] lg:w-[500px]"
          style={{
            paddingLeft: "1.25rem",
            paddingRight: "1.25rem",
            paddingTop: "0.5rem",
            paddingBottom: "0.5rem",
          }}
        >
          <SearchOutlined
            style={{ color: "#FFFFFF", marginLeft: "10px" }}
            className="text-xl"
          />
          <input
            type="text"
            placeholder="Search"
            style={{ color: "#FFFFFF", padding: "5px" }}
            className="outline-none input-search w-full min-w-0 bg-transparent text-sm sm:text-base"
          />
        </div>
        {/* Logged User Info */}

        <div className="flex w-full flex-wrap items-center justify-between gap-3 sm:justify-end lg:w-auto lg:gap-4">
          {userData.role === "Admin" && (
            <div
              onClick={() => navigate("/dashboard")}
              className="bg-[#2A221E] rounded-[15px] cursor-pointer"
              style={{ padding: "0.5rem" }}
            >
              <PieChartOutlined
                style={{ color: "#FFFFFF" }}
                className="text-2xl"
              />
            </div>
          )}

          <div
            className="bg-[#2A221E] rounded-[15px] cursor-pointer"
            style={{ padding: "0.5rem" }}
          >
            <BellOutlined style={{ color: "#FFFFFF" }} className="text-2xl" />
          </div>

          <div className="flex min-w-0 items-center gap-3 cursor-pointer">
            <div className="flex items-center gap-3" onClick={openUserModal}>
              <UserOutlined
                style={{ color: "#FFFFFF", cursor: "pointer" }}
                className="text-2xl"
              />
              <div className="flex min-w-0 flex-col items-start ">
                <h1
                  className="max-w-[140px] truncate text-[#FFFFFF] sm:max-w-none"
                  style={{ fontSize: "1rem", fontWeight: 600 }}
                >
                  {userData.name || "Test User"}
                </h1>
                <p
                  className="max-w-[140px] truncate text-[#ababab] sm:max-w-none"
                  style={{ fontSize: "0.75rem", fontWeight: 500 }}
                >
                  {userData.role || "Role"}
                </p>
              </div>
            </div>

            <LogoutOutlined
              onClick={handleLogout}
              className="shrink-0 text-2xl"
              style={{ color: "#FFFFFF", marginLeft: "0.5rem" }}
            />
          </div>
        </div>
      </header>
      <Modal title="User Details" isOpen={isModalOpen} onClose={closeUserModal}>
        <div className="flex flex-col gap-3 text-[#FFFFFF]">
          <div className="flex justify-between items-center">
            <span className="text-[#ababab]">Name</span>
            <span style={{ fontWeight: 600 }}>{userData.name || "-"}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#ababab]">Email</span>
            <span style={{ fontWeight: 600 }}>{userData.email || "-"}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#ababab]">Phone</span>
            <span style={{ fontWeight: 600 }}>{userData.phone || "-"}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#ababab]">Role</span>
            <span style={{ fontWeight: 600 }}>{userData.role || "-"}</span>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Header;
