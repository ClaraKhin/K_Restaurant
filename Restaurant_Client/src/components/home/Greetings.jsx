import { useState, useEffect } from "react";

const Greetings = () => {
  const [dateTime, setDateTime] = useState(new Date());

  // Update the date and time every second
  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Format: Month Day, Year (e.g., January 01, 2023)
    return `${months[date.getMonth()]} ${String(date.getDate()).padStart(
      2,
      "0"
    )}, ${date.getFullYear()}`;
  };

  const formatTime = (date) => {
    return `${String(date.getHours()).padStart(2, "0")}:${String(
      date.getMinutes()
    ).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
    // Format: HH:MM:SS (24-hour format)
  };

  return (
    <div
      className="flex justify-between items-center"
      style={{
        paddingLeft: "1rem",
        paddingRight: "1rem",
        marginTop: "1.25rem",
      }}
    >
      <div>
        <h1 className="text-[#FFFFFF] text-2xl font-semibold tracking-wide">
          Good Morning, Khin
        </h1>
        <p className="text-[#ababab] text-sm">
          Give your best services for customers 😊
        </p>
      </div>
      <div>
        <h1 className="text-[#FFFFFF] text-3xl font-bold tracking-wide w-[130px]">
          {formatTime(dateTime)}
        </h1>
        <p className="text-[#ababab] text-sms">{formatDate(dateTime)}</p>
      </div>
    </div>
  );
};

export default Greetings;
