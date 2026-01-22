import { useState } from "react";
import {
  InsertRowBelowOutlined,
  GoldOutlined,
  AlertOutlined,
} from "@ant-design/icons";
import Metrics from "../components/dashboard/Metrics";
import RecentOrders from "../components/dashboard/RecentOrders";
import Modal from "../components/dashboard/Modal";

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
  const [hover, setHover] = useState(null);
  const [hoverTab, setHoverTab] = useState(null);
  const [activeTab, setActiveTab] = useState("Metrics");

  const handleOpenModal = (action) => {
    if (action === "table") setTableModalOpen(true);
  };
  return (
    <div className="bg-[#2A221E]" style={{ height: "calc(100vh - 5rem)" }}>
      <div
        className="flex items-center justify-between md:px-4"
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
        <div className="flex items-center gap-3 ">
          {buttons.map(({ id, label, icon, action }) => {
            const isHovered = hover === id;
            return (
              <button
                key={id}
                onMouseEnter={() => setHover(id)}
                onMouseLeave={() => setHover(null)}
                onClick={() => handleOpenModal(action)}
                className="flex items-center gap-2"
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

        <div className="flex items-center gap-3 ">
          {tabs.map(({ id, label }) => {
            const isHovered = hoverTab === id;
            return (
              <button
                key={id}
                onMouseEnter={() => setHoverTab(id)}
                onMouseLeave={() => setHoverTab(null)}
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

      {isTableModalOpen && <Modal setTableModalOpen={setTableModalOpen} />}
    </div>
  );
};

export default Dashboard;
