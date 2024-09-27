"use client";

import { DateNavigator } from "./components/DateNavigator";
import { PrayerTimes } from "./components/PrayerTimes";
import { useAppContext } from "../context";
// import Navbar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
import NavBar from "./components/NavBar";

export default function Home() {
  const { location, loading } = useAppContext();

  return (
    <>
      <main className="flex flex-col items-center justify-center gap-5">
        {/* <h1 className="text-4xl font-bold">Prayer Times</h1> */}
        <NavBar />
        <HeroSection />
        <DateNavigator />
        
        <PrayerTimes />
      </main>
    </>
  );
}
