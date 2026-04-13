import React, { useState, useMemo } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getOrders } from "../../https";
import { CheckOutlined } from "@ant-design/icons";
import OrderList from "./OrderList";

const RecentOrders = () => {
  const [showAll, setShowAll] = useState(false);
  const [search, setSearch] = useState("");

  // Fetch all orders once
  const {
    data: resData,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["orders-all"],
    queryFn: () => getOrders(),
    placeholderData: keepPreviousData,
  });

  // Compute filtered/sliced orders
  const filteredOrders = useMemo(() => {
    const orders = Array.isArray(resData?.data?.data) ? resData.data.data : [];
    // Filter by search
    const searchLower = search.trim().toLowerCase();
    let filtered = orders;
    if (searchLower) {
      filtered = orders.filter((order) => {
        const customerName = order?.customerDetails?.name || "";
        const tableNo = order?.table?.tableNo
          ? `Table No: ${order.table.tableNo}`
          : "Take away";
        return (
          customerName.toLowerCase().includes(searchLower) ||
          tableNo.toLowerCase().includes(searchLower)
        );
      });
    }
    // Sort by createdAt descending
    filtered = [...filtered].sort((a, b) => {
      const tA = new Date(a.createdAt).getTime() || 0;
      const tB = new Date(b.createdAt).getTime() || 0;
      return tB - tA;
    });
    // Slice to 7 if not showAll
    return showAll ? filtered : filtered.slice(0, 7);
  }, [resData, search, showAll]);

  return (
    <div
      style={{
        marginTop: "1.25rem",
        paddingLeft: "1rem",
        paddingRight: "1rem",
      }}
    >
      <div className="bg-[#1D1716] w-full rounded-lg h-[396px]">
        <div
          className="flex justify-between items-center"
          style={{
            paddingLeft: "1.5rem",
            paddingRight: "1.5rem",
            paddingTop: "1rem",
            paddingBottom: "1rem",
          }}
        >
          <h1 className="text-[#FFFFFF] text-lg font-semibold tracking-wide">
            Recent Orders
          </h1>
          <a
            href=""
            className="text-sm font-semibold"
            style={{ color: "#025cca" }}
            onClick={(e) => {
              e.preventDefault();
              setShowAll(true);
            }}
          >
            View all
          </a>
        </div>

        <div
          className="flex items-center gap-4 bg-[#2a221e] rounded-[15px] mx-6"
          style={{
            paddingLeft: "1rem",
            paddingRight: "1rem",
            paddingTop: "1rem",
            paddingBottom: "1rem",
            marginLeft: "1rem",
            marginRight: "1rem",
          }}
        >
          <SearchOutlined
            style={{ color: "#FFFFFF", marginLeft: "10px" }}
            className="text-xl"
          />
          <input
            type="text"
            placeholder="Search recent orders"
            style={{ color: "#FFFFFF", padding: "2px" }}
            className="outline-none input-search w-[100%]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div
          style={{
            marginTop: "1rem",
            paddingLeft: "1.5rem",
            paddingRight: "1.5rem",
            overflowY: "scroll",
            height: "240px",
            scrollbarWidth: "none",
          }}
        >
          {isPending ? (
            <div className="text-[#ababab] text-center py-8">
              Loading orders...
            </div>
          ) : isError ? (
            <div className="text-[#ababab] text-center py-8">
              Something went wrong!
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-[#ababab] text-center py-8">
              No orders found.
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div
                key={order._id}
                className="flex items-center gap-6"
                style={{ marginBottom: "0.5rem" }}
              >
                <button
                  style={{
                    backgroundColor: "#f6b100",
                    padding: "1rem",
                    fontWeight: "700",
                    fontSize: "1.25rem",
                    borderRadius: "0.5rem",
                  }}
                >
                  {(order?.customerDetails?.name || "?")
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)}
                </button>
                <div className="flex items-center justify-between w-[100%]">
                  <div className="flex flex-col items-start gap-1">
                    <h1
                      className="text-[#FFFFFF] tracking-wide"
                      style={{ fontWeight: "600", fontSize: "1.125rem" }}
                    >
                      {order?.customerDetails?.name || "Unknown"}
                    </h1>
                    <p
                      className="text-[#ababab]"
                      style={{ fontSize: "0.875rem" }}
                    >
                      {(order.items?.length || 0) +
                        " Item" +
                        ((order.items?.length || 0) === 1 ? "" : "s")}
                    </p>
                  </div>

                  <div>
                    <h1
                      className="text-[#f6b100]"
                      style={{
                        fontWeight: "600",
                        border: "1px solid #f6b100",
                        textAlign: "center",
                        borderRadius: "0.5rem",
                        padding: "0.5rem 1rem",
                      }}
                    >
                      {order?.table?.tableNo
                        ? `Table No: ${order.table.tableNo}`
                        : "Take away"}
                    </h1>
                  </div>
                  <div className="flex flex-col items-end gap-1 w-[18%]">
                    {order?.orderStatus === "Ready" ? (
                      <div
                        className="bg-[#2e4a40] rounded-lg flex items-center"
                        style={{ padding: "0.25rem 0.5rem" }}
                      >
                        <CheckOutlined
                          style={{
                            display: "inline",
                            marginRight: "-0.7rem",
                            color: "#00A63E",
                            fontSize: "1.3rem",
                          }}
                        />
                        <CheckOutlined
                          style={{
                            display: "inline",
                            color: "#00A63E",
                            fontSize: "1.3rem",
                          }}
                        />
                        <p
                          className="text-green-600"
                          style={{ padding: "0.25rem 0.5rem", fontWeight: 600 }}
                        >
                          Ready
                        </p>
                      </div>
                    ) : order?.orderStatus === "Completed" ? (
                      <div
                        className="bg-[#1f2a3a] rounded-lg flex items-center"
                        style={{ padding: "0.25rem 0.5rem" }}
                      >
                        <CheckOutlined
                          style={{
                            display: "inline",
                            marginRight: "-0.7rem",
                            color: "#4DA2FF",
                            fontSize: "1.3rem",
                          }}
                        />
                        <CheckOutlined
                          style={{
                            display: "inline",
                            color: "#4DA2FF",
                            fontSize: "1.3rem",
                          }}
                        />
                        <p
                          className="text-blue-400"
                          style={{ padding: "0.25rem 0.5rem", fontWeight: 600 }}
                        >
                          Completed
                        </p>
                      </div>
                    ) : (
                      <div
                        className=" bg-[#664a04] rounded-lg flex items-center"
                        style={{ padding: "0.25rem 0.5rem" }}
                      >
                        <span
                          className="bg-yellow-400 w-[1rem] h-[1rem] rounded-full inline-block"
                          style={{ marginRight: "0.5rem" }}
                        ></span>
                        <p
                          className="text-[#f6b100]"
                          style={{ fontWeight: 600 }}
                        >
                          {order?.orderStatus || "Pending"}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentOrders;
