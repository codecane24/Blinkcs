"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { DynamicIcon } from "lucide-react/dynamic";
import { Menu } from "lucide-react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Toggle Button (only small/medium screens, hidden when sidebar is open) */}
      {!open && (
        <button
          className="lg:hidden fixed top-4 left-2 z-50 p-2   text-black rounded-md"
          onClick={() => setOpen(true)}
        >
          <Menu size={34} />
        </button>
      )}

      {/* Background Overlay (only for mobile when sidebar is open) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-screen bg-[#E6E6E6] flex flex-col items-center justify-between py-6 z-40 
        transform transition-transform duration-300 
        ${open ? "translate-x-0 w-56" : "-translate-x-full w-56"} 
        lg:translate-x-0 lg:w-16`}
      >
        {/* Logo */}
        <div className="flex flex-col items-center  ">
          <Image
            src="/blink-logo-2.webp"
            alt="Logo"
            width={30}
            height={30}
            className="mb-6 xl:mb-10"
          />

          {/* Navigation */}
          <nav className="flex flex-col items-center font-semibold">
      {/* Desktop links (rotated with proper spacing) */}
<div className="hidden lg:flex flex-col items-center gap-16  xl:gap-20 text-[.7rem]  xl:text-[1rem] tracking-wide">
  {[
    { name: "HOME", href: "#home" },
    { name: "ABUOT US", href: "#about" },
    { name: "GALLERY", href: "#gallery" },
    { name: "CONTACT US", href: "#contact" },
  ].map((link) => (
    <Link
      key={link.name}
      href={link.href}
      className="
        relative rotate-[-90deg] whitespace-nowrap text-red-600 font-semibold
        transition-all duration-300 ease-out group
      "
    >
      {link.name}
      {/* underline that slides in from center */}
      <span
        className="
          absolute left-1/2 bottom-[-6px] h-[2px] w-0 
          bg-red-600 transition-all duration-300 ease-out
          group-hover:w-full group-hover:-translate-x-1/2
        "
      ></span>
      {/* subtle background highlight on hover */}
      <span
        className="
          absolute inset-0 -z-10 scale-x-0 origin-left bg-red-100 
          transition-transform duration-300 ease-out
          group-hover:scale-x-100
        "
      ></span>
    </Link>
  ))}
</div>


            {/* Mobile/Tablet links (normal text) */}
            <div className="flex flex-col gap-6 text-base lg:hidden">
              <Link href="#home" className="text-red-600" onClick={() => setOpen(false)}>
                Home
              </Link>
              <Link href="#about" className="text-red-600" onClick={() => setOpen(false)}>
                About Us
              </Link>
              <Link href="#gallery" className="text-red-600" onClick={() => setOpen(false)}>
                Gallery
              </Link>
              <Link href="#contact" className="text-red-600" onClick={() => setOpen(false)}>
                Contact Us
              </Link>
            </div>
          </nav>
        </div>

        {/* Social Icons */}
        <div className="flex flex-col items-center space-y-3 mt-auto mb-0">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 rounded-full bg-gray-700 text-white hover:bg-gray-900 transition"
          >
            <DynamicIcon name="instagram" size={15} color="white" />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 rounded-full bg-gray-700 font-thin text-white hover:bg-gray-900 transition"
          >
            <DynamicIcon name="facebook" size={15} color="white" />
          </a>
        </div>
      </div>
    </>
  );
}
