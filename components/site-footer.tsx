import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#003b8e] text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Us Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-sm mb-4">
              SkillKwiz is at the forefront of transforming recruitment with
              innovative assessment solutions and best-in-class support.
            </p>
            <div className="text-sm flex gap-3">
              <Link href="/contact" className="hover:text-yellow-300 hover:underline transition-colors">
                Contact
              </Link>
              <span>|</span>
              <Link href="/sales" className="hover:text-yellow-300 hover:underline transition-colors">
                Sales
              </Link>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-yellow-300 hover:underline transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-yellow-300 hover:underline transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-yellow-300 hover:underline transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <a
                  href="/files/sample-resource.pdf"
                  download="sample-resource.pdf"
                  className="hover:text-yellow-300 hover:underline transition-colors"
                >
                  Resources
                </a>
              </li>
              <li>
                <Link href="/blog" className="hover:text-yellow-300 hover:underline transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-2 text-sm">
              <p>
                <span className="block">Address: 5th Block,</span>
                <span className="block">Jayanagar, Bangalore 560041</span>
              </p>
              <p>
                Email:{" "}
                <a
                  href="mailto:info@skillkwiz.com"
                  className="hover:text-yellow-300 hover:underline transition-colors"
                >
                  info@skillkwiz.com
                </a>
              </p>
              <p>
                Phone:{" "}
                <a
                  href="tel:+919740377330"
                  className="hover:text-yellow-300 hover:underline transition-colors"
                >
                  +91-9740377330
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-blue-700">
        <div className="max-w-7xl mx-auto px-6 py-4 text-sm text-center text-blue-200">
          Copyright © 2025 SkillKwiz. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
