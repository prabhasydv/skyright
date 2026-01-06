import React from "react";
import {
    FaPlaneSlash,
    FaClock,
    FaSuitcaseRolling,
    FaBan,
} from "react-icons/fa";

const FlightProblems = () => {
    return (
        <section className="relative w-full pb-20 md:pt-16 md:pb-24 bg-transparent">
            <div className="max-w-7xl mx-auto px-6">
                {/* HEADING */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                        We Solve More{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-500">
                            Flight Problems
                        </span>
                    </h2>
                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                        Flight disruptions don’t end at delays. We help you claim
                        compensation for a wide range of airline issues.
                    </p>
                </div>

                {/* PROBLEM CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        {
                            icon: <FaPlaneSlash />,
                            title: "Flight Cancellation",
                            desc: "Sudden cancellations? You may be eligible for compensation.",
                        },
                        {
                            icon: <FaClock />,
                            title: "Long Delays",
                            desc: "Delayed more than 3 hours? Don’t let airlines ignore you.",
                        },
                        {
                            icon: <FaSuitcaseRolling />,
                            title: "Lost or Damaged Baggage",
                            desc: "Missing or damaged luggage? We help recover your loss.",
                        },
                        {
                            icon: <FaBan />,
                            title: "Denied Boarding",
                            desc: "Overbooked flight? Claim what you’re legally owed.",
                        },
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="group relative bg-white/90 backdrop-blur p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-3"
                        >
                            {/* ICON */}
                            <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-orange-100 text-orange-500 text-2xl mb-6 group-hover:scale-110 transition">
                                {item.icon}
                            </div>

                            {/* TEXT */}
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                {item.title}
                            </h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                {item.desc}
                            </p>

                            {/* HOVER LINE */}
                            <span className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-orange-500 to-red-500 group-hover:w-full transition-all duration-300 rounded-b-3xl"></span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FlightProblems;
