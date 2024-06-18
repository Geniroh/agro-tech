// "use client";
// import React, { useEffect, useState } from "react";
// import dayjs from "dayjs";

// export const DateDifference = ({ date }: { date: string }) => {
//   const [difference, setDifference] = useState("");

//   const calculateDifference = () => {
//     const now = dayjs();
//     const targetDate = dayjs(date);
//     const diffInSeconds = now.diff(targetDate, "second");
//     const diffInMinutes = Math.floor(diffInSeconds / 60);
//     const diffInHours = Math.floor(diffInMinutes / 60);

//     let displayDifference = "";
//     if (diffInHours > 0) {
//       displayDifference = `${diffInHours} hours ago`;
//     } else if (diffInMinutes > 0) {
//       displayDifference = `${diffInMinutes} minutes ago`;
//     } else {
//       displayDifference = `${diffInSeconds} seconds ago`;
//     }

//     setDifference(displayDifference);
//   };

//   useEffect(() => {
//     calculateDifference();
//     const interval = setInterval(calculateDifference, 1000);

//     return () => clearInterval(interval);
//   }, [date]);

//   return <div>{difference}</div>;
// };

"use client";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const DateDifference = ({ date }: { date: string }) => {
  const [difference, setDifference] = useState("");

  const calculateDifference = () => {
    const now = dayjs();
    const targetDate = dayjs(date);

    const diffInSeconds = now.diff(targetDate, "second");
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInMonths = now.diff(targetDate, "month");
    const diffInYears = now.diff(targetDate, "year");

    let displayDifference = "";
    if (diffInYears > 0) {
      displayDifference = `${diffInYears} years ago`;
    } else if (diffInMonths > 0) {
      displayDifference = `${diffInMonths} months ago`;
    } else if (diffInDays > 0) {
      displayDifference = `${diffInDays} days ago`;
    } else if (diffInHours > 0) {
      displayDifference = `${diffInHours} hours ago`;
    } else if (diffInMinutes > 0) {
      displayDifference = `${diffInMinutes} minutes ago`;
    } else {
      displayDifference = `${diffInSeconds} seconds ago`;
    }

    setDifference(displayDifference);
  };

  useEffect(() => {
    calculateDifference();
    const interval = setInterval(calculateDifference, 1000);

    return () => clearInterval(interval);
  }, [date]);

  return <div>{difference}</div>;
};
