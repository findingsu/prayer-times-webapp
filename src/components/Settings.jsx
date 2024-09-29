"use client";

import React, { useState } from "react";
import { useAppContext } from "@/context";

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

const SelectField = ({ label, value, options, onChange }) => (
  <div className="flex gap-5 mb-4">
    <p className="font-bold">{label}</p>
    <select value={value} onChange={onChange} className="border rounded-md">
      {options.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  </div>
);

export const Settings = () => {
  const { settings, updateSettings } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);

  const handleSettingChange = (setting) => (e) => {
    updateSettings({ [setting]: e.target.value });
  };

  const toggleSettings = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button
        onClick={toggleSettings}
        className="m-5 p-3 bg-slate-200 rounded-lg"
      >
        Settings
      </button>
      {isOpen && (
        <div className="p-5 m-5 w-1/4 bg-white rounded-lg border border-slate-200">
          {Object.entries(SELECT_OPTIONS).map(([setting, options]) => (
            <SelectField
              key={setting}
              label={
                setting === "calculationMethod" ? "Calculation:" : "Madhab:"
              }
              value={settings[setting]}
              options={options}
              onChange={handleSettingChange(setting)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
