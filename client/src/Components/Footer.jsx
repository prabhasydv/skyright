import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo2.png";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-orange-50 via-white to-orange-100 border-t border-orange-200">
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* TOP */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* BRAND */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <img
                src={logo}
                alt="SkyRight"
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed">
              SkyRight helps air passengers claim compensation for flight
              delays, cancellations, and denied boarding — no upfront fees.
            </p>
          </div>

          {/* COMPANY */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">
              Company
            </h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <Link to="/about-us" className="hover:text-orange-500 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-orange-500 transition">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="hover:text-orange-500 transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" className="hover:text-orange-500 transition">
                  Terms & conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-orange-500 transition">
                  Privacy policy
                </Link>
              </li>
            </ul>
          </div>

          {/* PASSENGER RIGHTS */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">
              Passenger Rights
            </h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="hover:text-orange-500 transition cursor-pointer">
                <Link to="/flight-delay">
                Flight Delay
                </Link>
              </li>
              <li className="hover:text-orange-500 transition cursor-pointer">
                <Link to="/flight-cancellation">
                Flight Cancellation
                </Link>
              </li>
              <li className="hover:text-orange-500 transition cursor-pointer">
                <Link to="/denied-boarding">
                Denied Boarding
                </Link>
              </li>
              {/* <li className="hover:text-orange-500 transition cursor-pointer">
                Missed Connection
              </li> */}
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">
              Stay Updated
            </h4>
            <p className="text-sm text-gray-600 mb-4">
              Travel rights tips and compensation updates.
            </p>
            <div className="flex rounded-full overflow-hidden border border-orange-200 bg-white">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-3 text-sm focus:outline-none"
              />
              <button className="px-6 py-3 bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 transition">
                Subscribe
              </button>
            </div>
          </div>

        </div>

        {/* DIVIDER */}
        <div className="my-10 h-px bg-orange-200/60" />

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} SkyRight. All rights reserved.
          </p>

          <div className="flex items-center gap-2 text-orange-400">
            <span className="text-lg">✈️</span>
            <span className="opacity-70">Protecting passenger rights</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
