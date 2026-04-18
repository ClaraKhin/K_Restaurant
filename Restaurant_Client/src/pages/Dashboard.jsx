import { useState } from "react";
import {
  InsertRowBelowOutlined,
  GoldOutlined,
  AlertOutlined,
} from "@ant-design/icons";
import Metrics from "../components/dashboard/Metrics";
import RecentOrders from "../components/dashboard/RecentOrders";
import Modal from "../components/dashboard/Modal";
import Categories from "../components/dashboard/Categories";
import Payments from "../components/dashboard/Payments";

const buttons = [
  {
    id: 1,
    label: "Add Table",
    icon: <InsertRowBelowOutlined />,
    action: "table",
  },
  {
    id: 2,
    label: "Add Category",
    icon: <GoldOutlined />,
    action: "category",
  },
  { id: 3, label: "Add Dishes", icon: <AlertOutlined />, action: "dishes" },
];

const tabs = [
  { id: 1, label: "Metrics" },
  { id: 2, label: "Orders" },
  { id: 3, label: "Payments" },
];

const Dashboard = () => {
  const [isTableModalOpen, setTableModalOpen] = useState(false);
  const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);
  const [hover, setHover] = useState(null);
  const [hoverTab, setHoverTab] = useState(null);
  const [activeTab, setActiveTab] = useState("Metrics");

  const handleOpenModal = (action) => {
    if (action === "table") setTableModalOpen(true);
    if (action === "category") setCategoryModalOpen(true);
  };
  return (
    <div
      className="overflow-y-auto bg-[#2A221E]"
      style={{ minHeight: "calc(100vh - 5rem)" }}
    >
      <div
        className="flex flex-col gap-4 md:px-4 xl:flex-row xl:items-center xl:justify-between"
        style={{
          maxWidth: "1280px",
          marginLeft: "auto",
          marginRight: "auto",
          paddingTop: "3.5rem",
          paddingBottom: "3.5rem",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
        }}
      >
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap xl:w-auto">
          {buttons.map(({ id, label, icon, action }) => {
            const isHovered = hover === id;
            return (
              <button
                key={id}
                onMouseEnter={() => setHover(id)}
                onMouseLeave={() => setHover(null)}
                onClick={() => handleOpenModal(action)}
                className="flex w-full items-center justify-center gap-2 sm:w-auto"
                style={{
                  backgroundColor: isHovered ? "#3A322E " : "#1D1716",
                  paddingLeft: "2rem",
                  paddingRight: "2rem",
                  paddingTop: "0.75rem",
                  paddingBottom: "0.75rem",
                  borderRadius: "0.5rem",
                  fontWeight: 600,
                  fontSize: "1rem",
                  color: "#ffffff",
                  cursor: "pointer",
                }}
              >
                {label} {icon}
              </button>
            );
          })}
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap xl:w-auto">
          {tabs.map(({ id, label }) => {
            const isHovered = hoverTab === id;
            return (
              <button
                key={id}
                onMouseEnter={() => setHoverTab(id)}
                onMouseLeave={() => setHoverTab(null)}
                className="w-full sm:w-auto"
                style={{
                  backgroundColor:
                    activeTab === label || isHovered ? "#3A322E" : "#1D1716",
                  paddingLeft: "2rem",
                  paddingRight: "2rem",
                  paddingTop: "0.75rem",
                  paddingBottom: "0.75rem",
                  borderRadius: "0.5rem",
                  fontWeight: 600,
                  fontSize: "1rem",
                  color: "#ffffff",
                  cursor: "pointer",
                }}
                onClick={() => setActiveTab(label)}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>
      {activeTab === "Metrics" && <Metrics />}
      {activeTab === "Orders" && <RecentOrders />}
      {activeTab === "Payments" && <Payments />}
      {isTableModalOpen && <Modal setTableModalOpen={setTableModalOpen} />}
      {isCategoryModalOpen && (
        <Categories setCategoryModalOpen={setCategoryModalOpen} />
      )}
    </div>
  );
};

export default Dashboard;
