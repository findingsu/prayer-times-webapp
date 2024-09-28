"use client";

import { DateNavigator } from "./components/DateNavigator";
import { PrayerTimes } from "./components/PrayerTimes";
import HeroSection from "./components/HeroSection";
import NavBar from "./components/NavBar";

export default function Home() {
  return (
    <main className="w-screen h-screen">
      <NavBar />
      <HeroSection />
      <DateNavigator />
      <PrayerTimes />
    </main>
  );
}
