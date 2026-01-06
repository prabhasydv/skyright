import React from "react";

const AboutUs = () => {
  return (
    <section className="pt-32 pb-24 px-4 bg-gradient-to-br from-orange-50 via-white to-orange-100 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-24">

        {/* HERO */}
        <div className="text-center space-y-6">
          <span className="inline-block px-4 py-1 rounded-full bg-orange-100 text-orange-600 text-sm font-semibold">
            About Us
          </span>

          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            SkyRight
          </h1>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We help air passengers claim the compensation they are legally
            entitled to — without stress, without upfront costs, and without
            dealing with airlines yourself.
          </p>
        </div>

        {/* MISSION */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <h2 className="text-3xl font-bold text-gray-900">
              Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Flight disruptions are frustrating. Airlines often ignore or
              delay compensation requests — even when passengers are protected
              by law.
              <br /><br />
              SkyRight exists to level the playing field. We combine legal
              expertise and technology to fight airlines on your behalf and
              secure the compensation you deserve.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-10 shadow-sm border border-orange-100">
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-center gap-3">
                <span className="text-orange-500 font-bold">✓</span>
                Passenger-first approach
              </li>
              <li className="flex items-center gap-3">
                <span className="text-orange-500 font-bold">✓</span>
                EU Regulation EC261 expertise
              </li>
              <li className="flex items-center gap-3">
                <span className="text-orange-500 font-bold">✓</span>
                Transparent & secure process
              </li>
            </ul>
          </div>
        </div>

        {/* HOW IT WORKS */}
        <div className="space-y-10">
          <h2 className="text-3xl font-bold text-center text-gray-900">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Submit Your Claim",
                text: "Share your flight details in just a few minutes."
              },
              {
                title: "We Handle the Airline",
                text: "Our experts manage communication and legal steps."
              },
              {
                title: "Receive Compensation",
                text: "If we win, you get paid. No win, no fee."
              }
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition border border-orange-100"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold mb-5">
                  {i + 1}
                </div>

                <h3 className="text-xl font-semibold mb-3">
                  {item.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* TRUST */}
        <div className="bg-white rounded-3xl p-12 shadow-sm border border-orange-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Why Passengers Trust SkyRight
          </h2>

          <div className="grid sm:grid-cols-2 gap-6 text-gray-600 max-w-4xl mx-auto">
            <div>✔ No upfront fees — pay only if you win</div>
            <div>✔ Experienced legal & aviation experts</div>
            <div>✔ Secure document handling</div>
            <div>✔ Thousands of successful claims</div>
          </div>
        </div>

        {/* CTA */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500 to-red-500 text-white p-14 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to claim your compensation?
          </h2>

          <p className="opacity-90 mb-8 max-w-2xl mx-auto">
            Checking your eligibility takes only a few minutes and costs
            nothing.
          </p>

          <a
            href="/check-compensation"
            className="inline-block px-10 py-4 rounded-full bg-white text-orange-600 font-semibold hover:bg-orange-50 transition"
          >
            Start Your Claim →
          </a>
        </div>

      </div>
    </section>
  );
};

export default AboutUs;
