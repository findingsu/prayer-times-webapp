"use client";

import React, { useEffect } from "react";
import { useAppContext } from "../../context";

export const PrayerTimes = () => {
  const { prayerTimes, fetchPrayerTimes, location, loading, error } =
    useAppContext();

  useEffect(() => {
    if (location) {
      fetchPrayerTimes(new Date());
    }
  }, [location, fetchPrayerTimes]);

  if (loading) return <p>Loading prayer times...</p>;
  if (error) return <p>Error: {error}</p>;

  const formatTime = (time) => {
    return time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div>
      {Object.entries(prayerTimes).map(([prayer, time]) => (
        <ul key={prayer}>
          <span>{`${prayer}: `}</span>
          <span>{`${formatTime(time)}`}</span>
        </ul>
      ))}
    </div>
  );
};

export default PrayerTimes;
