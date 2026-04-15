import React, { useMemo } from "react";
import { DownCircleOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { getOrders, getTables } from "../../https";
import { menus } from "../../constants";

const Metrics = () => {
  const { data: ordersRes, isLoading: ordersLoading } = useQuery({
    queryKey: ["orders-metrics"],
    queryFn: async () => await getOrders(),
  });

  const { data: tablesRes, isLoading: tablesLoading } = useQuery({
    queryKey: ["tables"],
    queryFn: async () => await getTables(),
  });

  const { metrics, itemsData } = useMemo(() => {
    const apiOrders = Array.isArray(ordersRes?.data?.data)
      ? ordersRes.data.data
      : [];

    const tables = Array.isArray(tablesRes?.data?.data)
      ? tablesRes.data.data
      : [];

    const now = Date.now();
    const DAYS = 30;
    const start = now - DAYS * 24 * 60 * 60 * 1000;
    const prevStart = now - 2 * DAYS * 24 * 60 * 60 * 1000;
    const prevEnd = start;

    const orderTimestamp = (o) => {
      const t = new Date(o?.createdAt || o?.orderDate).getTime();
      return Number.isFinite(t) ? t : 0;
    };

    const filterByRange = (arr, from, to) =>
      arr.filter((o) => {
        const t = orderTimestamp(o);
        return t >= from && t <= to;
      });

    const currentOrders = filterByRange(apiOrders, start, now);
    const previousOrders = filterByRange(apiOrders, prevStart, prevEnd - 1);

    const sumAmount = (arr) =>
      arr.reduce((sum, o) => {
        const paid =
          typeof o?.paymentData?.stripePaymentAmount === "number"
            ? o.paymentData.stripePaymentAmount
            : typeof o?.bills?.totalWithTax === "number"
            ? o.bills.totalWithTax
            : Number(o?.bills?.totalWithTax || o?.bills?.total || 0) || 0;
        return sum + paid;
      }, 0);

    const revenueCurrent = sumAmount(currentOrders);
    const revenuePrev = sumAmount(previousOrders);

    const countCurrentOrders = currentOrders.length;
    const countPrevOrders = previousOrders.length;

    const uniqueCustomers = (() => {
      const s = new Set();
      apiOrders.forEach((o) => {
        const phone = o?.customerDetails?.phone;
        if (phone) s.add(String(phone));
      });
      return s.size;
    })();

    const activeOrdersCount = apiOrders.filter((o) => {
      const status = (o?.orderStatus || "").toLowerCase();
      return status !== "completed";
    }).length;

    const pct = (prev, cur) => {
      if (!prev && !cur) return 0;
      if (!prev && cur) return 100;
      return Math.round(((cur - prev) / Math.max(1, Math.abs(prev))) * 100);
    };

    const metrics = [
      {
        title: "Revenue",
        value: `$${revenueCurrent.toFixed(2)}`,
        percentage: `${pct(revenuePrev, revenueCurrent)}%`,
        color: "#025cca",
        isIncrease: pct(revenuePrev, revenueCurrent) >= 0,
      },
      {
        title: "Orders (30d)",
        value: `${countCurrentOrders}`,
        percentage: `${pct(countPrevOrders, countCurrentOrders)}%`,
        color: "#02ca3a",
        isIncrease: pct(countPrevOrders, countCurrentOrders) >= 0,
      },
      {
        title: "Total Customers",
        value: `${uniqueCustomers}`,
        percentage: "--",
        color: "#f6b100",
        isIncrease: true,
      },
      {
        title: "Active Orders",
        value: `${activeOrdersCount}`,
        percentage: "--",
        color: "#be3e3f",
        isIncrease: activeOrdersCount >= 0,
      },
    ];

    const totalCategories = Array.isArray(menus) ? menus.length : 0;
    const totalDishes = Array.isArray(menus)
      ? menus.reduce(
          (s, m) => s + (Array.isArray(m.items) ? m.items.length : 0),
          0
        )
      : 0;

    const itemsData = [
      {
        title: "Total Categories",
        value: `${totalCategories}`,
        percentage: "--",
        color: "#5b45b0",
      },
      {
        title: "Total Dishes",
        value: `${totalDishes}`,
        percentage: "--",
        color: "#285430",
      },
      {
        title: "Active Orders",
        value: `${activeOrdersCount}`,
        percentage: "--",
        color: "#735f32",
      },
      {
        title: "Total Tables",
        value: `${tables.length}`,
        percentage: "--",
        color: "#7f167f",
      },
    ];

    return { metrics, itemsData };
  }, [ordersRes, tablesRes]);

  const loading = ordersLoading || tablesLoading;

  return (
    <div
      style={{
        maxWidth: "1280px",
        width: "100%",
        marginLeft: "auto",
        marginRight: "auto",
        paddingTop: "0.5rem",
        paddingBottom: "0.5rem",
        paddingLeft: window.innerWidth >= 768 ? "1rem" : "1.5rem",
        paddingRight: window.innerWidth >= 768 ? "1rem" : "1.5rem",
      }}
    >
      <div className="flex justify-between items-center">
        <div>
          <h2
            className="text-[#f5f5f5]"
            style={{ fontWeight: 600, fontSize: "1.25rem" }}
          >
            Overall Performance
          </h2>
          <p className="text-[#ababab]" style={{ fontSize: "0.875rem" }}>
            Business performance over the selected period, including revenue,
            order volume, customer growth, and active orders to understand
            overall trends.
          </p>
        </div>
        <button
          className="flex items-center"
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "0.375rem",
            color: "#f5f5f5",
            backgroundColor: "#1D1716",
            gap: "1rem",
            cursor: "pointer",
          }}
        >
          Last 1 month
          <DownCircleOutlined style={{ fontSize: "1.3rem" }} />
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4" style={{ marginTop: "1.5rem" }}>
        {loading
          ? Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={idx}
                className="rounded-lg"
                style={{ backgroundColor: "#2A221E", padding: "1rem" }}
              >
                <div className="flex justify-between items-center">
                  <p className="font-medium text-xs text-[#f5f5f5]">
                    Loading...
                  </p>
                  <div className="h-3 w-6 bg-gray-600 rounded" />
                </div>
                <p
                  className="font-semibold text-2xl text-[#f5f5f5]"
                  style={{ marginTop: "0.25rem" }}
                >
                  --
                </p>
              </div>
            ))
          : metrics.map((metric, index) => {
              return (
                <div
                  key={index}
                  className="rounded-lg "
                  style={{
                    backgroundColor: metric.color,
                    padding: "1rem",
                    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                  }}
                >
                  <div className="flex justify-between items-center">
                    <p className="font-medium text-xs text-[#f5f5f5]">
                      {metric.title}
                    </p>
                    <div className="flex items-center gap-1">
                      <svg
                        className="w-3 h-3"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                        style={{ color: metric.isIncrease ? "#f5f5f5" : "red" }}
                      >
                        <path
                          d={
                            metric.isIncrease
                              ? "M5 15l7-7 7 7"
                              : "M19 9l-7 7-7-7"
                          }
                        />
                      </svg>
                      <p
                        style={{
                          color: metric.isIncrease ? "#f5f5f5" : "red",
                          fontWeight: 500,
                          fontSize: "0.75rem",
                          lineHeight: "1rem",
                        }}
                      >
                        {metric.percentage}
                      </p>
                    </div>
                  </div>
                  <p
                    className="font-semibold text-2xl text-[#f5f5f5]"
                    style={{ marginTop: "0.25rem" }}
                  >
                    {metric.value}
                  </p>
                </div>
              );
            })}
      </div>

      <div
        className="flex flex-col justify-between"
        style={{ marginTop: "2.3rem" }}
      >
        <div>
          <h2
            className="text-[#f5f5f5]"
            style={{ fontWeight: 600, fontSize: "1.25rem" }}
          >
            Item Details
          </h2>
          <p className="text-[#ababab]" style={{ fontSize: "0.875rem" }}>
            Get insights into menu and operations, including total categories,
            dishes, active orders, and table availability.
          </p>
        </div>

        <div className="grid grid-cols-4 gap-4" style={{ marginTop: "1.5rem" }}>
          {itemsData.map((item, index) => {
            return (
              <div
                key={index}
                className="rounded-lg"
                style={{
                  backgroundColor: item.color,
                  boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                  padding: "1rem",
                }}
              >
                <div className="flex justify-between items-center">
                  <p className="font-medium text-xs text-[#f5f5f5]">
                    {item.title}
                  </p>
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-3 h-3 text-white"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    >
                      <path d="M5 15l7-7 7 7" />
                    </svg>
                    <p className="font-medium text-xs text-[#f5f5f5]">
                      {item.percentage}
                    </p>
                  </div>
                </div>
                <p
                  className=" font-semibold text-2xl text-[#f5f5f5]"
                  style={{ marginTop: "0.25rem" }}
                >
                  {item.value}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Metrics;
