"use client";

import Link from "next/link";
import { useState } from "react";
import { Settings } from "@/components";

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-30 bg-transparent">
      <nav className="w-full flex items-center justify-between p-5 lg:px-6 text-white bg-transparent">
        {/* Logo */}
        <div className="logo text-2xl py-2 px-4 font-bold">
          <Link href="/">MyLogo</Link>
        </div>

        {/* Nav widescreen */}
        <div className="hidden lg:flex space-x-4">
          <Link
            href="#home"
            className="text-lg text-white hover:bg-gray-500 px-4 py-2 rounded-md"
          >
            Prayer Times
          </Link>
          <button
            onClick={toggleSettings}
            className="text-lg text-white hover:bg-gray-500 px-4 py-2 rounded-md focus:outline-none"
          >
            Settings
          </button>
        </div>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>

          {isOpen && (
            <ul className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 ">
              <li>
                <Link
                  href="#home"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Prayer Times
                </Link>
              </li>
              <li>
                <button
                  onClick={toggleSettings}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </button>
              </li>
            </ul>
          )}
        </div>
      </nav>

      {/* Show the Settings Component */}
      {isSettingsOpen && (
        <div className="fixed w-full h-full z-40 inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-[--background] p-5 rounded-lg shadow-lg w-11/12 md:w-1/2 relative justify-center">
            <button
              onClick={toggleSettings}
              className="absolute top-3 right-3 py-2 px-4 text-xl focus:outline-none hover:text-red-600 transition"
            >
              x
            </button>

            <Settings />
          </div>
        </div>
      )}
    </header>
  );
};
