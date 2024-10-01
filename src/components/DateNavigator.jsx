"use client";

import React, { useState, useEffect } from "react";
import { useAppContext } from "../context";
import { format } from "date-fns";

export const DateNavigator = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { fetchPrayerTimes } = useAppContext();

  useEffect(() => {
    fetchPrayerTimes(currentDate);
  }, [currentDate, fetchPrayerTimes]);

  return (
    <div className="text-xl font-medium bg-[#e2e2e1d3] p-3 rounded-xl">
      <h3>{format(currentDate, "EEEE d MMM yyyy")}</h3>
    </div>
  );
};
