"use client";

import React, { useEffect } from "react";
import { useAppContext } from "@/context";
import Image from "next/image";
import { format } from "date-fns";
import { Card } from "@nextui-org/react";

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

  return (
    <main className="relative z-20 -mt-20">
      <div className="container mx-auto p-4">
        <Card className="bg-white shadow-xl rounded-xl pb-5 overflow-hidden">
          <div className="p-6 w-full">
            <div className="mb-6 flex items-center justify-around">
              <h2 className="text-3xl font-bold text-[#4A3C31]">
                Today's Prayer Times
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {Object.entries(prayerTimes).map(([prayer, time]) => {
                return (
                  <div
                    key={prayer}
                    className={`flex flex-col items-center justify-center p-4 rounded-lg transition-all duration-200 ${
                      prayer.toLowerCase() === currentPrayer.current
                        ? "bg-[#ffc165] shadow-lg"
                        : "bg-white"
                    }`}
                  >
                    <Image
                      src={prayerIcons[prayer]}
                      alt={prayer}
                      width={100}
                      height={100}
                      className="h-20 w-auto object-contain"
                    />
                    <div className="text-center">
                      <h3 className="font-semibold text-[#4A3C31] text-2xl mb-1">
                        {prayer}
                      </h3>
                      <p className="text-xl font-bold text-[#8C7A6B]">
                        {format(time, "hh:mm a")}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
};
