"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

import { getPrayerTimes, getGeolocation } from "@/utils";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    calculationMethod: "MoonsightingCommittee",
    madhab: "Shafi",
    timeFormat: "24h",
  });

  // Geolocation states
  const [location, setLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(true);
  const [locationError, setLocationError] = useState(null);

  // Prayer Times states
  const [prayerTimes, setPrayerTimes] = useState({});
  const [currentPrayer, setCurrentPrayer] = useState({});
  const [prayerTimesLoading, setPrayerTimesLoading] = useState(false);
  const [prayerTimesError, setPrayerTimesError] = useState(null);

  const fetchLocation = useCallback(async () => {
    setLocationLoading(true);
    setLocationError(null);
    try {
      const { location: loc, error } = await getGeolocation();
      setLocation(loc);
      if (error) {
        setLocationError(error);
      }
    } catch (err) {
      setLocationError(err.message);
    } finally {
      setLocationLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLocation();
  }, [fetchLocation]);

  const fetchPrayerTimes = useCallback(
    (date) => {
      if (location) {
        setPrayerTimesLoading(true);
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
