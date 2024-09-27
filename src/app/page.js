"use client";

// import { DateNavigator } from "./components/DateNavigator";
import { PrayerTimes } from "./components/PrayerTimes";
import { useAppContext } from "../context";
// import Navbar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
import NavBar from "./components/NavBar";

export default function Home() {
  return (
    <>
      <main className="flex flex-col items-center justify-center gap-5">
        <NavBar />
        <HeroSection />
        {/* <DateNavigator /> */}

        <PrayerTimes />
      </main>
    </>
  );
}
