import { NavBar, Hero, DateNavigator, PrayerTimes } from "@/components";

export default function Home() {
  return (
    <main className="w-screen h-screen">
      <NavBar />
      <Hero />
      <DateNavigator />
      <PrayerTimes />
    </main>
  );
}
