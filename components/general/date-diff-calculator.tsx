"use client";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

export const DateDifference = ({ date }: { date: string }) => {
  const [difference, setDifference] = useState("");

  const calculateDifference = () => {
    const now = dayjs();
    const targetDate = dayjs(date);
    const diffInSeconds = now.diff(targetDate, "second");
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);

    let displayDifference = "";
    if (diffInHours > 0) {
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
