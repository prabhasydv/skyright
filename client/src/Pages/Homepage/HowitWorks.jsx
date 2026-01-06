import { Link } from "react-router-dom";

const HowItWorks = () => {
    return (
      <section className="w-full relative pt-10">
  
        {/* Decorative background (same style as banner) */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 right-20 w-72 h-72 rounded-full bg-orange-100 opacity-40 animate-pulse-slow"></div>
          <div className="absolute bottom-20 -left-20 w-40 h-40 rounded-full bg-orange-200 opacity-30 animate-bounce-slow"></div>
        </div>
  
        <div className="relative max-w-7xl mx-auto px-6 z-10">
  
          {/* Heading */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block mb-4 px-5 py-2 rounded-full bg-orange-100 text-orange-600 text-sm font-semibold shadow-sm">
              Simple & Transparent
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              How <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-500">
                Skyright Legal
              </span>{" "}
              Works
            </h2>
            <p className="text-gray-600 text-lg">
              Claim your flight compensation in just a few easy steps.
            </p>
          </div>
  
          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  
            {[
              {
                step: "01",
                title: "Check Eligibility",
                desc: "Enter your flight details and instantly check if you qualify."
              },
              {
                step: "02",
                title: "We Handle Everything",
                desc: "Our legal experts deal with the airline for you."
              },
              {
                step: "03",
                title: "Get Paid",
                desc: "Receive compensation directly to your bank account."
              }
            ].map((item) => (
              <div
                key={item.step}
                className="group bg-white/80 backdrop-blur-md border border-orange-200 rounded-3xl p-8 text-center hover:shadow-xl transition hover:-translate-y-2"
              >
                <div className="text-orange-500 text-4xl font-extrabold mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.desc}
                </p>
              </div>
            ))}
  
          </div>
  
          {/* CTA */}
          <div className="text-center mt-14">
            <Link to="/check-compensation">
            <button className="px-10 py-4 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold text-lg hover:scale-105 transition shadow-lg">
              Check Your Flight Now →
            </button>
            </Link>
          </div>
  
        </div>
      </section>
    );
  };
  
  export default HowItWorks;
  