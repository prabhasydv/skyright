import React from "react";
import {
  ShieldCheck,
  Plane,
  Clock,
  Briefcase,
  AlertTriangle,
} from "lucide-react";
import { Link } from "react-router-dom";

const Section = ({ title, subtitle, children }) => (
  <section className="mb-20">
    <div className="mb-8">
      <h2 className="text-3xl font-semibold text-slate-900">{title}</h2>
      {subtitle && (
        <p className="mt-2 text-slate-600 max-w-3xl">{subtitle}</p>
      )}
    </div>
    {children}
  </section>
);

const Card = ({ icon: Icon, title, children }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
    <div className="flex items-center gap-3 mb-4">
      {Icon && (
        <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center">
          <Icon className="h-5 w-5 text-blue-600" />
        </div>
      )}
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
    </div>
    <div className="text-slate-700 space-y-2">{children}</div>
  </div>
);

const KnowYourRights = () => {
  return (
    <main className=" mt-20">
      {/* Hero */}
      <section className="bg-orange-200 from-blue-50 to-slate-50">
        <div className="max-w-7xl mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
            Know Your Air Passenger Rights
          </h1>
          <p className="mt-6 text-lg text-slate-600 max-w-3xl mx-auto">
            Flight delays, cancellations, or denied boarding may entitle you to
            compensation under EU, Turkish, or Canadian air passenger laws.
            SkyRight Legal helps you enforce those rights.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-20">
        {/* Overview */}
        <Section
          title="Air Passenger Rights Overview"
          subtitle="Legal protections designed to safeguard travelers when flights are disrupted."
        >
          <div className="grid md:grid-cols-3 gap-6">
            <Card icon={ShieldCheck} title="Protected by Law">
              <p>
                International regulations ensure passengers receive assistance,
                information, and compensation when airlines fail to meet their
                obligations.
              </p>
            </Card>
            <Card icon={Plane} title="Multiple Regions Covered">
              <p>
                Passenger rights apply across the European Union, Turkey, and
                Canada — each with its own compensation rules.
              </p>
            </Card>
            <Card icon={Clock} title="Time Matters">
              <p>
                Eligibility depends on delay length, cancellation notice, and
                flight distance. Acting early improves your chances.
              </p>
            </Card>
          </div>
        </Section>

        {/* EU261 */}
        <Section
          title="EU Regulation 261/2004 (EU261)"
          subtitle="The most powerful air passenger rights regulation worldwide."
        >
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card title="Eligible Situations">
              <ul className="list-disc pl-5">
                <li>Flight cancellations</li>
                <li>Long delays and missed connections</li>
                <li>Involuntary denied boarding</li>
              </ul>
            </Card>

            <Card title="Flights Covered">
              <ul className="list-disc pl-5">
                <li>Flights within the EU</li>
                <li>Flights arriving in the EU with EU airlines</li>
                <li>Flights departing the EU with any airline</li>
              </ul>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card title="Your Rights">
              <ul className="list-disc pl-5">
                <li>Refund or re-routing after cancellations</li>
                <li>Care and assistance during long delays</li>
                <li>Compensation for denied boarding</li>
                <li>
                  Compensation for missed connections if arrival delay exceeds
                  3 hours
                </li>
              </ul>
            </Card>

            <Card title="Compensation">
              <p>
                Passengers may receive between <strong>€250 and €600</strong>,
                depending on flight distance and delay length. Compensation may
                be reduced if a faster re-routing was provided.
              </p>
            </Card>
          </div>
        </Section>

        {/* Turkey */}
        <Section
          title="Turkish Air Passenger Rights"
          subtitle="Applies to Turkish airlines and flights departing from Turkey."
        >
          <div className="grid md:grid-cols-3 gap-6">
            <Card title="Denied Boarding">
              <p>
                Passengers denied boarding due to overbooking are entitled to
                compensation, a refund, or alternative transportation.
              </p>
            </Card>

            <Card title="Delays & Cancellations">
              <p>
                Compensation applies for delays of 3+ hours caused by technical
                or operational reasons, and for non-force majeure cancellations.
              </p>
            </Card>

            <Card title="Compensation Amounts">
              <ul className="list-disc pl-5">
                <li>Domestic: €100</li>
                <li>Up to 1500 km: €250</li>
                <li>1500–3500 km: €400</li>
                <li>Over 3500 km: €600</li>
              </ul>
            </Card>
          </div>
        </Section>

        {/* Canada */}
        <Section
          title="Canadian Air Passenger Protection Regulations"
          subtitle="Covers flights to, from, and within Canada."
        >
          <div className="grid md:grid-cols-2 gap-6">
            <Card title="Delays & Cancellations">
              <p>
                Large airlines must pay up to <strong>$1,000</strong>, while
                smaller airlines pay up to <strong>$500</strong>, depending on
                delay length.
              </p>
            </Card>

            <Card title="Denied Boarding">
              <p>
                Compensation ranges from <strong>$900 to $2,400</strong>,
                depending on how late you reach your destination.
              </p>
            </Card>
          </div>
        </Section>

        {/* Baggage */}
        <Section
          title="Disrupted Baggage Claims"
          subtitle="Your rights when baggage is lost, damaged, or delayed."
        >
          <Card icon={Briefcase} title="Baggage Compensation">
            <p>
              Under EU law, airlines are liable for baggage disruptions with
              compensation of up to <strong>€1,300</strong>. Claims must be filed
              within strict deadlines.
            </p>
          </Card>
        </Section>

        {/* Exclusions */}
        <Section
          title="When Compensation Does Not Apply"
          subtitle="Extraordinary circumstances may limit airline liability."
        >
          <Card icon={AlertTriangle} title="Extraordinary Circumstances">
            <p>
              Airlines are not required to compensate passengers for disruptions
              caused by severe weather, natural disasters, political instability,
              or security risks. Airline staff strikes are not considered
              extraordinary.
            </p>
          </Card>
        </Section>

        {/* CTA */}
        <div className="mt-24 text-center">
          <h3 className="text-3xl font-semibold text-slate-900 mb-4">
            Check Your Compensation in Minutes
          </h3>
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
            Not sure if your flight qualifies? Submit your details and let
            SkyRight Legal assess your claim quickly and transparently.
          </p>
          <Link to="/check-compensation">
          <button className="px-10 py-4 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition shadow-md">
            Check My Rights
          </button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default KnowYourRights;
