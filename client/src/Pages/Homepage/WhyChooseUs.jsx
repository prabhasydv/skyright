import React from "react";
import { FaGlobe, FaUserShield, FaBolt, FaHandsHelping } from "react-icons/fa";

const WhyChooseUs = () => {
  return (
    <section className="relative w-full pt-12 pb-20 md:pt-16 md:pb-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HEADING */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Why Travelers{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-500">
              Choose Us
            </span>
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            We handle everything — so you can relax while we fight for your compensation.
          </p>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <FaBolt />,
              title: "Fast & Simple",
              desc: "Submit your claim in minutes",
            },
            {
              icon: <FaUserShield />,
              title: "No Win, No Fee",
              desc: "Zero risk for passengers",
            },
            {
              icon: <FaHandsHelping />,
              title: "Legal Experts",
              desc: "Handled by aviation specialists",
            },
            {
              icon: <FaGlobe />,
              title: "Global Coverage",
              desc: "All airlines & airports worldwide",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="group bg-white/90 backdrop-blur p-6 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="text-orange-500 text-3xl mb-4 group-hover:scale-110 transition">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
