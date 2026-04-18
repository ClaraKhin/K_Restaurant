import { useState } from "react";
import BottomNav from "../components/shared/BottomNav";
import BackButton from "../components/shared/BackButton";
import TableCard from "../components/tables/TableCard";
import { tables } from "../constants/index";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getTables } from "../https/index";
import { enqueueSnackbar } from "notistack";

const Tables = () => {
  const [status, setStatus] = useState("all");

  const { data: resData, isError } = useQuery({
    queryKey: ["tables"],
    queryFn: async () => {
      return await getTables();
    },
    placeholderData: keepPreviousData,
  });

  if (isError) {
    enqueueSnackbar("Something went wrong!", { variant: "error" });
  }

  console.log(resData);

  const tablesData = resData?.data?.data ?? [];
  const filteredTables =
    status === "booked"
      ? tablesData.filter(
          (table) => String(table.status).toLowerCase() === "booked"
        )
      : tablesData;

  return (
    <section className="bg-[#2A221E] min-h-[calc(100vh-5rem)] overflow-hidden lg:h-[calc(100vh-5rem)]">
      <div
        className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
        style={{
          paddingLeft: "2rem",
          paddingRight: "2rem",
          paddingTop: "1rem",
          paddingBottom: "1rem",
          marginTop: "0.5rem",
        }}
      >
        <div className="flex items-center gap-4">
          <BackButton />
          <h1
            className="text-[#FFFFFF] tracking-wide"
            style={{ fontSize: "1.5rem", fontWeight: 700 }}
          >
            Tables
          </h1>
        </div>

        <div className="flex w-full flex-wrap items-center justify-start gap-2 sm:gap-4 lg:w-auto lg:justify-around">
          <button
            onClick={() => setStatus("all")}
            className="text-sm sm:text-base"
            style={{
              color: status === "all" ? "#2a221e" : "#FFFFFF",
              backgroundColor: status === "all" ? "#FAF0DC" : "",
              fontSize: "1.125rem",
              fontWeight: "600",
              paddingLeft: "1.25rem",
              paddingRight: "1.25rem",
              paddingTop: "0.5rem",
              paddingBottom: "0.5rem",
              borderRadius: "0.5rem",
              cursor: "pointer",
            }}
          >
            All
          </button>
          <button
            onClick={() => setStatus("booked")}
            className="text-sm sm:text-base"
            style={{
              color: status === "booked" ? "#2a221e" : "#FFFFFF",
              backgroundColor: status === "booked" ? "#FAF0DC" : "",
              fontSize: "1.125rem",
              fontWeight: "600",
              paddingLeft: "1.25rem",
              paddingRight: "1.25rem",
              paddingTop: "0.5rem",
              paddingBottom: "0.5rem",
              cursor: "pointer",
              borderRadius: "0.5rem",
            }}
          >
            Booked
          </button>
        </div>
      </div>
      <div
        className="flex h-auto flex-wrap items-stretch justify-center gap-4 overflow-y-visible sm:gap-6 lg:h-[calc(100vh-9rem-7rem)] lg:overflow-y-scroll"
        style={{
          paddingLeft: "1rem",
          paddingRight: "1rem",
          paddingTop: "1rem",
          paddingBottom: "1rem",
          scrollbarWidth: "none",
        }}
      >
        {filteredTables.map((table) => {
          return (
            <TableCard
              key={table._id}
              id={table._id}
              name={table.tableNo}
              status={table.status}
              initials={table?.currentOrder?.customerDetails.name}
              seats={table.seats}
            />
          );
        })}
      </div>
      <BottomNav />
    </section>
  );
};

export default Tables;
