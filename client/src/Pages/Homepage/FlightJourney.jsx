import React, { useEffect, useRef } from "react";
import { FaMoneyBillWave, FaPlaneDeparture } from "react-icons/fa";
import { MdGavel } from "react-icons/md";
import { AiOutlineCheckCircle } from "react-icons/ai";

const FlightJourney = () => {
  const planeRef = useRef(null);
  const pathRef = useRef(null);

  useEffect(() => {
    const path = pathRef.current;
    const plane = planeRef.current;

    if (!path || !plane) return;

    const totalLength = path.getTotalLength();

    const handleScroll = () => {
      const rect = path.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      let progress = (windowHeight - rect.top) / (windowHeight + rect.height);
      progress = Math.min(Math.max(progress, 0), 1);

      const point = path.getPointAtLength(progress * totalLength);
      const nextPoint = path.getPointAtLength(Math.min(progress * totalLength + 1, totalLength));

      const dx = nextPoint.x - point.x;
      const dy = nextPoint.y - point.y;
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);

      plane.style.transform = `translate(${point.x}px, ${point.y}px) rotate(${angle}deg)`;
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative w-full py-12 sm:py-24 bg-transparent overflow-visible">
      {/* WAVE PATH */}
      <svg
        className="absolute top-20 sm:top-32 left-0 w-full z-0"
        viewBox="0 0 1440 120"
        fill="none"
      >
        <path
          ref={pathRef}
          d="M0 60 C 240 0 480 120 720 60 960 0 1200 120 1440 60"
          stroke="#fb923c"
          strokeWidth="3"
          strokeDasharray="6 10"
        />
      </svg>

      {/* PLANE */}
      <FaPlaneDeparture
        ref={planeRef}
        className="absolute text-orange-500 top-10 sm:top-16 text-4xl sm:text-5xl z-50"
        style={{ transform: "translate(0px,0px) rotate(0deg)" }}
      />

      {/* CONTENT */}
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center z-10 mt-24 sm:mt-32">
        {/* LEFT */}
        <div className="space-y-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900">
            Your Claim Moves in{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-500">
              Smooth Waves
            </span>
          </h2>

          <p className="text-gray-600 text-base sm:text-lg max-w-xl">
            Experience a frictionless compensation journey — from takeoff to payout.
          </p>

          <div className="space-y-4">
            {[
              { icon: <FaPlaneDeparture />, text: "Submit flight details" },
              { icon: <MdGavel />, text: "Legal handling by experts" },
              { icon: <AiOutlineCheckCircle />, text: "Airline approval" },
              { icon: <FaMoneyBillWave />, text: "Get compensated" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-3 sm:p-4 bg-white/80 backdrop-blur rounded-2xl shadow hover:shadow-lg transition"
              >
                <div className="text-orange-500 text-xl sm:text-2xl">{item.icon}</div>
                <span className="text-gray-800 font-medium text-sm sm:text-base">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT INFO CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {[
            { title: "Fast Process", desc: "No paperwork", icon: <AiOutlineCheckCircle /> },
            { title: "Legal Experts", desc: "Handled end-to-end", icon: <MdGavel /> },
            { title: "No Win, No Fee", desc: "Zero risk", icon: <FaMoneyBillWave /> },
            { title: "Global Coverage", desc: "All airlines", icon: <FaPlaneDeparture /> },
          ].map((card, i) => (
            <div
              key={i}
              className="bg-white/90 p-4 sm:p-6 rounded-3xl shadow-lg hover:-translate-y-2 transition"
            >
              <div className="text-orange-500 text-2xl sm:text-3xl mb-2">{card.icon}</div>
              <h3 className="font-semibold text-gray-900 text-base sm:text-lg">{card.title}</h3>
              <p className="text-xs sm:text-sm text-gray-600">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FlightJourney;
