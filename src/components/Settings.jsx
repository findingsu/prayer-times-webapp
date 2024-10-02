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
    <select
      className="border rounded-md px-2 py-1"
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

// Toggle button component for Madhab
const ToggleButtonGroup = ({ label, value, options, onChange }) => {
  return (
    <div className="flex gap-5 mb-4 items-center">
      <p className="font-bold">{label}</p>
      <div className="flex gap-4">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`${
              value === option.value
                ? "bg-[#697170] text-white border-2 border-[#1AA599]"
                : "bg-gray-200 text-gray-800"
            } px-4 py-2 rounded-md focus:outline-none transition duration-300 hover:bg-[#697170] hover:text-white`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export const Settings = () => {
  const { settings, updateSettings } = useAppContext();
  const [selectedMethod, setSelectedMethod] = useState(
    settings.calculationMethod
  );
  const [selectedMadhab, setSelectedMadhab] = useState(settings.madhab);

  const handleSave = () => {
    updateSettings({
      calculationMethod: selectedMethod,
      madhab: selectedMadhab,
    });
  };

  return (
    <section id="settings" className="p-10">
      <h1 className="text-4xl font-bold mb-4">Settings</h1>
      <SelectField
        label="Calculation Method"
        value={selectedMethod}
        options={SELECT_OPTIONS.calculationMethod}
        onChange={setSelectedMethod}
      />

      <ToggleButtonGroup
        label="Madhab"
        value={selectedMadhab}
        options={SELECT_OPTIONS.madhab}
        onChange={setSelectedMadhab}
      />
      <button
        onClick={handleSave}
        className="mt-4 bg-[#1AA599] text-white py-2 px-4 rounded"
      >
        Save Settings
      </button>
    </section>
  );
};
