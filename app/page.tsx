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
  const [isCallCenterVisible, setIsCallCenterVisible] = useState(false);
  const [videoSrc, setVideoSrc] = useState("");
  const callCenterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Defer loading the large background video to optimize client-side navigation
    setVideoSrc("/images/homepage/banner_video.mp4");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsCallCenterVisible(true);
          observer.disconnect();
        }
      },
      {
        // Generous margin so it triggers before the user has to scroll all the way
        threshold: 0.05,
        rootMargin: "0px",
      }
    );

    if (callCenterRef.current) {
      observer.observe(callCenterRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="relative">
        {/* ─── Hero Section ─── */}
        <section className="relative w-full text-white overflow-hidden pt-14 md:pt-18">
          {/* Background Video */}
          <video
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
            autoPlay
            muted
            loop
            playsInline
          >
            {videoSrc && <source src={videoSrc} type="video/mp4" />}
          </video>

          <div className="max-w-7xl mx-auto px-6 py-7 md:py-9 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
              {/* Text */}
              <div className="-mt-1 md:-mt-2">
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 leading-tight">
                  Assessments in Secure Centers
                </h1>
                <p className="text-sm md:text-base mb-3 max-w-md opacity-90">
                  Interactive, fun, and personalized learning designed to boost
                  your knowledge effortlessly.
                </p>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center bg-[#f73e5d] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#e02d4c] transition-colors"
                >
                  Get Started
                </Link>
              </div>

              {/* Globe */}
              <div className="flex justify-center items-center">
                <Image
                  src="/images/homepage/home_globe.gif"
                  alt="SkillKwiz assessment platform"
                  width={400}
                  height={280}
                  className="w-full max-w-[110px] md:max-w-[150px] lg:max-w-[170px] h-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* ─── Call Center Image ─── */}
        <div
          ref={callCenterRef}
          className={`relative w-full transition-all duration-1000 ${
            isCallCenterVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <Image
            src="/images/homepage/call-center.png"
            alt="Call center agents with headsets"
            width={1920}
            height={980}
            className="w-full h-auto max-h-[350px] object-cover"
          />
        </div>

        {/* ─── SkillKwiz Tag ─── */}
        <div className="relative mt-4 overflow-x-hidden">
          <div className="bg-[#f6c648] text-[#00418d] py-3 px-5 inline-block transform skew-x-12 ml-0">
            <div className="transform -skew-x-12">
              <h2 className="text-lg font-bold">
                SkillKwiz – Verified Skills, Simplified Hiring
              </h2>
            </div>
          </div>

          {/* Letter Carousel */}
          <div className="mt-4 mb-4">
            <LetterCarousel />
          </div>
        </div>
      </div>

      {/* ─── Rest of page ─── */}
      <div className="bg-white relative">
        <AuthenticateSkillsSection />
        <WhyChooseSection />
        <TestimonialsSection />
        <LoginSection />
      </div>
    </div>
  );
}
