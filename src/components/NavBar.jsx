"use client";

import Link from "next/link";
import { useState } from "react";
import { SettingsModal } from "./Settings";
import { SettingsIcon } from "lucide-react";

export const NavBar = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);

  const toggleSettings = () => {
    setSettingsOpen(!settingsOpen);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-30 ">
      <nav className="w-full flex items-center justify-between p-3 lg:px-6 text-[--beigeTxt]">
        {/* Logo Section */}
        <div className="text-2xl font-bold px-4 py-2 ">
          <Link href="/">MyLogo</Link>
        </div>

        {/* Settings Button */}
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-[--beigeTxt] hover:bg-[--brownBgHover] focus:outline-none transition duration-300"
          onClick={toggleSettings}
        >
          <SettingsIcon />
          Settings
        </Link>
      </nav>

      {/* Conditional Rendering of Settings */}
      {settingsOpen && (
        <div className="flex items-center justify-center w-full h-full p-5 z-40">
          <SettingsModal toggleSettings={toggleSettings} />
        </div>
      )}
    </header>
  );
};
