import React from "react";

const FlightDelay = () => {
  return (
    <section className="pt-32 pb-24 px-4 bg-gradient-to-br from-orange-50 via-white to-orange-100 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-24">

        {/* HERO */}
        <div className="text-center space-y-6">
          <span className="inline-block px-4 py-1 rounded-full bg-orange-100 text-orange-600 text-sm font-semibold">
            Passenger Rights
          </span>

          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            Flight Delay Compensation
          </h1>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            If your flight was delayed, you may be legally entitled to financial
            compensation. SkyRight Legal helps passengers understand their
            rights and take action against airlines that fail to comply with
            the law.
          </p>
        </div>

        {/* WHAT IS A FLIGHT DELAY */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <h2 className="text-3xl font-bold text-gray-900">
              What Counts as a Flight Delay?
            </h2>

            <p className="text-gray-600 leading-relaxed">
              A flight delay occurs when an aircraft arrives at its final
              destination later than scheduled. Under European aviation law,
              delays of three hours or more may give passengers the right to
              compensation.
              <br /><br />
              The key factor is the arrival time — not the departure time.
              Even if your flight departed on time, a long arrival delay may
              still qualify.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-10 shadow-sm border border-orange-100">
            <ul className="space-y-4 text-gray-700">
              <li className="flex gap-3">
                <span className="text-orange-500 font-bold">✓</span>
                Arrival delay of 3 hours or more
              </li>
              <li className="flex gap-3">
                <span className="text-orange-500 font-bold">✓</span>
                Flight departed from or arrived in the EU
              </li>
              <li className="flex gap-3">
                <span className="text-orange-500 font-bold">✓</span>
                Airline responsible for the disruption
              </li>
            </ul>
          </div>
        </div>

        {/* COMPENSATION */}
        <div className="space-y-10">
          <h2 className="text-3xl font-bold text-center text-gray-900">
            How Much Compensation Can You Receive?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "€250 Compensation",
                text: "For short-haul flights up to 1,500 km delayed by 3+ hours."
              },
              {
                title: "€400 Compensation",
                text:
                  "For medium-haul flights within the EU or up to 3,500 km."
              },
              {
                title: "€600 Compensation",
                text:
                  "For long-haul flights over 3,500 km delayed by 3+ hours."
              }
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-8 shadow-sm border border-orange-100"
              >
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

        {/* EXTRAORDINARY CIRCUMSTANCES */}
        <div className="bg-white rounded-3xl p-12 shadow-sm border border-orange-100 space-y-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center">
            When Airlines Don’t Have to Pay
          </h2>

          <p className="text-gray-600 max-w-4xl mx-auto leading-relaxed text-center">
            Airlines are not required to pay compensation if the delay was
            caused by extraordinary circumstances beyond their control.
            However, airlines often misuse this exception.
          </p>

          <div className="grid sm:grid-cols-2 gap-6 text-gray-600 max-w-4xl mx-auto">
            <div>✔ Severe weather conditions</div>
            <div>✔ Air traffic control restrictions</div>
            <div>✔ Security risks or political instability</div>
            <div>✖ Technical issues (usually NOT extraordinary)</div>
          </div>
        </div>

        {/* WHY SKYRIGHT LEGAL */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <h2 className="text-3xl font-bold text-gray-900">
              Why Choose SkyRight Legal?
            </h2>

            <p className="text-gray-600 leading-relaxed">
              Airlines rarely make compensation easy. Claims are ignored,
              delayed, or rejected without proper justification.
              <br /><br />
              SkyRight Legal combines legal expertise with aviation knowledge
              to challenge airlines effectively and recover compensation for
              passengers — with no upfront cost.
            </p>
          </div>

          <div className="bg-orange-50 rounded-3xl p-10 border border-orange-100">
            <ul className="space-y-4 text-gray-700">
              <li>✔ No win, no fee</li>
              <li>✔ Legal enforcement when airlines refuse</li>
              <li>✔ Secure handling of passenger documents</li>
              <li>✔ Transparent communication</li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500 to-red-500 text-white p-14 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Delayed Flight? Know Your Rights.
          </h2>

          <p className="opacity-90 mb-8 max-w-2xl mx-auto">
            You could be entitled to compensation. SkyRight Legal helps you
            claim what the law guarantees.
          </p>

          <a
            href="/check-compensation"
            className="inline-block px-10 py-4 rounded-full bg-white text-orange-600 font-semibold hover:bg-orange-50 transition"
          >
            Check Your Eligibility →
          </a>
        </div>

      </div>
    </section>
  );
};

export default FlightDelay;
