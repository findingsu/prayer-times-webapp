"use client";

import React, { useState } from "react";
import { useAppContext } from "../../context";

const SELECT_OPTIONS = {
  calculationMethod: [
    { value: "MuslimWorldLeague", label: "Muslim World League" },
    { value: "MoonsightingCommittee", label: "Moonsighting Committee" },
    { value: "NorthAmerica", label: "ISNA" },
    { value: "Karachi", label: "Karachi" },
    { value: "Egyptian", label: "Egyptian General Authority" },
    { value: "UmmAlQura", label: "Umm al-Qura University" },
  ],
  madhab: [
    { value: "Shafi", label: "Shafi (Standard)" },
    { value: "Hanafi", label: "Hanafi" },
  ],
};

export const Settings = () => {
  const { settings, updateSettings } = useAppContext();
  const [isOpen, setIsOpen] = useState(false); // State to toggle settings visibility

  const handleSettingChange = (setting) => (e) => {
    updateSettings({ [setting]: e.target.value });
  };

  const toggleSettings = () => {
    setIsOpen(!isOpen); // Toggle the visibility of settings
  };

  return (
    <div className="p-10">
      <h2 onClick={toggleSettings} className="mb-2">
        Settings
      </h2>
      {isOpen && (
        <div>
          {Object.entries(SELECT_OPTIONS).map(([setting, options]) => (
            <div key={setting}>
              <label htmlFor={setting}>
                <span className="flex gap-5">
                  <p className="font-bold">
                    {setting === "calculationMethod"
                      ? "Calculation: "
                      : "Madhab: "}
                  </p>
                  <select
                    id={setting}
                    value={settings[setting]}
                    onChange={handleSettingChange(setting)}
                  >
                    {options.map(({ value, label }) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </span>
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
