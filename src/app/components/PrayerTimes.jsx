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

  // Function to format the prayer times
  const formatTime = (time) => {
    return time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="p-5 bg-white border border-slate-200 rounded-md shadow-md">
      {loading ? (
        <div className="text-center font-bold text-xl p-5 text-[#1AA599]">
          Loading prayer times...
        </div>
      ) : (
        <>
          {error && (
            <div className="text-red-500 mb-4" aria-live="polite">
              Error: {error}
            </div>
          )}

          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-[#1AA599]">Salah</h3>
            <h3 className="text-lg font-semibold text-[#1AA599]">Begins</h3>
          </div>

          {Object.entries(prayerTimes).map(([prayer, time]) => (
            <div
              key={prayer}
              className="border bg-white border-slate-200 p-3 rounded-md flex justify-between items-center my-3 gap-52"
            >
              <span className="font-medium text-gray-800">{prayer}</span>
              <span className="text-sm text-gray-600">{formatTime(time)}</span>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default PrayerTimes;
