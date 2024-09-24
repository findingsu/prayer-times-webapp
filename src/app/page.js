"use client";

import { DateNavigator } from "./components/DateNavigator";
import { PrayerTimes } from "./components/PrayerTimes";
import { Settings } from "./components/Settings";
import { useAppContext } from "../context";

export default function Home() {
  const { location, loading } = useAppContext();

  return (
    <>
      <Settings />
      <main className="flex flex-col items-center justify-center gap-5">
        <h1 className="text-4xl font-bold">Prayer Times</h1>
        <DateNavigator />
        {loading ? (
          <p>Loading location...</p>
        ) : location ? (
          <h1 className="text-lg font-medium text-gray-600">
            Location: {location.city}, {location.country}
          </h1>
        ) : (
          <p>Location not available</p>
        )}

        <PrayerTimes />
      </main>
    </>
  );
}
