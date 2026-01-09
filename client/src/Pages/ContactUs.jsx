import React from "react";

const ContactUs = () => {
  return (
    <section className="pt-32 pb-24 px-4 bg-gradient-to-br from-orange-50 via-white to-orange-100 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-20">

        {/* HERO */}
        <div className="text-center space-y-6">
          <span className="inline-block px-4 py-1 rounded-full bg-orange-100 text-orange-600 text-sm font-semibold">
            Contact Us
          </span>

          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            We’re Here to Help
          </h1>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Have questions about your claim or need assistance?
            Our team is ready to help you every step of the way.
          </p>
        </div>

        {/* CONTENT */}
        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* LEFT – INFO */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Get in Touch
            </h2>

            <p className="text-gray-600 leading-relaxed">
              Whether you need help with an existing claim or just want to
              understand your passenger rights, feel free to contact us.
              We usually respond within 24 hours.
            </p>

            <div className="space-y-4 text-gray-700">
              <div className="flex items-center gap-4">
                <span className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">
                  ✉
                </span>
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-sm text-gray-600">service@skyrightlegal.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">
                  ☎
                </span>
                <div>
                  <p className="font-semibold">Phone</p>
                  <p className="text-sm text-gray-600">+44 7457403599</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">
                  📍
                </span>
                <div>
                  <p className="font-semibold">Office</p>
                  <p className="text-sm text-gray-600">
                  71-75 Shelton Street
                  Covent Garden
                  London
                  WC2H 9JQ
                  UNITED KINGDOM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT – FORM */}
          <div className="bg-white rounded-3xl p-10 shadow-sm border border-orange-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Send us a message
            </h3>

            <form className="space-y-5">
              <input
                type="text"
                placeholder="Your full name"
                className="w-full px-5 py-4 rounded-full border focus:outline-none focus:ring-2 focus:ring-orange-400"
              />

              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-5 py-4 rounded-full border focus:outline-none focus:ring-2 focus:ring-orange-400"
              />

              <textarea
                rows="4"
                placeholder="How can we help you?"
                className="w-full px-5 py-4 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
              />

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold hover:opacity-90 transition"
              >
                Send Message →
              </button>
            </form>
          </div>
        </div>

        {/* CTA STRIP */}
        <div className="text-center bg-white rounded-3xl p-10 shadow-sm border border-orange-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Want to claim compensation instead?
          </h2>
          <p className="text-gray-600 mb-6">
            Check your eligibility in just a few minutes.
          </p>
          <a
            href="/claims/new"
            className="inline-block px-8 py-4 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600 transition"
          >
            Start a Claim →
          </a>
        </div>

      </div>
    </section>
  );
};

export default ContactUs;
