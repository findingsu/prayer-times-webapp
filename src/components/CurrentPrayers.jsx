"use client";

import { useAppContext } from "@/context";
import { useEffect, useState } from "react";
import { calculateTimeDifference } from "@/utils";

export const CurrentPrayers = () => {
  const { location, currentPrayer, fetchPrayerTimes, loading, error } =
    useAppContext();

  const [timeUntilNextPrayer, setTimeUntilNextPrayer] = useState("");

  useEffect(() => {
    if (location) {
      fetchPrayerTimes(new Date());
    }
  }, [location, fetchPrayerTimes]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentPrayer.nextPrayerTime) {
        setTimeUntilNextPrayer(
          calculateTimeDifference(currentPrayer.nextPrayerTime)
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentPrayer.nextPrayerTime]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const capitalizeFirstLetter = (string) => {
    return string ? string.charAt(0).toUpperCase() + string.slice(1) : "";
  };

  const currentPrayerName = capitalizeFirstLetter(currentPrayer.current);
  const nextPrayerName = capitalizeFirstLetter(currentPrayer.next);

  return (
    <div className="w-full z-10">
      <div className="bg-[#FFC265] rounded-lg p-5 text-[#4e5256] text-2xl font-semibold mb-5">
        <p>Now: {currentPrayerName}</p>
      </div>
      <div className="bg-[#575451b0] rounded-lg p-5 text-2xl">
        <p>
          {nextPrayerName} in {timeUntilNextPrayer}
        </p>
      </div>
    </div>
  );
};
