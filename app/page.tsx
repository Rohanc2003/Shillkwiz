"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import AuthenticateSkillsSection from "@/components/authenticate-skills-section";
import WhyChooseSection from "@/components/why-choose-section";
import LoginSection from "@/components/login-section";
import TestimonialsSection from "@/components/testimonials-section";
import LetterCarousel from "@/components/letter-carousel";

export default function HomePage() {
  const [scrollStage, setScrollStage] = useState(0);
  const [isCallCenterVisible, setIsCallCenterVisible] = useState(false);
  const globeRef = useRef<HTMLDivElement>(null);
  const callCenterRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY < 100) {
        setScrollStage(0);
      } else if (scrollY < 400) {
        setScrollStage(1);
      } else {
        setScrollStage(2);
      }
    };

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

    window.addEventListener("scroll", handleScroll);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Main container with relative positioning */}
      <div className="relative">
        {/* Video Section at the top */}
        <section
          ref={heroRef}
          className="relative w-full h-[80vh] text-white overflow-hidden"
          style={{ zIndex: 1 }}
        >
          {/* Background Video */}
          <video
            className="absolute top-0 left-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/images/homepage/banner_video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className="max-w-7xl mx-auto px-6 py-8 relative z-10 h-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Assessments in Secure Centers
                </h1>
                {/* <p className="text-lg mb-8">
                  Interactive, fun, and personalized learning designed to boost
                  your knowledge effortlessly.
                </p> */}
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center bg-[#f73e5d] text-white px-8 py-3 rounded-full font-medium hover:bg-opacity-90 transition-all"
                >
                  Get Started
                </Link>
              </div>

              {/* Globe Image positioned to the right of the text */}
              <div ref={globeRef} className="flex justify-center items-center">
                <Image
                  src="/images/homepage/home_globe.gif"
                  alt="SkillKwiz assessment platform"
                  width={600}
                  height={400}
                  className="w-full max-w-md h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Call Center Image - Overlapping the video from top and bottom */}
        <div
          ref={callCenterRef}
          className="absolute w-full h-[60vh]"
          style={{
            top: "50vh",
            zIndex: 2,
          }}
        >
          <Image
            src="/images/homepage/call-center.png"
            alt="Call center agents with headsets"
            width={1920}
            height={980}
            className="w-[100vw] h-auto object-cover"
          />
        </div>

        {/* SkillKwiz Tag - Positioned below the call center image */}
        <div className="relative mt-[65vh]" style={{ zIndex: 3 }}>
          <div className="bg-[#f6c648] text-[#00418d] py-4 px-6 inline-block transform skew-x-12 -ml-4">
            <div className="transform -skew-x-12">
              <h2 className="text-xl font-bold">
                SkillKwiz – Verified Skills, Simplified Hiring
              </h2>
            </div>
          </div>

          {/* Letter Carousel - Added right after the SkillKwiz tag */}
          <div className="mt-8 mb-12">
            <LetterCarousel />
          </div>
        </div>
      </div>

      {/* Rest of the content */}
      <div className="bg-white relative" style={{ zIndex: 3 }}>
        <AuthenticateSkillsSection />
        <WhyChooseSection />
        <TestimonialsSection />
        <LoginSection />
      </div>
    </div>
  );
}
