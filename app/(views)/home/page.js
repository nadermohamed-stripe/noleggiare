"use client"
import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleClick = () => {
    window.location.href = 'https://noleggiare.vercel.app/step2';
  };

  return (
    <div className="bg-white h-screen">
      <div className="relative isolate overflow-hidden h-full flex items-center justify-center">
        <img
          src="./homescreen.png"
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover cursor-pointer"
          onClick={handleClick}
        />
      </div>
    </div>
  )
}