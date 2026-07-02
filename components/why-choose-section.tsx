"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function WhyChooseSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`py-8 md:py-12 text-white bg-[#000c2a] relative overflow-hidden transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {/* Background banners */}
      <div className="absolute inset-0 flex">
        <div className="w-full relative">
          <div className="absolute top-0 left-0 right-0 h-[40%]">
            <img
              src="/images/homepage/why_choose_banner_2.png"
              alt=""
              className="w-full h-full object-cover"
              aria-hidden="true"
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-[40%]">
            <img
              src="/images/homepage/why_choose_banner_2.png"
              alt=""
              className="w-full h-full object-cover"
              aria-hidden="true"
            />
            <div className="absolute inset-0 flex justify-center items-center opacity-60">
              <img
                src="/images/homepage/home_globe.gif"
                alt=""
                className="w-full max-w-2xl"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <h2 className="text-2xl font-bold text-center mb-2">
          Why Choose{" "}
          <span className="text-white">
            Skill<span className="text-[#f73e5d]">Kwiz</span>
          </span>{" "}
          ?
        </h2>
        <p className="text-center max-w-3xl mx-auto mb-8 text-sm">
          Discover our unique value propositions designed to enhance your
          recruitment strategy.
          <br />
          Experience the difference SkillKwiz can make in your organization.
        </p>

        {/*
          Cards: rotated via Tailwind classes (not inline style) so hover
          effects actually work. Container uses min-h to avoid clipping.
        */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-5 mb-6 relative min-h-[320px] md:min-h-[350px]">
          {/* Skill Library Card — Tilted Left */}
          <div className="-rotate-6 md:absolute md:left-[calc(50%-320px)] md:top-4 bg-white rounded-lg p-5 text-black w-full max-w-xs md:w-56 hover:-translate-y-3 hover:rotate-0 transition-all duration-300 shadow-lg z-10">
            <div className="flex justify-center mb-3">
              <div className="w-14 h-14 bg-[#c3dfff] rounded-full flex items-center justify-center overflow-hidden">
                <img
                  src="/images/homepage/books.gif"
                  alt=""
                  className="w-20 h-20 object-cover"
                  aria-hidden="true"
                />
              </div>
            </div>
            <h3 className="text-[#00418d] text-lg font-bold text-center mb-2">
              Skill Library
            </h3>
            <p className="text-gray-700 text-center text-xs">
              Access our extensive library of skill assessments covering
              technical, professional, and soft skills for comprehensive
              candidate evaluation.
            </p>
          </div>

          {/* Secure Testing Card — Center */}
          <div className="md:absolute md:left-[calc(50%-112px)] md:top-0 bg-white rounded-lg p-5 text-black w-full max-w-xs md:w-56 hover:-translate-y-3 transition-all duration-300 shadow-xl z-20">
            <div className="flex justify-center mb-3">
              <div className="w-14 h-14 bg-[#c3dfff] rounded-full flex items-center justify-center overflow-hidden">
                <img
                  src="/images/homepage/guard.gif"
                  alt=""
                  className="w-20 h-20 object-cover"
                  aria-hidden="true"
                />
              </div>
            </div>
            <h3 className="text-[#00418d] text-lg font-bold text-center mb-2">
              Secure Testing
            </h3>
            <p className="text-gray-700 text-center text-xs">
              Our testing is done in secure content-aware environments.
              Candidates are authenticated through multiple identification
              layers including biometric verification such as facial
              recognition, security numbers, which are then periodically
              validated throughout the test.
            </p>
          </div>

          {/* Flexible Pricing Card — Tilted Right */}
          <div className="rotate-6 md:absolute md:right-[calc(50%-320px)] md:top-4 bg-white rounded-lg p-5 text-black w-full max-w-xs md:w-56 hover:-translate-y-3 hover:rotate-0 transition-all duration-300 shadow-lg z-10">
            <div className="flex justify-center mb-3">
              <div className="w-14 h-14 bg-[#c3dfff] rounded-full flex items-center justify-center overflow-hidden">
                <img
                  src="/images/homepage/dollar.gif"
                  alt=""
                  className="w-20 h-20 object-cover"
                  aria-hidden="true"
                />
              </div>
            </div>
            <h3 className="text-[#00418d] text-lg font-bold text-center mb-2">
              Flexible Pricing
            </h3>
            <p className="text-gray-700 text-center text-xs">
              Our pricing model is designed to scale with your needs. Pay only
              for what you use with our credit-based system. Larger
              organizations can benefit from our Enterprise plan with unlimited
              testing and custom features.
            </p>
          </div>
        </div>

        <div className="text-center mt-4 relative z-20">
          <h3 className="text-xl font-bold mb-2">Join the Talent Revolution</h3>
          <p className="max-w-2xl mx-auto mb-4 text-sm">
            Take the first step towards transforming your hiring process. Make
            selections in line with our tried and tested platform.
          </p>
          <Link
            href="/services"
            className="inline-flex items-center justify-center bg-[#f7d03e] text-black px-8 py-3 rounded-md font-medium hover:bg-[#f6c000] transition-colors"
          >
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
}
