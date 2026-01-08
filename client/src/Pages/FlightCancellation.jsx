import React from "react";

const FlightCancellation = () => {
  return (
    <section className="pt-32 pb-24 px-4 bg-gradient-to-br from-orange-50 via-white to-orange-100 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-24">

        {/* HERO */}
        <div className="text-center space-y-6">
          <span className="inline-block px-4 py-1 rounded-full bg-orange-100 text-orange-600 text-sm font-semibold">
            Passenger Rights
          </span>

          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            Flight Cancellation Compensation
          </h1>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            When a flight is cancelled, passengers are often left confused and
            stranded. European law protects your rights and may entitle you to
            financial compensation. SkyRight Legal helps you enforce those
            rights.
          </p>
        </div>

        {/* WHAT IS A CANCELLATION */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <h2 className="text-3xl font-bold text-gray-900">
              What Is a Flight Cancellation?
            </h2>

            <p className="text-gray-600 leading-relaxed">
              A flight cancellation occurs when an airline does not operate a
              scheduled flight at all and passengers are transferred to a
              different flight or offered a refund.
              <br /><br />
              Even if the airline offers an alternative flight, the original
              flight is still considered cancelled under EU law.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-10 shadow-sm border border-orange-100">
            <ul className="space-y-4 text-gray-700">
              <li className="flex gap-3">
                <span className="text-orange-500 font-bold">✓</span>
                Original flight did not operate
              </li>
              <li className="flex gap-3">
                <span className="text-orange-500 font-bold">✓</span>
                Rebooking onto another flight
              </li>
              <li className="flex gap-3">
                <span className="text-orange-500 font-bold">✓</span>
                Applies even with refunds or vouchers
              </li>
            </ul>
          </div>
        </div>

        {/* COMPENSATION AMOUNTS */}
        <div className="space-y-10">
          <h2 className="text-3xl font-bold text-center text-gray-900">
            How Much Compensation Can You Claim?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "€250 Compensation",
                text:
                  "For short-haul flights up to 1,500 km cancelled without proper notice."
              },
              {
                title: "€400 Compensation",
                text:
                  "For medium-haul flights within the EU or up to 3,500 km."
              },
              {
                title: "€600 Compensation",
                text:
                  "For long-haul flights over 3,500 km cancelled at short notice."
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

        {/* NOTICE PERIOD */}
        <div className="bg-white rounded-3xl p-12 shadow-sm border border-orange-100 space-y-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center">
            When Compensation Is Not Required
          </h2>

          <p className="text-gray-600 max-w-4xl mx-auto leading-relaxed text-center">
            Airlines may avoid paying compensation if they informed passengers
            about the cancellation in advance or if extraordinary circumstances
            apply.
          </p>

          <div className="grid sm:grid-cols-2 gap-6 text-gray-600 max-w-4xl mx-auto">
            <div>✔ Cancellation announced 14+ days in advance</div>
            <div>✔ Extraordinary circumstances</div>
            <div>✖ Short-notice cancellations (usually payable)</div>
            <div>✖ Technical issues (not extraordinary)</div>
          </div>
        </div>

        {/* PASSENGER RIGHTS */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <h2 className="text-3xl font-bold text-gray-900">
              Your Rights After a Cancellation
            </h2>

            <p className="text-gray-600 leading-relaxed">
              In addition to compensation, passengers are entitled to care and
              assistance. Airlines must offer rebooking, refunds, meals, and
              accommodation when necessary.
              <br /><br />
              These rights apply even when compensation is not payable.
            </p>
          </div>

          <div className="bg-orange-50 rounded-3xl p-10 border border-orange-100">
            <ul className="space-y-4 text-gray-700">
              <li>✔ Choice between refund or rebooking</li>
              <li>✔ Meals and refreshments</li>
              <li>✔ Hotel accommodation if required</li>
              <li>✔ Transport between airport and hotel</li>
            </ul>
          </div>
        </div>

        {/* WHY SKYRIGHT LEGAL */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <h2 className="text-3xl font-bold text-gray-900">
              How SkyRight Legal Helps
            </h2>

            <p className="text-gray-600 leading-relaxed">
              Airlines often deny valid cancellation claims or blame
              extraordinary circumstances without proof.
              <br /><br />
              SkyRight Legal reviews your case, challenges airline decisions,
              and takes legal action when necessary — with no upfront cost.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-10 shadow-sm border border-orange-100">
            <ul className="space-y-4 text-gray-700">
              <li>✔ No win, no fee</li>
              <li>✔ Legal enforcement against airlines</li>
              <li>✔ Secure and transparent process</li>
              <li>✔ Passenger-first representation</li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500 to-red-500 text-white p-14 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Was Your Flight Cancelled?
          </h2>

          <p className="opacity-90 mb-8 max-w-2xl mx-auto">
            You may be entitled to compensation. SkyRight Legal helps you
            enforce your rights quickly and professionally.
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

export default FlightCancellation;
