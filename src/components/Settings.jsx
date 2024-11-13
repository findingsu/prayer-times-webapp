"use client";

import React from "react";
import { useAppContext } from "@/context";
import { prayerTimeSettings } from "@/utils";
import { X } from "lucide-react";

const SelectField = ({ label, value, options, onChange }) => (
  <div className="space-y-2">
    <label className="block text-lg font-semibold text-[--darkBrownTxt]">
      {label}
    </label>
    <select
      className="select-field"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export const SettingsModal = ({ toggleSettings }) => {
  const { settings, updateSettings } = useAppContext();

  const handleSave = () => {
    updateSettings(settings);
    toggleSettings();
  };

  return (
    <div className="settings-modal">
      <div className="settings-content">
        <button
          onClick={toggleSettings}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 
                   transition-colors duration-200"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-3xl font-bold text-[--darkBrownTxt] mb-8 text-center">
          Prayer Settings
        </h2>

        <div className="space-y-6">
          <SelectField
            label="Calculation Method"
            value={settings.calculationMethod}
            options={prayerTimeSettings.calculationMethod}
            onChange={(value) =>
              updateSettings({ ...settings, calculationMethod: value })
            }
          />

          <SelectField
            label="Madhab"
            value={settings.madhab}
            options={prayerTimeSettings.madhab}
            onChange={(value) => updateSettings({ ...settings, madhab: value })}
          />
        </div>

        <button onClick={handleSave} className="save-button mt-8">
          Save Changes
        </button>
      </div>
    </div>
  );
};
