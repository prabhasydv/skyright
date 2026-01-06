import React from "react";
import AirportSelect from "../../Components/AirportSelect";
import { Link, useNavigate } from "react-router-dom";


const Banner = () => {

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    // 👉 do your form logic / validation here

    navigate("/check-compensation");
  };

  return (
    <section className="w-full mt-20 py-4">

      {/* Decorative Floating Shapes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {/* Big circle */}
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-orange-100 opacity-40 animate-pulse-slow"></div>
        {/* Small circle */}
        <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-orange-200 opacity-30 animate-bounce-slow"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center z-10">

        {/* LEFT CONTENT */}
        <div className="space-y-6 mt-10">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-orange-100 text-orange-600 text-sm font-semibold shadow-md">
            ✈️ Flight Compensation
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-snug animate-fade-in">
  Claim Your{" "}
  <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-500 animate-text-gradient">
    Flight Compensation
  </span>
  <br />
  <span className="inline-block mt-2">Hassle-Free</span>
</h1>


          <p className="text-gray-600 text-lg max-w-xl">
            Flight delayed, canceled, or overbooked? Check your eligibility in seconds and let us handle the rest.
          </p>

          {/* Plane Icons */}
          <div className="flex items-center gap-6 opacity-90 mt-4">
            <svg
              className="w-10 h-10 text-orange-400 animate-fly-left"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9L2 14v2l8-2.5V19l-2 1.5V22l3-1 3 1v-1.5L13 19v-5.5l8 2.5z" />
            </svg>
            <div className="h-[2px] flex-1 bg-gradient-to-r from-orange-300 to-transparent rounded-full" />
            <svg
              className="w-10 h-10 text-orange-400 rotate-180 animate-fly-right"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9L2 14v2l8-2.5V19l-2 1.5V22l3-1 3 1v-1.5L13 19v-5.5l8 2.5z" />
            </svg>
          </div>
        </div>

                {/* RIGHT FORM */}
                <div className="bg-white/90 backdrop-blur-md border border-orange-200 rounded-3xl p-8 md:p-10 shadow-xl mt-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Check Compensation
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
      <AirportSelect
        label="Departure Airport"
        placeholder="Search airport or IATA (DEL)"
        onSelect={(a) => console.log("FROM:", a)}
      />

      <AirportSelect
        label="Destination Airport"
        placeholder="Search airport or IATA (LHR)"
        onSelect={(a) => console.log("TO:", a)}
      />

      <button
        type="submit"
        className="w-full py-4 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold text-lg hover:scale-105 transition shadow-lg"
      >
        Check Eligibility →
      </button>
    </form>
        </div>

      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes fly-left {
          0% { transform: translateX(0) translateY(0); }
          50% { transform: translateX(-20px) translateY(-10px); }
          100% { transform: translateX(0) translateY(0); }
        }
        @keyframes fly-right {
          0% { transform: translateX(0) translateY(0); }
          50% { transform: translateX(20px) translateY(-10px); }
          100% { transform: translateX(0) translateY(0); }
        }
        .animate-fly-left { animation: fly-left 4s ease-in-out infinite; }
        .animate-fly-right { animation: fly-right 4s ease-in-out infinite; }
        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 1s ease forwards; }
        @keyframes text-gradient { 0%,100%{ background-position:0% 50% } 50%{ background-position:100% 50% } }
        .animate-text-gradient { background-size: 200% 200%; animation: text-gradient 4s ease infinite; }
        .animate-pulse-slow { animation: pulse 6s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce 6s infinite; }
      `}</style>
    </section>
  );
};

export default Banner;



