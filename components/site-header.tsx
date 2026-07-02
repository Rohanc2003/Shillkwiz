"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
];

export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="w-full fixed top-0 left-0 z-50">
      <nav className="flex flex-col w-full md:w-4/5 lg:w-3/5 xl:w-1/2 mx-auto bg-[#335f92] text-white rounded-b-3xl">
        <div className="flex items-center justify-between md:justify-center px-4 py-2 md:gap-8 lg:gap-12">
          {/* Logo — always visible */}
          <Link
            href="/"
            onClick={closeMenu}
            className="flex items-center mr-auto md:mr-0"
            aria-label="SkillKwiz home"
          >
            <Image
              src="/images/SVG File- logo (1).svg"
              alt="SkillKwiz Logo"
              width={180}
              height={42}
              className="w-[180px] h-auto object-contain"
              priority
            />
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white focus:outline-none z-20 ml-auto"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`relative group py-4 px-3 text-sm lg:text-base transition-all ${
                  pathname === href
                    ? "text-yellow-400 font-semibold"
                    : "text-white hover:text-yellow-300"
                }`}
              >
                <span>{label}</span>
                <span className="absolute left-0 bottom-2 w-full h-0.5 bg-gradient-to-r from-blue-400 to-yellow-400 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Navigation — fixed overlay so it sits above all page content */}
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40 bg-black/20"
              onClick={closeMenu}
              aria-hidden="true"
            />
            {/* Menu panel */}
            <div className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center py-4 bg-[#335f92] rounded-b-3xl pt-16 shadow-xl">
              {/* Close button at top-right */}
              <button
                className="absolute top-3 right-4 text-white"
                onClick={closeMenu}
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Logo row */}
              <Link
                href="/"
                onClick={closeMenu}
                className="flex items-center mb-2"
              >
                <Image
                  src="/images/SVG File- logo (1).svg"
                  alt="SkillKwiz Logo"
                  width={140}
                  height={33}
                  className="w-[140px] h-auto object-contain"
                  priority
                />
              </Link>

              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={closeMenu}
                  className={`relative group py-3 text-lg w-full text-center transition-colors ${
                    pathname === href
                      ? "text-yellow-400 font-semibold"
                      : "text-white"
                  }`}
                >
                  <span>{label}</span>
                  <span className="absolute left-1/4 bottom-0 w-1/2 h-0.5 bg-gradient-to-r from-blue-400 to-yellow-400 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
                </Link>
              ))}
            </div>
          </>
        )}
      </nav>
    </div>
  );
}
