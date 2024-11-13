import {
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from "date-fns";

/**
 * @param {Date} nextPrayerTime
 * @returns {string}
 */
export const calculateTimeDifference = (nextPrayerTime) => {
  const now = new Date();
  const nextPrayer = new Date(nextPrayerTime);

  const hours = differenceInHours(nextPrayer, now);
  const minutes = differenceInMinutes(nextPrayer, now) % 60;
  const seconds = differenceInSeconds(nextPrayer, now) % 60;

  return `${hours}h ${minutes}m ${seconds}s`;
};
