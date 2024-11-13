import { PrayerTimes, Coordinates, CalculationMethod, Madhab } from "adhan";

export const getPrayerTimes = (latitude, longitude, date, method, madhab) => {
  const coordinates = new Coordinates(latitude, longitude);
  const params = CalculationMethod[method]();
  params.madhab = Madhab[madhab];

  const prayerTimes = new PrayerTimes(coordinates, date, params);

  // Initialize the current and next prayers
  let currentPrayer = prayerTimes.currentPrayer();
  let nextPrayer = prayerTimes.nextPrayer();
  let nextPrayerTime = prayerTimes.timeForPrayer(nextPrayer);

  // Get todays prayer times
  const prayerObj = {
    Fajr: prayerTimes.fajr,
    Sunrise: prayerTimes.sunrise,
    Dhuhr: prayerTimes.dhuhr,
    Asr: prayerTimes.asr,
    Maghrib: prayerTimes.maghrib,
    Isha: prayerTimes.isha,
  };

  // Handle specific cases for `isha` and `sunrise`
  const currentTime = new Date();

  // Handle case where `sunrise` has passed
  if (currentPrayer === "sunrise" && currentTime > prayerObj.Sunrise) {
    return {
      prayerObj,
      currentPrayerObj: {},
    };
  }

  // Handle specific cases for `isha`
  if (currentPrayer === "isha") {
    ({ nextPrayer, nextPrayerTime } = getNextDayFajr(
      coordinates,
      date,
      params
    ));
  }

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

// Helper function to get the Fajr time for the next day
const getNextDayFajr = (coordinates, date, params) => {
  const tomorrow = new Date(date);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextDayPrayerTimes = new PrayerTimes(coordinates, tomorrow, params);
  return { nextPrayer: "Fajr", nextPrayerTime: nextDayPrayerTimes.fajr };
};
