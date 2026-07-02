"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function HomePageClient() {
  const [isCallCenterVisible, setIsCallCenterVisible] = useState(false);
  const callCenterRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      threshold: 0.2,
      rootMargin: "-100px",
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.target === callCenterRef.current) {
          setIsCallCenterVisible(entry.isIntersecting);
        }
      });
    };

    const observer = new IntersectionObserver(
      handleIntersection,
      observerOptions
    );

    if (callCenterRef.current) {
      observer.observe(callCenterRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="relative">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative w-full text-white overflow-hidden pt-16 lg:pt-20"
      >
        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/images/homepage/banner_video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/20 z-[1]" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-6 lg:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-3">
                Assessments in Secure Centers
              </h1>

              <p className="text-base lg:text-lg max-w-lg mb-6">
                Interactive, fun, and personalized learning designed to boost
                your knowledge effortlessly.
              </p>

              <Link
                href="/services"
                className="inline-flex items-center justify-center bg-[#f73e5d] text-white px-8 py-3 rounded-full font-medium hover:bg-opacity-90 transition-all"
              >
                Get Started
              </Link>
            </div>

            {/* Right Globe */}
            <div className="flex justify-center lg:justify-end items-center">
              <Image
                src="/images/homepage/home_globe.gif"
                alt="SkillKwiz assessment platform"
                width={420}
                height={300}
                priority
                className="w-full max-w-sm lg:max-w-md h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Call Center Image */}
      <div
        ref={callCenterRef}
        className={`relative w-full transition-all duration-1000 ${
          isCallCenterVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <Image
          src="/images/homepage/call-center.png"
          alt="Call center agents with headsets"
          width={1920}
          height={980}
          className="w-full h-auto object-cover"
        />
      </div>
    </div>
  );
}