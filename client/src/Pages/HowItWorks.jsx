import React from "react";

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6 py-16">

        {/* LOGO */}
        <div className="flex justify-center mb-12">
          <img
            src="/assest/logo.png"
            alt="SkyRight Logo"
            className="h-20 object-contain"
          />
        </div>

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-center mb-12">
          How It Works
        </h1>

        {/* INTRO */}
        <p className="text-gray-700 leading-relaxed text-center max-w-3xl mx-auto mb-16">
          SkyRight helps air passengers claim compensation for disrupted flights.
          Our process is simple, transparent, and risk-free — you only pay if we
          successfully recover your compensation.
        </p>

        {/* STEPS */}
        <div className="space-y-16 text-gray-700 leading-relaxed">

          {/* STEP 1 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              1. Submit Your Flight Details
            </h2>
            <p>
              Enter your flight information and describe the disruption. Our system
              checks your eligibility under Regulation (EC) No 261/2004 and other
              applicable passenger rights regulations within minutes.
            </p>
          </section>

          {/* STEP 2 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              2. Sign the Assignment Agreement
            </h2>
            <p>
              If your flight is eligible, you sign an Assignment Agreement that
              authorizes SkyRight to handle the claim on your behalf. This allows us
              to communicate with the airline, initiate legal proceedings if needed,
              and recover compensation efficiently.
            </p>
          </section>

          {/* STEP 3 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              3. We Handle the Claim
            </h2>
            <p>
              Our legal and aviation experts take over the entire process. We contact
              the airline, submit the claim, follow up, and escalate the case when
              necessary — including court action — at no upfront cost to you.
            </p>
          </section>

          {/* STEP 4 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              4. Compensation Recovered
            </h2>
            <p>
              Once the airline pays compensation, SkyRight deducts its agreed success
              fee and transfers the remaining amount directly to you. If we are not
              successful, you pay nothing.
            </p>
          </section>

          {/* STEP 5 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              5. Track Your Claim
            </h2>
            <p>
              You can track the status of your claim at any time. We keep you informed
              throughout the process and notify you immediately once your case is
              resolved.
            </p>
          </section>

        </div>

        {/* FOOTER NOTE */}
        <div className="mt-20 text-center text-sm text-gray-500 max-w-3xl mx-auto">
          SkyRight operates on a no-win, no-fee basis. By using our services, you
          accept our Terms & Conditions and Privacy Policy.
        </div>

      </div>
    </div>
  );
};

export default HowItWorks;
