import { PrayerTimes, Coordinates, CalculationMethod, Madhab } from "adhan";
import { useState, useEffect } from "react";

export const getPrayerTimes = (latitude, longitude, date, method, madhab) => {
  const coordinates = new Coordinates(latitude, longitude);
  const params = CalculationMethod[method]();
  params.madhab = Madhab[madhab];

  const prayerTimes = new PrayerTimes(coordinates, date, params);

  return {
    Fajr: prayerTimes.fajr,
    Sunrise: prayerTimes.sunrise,
    Dhuhr: prayerTimes.dhuhr,
    Asr: prayerTimes.asr,
    Maghrib: prayerTimes.maghrib,
    Isha: prayerTimes.isha,
  };
};

export const useGeolocation = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude, longitude } = position.coords;
        console.log(position);
        const response = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
        );
        const data = await response.json();
        console.log(data);

        setLocation({
          latitude,
          longitude,
          city: data.city,
          country: data.principalSubdivision,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, []);

  return { location, loading, error };
};
