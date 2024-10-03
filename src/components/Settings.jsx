"use client";

import React, { useState } from "react";
import { useAppContext } from "@/context";
import { prayerTimeSettings } from "@/utils";
import { X } from "lucide-react";
import { Link } from "@nextui-org/react";

const SelectField = ({ label, value, options, onChange }) => (
  <div className="grid grid-cols-2 gap-2 py-3 items-center justify-center">
    <p className="font-bold text-lg text-[--lightBrownTxt]">{label}</p>
    <select
      className="border rounded-md px-4 py-2 text-md"
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

const MadhabToggleBtn = ({ label, value, options, onChange }) => (
  <div className="grid grid-cols-2 gap-2 py-3">
    <div>
      <p className="font-bold text-lg text-[--lightBrownTxt]">{label}</p>
    </div>
    <div className="flex gap-4">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          type="button"
          className={`
            ${
              value === option.value
                ? "bg-[--brownBg] text-[--beigeTxt]"
                : "bg-[--lightBrownBg] text-[darkBrownTxt] hover:bg-[--brownBgHover] hover:text-[darkBrownTxt]"
            } px-4 py-2 text-md rounded-md focus:outline-none transition duration-300 
           `}
        >
          {option.label}
        </button>
      ))}
    </div>
  </div>
);

export const SettingsModal = ({ toggleSettings }) => {
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
    toggleSettings();
  };

  return (
    <section id="settings">
      <div className="fixed inset-0 z-40 bg-black/50 flex justify-center items-center">
        <div className="bg-[--background]  pt-5 pb-10 px-10 rounded-lg shadow-lg w-11/12 md:w-1/2 relative flex flex-col justify-center gap-5">
          {/* Close Button */}
          <button
            onClick={toggleSettings}
            className=" ml-auto text-[--darkBrownTxt] rounded-full hover:text-[#0f363392] transition ease-in-out"
          >
            <X />
          </button>
          <h1 className="text-4xl font-bold mb-10 text-[--darkBrownTxt] text-center">
            Settings
          </h1>
          <div>
            <SelectField
              label="Calculation Method"
              value={selectedMethod}
              options={prayerTimeSettings.calculationMethod}
              onChange={setSelectedMethod}
            />

            <MadhabToggleBtn
              label="Madhab"
              value={selectedMadhab}
              options={prayerTimeSettings.madhab}
              onChange={setSelectedMadhab}
            />
          </div>

          <Link
            onClick={handleSave}
            className="mt-10 bg-[#227e7692] text-[--darkBrownTxt] hover:bg-[#0f363392] hover:text-[--beigeTxt] py-2 px-4 rounded text-xl text-center"
          >
            Save Settings
          </Link>
        </div>
      </div>
    </section>
  );
};
