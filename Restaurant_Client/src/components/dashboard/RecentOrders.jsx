import { useState } from "react";
import { SwitcherOutlined } from "@ant-design/icons";
import { orders } from "../../constants";

const RecentOrders = () => {
  const [hoverText, setHoverText] = useState(null);
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
        Recent Orders
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[#f5f5f5]">
          <thead className="bg-[#2A221E] text-[#ababab]">
            <tr>
              <th style={{ padding: "0.75rem" }}>Order ID</th>
              <th style={{ padding: "0.75rem" }}>Customer</th>
              <th style={{ padding: "0.75rem" }}>Status</th>
              <th style={{ padding: "0.75rem" }}>Date & Time</th>
              <th style={{ padding: "0.75rem" }}>Items</th>
              <th style={{ padding: "0.75rem" }}>Table No</th>
              <th style={{ padding: "0.75rem" }}>Total</th>
              <th className="text-center" style={{ padding: "0.75rem" }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={index}
                className="border-b border-gray-600 hover:bg-[#2A221E]"
              >
                <td style={{ padding: "1rem" }}>#{order.id}</td>
                <td style={{ padding: "1rem" }}>{order.customer}</td>
                <td style={{ padding: "1rem" }}>
                  <select
                    style={{
                      backgroundColor: "#2A221E",
                      color:
                        order.status === "Ready"
                          ? "text-green-500"
                          : "text-yellow-500",

                      border: "2px solid #939191",
                      borderRadius: "0.5rem",
                      padding: "0.5rem",
                      outline: "none",
                    }}
                    value={order.status}
                  >
                    <option className="text-yellow-500" value="In Progress">
                      In Progress
                    </option>
                    <option className="text-green-500" value="Ready">
                      Ready
                    </option>
                  </select>
                </td>
                <td style={{ padding: "1rem" }}>{order.dateTime}</td>
                <td style={{ padding: "1rem" }}>{order.items} Items</td>
                <td style={{ padding: "1rem" }}>Table - {order.items}</td>
                <td style={{ padding: "1rem" }}>₹{order.total.toFixed(2)}</td>
                <td className="text-center" style={{ padding: "1rem" }}>
                  <button
                    onMouseEnter={() => setHoverText(index)}
                    onMouseLeave={() => setHoverText(null)}
                    className="text-blue-400 hover:text-blue-500 transition"
                    style={{
                      color: hoverText === index ? "#2679fd" : "#9dc9ff",
                      transition: "color 0.2s",
                      cursor: "pointer",
                    }}
                  >
                    <SwitcherOutlined style={{ fontSize: "1.5rem" }} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default RecentOrders;
