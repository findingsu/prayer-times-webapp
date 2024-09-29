"use client";

import Link from "next/link";
import { useState } from "react";

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className=" absolute top-0 w-screen z-20 p-4 bg-transparent">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-white">
          <Link href="/">MyLogo</Link>
        </div>

        <div className="md:hidden block">
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
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              ></path>
            </svg>
          </button>
        </div>

        <ul
          className={`md:flex space-x-6 items-center ${
            isOpen ? "block" : "hidden"
          } md:block`}
        >
          <li>
            <Link href="#home" className="text-white hover:text-gray-400">
              Prayer Times
            </Link>
          </li>
          <li>
            <Link href="#settings" className="text-white hover:text-gray-400">
              Settings
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
