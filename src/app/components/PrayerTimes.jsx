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

  const formatTime = (time) => {
    if (!(time instanceof Date)) {
      time = new Date(time);
    }
    return time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const prayerIcons = {
    Fajr: "/icons/fajr.svg",
    Sunrise: "/icons/sunrise.svg",
    Dhuhr: "/icons/dhuhr.svg",
    Asr: "/icons/asr.svg",
    Maghrib: "/icons/maghrib.svg",
    Isha: "/icons/isha.svg",
  };

  return (
    <section id="home" className="px-10 py-4w-screen">
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

          {/* Title */}
          <h1 className="text-4xl font-bold text-[#2D3748] text-center">
            Today's Prayer Times
          </h1>

          {/* Updated Grid for Prayer Times */}
          <div className="grid grid-cols-6 gap-5 w-screen px-10 py-5">
            {Object.entries(prayerTimes).map(([prayer, time]) => (
              <div
                key={prayer}
                className="bg-white h-full w-full shadow-lg rounded-xl hover:shadow-xl transition-shadow border-none p-6 text-center"
              >
                {/* Icons */}
                <div className="flex justify-center mb-3 h-20">
                  <img
                    src={
                      prayerIcons[prayer] || "/assets/icons/default-icon.svg"
                    }
                    alt={prayer}
                    className="w-12 h-12"
                  />
                </div>

                <h3 className="font-semibold text-[#1A365D] mb-3 text-2xl">
                  {prayer}
                </h3>
                <p className="text-2xl font-medium text-[#1b201eb5]">
                  {formatTime(time)}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default PrayerTimes;
