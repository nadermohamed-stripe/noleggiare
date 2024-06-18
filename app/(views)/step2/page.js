"use client"
import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleClick = () => {
    window.location.href = 'https://noleggiare.vercel.app/step4';
  };

  return (
    <div className="bg-white-900">
      <div className="relative isolate overflow-hidden pt-14 h-screen">
        <img
          src="./step2.png"
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover cursor-pointer"
          onClick={handleClick}
        />
      </div>
    </div>
  )
}