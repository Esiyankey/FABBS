"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed py-4 md:py-0 top-0 w-full bg-white/95 backdrop-blur-sm z-50 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Show logo on mobile, text on desktop */}
            <div className="md:hidden">
              <Link href="/">
                <Image
                  src="/images/fabbs_logo.png"
                  alt="logo here"
                  width={100}
                  height={80}
                />
              </Link>
            </div>
            <div className="hidden md:block text-sm tracking-widest text-stone-600">
              FINE VISUAL STORYTELLING COMPANY
            </div>

            {/* Hamburger Toggle */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-stone-600 hover:text-stone-800 focus:outline-none mr-2"
              >
                <svg
                  className="h-7 w-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#portfolio"
                className="text-sm tracking-wide text-stone-600 hover:text-stone-800"
              >
                PORTFOLIO
              </a>
             
              <Link href="/">
                <Image
                  src="/images/fabbs_logo.png"
                  alt="logo here"
                  width={100}
                  height={80}
                />
              </Link>
              <a className="text-sm tracking-wide text-stone-600 hover:text-stone-800">
                <button
                  onClick={() => {
                    const el = document.getElementById("services");
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  SERVICES
                </button>
              </a>
              <a className="text-sm tracking-wide text-stone-600 hover:text-stone-800">
                <button
                  onClick={() => {
                    const el = document.getElementById("contact");
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  CONTACT
                </button>
              </a>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden mt-4 flex flex-col space-y-4 text-center">
              <a
                href="#portfolio"
                className="text-sm tracking-wide text-stone-600 hover:text-stone-800"
              >
                PORTFOLIO
              </a>
              
              <a className="text-sm tracking-wide text-stone-600 hover:text-stone-800">
                <button
                  onClick={() => {
                    const el = document.getElementById("services");
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  SERVICES
                </button>
              </a>
              <a className="text-sm tracking-wide text-stone-600 hover:text-stone-800">
                <button
                  onClick={() => {
                    const el = document.getElementById("contact");
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  CONTACT
                </button>
              </a>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};
