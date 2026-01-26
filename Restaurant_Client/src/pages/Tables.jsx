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

  // useEffect(() => {
  //   document.title = "POS | Tables";
  // }, []);

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

  return (
    <section className="bg-[#2A221E] h-[calc(100vh-5rem)] overflow-hidden">
      <div
        className="flex items-center justify-between"
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

        <div className="flex items-center justify-around gap-4">
          <button
            onClick={() => setStatus("all")}
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
        className="flex flex-wrap gap-6 items-center justify-center h-[calc(100vh-9rem-7rem)] overflow-y-scroll"
        style={{
          paddingLeft: "2.5rem",
          paddingRight: "2.5rem",
          paddingTop: "1rem",
          paddingBottom: "1rem",
          scrollbarWidth: "none",
        }}
      >
        {resData?.data.data.map((table) => {
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
