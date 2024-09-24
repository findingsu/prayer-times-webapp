"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { useGeolocation, getPrayerTimes } from "../utils/prayerCalculations";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    calculationMethod: "MoonsightingCommittee",
    madhab: "Shafi",
    timeFormat: "24h",
  });

  const {
    location,
    loading: locationLoading,
    error: locationError,
  } = useGeolocation();

  const [prayerTimes, setPrayerTimes] = useState({});
  const [prayerTimesLoading, setPrayerTimesLoading] = useState(false);
  const [prayerTimesError, setPrayerTimesError] = useState(null);

  const fetchPrayerTimes = useCallback(
    (date) => {
      if (location) {
        setPrayerTimesLoading(true);
        try {
          const times = getPrayerTimes(
            location.latitude,
            location.longitude,
            date,
            settings.calculationMethod,
            settings.madhab
          );
          setPrayerTimes(times);
        } catch (error) {
          setPrayerTimesError(error.message);
        } finally {
          setPrayerTimesLoading(false);
        }
      }
    },
    [location, settings]
  );

  const updateSettings = useCallback((newSettings) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  }, []);

  return (
    <AppContext.Provider
      value={{
        settings,
        updateSettings,
        location,
        prayerTimes,
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
