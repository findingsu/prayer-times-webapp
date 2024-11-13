"use client";

import React, { useEffect } from "react";
import { useAppContext } from "@/context";
import Image from "next/image";
import { format, isToday } from "date-fns";
import { Card } from "@nextui-org/react";
import { DateNavigator } from "./DateNavigator";

export const PrayerTimes = () => {
  const {
    prayerTimes,
    fetchPrayerTimes,
    location,
    currentPrayer,
    selectedDate,
  } = useAppContext();

  // Check if the selected date is today
  const isDayToday = isToday(selectedDate);

  // Fetch prayer times when location or selectedDate changes
  useEffect(() => {
    if (location && selectedDate) {
      fetchPrayerTimes(selectedDate);
    }
  }, [location, selectedDate, fetchPrayerTimes]);

  const prayerIcons = {
    Fajr: "/icons/Fajr.svg",
    Sunrise: "/icons/Sunrise.svg",
    Dhuhr: "/icons/Dhuhr.svg",
    Asr: "/icons/Asr.svg",
    Maghrib: "/icons/Maghrib.svg",
    Isha: "/icons/Isha.svg",
  };

  const renderPrayerCard = (prayer, time) => {
    const isCurrentPrayerTime =
      isDayToday &&
      currentPrayer?.current &&
      prayer.toLowerCase() === currentPrayer.current.toLowerCase();

    // Styling for the prayer card, with highlight if it's the current prayer
    const prayerTimesBlock = `flex flex-col items-center justify-center p-4  rounded-lg transition-all  duration-200 ${
      isCurrentPrayerTime
        ? "bg-white scale-110 ring ring-md ring-[--highlight] ring-[4px]"
        : "ring ring-[--lightBrownBg] hover:scale-105"
    }`;

    return (
      <div key={prayer} className={prayerTimesBlock}>
        <Image
          src={prayerIcons[prayer]}
          alt={prayer}
          width={100}
          height={100}
          className="h-20 w-auto object-contain"
        />
        <div className="text-center">
          <h3 className="font-semibold text-[--darkBrownTxt] text-2xl mb-1">
            {prayer}
          </h3>
          <p className="text-xl font-bold text-[--brownTxt] outline-">
            {format(time, "hh:mm a")}
          </p>
        </div>
      </div>
    );
  };

  return (
    <main className="relative z-20 -mt-20">
      <div className="container mx-auto p-4">
        {/* Prayer Times Section Container */}
        <Card className="bg-[#f9f8f5] shadow-xl rounded-xl pb-5 overflow-hidden">
          <div className="p-6 w-full">
            <div className="m-5">
              <DateNavigator />
            </div>

            {/* Render Prayer Times Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 pt-5">
              {Object.entries(prayerTimes).map(([prayer, time]) =>
                renderPrayerCard(prayer, time)
              )}
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
};
