"use client";

import { useState, useEffect, useRef } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: "Jennifer Cooper",
    title: "Startup Founder, TechFlow",
    quote:
      "SkillKwiz has transformed our hiring process. We've reduced our time-to-hire by 40% and improved candidate quality significantly. The detailed skill reports give us confidence in every hiring decision.",
    image: "/images/homepage/5.png",
  },
  {
    id: 2,
    name: "Michael Donovan",
    title: "HR Director, Global Systems",
    quote:
      "As an enterprise with hundreds of technical hires annually, SkillKwiz has been invaluable. Their comprehensive skill assessments and secure testing environment ensure we get accurate insights into candidate capabilities.",
    image: "/images/homepage/6.png",
  },
  {
    id: 3,
    name: "Sarah Johnson",
    title: "Talent Acquisition, InnovateTech",
    quote:
      "The flexibility of SkillKwiz's platform is what sets it apart. We can customize assessments to our specific needs, and the detailed reports help us make data-driven hiring decisions every time.",
    image: "/images/homepage/6.png",
  },
  {
    id: 4,
    name: "David Chen",
    title: "CTO, FutureTech Solutions",
    quote:
      "The technical assessments from SkillKwiz have been spot-on. We're able to quickly identify candidates with the right skills, saving our engineering team countless hours of interview time.",
    image: "/images/homepage/5.png",
  },
  {
    id: 5,
    name: "Emily Rodriguez",
    title: "Recruiting Manager, Innovate Inc",
    quote:
      "SkillKwiz has become an essential part of our hiring toolkit. The platform is intuitive, the assessments are comprehensive, and the customer support is exceptional.",
    image: "/images/homepage/7.png",
  },
];

export default function TestimonialsSection() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const [activeIndex, setActiveIndex] = useState(0);

  const [visibleTestimonials, setVisibleTestimonials] = useState(() => {
    const totalTestimonials = testimonials.length;
    const initialIndex = 0;
    const prevIndex =
      (initialIndex - 1 + totalTestimonials) % totalTestimonials;
    const nextIndex = (initialIndex + 1) % totalTestimonials;
    return [
      testimonials[prevIndex],
      testimonials[initialIndex],
      testimonials[nextIndex],
    ];
  });

  // Update the 3 visible testimonials whenever the active index changes
  useEffect(() => {
    const totalTestimonials = testimonials.length;
    const prevIndex = (activeIndex - 1 + totalTestimonials) % totalTestimonials;
    const nextIndex = (activeIndex + 1) % totalTestimonials;
    setVisibleTestimonials([
      testimonials[prevIndex],
      testimonials[activeIndex],
      testimonials[nextIndex],
    ]);
  }, [activeIndex]);

  // Stable auto-advance interval — runs once, reads activeIndex via ref
  const activeIndexRef = useRef(activeIndex);
  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToPrev = () => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  if (!isMounted) {
    return (
      <section className="py-8 md:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center mb-5">
            What Our Clients Say
          </h2>
          <div className="relative h-[320px] md:h-[280px]"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-center mb-5">
          What Our Clients Say
        </h2>

        <div className="relative">
          {/* Navigation buttons */}
          <button
            onClick={goToPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none hidden md:block"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-[#00418d]" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none hidden md:block"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-[#00418d]" />
          </button>

          {/* Testimonial carousel */}
          <div className="flex justify-center items-stretch gap-4 mb-6 overflow-hidden px-4 h-[320px] md:h-[280px] pb-2">
            {visibleTestimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`
                  bg-[#00418d] rounded-lg text-white transition-all duration-500 flex flex-col justify-start h-full
                  ${
                    index === 1
                      ? "w-full md:w-[50%] p-5 z-20 shadow-lg"
                      : "w-0 md:w-[25%] p-4 opacity-70 z-10 shadow-md"
                  }
                `}
              >
                <div className="flex flex-col items-center mb-3">
                  <div
                    className={`rounded-full overflow-hidden mb-2 border-2 border-white
                      ${index === 1 ? "w-14 h-14" : "w-10 h-10"}
                    `}
                  >
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={index === 1 ? 56 : 40}
                      height={index === 1 ? 56 : 40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3
                    className={`font-bold ${
                      index === 1 ? "text-lg" : "text-sm"
                    }`}
                  >
                    {testimonial.name}
                  </h3>
                  <p
                    className={`${
                      index === 1 ? "text-sm" : "text-xs"
                    } text-gray-200`}
                  >
                    {testimonial.title}
                  </p>
                  <div className="flex mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`fill-[#f6c648] text-[#f6c648] ${
                          index === 1 ? "w-4 h-4" : "w-3 h-3"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p
                  className={`text-center ${
                    index === 1 ? "text-sm" : "text-xs"
                  }`}
                >
                  "{testimonial.quote}"
                </p>
              </div>
            ))}
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === activeIndex ? "bg-[#00418d]" : "bg-gray-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
