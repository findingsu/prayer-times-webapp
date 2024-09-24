import { DateNavigator } from "./components/DateNavigator";
import { PrayerTimes } from "./components/PrayerTimes";
import { Settings } from "./components/Settings";

export default function Home() {
  return (
    <>
      <Settings />
      <main className="flex flex-col items-center justify-center gap-5">
        <h1 className="text-xl font-bold">Prayer Times</h1>
        <DateNavigator />
        <PrayerTimes />
      </main>
    </>
  );
}
