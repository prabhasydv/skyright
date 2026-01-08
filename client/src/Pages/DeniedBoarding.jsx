import React from "react";

const DeniedBoarding = () => {
  return (
    <section className="pt-32 pb-24 px-4 bg-gradient-to-br from-orange-50 via-white to-orange-100 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-24">

        {/* HERO */}
        <div className="text-center space-y-6">
          <span className="inline-block px-4 py-1 rounded-full bg-orange-100 text-orange-600 text-sm font-semibold">
            Passenger Rights
          </span>

          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            Denied Boarding Compensation
          </h1>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Being denied boarding is one of the most frustrating travel
            experiences. If an airline refuses to let you board despite having
            a valid ticket, European law may entitle you to compensation.
            SkyRight Legal helps you enforce your rights.
          </p>
        </div>

        {/* WHAT IS DENIED BOARDING */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <h2 className="text-3xl font-bold text-gray-900">
              What Is Denied Boarding?
            </h2>

            <p className="text-gray-600 leading-relaxed">
              Denied boarding occurs when an airline refuses to carry passengers
              on a flight despite them having a confirmed reservation and
              arriving on time for check-in and boarding.
              <br /><br />
              The most common reason is overbooking, where airlines sell more
              tickets than available seats.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-10 shadow-sm border border-orange-100">
            <ul className="space-y-4 text-gray-700">
              <li className="flex gap-3">
                <span className="text-orange-500 font-bold">✓</span>
                Valid ticket and confirmed reservation
              </li>
              <li className="flex gap-3">
                <span className="text-orange-500 font-bold">✓</span>
                Passenger arrived on time
              </li>
              <li className="flex gap-3">
                <span className="text-orange-500 font-bold">✓</span>
                Airline refusal due to overbooking
              </li>
            </ul>
          </div>
        </div>

        {/* VOLUNTARY VS INVOLUNTARY */}
        <div className="space-y-10">
          <h2 className="text-3xl font-bold text-center text-gray-900">
            Voluntary vs Involuntary Denied Boarding
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-orange-100">
              <h3 className="text-xl font-semibold mb-3">
                Voluntary Denied Boarding
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Airlines may ask passengers to give up their seats in exchange
                for benefits such as vouchers or upgrades. In these cases,
                compensation under EC261 is usually not required.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-orange-100">
              <h3 className="text-xl font-semibold mb-3">
                Involuntary Denied Boarding
              </h3>
              <p className="text-gray-600 leading-relaxed">
                If you are denied boarding against your will, the airline must
                pay compensation unless there are valid safety or security
                reasons.
              </p>
            </div>
          </div>
        </div>

        {/* COMPENSATION */}
        <div className="space-y-10">
          <h2 className="text-3xl font-bold text-center text-gray-900">
            Compensation Amounts
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "€250 Compensation",
                text:
                  "For short-haul flights up to 1,500 km where boarding was denied."
              },
              {
                title: "€400 Compensation",
                text:
                  "For medium-haul flights within the EU or up to 3,500 km."
              },
              {
                title: "€600 Compensation",
                text:
                  "For long-haul flights over 3,500 km denied boarding involuntarily."
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

        {/* WHEN COMPENSATION DOES NOT APPLY */}
        <div className="bg-white rounded-3xl p-12 shadow-sm border border-orange-100 space-y-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center">
            When Compensation May Be Refused
          </h2>

          <p className="text-gray-600 max-w-4xl mx-auto leading-relaxed text-center">
            Airlines may refuse compensation in limited situations where
            boarding is denied for valid reasons related to passenger conduct
            or safety.
          </p>

          <div className="grid sm:grid-cols-2 gap-6 text-gray-600 max-w-4xl mx-auto">
            <div>✔ Safety or security concerns</div>
            <div>✔ Missing travel documents</div>
            <div>✖ Overbooking (compensation required)</div>
            <div>✖ Airline operational issues</div>
          </div>
        </div>

        {/* WHY SKYRIGHT LEGAL */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <h2 className="text-3xl font-bold text-gray-900">
              How SkyRight Legal Supports You
            </h2>

            <p className="text-gray-600 leading-relaxed">
              Airlines often attempt to minimize or avoid compensation for
              denied boarding cases.
              <br /><br />
              SkyRight Legal ensures airlines are held accountable and that
              passengers receive the compensation guaranteed by law — without
              upfront costs.
            </p>
          </div>

          <div className="bg-orange-50 rounded-3xl p-10 border border-orange-100">
            <ul className="space-y-4 text-gray-700">
              <li>✔ No win, no fee</li>
              <li>✔ Legal enforcement against airlines</li>
              <li>✔ Secure case handling</li>
              <li>✔ Clear and transparent communication</li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500 to-red-500 text-white p-14 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Denied Boarding Due to Overbooking?
          </h2>

          <p className="opacity-90 mb-8 max-w-2xl mx-auto">
            You may be entitled to compensation. SkyRight Legal helps you
            enforce your passenger rights effectively.
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

export default DeniedBoarding;
