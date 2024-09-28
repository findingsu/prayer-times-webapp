"use client";
import { useAppContext } from "@/context";
import { useEffect, useState } from "react";

const CurrentPrayers = () => {
  const { location, currentPrayer, fetchPrayerTimes, loading, error } =
    useAppContext();

  const [timeUntilNextPrayer, setTimeUntilNextPrayer] = useState("");

  useEffect(() => {
    if (location) {
      fetchPrayerTimes(new Date());
    }
  }, [location, fetchPrayerTimes]);

  const calculateTimeDifference = (nextPrayerTime) => {
    const now = new Date();
    const nextPrayer = new Date(nextPrayerTime);

    const diffInMs = nextPrayer - now;

    const hours = Math.floor(diffInMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffInMs % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

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

  const formatTime = (time) => {
    if (!(time instanceof Date)) {
      time = new Date(time);
    }
    return time.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      seconds: "2-digit",
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="w-full z-10">
      <div className=" bg-[#FFC265] rounded-lg p-5 text-[#4e5256] text-2xl font-semibold mb-5">
        <p>Now: {currentPrayer.current}</p>
      </div>
      <div className=" bg-[#575451b0] rounded-lg p-5 text-2xl">
        <p>
          {currentPrayer.next} in {timeUntilNextPrayer}
        </p>
      </div>
    </div>
  );
};

export default CurrentPrayers;
