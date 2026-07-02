"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function AuthenticateSkillsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`py-6 md:py-8 bg-white transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8 lg:gap-12">
          {/* Left side stacked images */}
          <div className="relative w-full h-[220px] md:h-[280px]">
            <div className="absolute top-0 left-0 w-[80%] h-[80%] transform -rotate-12 hover:-rotate-6 transition-transform duration-300 z-10">
              <Image
                src="/images/homepage/skills_1.png"
                alt="Professional working at night"
                width={350}
                height={500}
                className="rounded-lg object-cover w-full h-full"
              />
            </div>
            <div className="absolute bottom-0 left-[10%] w-[80%] h-[80%] transform -rotate-6 hover:rotate-0 transition-transform duration-300">
              <Image
                src="/images/homepage/skills_2.png"
                alt="Professional in tech environment"
                width={350}
                height={500}
                className="rounded-lg object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Center content */}
          <div className="w-full text-center py-4 md:py-0 z-20">
            <h2 className="text-2xl font-bold text-[#00418d] mb-3">
              Authenticate Skills,
              <br />
              Simplify Hiring
            </h2>
            <p className="text-gray-700 text-sm">
              SkillKwiz ensures professionals are evaluated accurately in their
              chosen fields. Our secure testing centers provide authenticated
              skill assessments, giving you instant access to verified
              reports—eliminating the need for lengthy technical interviews.
            </p>
          </div>

          {/* Right side stacked images */}
          <div className="relative w-full h-[220px] md:h-[280px]">
            <div className="absolute top-0 right-0 w-[80%] h-[80%] transform rotate-12 hover:rotate-6 transition-transform duration-300 z-10">
              <Image
                src="/images/homepage/skills_3.png"
                alt="Professional at workstation"
                width={350}
                height={500}
                className="rounded-lg object-cover w-full h-full"
              />
            </div>
            <div className="absolute bottom-0 right-[10%] w-[80%] h-[80%] transform rotate-6 hover:rotate-0 transition-transform duration-300">
              <Image
                src="/images/homepage/skills_4.png"
                alt="Business professional looking at digital interface"
                width={350}
                height={500}
                className="rounded-lg object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
