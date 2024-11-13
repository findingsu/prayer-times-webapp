"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useAppContext } from "@/context";
import {
  format,
  isToday,
  isSameDay,
  startOfWeek,
  addDays,
  subDays,
} from "date-fns";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

const DayButton = React.memo(({ day, selectedDate, onSelect }) => {
  const isSelected = isSameDay(day, selectedDate);
  const isDayToday = isToday(day);

  return (
    <button
      onClick={() => onSelect(day)}
      className={`
        p-2 rounded-md flex flex-col items-center justify-center
        transition-all duration-300 ease-in-out
        ${
          isDayToday && !isSelected
            ? "bg-[--lightBrownBg] text-[--darkBrownTxt]"
            : isSelected
            ? "bg-[--lightBrownBg] text-[--darkBrownTxt] scale-105"
            : "ring-1 ring-[--lightBrownBg] text-[--brownTxt] hover:text-[--darkBrownTxt] hover:bg-[--lightBrownBg] hover:scale-105 hover:transform-105"
        }
      `}
    >
      <span className="text-sm font-semibold">{format(day, "EEE")}</span>
      <span className="text-2xl font-bold">{format(day, "d")}</span>
      <div className="h-1 flex items-center justify-center mt-1">
        <div
          className={`h-1 transition-all duration-300 ease-in-out ${
            isSelected
              ? "w-3.5 bg-[#3a837df0] rounded-xl"
              : isDayToday
              ? "w-1 bg-[--darkBrownTxt] rounded-full"
              : "w-0"
          }`}
        />
      </div>
    </button>
  );
});

DayButton.displayName = "DayButton";

export function DateNavigator() {
  const { selectedDate, setSelectedDate, fetchPrayerTimes } = useAppContext();
  const [startDate, setStartDate] = useState(() =>
    startOfWeek(selectedDate, { weekStartsOn: 1 })
  );
  // const [isAnimating, setIsAnimating] = useState(false);

  const navigateWeek = useCallback((direction) => {
    // setIsAnimating(true);
    setStartDate((prevDate) =>
      direction === "prev" ? subDays(prevDate, 7) : addDays(prevDate, 7)
    );
  }, []);

  const goToToday = useCallback(() => {
    const today = new Date();
    setStartDate(startOfWeek(today, { weekStartsOn: 1 }));
    setSelectedDate(today);
  }, [setSelectedDate]);

  const daysInWeek = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 px-10 ">
        <h2 className="text-xl sm:text-2xl font-bold text-[--darkBrownTxt]">
          {format(selectedDate, "MMMM yyyy")}
        </h2>
        <button
          onClick={goToToday}
          className=" w-1/6 flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-[--teal] text-white transition-all duration-300 hover:scale-105"
        >
          <Calendar className="w-4 h-4" />
          <span className="text-lg  ">Today</span>
        </button>
      </div>

      <div className="flex items-center">
        <button
          onClick={() => navigateWeek("prev")}
          className="p-2 hover:opacity-50 transition-all duration-300 rounded-md"
        >
          <ChevronLeft className="w-6 h-6 text-[--brownBg] hover:scale-110" />
        </button>

        <div className="flex-grow grid grid-cols-7 gap-2 sm:gap-4 transition-opacity duration-300 ease-in-out">
          {daysInWeek.map((day) => (
            <DayButton
              key={day.toISOString()}
              day={day}
              selectedDate={selectedDate}
              onSelect={(day) => {
                setSelectedDate(day);
                fetchPrayerTimes(day);
              }}
            />
          ))}
        </div>

        <button
          onClick={() => navigateWeek("next")}
          className="p-2 hover:text-[--lightBrownBg] transition-colors duration-300 rounded-md"
        >
          <ChevronRight className="w-6 h-6 text-[--brownBg]" />
        </button>
      </div>
    </div>
  );
}
