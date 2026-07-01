"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function SignUpPage() {
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
      className={`py-16 bg-[#000c2a] transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="bg-white rounded-lg overflow-hidden shadow-xl flex flex-col md:flex-row">
          {/* Left side - Image */}
          <div className="w-full md:w-1/2 p-8 flex items-center justify-center">
            <Image
              src="/images/login-section.png" // Reusing the same image as login for consistency
              alt="Sign Up illustration"
              width={400}
              height={400}
              className="object-contain"
            />
          </div>

          {/* Right side - Sign Up Form */}
          <div className="w-full md:w-1/2 bg-[#00418d] p-8 flex items-center">
            <div className="w-full">
              <h2 className="text-xl font-bold text-white mb-6">
                Create Your SkillKwiz Account
              </h2>

              <form className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full bg-gray-200 text-gray-800 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00a8e8]"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full bg-gray-200 text-gray-800 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00a8e8]"
                  />
                </div>

                <div>
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full bg-gray-200 text-gray-800 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00a8e8]"
                  />
                </div>

                <div>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full bg-gray-200 text-gray-800 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00a8e8]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#f73e5d] text-white p-3 rounded-md font-medium hover:bg-opacity-90 transition-all"
                >
                  Sign Up
                </button>

                <div className="text-center text-white pt-4">
                  <p>
                    Already have an account?{" "}
                    <Link href="#" className="text-[#f6c648] hover:underline font-semibold">
                      Login
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
