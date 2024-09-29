"use client";

import React, { useEffect } from "react";
import { useAppContext } from "@/context";
import Image from "next/image";
import { format } from "date-fns";

export const PrayerTimes = () => {
  const {
    prayerTimes,
    fetchPrayerTimes,
    location,
    loading,
    error,
    currentPrayer,
  } = useAppContext();

  useEffect(() => {
    if (location) {
      fetchPrayerTimes(new Date());
    }
  }, [location, fetchPrayerTimes]);

  const prayerIcons = {
    Fajr: "/assets/Fajr.svg",
    Sunrise: "/assets/Sunrise.svg",
    Dhuhr: "/assets/Dhuhr.svg",
    Asr: "/assets/Asr.svg",
    Maghrib: "/assets/Maghrib.svg",
    Isha: "/assets/Isha.svg",
  };

  const formatPrayerTime = (time) => {
    if (!(time instanceof Date)) {
      return "Invalid time";
    }
    return format(time, "hh:mm a");
  };

  return (
    <section id="home" className="py-4 w-screen">
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
          <h1 className="text-4xl font-bold text-[#2D3748] text-center">
            Today's Prayer Times
          </h1>
          <div className="grid grid-cols-6 gap-5 w-screen px-10 py-5">
            {Object.entries(prayerTimes).map(([prayer, time]) => (
              <div
                key={prayer}
                className="h-full w-full shadow-lg rounded-xl p-6 text-center bg-white"
              >
                <div className="flex justify-center mb-3">
                  <Image
                    src={prayerIcons[prayer]}
                    alt={prayer}
                    width={100}
                    height={100}
                    className="h-20 w-auto object-contain"
                  />
                </div>
                <h3 className="font-semibold text-[#2D3748] mb-3 text-2xl">
                  {prayer}
                </h3>
                <p className="text-2xl font-medium text-[#1b201eb5]">
                  {formatPrayerTime(time)}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
};
