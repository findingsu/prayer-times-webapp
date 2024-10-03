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
  const [settings, setSettings] = useState(defaultSettings);

  // Geolocation state
  const [location, setLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(true);
  const [locationError, setLocationError] = useState(null);

  // Prayer Times state
  const [prayerTimes, setPrayerTimes] = useState({});
  const [currentPrayer, setCurrentPrayer] = useState({});
  const [prayerTimesLoading, setPrayerTimesLoading] = useState(false);
  const [prayerTimesError, setPrayerTimesError] = useState(null);

  // Fetch user's geolocation
  const fetchLocation = useCallback(async () => {
    setLocationLoading(true);
    setLocationError(null);

    try {
      const { location: loc, error } = await getGeolocation();
      setLocation(loc);
      if (error) setLocationError(error);
    } catch (err) {
      setLocationError(err.message || "Failed to fetch location");
    } finally {
      setLocationLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLocation();
  }, [fetchLocation]);

  // Fetch prayer times
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

  // Update prayer time settings
  const updateSettings = useCallback((newSettings) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  }, []);

  return (
    <AppContext.Provider
      value={{
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
