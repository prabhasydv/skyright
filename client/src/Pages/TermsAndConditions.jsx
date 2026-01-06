import React from "react";

const TermsAndConditions = () => {
  return (
    <main className="bg-orange-50">
      {/* Extra space for floating navbar */}
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-md p-8 md:p-12">
          
          {/* Header */}
          <header className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              SkyRight Legal – Terms and Conditions
            </h1>
            <p className="mt-2 text-gray-600">
              Effective Date: <strong>06 January 2026</strong>
            </p>
          </header>

          {/* Content */}
          <div className="space-y-8 text-gray-700 leading-relaxed">

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Preamble (Binding Agreement)
              </h2>
              <p>
                These Terms and Conditions (“Terms”) constitute a legally binding
                agreement between SkyRight Legal (“we”, “us”, “our”) and you
                (“Client”).
              </p>
              <p>
                By submitting a claim or instructing us to act on your behalf,
                you confirm that you have read, understood, and accepted these
                Terms. Acceptance creates a contractual relationship governed by
                the laws of England and Wales.
              </p>
              <p>
                SkyRight Legal is a UK-based no win no fee claims management
                company specialising in statutory flight compensation recovery.
                We are not a firm of solicitors and do not provide legal advice.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                1. Definitions
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Client:</strong> Any passenger submitting a claim and
                  entering into an agreement with SkyRight Legal.
                </li>
                <li>
                  <strong>Case:</strong> A claim arising from a specific flight
                  disruption.
                </li>
                <li>
                  <strong>Compensation:</strong> Statutory compensation payable
                  under UK Regulation 261/2004 or applicable law.
                </li>
                <li>
                  <strong>Service Fee:</strong> 35% of recovered compensation,
                  inclusive of VAT, payable only on success.
                </li>
                <li>
                  <strong>Partner:</strong> Third parties assisting with claim
                  processing.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                2. Company Details
              </h2>
              <p>
                <strong>SkyRight Legal</strong><br />
                Company Number: 16452205<br />
                Registered Office: 71–75 Shelton Street, Covent Garden, London,
                WC2H 9JQ, United Kingdom<br />
                Email: service@skyrightlegal.com
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                3. Our Services & No Win No Fee
              </h2>
              <p>
                We assess eligibility, gather evidence, communicate with
                airlines, and manage claims through resolution.
              </p>
              <p>
                If compensation is successfully recovered, our Service Fee of
                35% (VAT included) is deducted. If no compensation is recovered,
                you pay nothing.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                4. Client Obligations
              </h2>
              <p>
                You authorise SkyRight Legal to act on your behalf and agree not
                to pursue the same claim independently. All information provided
                must be accurate and truthful.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                5. Legal Proceedings
              </h2>
              <p>
                Where necessary, claims may be escalated through independent
                external solicitors. You will be informed before legal action is
                taken.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                6. Cancellation Rights
              </h2>
              <p>
                You may cancel within 14 days under the UK Consumer Contracts
                Regulations 2013, unless you have requested immediate
                commencement of services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                7. Data Protection
              </h2>
              <p>
                Personal data is processed in accordance with UK GDPR and the
                Data Protection Act 2018. Please refer to our Privacy Policy for
                details.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                8. Governing Law
              </h2>
              <p>
                These Terms are governed by the laws of England and Wales. The
                courts of England and Wales have exclusive jurisdiction.
              </p>
            </section>

          </div>
        </div>
      </div>
    </main>
  );
};

export default TermsAndConditions;
