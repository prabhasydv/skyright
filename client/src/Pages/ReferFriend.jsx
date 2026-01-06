import React, { useState } from "react";
import { FaGift, FaUserFriends, FaCopy, FaCheck } from "react-icons/fa";

export default function ReferFriend() {
  const referralCode = "SKYRIGHT-AB12"; // replace with dynamic user code
  const referralLink = `https://skyrightlegal.com/ref/${referralCode}`;

  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">

        {/* HERO */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 mb-6">
            <FaUserFriends className="text-orange-500 text-3xl" />
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Refer a friend. <span className="text-orange-500">Earn rewards.</span>
          </h1>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Help your friends claim flight compensation and get rewarded when
            their claim is successful.
          </p>
        </div>

        {/* HOW IT WORKS */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              title: "Share your link",
              desc: "Invite friends using your personal referral link.",
            },
            {
              title: "Friend submits claim",
              desc: "Your friend files a compensation claim with SkyRight.",
            },
            {
              title: "You earn rewards",
              desc: "Get €20 for every successful claim.",
            },
          ].map((step, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-8 shadow-sm border hover:shadow-lg transition"
            >
              <div className="text-orange-500 font-extrabold text-3xl mb-4">
                {i + 1}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* REFERRAL CARD */}
        <div className="bg-white rounded-3xl shadow-xl border p-8 md:p-12 mb-16">
          <div className="grid md:grid-cols-2 gap-10 items-center">

            {/* LEFT */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <FaGift className="text-orange-500 text-2xl" />
                <h2 className="text-2xl font-bold">
                  Your referral reward
                </h2>
              </div>

              <p className="text-gray-600 mb-6">
                Earn <b>€20</b> for every friend whose claim is successfully
                completed. No limit on referrals.
              </p>

              <ul className="space-y-3 text-gray-700">
                <li>✔ Unlimited referrals</li>
                <li>✔ Paid after claim completion</li>
                <li>✔ Transparent tracking</li>
              </ul>
            </div>

            {/* RIGHT */}
            <div className="bg-orange-50 rounded-2xl p-6">
              <p className="text-sm font-semibold text-gray-700 mb-2">
                Your referral link
              </p>

              <div className="flex items-center gap-3 bg-white rounded-xl border p-3">
                <input
                  readOnly
                  value={referralLink}
                  className="flex-1 text-sm text-gray-600 outline-none"
                />

                <button
                  onClick={copyLink}
                  className="px-4 py-2 rounded-lg bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 transition flex items-center gap-2"
                >
                  {copied ? <FaCheck /> : <FaCopy />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>

              <p className="text-xs text-gray-500 mt-3">
                Share this link with friends via WhatsApp, email, or social media.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">
            Start earning by helping friends ✈️
          </h3>
          <p className="text-gray-600 mb-6">
            The more friends you refer, the more you earn.
          </p>

          <button className="px-10 py-4 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold text-lg shadow-lg hover:scale-[1.03] transition">
            Invite Friends Now
          </button>
        </div>

      </div>
    </section>
  );
}
