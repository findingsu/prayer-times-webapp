"use client";

import { DateNavigator } from "./components/DateNavigator";
import { PrayerTimes } from "./components/PrayerTimes";
import { useAppContext } from "../context";
import Navbar from "./components/NavBar";

export default function Home() {
  const { location, loading } = useAppContext();

  return (
    <>
      <Navbar />
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
