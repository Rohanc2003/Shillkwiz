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

/** PNG icon + styled HTML brand text */
function LogoBrand({ iconSize = 44 }: { iconSize?: number }) {
  return (
    <div className="flex items-center gap-2.5">
      {/* PNG icon */}
      <Image
        src="/images/logo.png"
        alt="SkillKwiz icon"
        width={iconSize}
        height={iconSize}
        className="object-contain shrink-0"
        style={{ width: iconSize, height: iconSize }}
        priority
      />
      {/* Brand text */}
      <div className="flex flex-col justify-center leading-tight">
        <span
          className="font-black tracking-wide"
          style={{
            fontFamily: "'Cinzel', 'Palatino Linotype', 'Georgia', serif",
            color: "#ffffff",
            fontSize: "1.15rem",
            lineHeight: 1.1,
            letterSpacing: "0.02em",
          }}
        >
          SkillKwiz
        </span>
        <span
          className="font-medium tracking-wide whitespace-nowrap"
          style={{
            fontFamily: "'Nunito', 'Segoe UI', sans-serif",
            color: "#e8d0ea",
            fontSize: "0.6rem",
            lineHeight: 1.3,
            letterSpacing: "0.03em",
          }}
        >
          How much do you know?
        </span>
      </div>
    </div>
  );
}

export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="w-full fixed top-0 left-0 z-50">
      <nav className="w-full md:w-4/5 lg:w-3/5 xl:w-1/2 mx-auto bg-[#335f92] text-white rounded-b-3xl">

        {/* ── Desktop row ── */}
        <div className="hidden md:flex items-center justify-between h-[76px] px-6">
          {/* Logo — left */}
          <Link
            href="/"
            onClick={closeMenu}
            className="flex items-center shrink-0"
            aria-label="SkillKwiz home"
          >
            <LogoBrand iconSize={44} />
          </Link>

          {/* Nav links — right */}
          <div className="flex items-center">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`relative group px-4 py-1 text-sm font-medium whitespace-nowrap transition-colors ${
                  pathname === href
                    ? "text-yellow-400"
                    : "text-white hover:text-yellow-300"
                }`}
              >
                {label}
                <span className="absolute left-0 -bottom-0.5 w-full h-0.5 bg-gradient-to-r from-blue-400 to-yellow-400 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            ))}
          </div>
        </div>

        {/* ── Mobile row ── */}
        <div className="flex md:hidden items-center justify-between h-[72px] px-5">
          {/* Logo — left */}
          <Link
            href="/"
            onClick={closeMenu}
            aria-label="SkillKwiz home"
            className="flex items-center shrink-0"
          >
            <LogoBrand iconSize={38} />
          </Link>

          {/* Hamburger — right */}
          <button
            className="text-white focus:outline-none"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* ── Mobile overlay menu ── */}
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40 bg-black/20"
              onClick={closeMenu}
              aria-hidden="true"
            />
            {/* Panel */}
            <div className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center pt-20 pb-6 bg-[#335f92] rounded-b-3xl shadow-xl">
              <button
                className="absolute top-4 right-5 text-white"
                onClick={closeMenu}
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Logo in overlay */}
              <Link href="/" onClick={closeMenu} className="mb-4">
                <LogoBrand iconSize={38} />
              </Link>

              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={closeMenu}
                  className={`w-full py-3 text-center text-base font-medium transition-colors ${
                    pathname === href ? "text-yellow-400" : "text-white"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </>
        )}
      </nav>
    </div>
  );
}
