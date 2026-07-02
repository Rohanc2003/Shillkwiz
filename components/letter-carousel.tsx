"use client";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface CarouselSlide {
  letters: string[];
  title: string;
  description: string;
  backgroundImage: string;
}

export default function LetterCarousel() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const slides: CarouselSlide[] = [
    {
      letters: ["S", "K", "I", "L", "L"],
      title: "Skill Assessment",
      description: "Evaluate your knowledge with our comprehensive skill tests",
      backgroundImage: "/images/homepage/Carousel/Drivers License.jpg",
    },
    {
      letters: ["Q", "U", "I", "Z"],
      title: "Quiz Excellence",
      description: "Interactive quizzes designed by industry experts",
      backgroundImage: "/images/homepage/Carousel/Pick - Laptop.jpg",
    },
    {
      letters: ["L", "E", "A", "R", "N"],
      title: "Learning Journey",
      description: "Continuous improvement through personalized feedback",
      backgroundImage: "/images/homepage/Carousel/Secure Center.jpg",
    },
    {
      letters: ["H", "I", "R", "E"],
      title: "Hiring Simplified",
      description: "Connect verified skills with the right opportunities",
      backgroundImage: "/images/homepage/Carousel/Skill Library.jpg",
    },
  ];

  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  // Stable auto-advance — interval runs once, uses ref to avoid stale closure
  const nextSlideRef = useRef(nextSlide);
  useEffect(() => {
    nextSlideRef.current = nextSlide;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlideRef.current();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!isMounted) {
    return (
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative h-[240px] w-full rounded-xl bg-gray-200 shadow-lg"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="relative overflow-hidden rounded-xl bg-white shadow-lg">
        <div className="relative h-[240px] w-full">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full transition-all duration-500 ease-in-out ${
                index === currentSlide
                  ? "opacity-100 translate-x-0"
                  : index < currentSlide
                  ? "opacity-0 -translate-x-full"
                  : "opacity-0 translate-x-full"
              }`}
            >
              {/* Background Image with Overlay */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={slide.backgroundImage || "/placeholder.svg"}
                  alt={`${slide.title} background`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>
              </div>

              <div className="flex flex-col h-full relative z-10">
                {/* Letters row */}
                <div className="flex justify-center items-center py-5 gap-3">
                  {slide.letters.map((letter, letterIndex) => (
                    <div
                      key={letterIndex}
                      className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-gradient-to-br from-[#00418d] to-[#0066cc] text-white text-2xl md:text-3xl font-bold rounded-lg shadow-md transform hover:scale-110 transition-transform"
                    >
                      {letter}
                    </div>
                  ))}
                </div>

                {/* Content */}
                <div className="text-center px-6 py-2">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {slide.title}
                  </h3>
                  <p className="text-white/90 text-sm">{slide.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md z-10"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6 text-[#00418d]" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md z-10"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6 text-[#00418d]" />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                index === currentSlide ? "bg-[#f73e5d] w-8" : "bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
