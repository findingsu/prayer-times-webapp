"use client";

import Link from "next/link";
import { useState } from "react";

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="absolute top-0 w-screen z-20 p-4 border">
      <div className="inline-flex w-full justify-between border">
        <div className="text-2xl font-bold text-white mr-auto border">
          <Link href="/">MyLogo</Link>
        </div>
        {/* Dropdown for small screens */}
        <div className="relative md:hidden">
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
            <ul className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
              <li>
                <Link
                  href="#home"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Prayer Times
                </Link>
              </li>
              <li>
                <Link
                  href="#settings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </Link>
              </li>
            </ul>
          )}
        </div>
        {/* Links for medium and larger screens */}
        <div className="hidden md:flex space-x-4">
          <Link
            href="#home"
            className="text-sm text-white hover:bg-gray-500 px-4 py-2 rounded-md"
          >
            Prayer Times
          </Link>
          <Link
            href="#settings"
            className="text-sm text-white hover:bg-gray-500 px-4 py-2 rounded-md"
          >
            Settings
          </Link>
        </div>
      </div>
    </nav>
  );
};
