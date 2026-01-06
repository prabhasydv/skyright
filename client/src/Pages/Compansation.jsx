import React, { useState, useRef, useEffect } from "react";
import AirportSelect from "../Components/AirportSelect";
import SignatureCanvas from "react-signature-canvas";
import { FaUserFriends, FaFileUpload } from "react-icons/fa";

const steps = [
  "Eligibility",
  "Flight Details",
  "Disruption",
  "Reason",
  "Additional",
  "E‑Signature",
  "Documents",
  "Done",
];

export default function CheckCompensation() {
  const [connectedFlight, setConnectedFlight] = useState(null);
  const [stops, setStops] = useState(null);
  const [connections, setConnections] = useState([]);
  const [step, setStep] = useState(0);
  const [showAgreement, setShowAgreement] = useState(false);
  const [signature, setSignature] = useState(null);
  const sigRef = useRef(null);

  const [formData, setFormData] = useState({
    departure: "",
    destination: "",
    connectedFlight: null,
    stops: null,
    connections: [],
    segments: [],   // 👈 MUST EXIST
    flightDate: "",
    airlineName: "",
    flightNumber: "",
    disruptionType: "",
    delayDuration: "",
    disruptionReasonKnown: "",
    disruptionReason: "",
    additional: "",
    eSignName: "",
    passengers: [""]
  });

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const saveSignature = () => {
    if (!sigRef.current || sigRef.current.isEmpty()) {
      alert("Please sign before continuing");
      return;
    }
    const base64 = sigRef.current.toDataURL("image/png");
    setSignature(base64);
    setShowAgreement(true);
  };

  useEffect(() => {
    if (!formData.departure || !formData.destination) return;

    const points = [
      formData.departure,
      ...formData.connections.filter(Boolean),
      formData.destination,
    ];

    const segments = points.slice(0, -1).map((_, i) => ({
      from: points[i],
      to: points[i + 1],
      flightDate: "",
      airlineName: "",
      flightNumber: "",
      disrupted: false, // ⭐ EC261-required
    }));

    setFormData((prev) => ({
      ...prev,
      segments,
    }));
  }, [formData.departure, formData.destination, formData.connections]);

  // const isStep0Valid = () => {
  //   // Required always
  //   if (!formData.departure) return false;
  //   if (!formData.destination) return false;
  //   if (!connectedFlight) return false;
  //   // Required only if connected flight = yes
  //   if (connectedFlight === "yes") {
  //     if (!stops) return false;
  //     if (!connections || connections.length !== stops) return false;
  //     if (connections.some((c) => !c)) return false;
  //   }
  
  //   return true;
  // };
  
  const isStep0Valid = () => {
    // Airports are required
    if (!formData.departure) return false;
    if (!formData.destination) return false;
  
    // Departure and destination must be different
    if (
      formData.departure?.iata &&
      formData.destination?.iata &&
      formData.departure.iata === formData.destination.iata
    ) {
      return false;
    }
  
    // Connected flight selection required
    if (!connectedFlight) return false;
  
    // If connected flight = YES
    if (connectedFlight === "yes") {
      // Stops required
      if (!stops || stops < 1) return false;
  
      // Connections array must exist and match stop count
      if (!Array.isArray(connections)) return false;
      if (connections.length !== stops) return false;
  
      // Every stop airport must be selected
      if (connections.some((c) => !c)) return false;
  
      // Stops must not duplicate departure or destination
      const allIatas = [
        formData.departure?.iata,
        ...connections.map((c) => c?.iata),
        formData.destination?.iata,
      ];
  
      const uniqueIatas = new Set(allIatas.filter(Boolean));
      if (uniqueIatas.size !== allIatas.filter(Boolean).length) {
        return false;
      }
    }
  
    return true;
  };
  const isStep1Valid = () => {
    if (!Array.isArray(formData.segments) || formData.segments.length === 0)
      return false;
  
    // Each segment must be complete
    for (const seg of formData.segments) {
      if (!seg.flightDate) return false;
      if (!seg.airlineName?.trim()) return false;
      if (!seg.flightNumber?.trim()) return false;
    }
  
    // Exactly one disrupted flight
    const disruptedCount = formData.segments.filter(s => s.disrupted).length;
    if (disruptedCount !== 1) return false;
  
    return true;
  };

  const isStep2Valid = () => {
    if (!formData.disruptionType) return false;
    if (!formData.delayDuration) return false;
    return true;
  };
  
  const isStep3Valid = () => {
    if (!formData.disruptionReasonKnown) return false;
    if (!formData.disruptionReason) return false;
    return true;
  };
  
  const isStep4Valid = () => {
    // Must choose Alone or With others
    if (!formData.additional) return false;
  
    // At least one passenger name is REQUIRED in all cases
    if (!Array.isArray(formData.passengers) || formData.passengers.length === 0)
      return false;
  
    // No empty names allowed
    if (formData.passengers.some(p => !p || !p.trim())) return false;
  
    return true;
  };
  
  
  
  


  return (
    <section className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white/80 backdrop-blur-xl border border-orange-200 rounded-[36px] shadow-2xl p-8 md:p-12 space-y-14">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900">
              Flight compensation claim ✈️
            </h1>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
              Complete the form step-by-step to check your eligibility and submit your claim.
            </p>
          </div>

          {/* ================= STEP 1 ================= */}
          {step === 0 && (
            <div className="space-y-12">
              <h2 className="text-3xl font-bold text-gray-900 text-center">
                Check your eligibility
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <AirportSelect
                  label="Departure airport *"
                  placeholder="Search airport or IATA (DEL)"
                  onSelect={(val) => setFormData({ ...formData, departure: val })}
                />
                <AirportSelect
                  label="Final destination *"
                  placeholder="Search airport or IATA (LHR)"
                  onSelect={(val) => setFormData({ ...formData, destination: val })}
                />
              </div>

              <div className="space-y-5">
                <p className="text-lg font-semibold text-gray-900">
                  Did you have a connected flight?
                </p>
                <div className="grid sm:grid-cols-2 gap-5">
                  {[
                    { value: "no", title: "No", desc: "Direct flight" },
                    { value: "yes", title: "Yes", desc: "Changed planes" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        setConnectedFlight(opt.value);
                        setStops(null);
                        setConnections([]);
                        setFormData({ ...formData, connectedFlight: opt.value, stops: null, connections: [] });
                      }}
                      className={`p-6 rounded-3xl border text-left transition ${connectedFlight === opt.value
                        ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-xl scale-[1.03]"
                        : "bg-white border-orange-200 hover:bg-orange-50"
                        }`}
                    >
                      <p className="text-lg font-bold">{opt.title}</p>
                      <p className="text-sm opacity-80">{opt.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {connectedFlight === "yes" && (
                <div className="space-y-8">
                  <div>
                    <p className="font-semibold mb-4">How many stops did you have?</p>
                    <div className="flex flex-wrap gap-4">
                      {[1, 2, 3, 4].map((n) => (
                        <button
                          key={n}
                          onClick={() => {
                            setStops(n);
                            setConnections(Array(n).fill(null));
                            setFormData({ ...formData, stops: n, connections: Array(n).fill(null) });
                          }}
                          className={`px-7 py-3 rounded-full font-semibold border transition ${stops === n ? "bg-orange-500 text-white border-transparent" : "border-orange-300 hover:bg-orange-50"
                            }`}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>

                  {stops && (
                    <div className="space-y-6">
                      {connections.map((_, i) => (
                        <AirportSelect
                          key={i}
                          label={`Stop ${i + 1} airport *`}
                          placeholder="Search airport"
                          onSelect={(a) => {
                            const updated = [...connections];
                            updated[i] = a;
                            setConnections(updated);
                            setFormData({ ...formData, connections: updated });
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ================= STEP 2 ================= */}
          {/* {step === 1 && (
            <div className="space-y-10">
              <h2 className="text-3xl font-bold">Flight details</h2>
              <input
                className="w-full px-6 py-4 rounded-full border"
                placeholder="Flight date"
                onChange={(e) => setFormData({ ...formData, flightDate: e.target.value })}
              />
              <input
                className="w-full px-6 py-4 rounded-full border"
                placeholder="Airline name"
                onChange={(e) => setFormData({ ...formData, airlineName: e.target.value })}
              />
              <input
                className="w-full px-6 py-4 rounded-full border"
                placeholder="Flight number"
                onChange={(e) => setFormData({ ...formData, flightNumber: e.target.value })}
              />
            </div>
          )} */}
          {step === 1 && (
            <div className="space-y-12">
              <h2 className="text-3xl font-bold">Flight details</h2>

              {formData.segments.map((seg, index) => (
                <div
                  key={index}
                  className="p-6 rounded-3xl border bg-white space-y-4"
                >
                  <p className="font-semibold text-lg">
                    Flight {index + 1}: {seg.from?.iata} → {seg.to?.iata}
                  </p>

                  <input
                    type="date"
                    className="w-full px-6 py-4 rounded-full border"
                    placeholder="Flight date"
                    value={seg.flightDate}
                    onChange={(e) => {
                      const updated = [...formData.segments];
                      updated[index].flightDate = e.target.value;
                      setFormData({ ...formData, segments: updated });
                    }}
                  />

                  <input
                    className="w-full px-6 py-4 rounded-full border"
                    placeholder="Airline name"
                    value={seg.airlineName}
                    onChange={(e) => {
                      const updated = [...formData.segments];
                      updated[index].airlineName = e.target.value;
                      setFormData({ ...formData, segments: updated });
                    }}
                  />

                  <input
                    className="w-full px-6 py-4 rounded-full border"
                    placeholder="Flight number"
                    value={seg.flightNumber}
                    onChange={(e) => {
                      const updated = [...formData.segments];
                      updated[index].flightNumber = e.target.value;
                      setFormData({ ...formData, segments: updated });
                    }}
                  />

                  {/* ⭐ Disrupted flight selector */}
                  <label className="flex items-center gap-3 mt-3">
                    <input
                      type="radio"
                      name="disruptedFlight"
                      checked={seg.disrupted}
                      onChange={() => {
                        const updated = formData.segments.map((s, i) => ({
                          ...s,
                          disrupted: i === index,
                        }));
                        setFormData({ ...formData, segments: updated });
                      }}
                    />
                    <span>This flight was disrupted</span>
                  </label>
                </div>
              ))}
            </div>
          )}


          {/* ================= STEP 3 ================= */}
          {step === 2 && (
            <div className="space-y-10">
              <h2 className="text-3xl font-bold">Disruption details</h2>

              <div className="grid md:grid-cols-3 gap-4">
                {["Delayed", "Cancelled", "Denied boarding"].map((o) => (
                  <button
                    key={o}
                    onClick={() => setFormData({ ...formData, disruptionType: o })}
                    className={`py-4 rounded-2xl border hover:bg-orange-50 ${formData.disruptionType === o ? "bg-orange-500 text-white" : ""
                      }`}
                  >
                    {o}
                  </button>
                ))}
              </div>

              <select
                className="w-full px-6 py-4 rounded-full border"
                onChange={(e) => setFormData({ ...formData, delayDuration: e.target.value })}
              >
                <option>Delay duration</option>
                <option>Less than 3 hours</option>
                <option>More than 3 hours</option>
              </select>
            </div>
          )}

          {/* ================= STEP 4 ================= */}
          {step === 3 && (
            <div className="space-y-10">
              <h2 className="text-3xl font-bold">Reason for disruption</h2>
              <select
                className="w-full px-6 py-4 rounded-full border"
                onChange={(e) => setFormData({ ...formData, disruptionReasonKnown: e.target.value })}
              >
                <option>Did airline tell you the reason?</option>
                <option>Yes</option>
                <option>No</option>
                <option>Don’t remember</option>
              </select>
              <select
                className="w-full px-6 py-4 rounded-full border"
                onChange={(e) => setFormData({ ...formData, disruptionReason: e.target.value })}
              >
                <option>Reason provided</option>
                <option>Technical issue</option>
                <option>Weather</option>
                <option>Staff shortage</option>
              </select>
            </div>
          )}

          {/* ================= STEP 5 ================= */}
          {/* {step === 4 && (
            <div className="space-y-10">
              <h2 className="text-3xl font-bold">Additional details</h2>
              <div className="flex gap-4">
                <button
                  className={`px-6 py-3 rounded-full border ${formData.additional === "With others" ? "bg-orange-500 text-white" : ""}`}
                  onClick={() => setFormData({ ...formData, additional: "With others" })}
                >
                  <FaUserFriends className="inline mr-2" />
                  With others
                </button>
                <button
                  className={`px-6 py-3 rounded-full border ${formData.additional === "Alone" ? "bg-orange-500 text-white" : ""}`}
                  onClick={() => setFormData({ ...formData, additional: "Alone" })}
                >
                  Alone
                </button>
              </div>
            </div>
          )} */}

          {step === 4 && (
            <div className="space-y-10">
              <h2 className="text-3xl font-bold">Additional details</h2>

              <div className="flex gap-4">
                <button
                  className={`px-6 py-3 rounded-full border ${formData.additional === "With others" ? "bg-orange-500 text-white" : ""
                    }`}
                  onClick={() => setFormData({ ...formData, additional: "With others", passengers: formData.passengers || [""] })}
                >
                  <FaUserFriends className="inline mr-2" />
                  With others
                </button>
                <button
                  className={`px-6 py-3 rounded-full border ${formData.additional === "Alone" ? "bg-orange-500 text-white" : ""
                    }`}
                  onClick={() => setFormData({ ...formData, additional: "Alone", passengers: [""] })}
                >
                  Alone
                </button>
              </div>

              {/* Passenger Name Inputs */}
              <div className="mt-6 space-y-4">
                {formData.passengers?.map((name, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder={`Passenger ${index + 1} Name`}
                      className="w-full px-6 py-4 rounded-full border"
                      value={name}
                      onChange={(e) => {
                        const updated = [...formData.passengers];
                        updated[index] = e.target.value;
                        setFormData({ ...formData, passengers: updated });
                      }}
                    />
                    {/* Show + icon only on the last input */}
                    {index === formData.passengers.length - 1 && formData.additional === "With others" && (
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, passengers: [...formData.passengers, ""] })}
                        className="px-4 py-2 bg-orange-500 text-white rounded-full text-xl"
                      >
                        +
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}



          {/* ================= AGREEMENT MODAL ================= */}
          {showAgreement && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
              <div className="bg-white w-full max-w-4xl rounded-2xl p-8 relative">
                <button
                  onClick={() => setShowAgreement(false)}
                  className="absolute top-4 right-4 text-xl"
                >
                  ✕
                </button>

                <div className="max-h-[70vh] overflow-y-auto relative border p-6 rounded-xl">
                  <h3 className="text-2xl font-bold mb-4">Agreement</h3>
                  <p className="text-gray-700 leading-relaxed mb-10">
                    By signing this agreement, you authorize SkyRight to act on your Lorem ipsum dolor sit amet consectetur adipisicing elit. Id alias unde rem suscipit temporibus ratione facere quidem, dolores saepe nemo a quia autem quod numquam perferendis dolor? Quasi suscipit, eius quod deserunt, ducimus aperiam quae eveniet ex est porro cupiditate vel alias natus, aliquam nihil asperiores in temporibus minima facere? Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed placeat exercitationem obcaecati error voluptates eum, recusandae facere harum libero laudantium rem quam ad eius, enim amet adipisci? Voluptatibus rem laborum assumenda quod ducimus? Repellendus accusantium, at nesciunt aliquid, explicabo hic sequi amet aperiam veniam laboriosam ipsam iure quasi in molestias.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-24">
                    You confirm that all information is accurate and complete.
                  </p>

                  {/* USER DATA BOTTOM LEFT */}
                  <div className="absolute left-6 text-left text-sm max-w-xs ">
                    <h4 className="font-bold text-gray-900 mb-2">Your Info:</h4>
                    {/* <p className="text-gray-700">Departure: {formData.departure?.iata || formData.departure?.name || ""}</p>
                    <p className="text-gray-700">Destination: {formData.destination?.iata || formData.destination?.name || ""}</p>
                    <p className="text-gray-700">Connected Flight: {formData.connectedFlight}</p>
                    {formData.stops && <p className="text-gray-700">Stops: {formData.stops}</p>}
                    {formData.connections.length > 0 && (
                      <p className="text-gray-700">
                        Connections: {formData.connections.filter(Boolean).map((c) => c.iata || c.name).join(", ")}
                      </p>
                    )} */}
                    {/* <p className="text-gray-700">Name: {formData.passengerName}</p> */}
                    <p className="text-gray-700">
                      Name: {formData.passengers?.length > 0
                        ? formData.passengers.filter(Boolean).join(", ")
                        : formData.passengerName || ""}
                    </p>

                    <p className="text-gray-700">Flight Date: {formData.flightDate}</p>
                    <p className="text-gray-700">Airline: {formData.airlineName}</p>
                    <p className="text-gray-700">Flight Number: {formData.flightNumber}</p>
                    {/* <p className="text-gray-700">Disruption: {formData.disruptionType}</p>
                    <p className="text-gray-700">Delay Duration: {formData.delayDuration}</p>
                    <p className="text-gray-700">Reason Known: {formData.disruptionReasonKnown}</p>
                    <p className="text-gray-700">Reason: {formData.disruptionReason}</p>
                    <p className="text-gray-700">Additional: {formData.additional}</p> */}
                    {formData.eSignName && <p className="text-gray-700">Signed Name: {formData.eSignName}</p>}
                  </div>


                  {/* SIGNATURE BOTTOM RIGHT */}
                  {signature && (
                    <div className="absolute right-6 text-right">
                      <img src={signature} alt="Signature" className="h-16" />
                      <p className="text-xs text-gray-500 mt-1">Signed electronically</p>
                    </div>
                  )}
                </div>

                <div className="mt-6 text-right">
                  <button
                    onClick={() => setShowAgreement(false)}
                    className="px-6 py-3 rounded-full bg-black text-white"
                  >
                    Accept & Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ================= STEP 6 ================= */}
          {step === 5 && (
            <div className="space-y-8">
              <h2 className="text-3xl font-bold">E-Signature</h2>

              {/* <input
                className="w-full px-6 py-4 rounded-full border mb-4"
                placeholder="Type your full name"
                onChange={(e) => setFormData({ ...formData, eSignName: e.target.value })}
              /> */}

              <button
                onClick={() => setShowAgreement(true)}
                disabled={!signature}
                className={`px-6 py-3 rounded-full font-semibold ${signature ? "bg-blue-600 text-white" : "bg-gray-300 cursor-not-allowed"
                  }`}
              >
                Review Agreement
              </button>

              <div className="border-2 border-dashed rounded-2xl p-6">
                <SignatureCanvas
                  ref={sigRef}
                  penColor="black"
                  canvasProps={{ width: 600, height: 200, className: "w-full h-52 bg-white rounded-xl cursor-crosshair" }}
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => sigRef.current.clear()}
                  className="px-6 py-3 rounded-full border"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={saveSignature}
                  className="px-6 py-3 rounded-full bg-black text-white"
                >
                  Save Signature
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 7 ================= */}
          {step === 6 && (
            <div className="space-y-10">
              <h2 className="text-3xl font-bold">Upload documents</h2>
              <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-3xl p-10 cursor-pointer">
                <FaFileUpload className="text-4xl text-orange-500" />
                <span className="mt-4 text-gray-600">Upload boarding pass or confirmation</span>
                <input type="file" hidden />
              </label>
            </div>
          )}

          {/* ================= STEP 8 ================= */}
          {step === 7 && (
            <div className="text-center space-y-6">
              <h2 className="text-4xl font-extrabold text-green-600">🎉 Claim submitted</h2>
              <p className="text-gray-600">
                Our legal team will review your case and contact you soon.
              </p>
            </div>
          )}

          {/* ACTIONS */}
          <div className="flex justify-between pt-10">
            {step > 0 && step < 7 && (
              <button onClick={back} className="px-6 py-3 rounded-full border">
                Back
              </button>
            )}
            {step < 7 && (
              // <button
              //   onClick={next}
              //   className="ml-auto px-10 py-3 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg"
              // >
              //   Continue →
              // </button>
              <button
              onClick={next}
              disabled={
                (step === 0 && !isStep0Valid()) ||
                (step === 1 && !isStep1Valid()) ||
                (step === 2 && !isStep2Valid()) ||
                (step === 3 && !isStep3Valid()) ||
                (step === 4 && !isStep4Valid())
              }
              className={`ml-auto px-10 py-3 rounded-full font-semibold shadow-lg
                ${
                  (step === 0 && !isStep0Valid()) ||
                  (step === 1 && !isStep1Valid()) ||
                  (step === 2 && !isStep2Valid()) ||
                  (step === 3 && !isStep3Valid()) ||
                  (step === 4 && !isStep4Valid())
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                }
              `}
            >
              Continue →
            </button>
            

            )}
          </div>
        </div>
      </div>
    </section>
  );
}
