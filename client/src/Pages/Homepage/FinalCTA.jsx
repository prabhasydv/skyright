import React from "react";
import { FaCheckCircle, FaLock, FaClock } from "react-icons/fa";
import { Link } from "react-router-dom";

const FinalCTA = () => {
  return (
    <section className="relative w-full pt-4 pb-20 bg-transparent">
      <div className="max-w-5xl mx-auto px-6">
        
        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-10 md:p-14 text-center shadow-lg">
          
          {/* HEADING */}
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Ready to{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-500">
              Claim Your Compensation?
            </span>
          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Check your eligibility in seconds. No paperwork, no risk, no upfront cost.
          </p>

          {/* TRUST POINTS */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-700">
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-orange-500" />
              <span>No Win, No Fee</span>
            </div>
            <div className="flex items-center gap-2">
              <FaLock className="text-orange-500" />
              <span>Secure & Confidential</span>
            </div>
            <div className="flex items-center gap-2">
              <FaClock className="text-orange-500" />
              <span>Takes Less Than 2 Minutes</span>
            </div>
          </div>

          {/* CTA BUTTON */}
          <div className="mt-10">
            <Link to="/check-compensation">
            <button
              className="px-10 py-4 text-lg font-semibold text-white rounded-full 
              bg-gradient-to-r from-orange-500 to-red-500 
              hover:shadow-xl hover:scale-105 transition"
            >
              Check Compensation
            </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
