"use client";

import React, { useState, useEffect } from "react";
import { useAppContext } from "../../context";

export const DateNavigator = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { fetchPrayerTimes } = useAppContext();

  useEffect(() => {
    fetchPrayerTimes(currentDate);
  }, [currentDate, fetchPrayerTimes]);

  const handleDateChange = (increment) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() + increment);
      return newDate;
    });
  };

  const getFormattedDate = (date) => {
    return date.toLocaleDateString("en-UK", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="flex gap-5">
      <button onClick={() => handleDateChange(-1)}>&lt;</button>
      <p>{getFormattedDate(currentDate)}</p>
      <button onClick={() => handleDateChange(1)}>&gt;</button>
    </div>
  );
};

export default DateNavigator;
