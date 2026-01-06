import React from "react";
import { FaNewspaper, FaArrowRight } from "react-icons/fa";

const newsData = [
  {
    title: "EU Flight Delay Compensation: What Changed in 2026?",
    excerpt:
      "New court rulings clarify passenger rights for delays over 3 hours. Here’s what travelers should know.",
    date: "Jan 2, 2026",
    category: "Passenger Rights",
    image:
      "https://images.moneycontrol.com/static-mcnews/2024/11/20241108100737_1-europe-travel.jpg?impolicy=website&width=770&height=431",
  },
  {
    title: "Top 5 Airlines With the Most Flight Delays in Europe",
    excerpt:
      "Recent data shows which airlines are most likely to delay flights — and how to protect yourself.",
    date: "Dec 28, 2025",
    category: "Airlines",
    image:
      "https://images.unsplash.com/photo-1529070538774-1843cb3265df",
  },
  {
    title: "Denied Boarding: When Are You Entitled to €600?",
    excerpt:
      "Overbooked flights are rising again. Learn when airlines must compensate you under EC261.",
    date: "Dec 20, 2025",
    category: "Compensation Guide",
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
  },
];

export default function News() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 mb-6">
            <FaNewspaper className="text-orange-500 text-3xl" />
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            SkyRight <span className="text-orange-500">News</span>
          </h1>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Latest updates on flight disruptions, airline compensation laws,
            and travel rights across Europe.
          </p>
        </div>

        {/* FEATURED NEWS */}
        <div className="grid md:grid-cols-3 gap-8">
          {newsData.map((item, index) => (
            <article
              key={index}
              className="bg-white rounded-3xl shadow-sm border overflow-hidden hover:shadow-xl transition hover:-translate-y-1"
            >
              {/* IMAGE */}
              <div className="h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* CONTENT */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 font-semibold">
                    {item.category}
                  </span>
                  <span>{item.date}</span>
                </div>

                <h2 className="text-xl font-bold text-gray-900 leading-snug">
                  {item.title}
                </h2>

                <p className="text-gray-600 text-sm">
                  {item.excerpt}
                </p>

                <button className="inline-flex items-center gap-2 text-orange-600 font-semibold text-sm hover:gap-3 transition">
                  Read more <FaArrowRight />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 bg-white rounded-3xl shadow-lg border p-10 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Stay informed. Protect your rights.
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Follow SkyRight news to stay updated on airline disruptions,
            compensation laws, and your passenger rights.
          </p>

          <button className="px-10 py-4 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold text-lg shadow-lg hover:scale-[1.03] transition">
            Explore All Articles
          </button>
        </div>

      </div>
    </section>
  );
}
