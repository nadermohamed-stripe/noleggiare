"use client"
import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [countdown, setCountdown] = useState(3); // number of seconds to wait

  useEffect(() => {
    // Clear cart
    localStorage.removeItem("cart");

    // Update the countdown every second
    const counter = setInterval(() => {
      setCountdown((prevCount) => {
        const newCount = prevCount - 1;
        return newCount >= 0 ? newCount : 0;
      });
    }, 1000);

    // Redirect after countdown finishes
    const timeout = setTimeout(() => {
      window.location.href = "https://www.noleggiare.it";
    }, countdown * 1000);

    // Cleanup interval and timeout on component unmount
    return () => {
      clearInterval(counter);
      clearTimeout(timeout);
    };
  }, [countdown]);

  return (
    <>
      <div className="bg-white">
      <div className="min-h-screen py-24 flex flex-col max-w-7xl mx-auto">
          <main className="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-16 flex-shrink-0 flex justify-center">
              <div className="text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-green-400 inline"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h1 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                  Success
                </h1>
                <div className="mt-6">
                  <div
                    id="countdown"
                    className="text-base font-medium text-brand-color hover:shadow-none text-md"
                  >
                    Redirecting <a href="/">home</a> in <span id="time">{countdown}</span> seconds...
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}