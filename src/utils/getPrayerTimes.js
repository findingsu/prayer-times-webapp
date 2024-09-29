import { PrayerTimes, Coordinates, CalculationMethod, Madhab } from "adhan";

export const getPrayerTimes = (latitude, longitude, date, method, madhab) => {
  const coordinates = new Coordinates(latitude, longitude);
  const params = CalculationMethod[method]();
  params.madhab = Madhab[madhab];

  const prayerTimes = new PrayerTimes(coordinates, date, params);

  let currentPrayer = prayerTimes.currentPrayer();
  let nextPrayer = prayerTimes.nextPrayer();
  let nextPrayerTime = prayerTimes.timeForPrayer(nextPrayer);

  if (currentPrayer === "isha") {
    currentPrayer = "Isha";

    const tomorrow = new Date(date);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const nextDayPrayerTimes = new PrayerTimes(coordinates, tomorrow, params);
    nextPrayer = "Fajr";
    nextPrayerTime = nextDayPrayerTimes.fajr;
  }

  const prayerObj = {
    Fajr: prayerTimes.fajr,
    Sunrise: prayerTimes.sunrise,
    Dhuhr: prayerTimes.dhuhr,
    Asr: prayerTimes.asr,
    Maghrib: prayerTimes.maghrib,
    Isha: prayerTimes.isha,
  };

  const currentPrayerObj = {
    current: currentPrayer,
    next: nextPrayer,
    nextPrayerTime: nextPrayerTime,
  };

  return {
    prayerObj,
    currentPrayerObj,
  };
};

export default getPrayerTimes;
