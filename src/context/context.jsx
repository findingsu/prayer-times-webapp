"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { getPrayerTimes, getGeolocation, defaultSettings } from "@/utils";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Stores settings for prayer time calculations, including method and madhab preferences
  const [settings, setSettings] = useState(defaultSettings);

  // Selected date to fetch prayer times, defaults to the current date
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Geolocation state to store user's location details and handle loading or error status
  const [location, setLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(true);
  const [locationError, setLocationError] = useState(null);

  // Prayer Times state to store times for each prayer, the current prayer, and handle loading/error states
  const [prayerTimes, setPrayerTimes] = useState({});
  const [currentPrayer, setCurrentPrayer] = useState({});
  const [prayerTimesLoading, setPrayerTimesLoading] = useState(false);
  const [prayerTimesError, setPrayerTimesError] = useState(null);

  // Fetches the user's location based on device geolocation
  const fetchLocation = useCallback(async () => {
    setLocationLoading(true);
    setLocationError(null);

    try {
      const { location: loc, error } = await getGeolocation();
      setLocation(loc);
      if (error) setLocationError(error); // Sets error if any issues in geolocation
    } catch (err) {
      setLocationError(err.message || "Failed to fetch location"); // Sets error for catch block
    } finally {
      setLocationLoading(false); // Ends loading state after attempt
    }
  }, []);

  useEffect(() => {
    fetchLocation(); // Fetches location upon component mount
  }, [fetchLocation]);

  // Fetches prayer times for the current location and selected date, based on user’s calculation settings
  const fetchPrayerTimes = useCallback(
    async (date) => {
      if (!location) return;

      setPrayerTimesLoading(true);
      setPrayerTimesError(null);

      try {
        const { prayerObj, currentPrayerObj } = getPrayerTimes(
          location.latitude,
          location.longitude,
          date,
          settings.calculationMethod,
          settings.madhab
        );
        setPrayerTimes(prayerObj);
        setCurrentPrayer(currentPrayerObj);
      } catch (error) {
        setPrayerTimesError(error.message || "Failed to fetch prayer times");
      } finally {
        setPrayerTimesLoading(false);
      }
    },
    [location, settings]
  );

  // Updates the settings for prayer time calculations, including method and madhab preferences
  const updateSettings = useCallback((newSettings) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  }, []);

  return (
    <AppContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
        settings,
        updateSettings,
        location,
        locationLoading,
        locationError,
        prayerTimes,
        currentPrayer,
        fetchPrayerTimes,
        loading: locationLoading || prayerTimesLoading,
        error: locationError || prayerTimesError,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
