import React, { useState, useRef, useEffect } from "react";
import AirportSelect from "../Components/AirportSelect";
import SignatureCanvas from "react-signature-canvas";
import { FaUserFriends, FaFileUpload } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import airlines from "../assets/airlines.json";
import logo2 from "../assets/logo2.png"
import { API_BASE_URL } from "../Auth/config";
// import 'react-phone-number-input/style.css'
// import PhoneInput from 'react-phone-number-input'
import { allCountries } from 'country-telephone-data'
import CountryCodeSelect from "../Components/CountrySelect";
import SignatureBox from "../Components/SignatureBox";



const steps = [
  "Eligibility",
  "Flight Details",
  "Disruption",
  "Reason",
  "Additional",
  "E-Signature",
  "Documents",
  "Done",
];

export default function Compensation2() {
  const [connectedFlight, setConnectedFlight] = useState(null);
  const [stops, setStops] = useState(null);
  const [connections, setConnections] = useState([]);
  const [step, setStep] = useState(0);
  const [showAgreement, setShowAgreement] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showESignCanvas, setShowESignCanvas] = useState(true);
  // const [signature, setSignature] = useState(null);
  const [eSignatures, setESignatures] = useState([]);
  const [activePassengerIndex, setActivePassengerIndex] = useState(0);
  const [boardingPasses, setBoardingPasses] = useState([]);
  const sigRef = useRef(null);
  const location = useLocation();

  const delayOptionsByType = {
    Delayed: [
      { value: "Less than 3 hours", label: "Less than 3 hours" },
      { value: "Less than 3 hours", label: "More than 3 hours" },
    ],
    Cancelled: [
      { value: "Less than 2 hours", label: "Less than 2 hours" },
      { value: "More than 2 hours", label: "More than 2 hours" },
    ],
    "Denied boarding": [
      { value: "Less than 2 hour", label: "Less than 2 hours" },
      { value: "More than 2 hours", label: "More than 2 hours" },
    ],
  };


  const [formData, setFormData] = useState({
    departure: "",
    destination: "",
    connectedFlight: null,
    stops: null,
    connections: [],
    segments: [],
    flightDate: "",
    airlineName: "",
    flightNumber: "",
    disruptionType: "",
    delayDuration: "",
    disruptionReasonKnown: "",
    disruptionReason: "",
    additional: "",
    eSignName: "",
    passengers: [""],
    pnr: "", // ✅ OPTIONAL PNR
    countryCode: "+44",

    // ✅ NEW OPTIONAL CONTACT INFO
    email: "",
    phone: "",
    address: "",
  });

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const allPassengersSigned =
    eSignatures.length === formData.passengers.length &&
    formData.passengers.length > 0;

  const saveSignature = () => {
    if (!sigRef.current || sigRef.current.isEmpty()) {
      alert("Please sign before continuing");
      return;
    }

    const signatureData = sigRef.current.toDataURL("image/png");

    const updated = [...eSignatures];
    updated[activePassengerIndex] = {
      passengerName: formData.passengers[activePassengerIndex],
      signatureData,
    };

    setESignatures(updated);
    sigRef.current.clear();

    if (activePassengerIndex < formData.passengers.length - 1) {
      setActivePassengerIndex((i) => i + 1);
    } else {
      setShowAgreement(true);
      // ✅ ALL SIGNED
      setShowESignCanvas(false);   // 👈 CLOSE CANVAS
      setShowAgreement(true);     // 👈 OPEN AGREEMENT
    }
  };

  useEffect(() => {
    setESignatures([]);
    setActivePassengerIndex(0);
    setShowESignCanvas(true); // ✅ IMPORTANT

  }, [formData.passengers.length]);

  useEffect(() => {
    if (step < 6) {
      setAcceptTerms(false);
    }
  }, [step]);


  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [step]);

  const disruptedSegment = formData.segments.find((s) => s.disrupted);

  const fullRoute = [
    formData.departure?.iata,
    ...formData.connections.map((c) => c?.iata),
    formData.destination?.iata,
  ]
    .filter(Boolean)
    .join(" → ");



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
      disrupted: false,
    }));

    setFormData((p) => ({ ...p, segments }));
  }, [formData.departure, formData.destination, formData.connections]);




  /* ---------- VALIDATIONS (UNCHANGED) ---------- */
  const isStep0Valid = () => {
    if (!formData.departure || !formData.destination) return false;
    if (!connectedFlight) return false;
    if (connectedFlight === "yes") {
      if (!stops || connections.length !== stops) return false;
      if (connections.some((c) => !c)) return false;
    }
    return true;
  };

  const isStep1Valid = () => {
    if (!formData.segments.length) return false;
    for (const seg of formData.segments) {
      if (!seg.flightDate || !seg.airlineName || !seg.flightNumber) return false;
    }
    return formData.segments.filter((s) => s.disrupted).length === 1;
  };

  const isStep2Valid = () =>
    !!formData.disruptionType && !!formData.delayDuration;

  // const isStep3Valid = () =>
  //     !!formData.disruptionReasonKnown && !!formData.disruptionReason;
  const isStep3Valid = () => {
    if (!formData.disruptionReasonKnown) return false;

    // If airline told the reason, reason is required
    if (formData.disruptionReasonKnown === "Yes") {
      return !!formData.disruptionReason;
    }

    // No / Don't remember → valid without reason
    return true;
  };


  const isStep4Valid = () =>
    !!formData.additional &&
    formData.passengers.length > 0 &&
    formData.passengers.every((p) => p.trim()) &&
    !!formData.phone.trim() &&
    !!formData.address.trim();


  const submitClaim = async () => {
    if (!acceptTerms) {
      alert("Please accept the Terms & Conditions");
      return;
    }

    if (boardingPasses.length === 0) {
      alert("Please upload at least one boarding pass");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login again");
      return;
    }

    setIsSubmitting(true); // 🔥 START LOADING

    const fd = new FormData();
    // fd.append(
    //   "claim",
    //   JSON.stringify({
    //     ...formData,
    //     eSignatures,
    //   })
    // );
    const cleanPhone = formData.phone
      .replace(/\D/g, "")        // numbers only
      .replace(/^0+/, "");       // remove leading zeros

    fd.append(
      "claim",
      JSON.stringify({
        ...formData,
        phone: `${formData.countryCode}${cleanPhone}`, // ✅ MERGED ONCE
        eSignatures,
      })
    );


    boardingPasses.forEach((file) => {
      fd.append("boardingPasses", file);
    });

    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/claims`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: fd,
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Submission failed");
        setIsSubmitting(false);
        return;
      }

      // ⏳ Small delay for smooth UX
      setTimeout(() => {
        setIsSubmitting(false);
        setStep(7); // ✅ DONE STEP
      }, 1200);
    } catch (err) {
      console.error(err);
      alert("Network error");
      setIsSubmitting(false);
    }
  };


  const countries = allCountries.map(c => ({
    name: c.name,
    dialCode: `+${c.dialCode}`,
    iso2: c.iso2,
    flag: `https://flagcdn.com/w20/${c.iso2}.png`
  }))

  const filteredCountries = countries.filter(
    (c) => c.iso2 !== "in"
  )




  useEffect(() => {
    if (location.state?.departure && location.state?.destination) {
      setFormData((prev) => ({
        ...prev,
        departure: location.state.departure,
        destination: location.state.destination,
      }));
    }
  }, [location.state]);


  /* ---------- UI ---------- */
  return (
    <section className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 py-6 px-4 pt-10">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden mt-20">

        {/* HEADER */}
        <div className="px-6 py-4 border-b bg-white">
          <h1 className="text-2xl font-semibold text-gray-900">
            Flight compensation claim ✈️
          </h1>
          <p className="text-sm text-gray-500">
            Complete the form step by step
          </p>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[70vh]">

          {/* LEFT – STEP SUMMARY */}
          <aside className="md:col-span-3 bg-gray-50 border-r p-4 hidden md:block">
            <div className="space-y-2 sticky top-6">
              {steps.map((label, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all
                    ${step === i
                      ? "bg-orange-100 text-orange-700 font-semibold"
                      : step > i
                        ? "text-green-600"
                        : "text-gray-400"
                    }`}
                >
                  <div
                    className={`w-7 h-7 flex items-center justify-center rounded-full text-xs font-bold
                      ${step > i
                        ? "bg-green-500 text-white"
                        : step === i
                          ? "bg-orange-500 text-white"
                          : "bg-gray-200"
                      }`}
                  >
                    {step > i ? "✓" : i + 1}
                  </div>
                  <span className="text-sm">{label}</span>
                </div>
              ))}
            </div>
          </aside>

          {/* RIGHT – STEP CONTENT */}
          <main className="md:col-span-9 p-6 space-y-6 animate-fade ">

            {/* 🔥 YOUR EXISTING STEP JSX GOES HERE 🔥 */}
            {/* NOTHING REMOVED – ONLY SIZE REDUCED */}

            {/* STEP CONTENT WRAPPER */}
            <div className="bg-white border rounded-2xl p-5 space-y-6">
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

                  {/* OPTIONAL PNR */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Booking reference / PNR (optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. ABC123"
                      value={formData.pnr}
                      onChange={(e) =>
                        setFormData({ ...formData, pnr: e.target.value.toUpperCase() })
                      }
                      className="w-full px-6 py-4 rounded-full border focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Found on your ticket or booking confirmation
                    </p>
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

              {step === 1 && (
                <div className="space-y-12">
                  <h2 className="text-3xl font-bold">Flight details</h2>

                  {formData.segments.map((seg, index) => (
                    <div
                      key={index}
                      className="p-6 rounded-3xl border bg-white space-y-4 relative"
                    >
                      <p className="font-semibold text-lg">
                        Flight {index + 1}: {seg.from?.iata} → {seg.to?.iata}
                      </p>

                      {/* FLIGHT DATE */}
                      <input
                        type="date"
                        className="w-full px-6 py-4 rounded-full border"
                        value={seg.flightDate}
                        onChange={(e) => {
                          const updated = [...formData.segments];
                          updated[index].flightDate = e.target.value;
                          setFormData({ ...formData, segments: updated });
                        }}
                      />

                      {/* AIRLINE AUTOCOMPLETE WITH LOGO */}
                      <div className="relative">
                        <input
                          className="w-full px-6 py-4 rounded-full border focus:ring-2 focus:ring-orange-500"
                          placeholder="Search airline (Lufthansa, Emirates…)"
                          value={seg.airlineName || ""}
                          onChange={(e) => {
                            const updated = [...formData.segments];
                            updated[index].airlineName = e.target.value;
                            updated[index].showAirlines = true;
                            setFormData({ ...formData, segments: updated });
                          }}
                          onFocus={() => {
                            const updated = [...formData.segments];
                            updated[index].showAirlines = true;
                            setFormData({ ...formData, segments: updated });
                          }}
                        />

                        {seg.showAirlines && seg.airlineName?.length > 1 && (
                          <ul className="absolute z-20 mt-2 w-full bg-white border rounded-2xl shadow-lg max-h-60 overflow-y-auto">
                            {airlines
                              .filter((a) =>
                                a.name
                                  .toLowerCase()
                                  .includes(seg.airlineName.toLowerCase())
                              )
                              .slice(0, 10)
                              .map((airline, i) => (
                                <li
                                  key={i}
                                  onClick={() => {
                                    const updated = [...formData.segments];
                                    updated[index].airlineName = airline.name;
                                    updated[index].airlineId = airline.id;
                                    updated[index].airlineLogo = airline.logo;
                                    updated[index].showAirlines = false;
                                    setFormData({ ...formData, segments: updated });
                                  }}
                                  className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50 cursor-pointer"
                                >
                                  {/* LOGO */}
                                  <img
                                    src={airline.logo}
                                    alt={airline.name}
                                    className="w-6 h-6 object-contain rounded"
                                    onError={(e) => {
                                      e.currentTarget.style.display = "none";
                                    }}
                                  />

                                  {/* NAME */}
                                  <span className="text-sm font-medium">
                                    {airline.name}
                                  </span>
                                </li>
                              ))}
                          </ul>
                        )}
                      </div>

                      {/* FLIGHT NUMBER */}
                      <input
                        className="w-full px-6 py-4 rounded-full border"
                        placeholder="Flight number (e.g. 123)"
                        value={seg.flightNumber}
                        onChange={(e) => {
                          const updated = [...formData.segments];
                          updated[index].flightNumber = e.target.value;
                          setFormData({ ...formData, segments: updated });
                        }}
                      />

                      {/* DISRUPTED FLIGHT */}
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

                  {/* DISRUPTION TYPE */}
                  <div className="grid md:grid-cols-3 gap-4">
                    {["Delayed", "Cancelled", "Denied boarding"].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            disruptionType: type,
                            delayDuration: "", // reset on change
                          })
                        }
                        className={`py-4 rounded-2xl border font-semibold transition
            ${formData.disruptionType === type
                            ? "bg-orange-500 text-white"
                            : "hover:bg-orange-50"
                          }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>

                  {/* DELAY DURATION (DYNAMIC BY TYPE) */}
                  {formData.disruptionType && (
                    <select
                      key={formData.disruptionType} // 🔑 CRITICAL FIX
                      required
                      value={formData.delayDuration}
                      onChange={(e) =>
                        setFormData({ ...formData, delayDuration: e.target.value })
                      }
                      className="w-full px-6 py-4 rounded-full border focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="">Select option</option>

                      {delayOptionsByType[formData.disruptionType].map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>

                  )}
                </div>
              )}


              {/* ================= STEP 4 ================= */}

              {step === 3 && (
                <div className="space-y-10">
                  <h2 className="text-3xl font-bold">Reason for disruption</h2>

                  {/* DID AIRLINE TELL REASON */}
                  <select
                    value={formData.disruptionReasonKnown}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        disruptionReasonKnown: e.target.value,
                        disruptionReason: "", // reset reason when changed
                      })
                    }
                    className="w-full px-6 py-4 rounded-full border focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">Did airline tell you the reason?</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="Don’t remember">Don’t remember</option>
                  </select>

                  {/* SHOW ONLY IF YES */}
                  {formData.disruptionReasonKnown === "Yes" && (
                    <select
                      value={formData.disruptionReason}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          disruptionReason: e.target.value,
                        })
                      }
                      className="w-full px-6 py-4 rounded-full border focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="">Reason provided</option>
                      <option value="Technical issue">Technical issue</option>
                      <option value="Weather">Weather</option>
                      <option value="Staff shortage">Staff shortage</option>
                      <option value="Air traffic control">Air traffic control</option>
                    </select>
                  )}
                </div>
              )}


              {step === 4 && (
                <div className="space-y-12">
                  <h2 className="text-3xl font-bold">Additional details</h2>

                  {/* TRAVEL MODE */}
                  <div className="flex gap-4">
                    <button
                      className={`px-6 py-3 rounded-full border ${formData.additional === "With others"
                        ? "bg-orange-500 text-white"
                        : ""
                        }`}
                      onClick={() =>
                        setFormData({
                          ...formData,
                          additional: "With others",
                          passengers: formData.passengers || [""],
                        })
                      }
                    >
                      <FaUserFriends className="inline mr-2" />
                      With others
                    </button>

                    <button
                      className={`px-6 py-3 rounded-full border ${formData.additional === "Alone" ? "bg-orange-500 text-white" : ""
                        }`}
                      onClick={() =>
                        setFormData({
                          ...formData,
                          additional: "Alone",
                          passengers: [""],
                        })
                      }
                    >
                      Alone
                    </button>
                  </div>

                  {/* PASSENGERS */}
                  <div className="space-y-4">
                    {formData.passengers.map((name, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="text"
                          placeholder={`Passenger ${index + 1} full name`}
                          className="w-full px-6 py-4 rounded-full border"
                          value={name}
                          onChange={(e) => {
                            const updated = [...formData.passengers];
                            updated[index] = e.target.value;
                            setFormData({ ...formData, passengers: updated });
                          }}
                        />

                        {index === formData.passengers.length - 1 &&
                          formData.additional === "With others" && (
                            <button
                              type="button"
                              onClick={() =>
                                setFormData({
                                  ...formData,
                                  passengers: [...formData.passengers, ""],
                                })
                              }
                              className="px-4 py-2 bg-orange-500 text-white rounded-full text-xl"
                            >
                              +
                            </button>
                          )}
                      </div>
                    ))}
                  </div>

                  {/* CONTACT DETAILS */}
                  <div className="mt-14 border-t border-gray-200 pt-10 space-y-8">
                    <h3 className="text-xl font-semibold text-gray-900">
                      Contact details
                    </h3>

                    {/* EMAIL */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Email address <span className="text-gray-400">(optional)</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="you@example.com"
                        className="w-full px-6 py-4 rounded-2xl border border-gray-300
                 focus:ring-2 focus:ring-orange-500 focus:border-orange-500
                 transition shadow-sm"
                      />
                    </div>

                    {/* PHONE */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Phone number <span className="text-red-500">*</span>
                      </label>

                      <div className="flex gap-3">
                        <CountryCodeSelect
                          value={formData.countryCode}
                          onChange={(code) =>
                            setFormData({ ...formData, countryCode: code })
                          }
                          countries={filteredCountries}
                        />



                        <input
                          type="tel"
                          required
                          placeholder="Phone number"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              phone: e.target.value.replace(/^\+\d+/, ""), // ❌ remove any code if pasted
                            })
                          }
                          className="flex-1 px-6 py-4 rounded-2xl border border-gray-300
                   focus:ring-2 focus:ring-orange-500 focus:border-orange-500
                   transition shadow-sm"
                        />
                      </div>
                    </div>

                    {/* ADDRESS */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Address <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        rows={3}
                        required
                        placeholder="Street, city, country"
                        value={formData.address}
                        onChange={(e) =>
                          setFormData({ ...formData, address: e.target.value })
                        }
                        className="w-full px-6 py-4 rounded-2xl border border-gray-300
                 focus:ring-2 focus:ring-orange-500 focus:border-orange-500
                 transition shadow-sm resize-none"
                      />
                    </div>
                  </div>

                </div>
              )}



              {/* ================= AGREEMENT MODAL ================= */}
              {showAgreement && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                  <div className="bg-white w-full max-w-4xl rounded-2xl p-8 relative">
                    {/* CLOSE BUTTON */}
                    <button
                      onClick={() => setShowAgreement(false)}
                      className="absolute top-4 right-4 text-xl"
                    >
                      ✕
                    </button>

                    {/* AGREEMENT CONTENT */}
                    <div className="max-h-[70vh] overflow-y-auto border p-8 rounded-xl">

                      {/* TITLE */}
                      <div className="flex justify-center mb-8">
                        <img
                          src={logo2}
                          alt="SkyRight Logo"
                          className="h-10 w-auto object-contain"
                        />
                      </div>


                      {/* AGREEMENT TEXT */}
                      <div className="space-y-4 text-gray-700 leading-relaxed">
                        <p>
                          <strong>Assignment of Claim</strong><br />
                          In accordance with the Privacy Policy and General Terms & Conditions provided on the website of SkyRight Legal co, a company registered in England and Wales with company number 16452205, registered address 71-75, Shelton Street, Covent Garden, London, WC2H 9JQ, UNITED KINGDOM (“SkyRight Legal co”), webpage https://skyrightlegal.com/, which the Client confirms having read and accepted,
                        </p>

                        <p>
                          By signing this Assignment Form / Power of Attorney (“Form”), the Client authorises SkyRight Legal co to act on their behalf in pursuing any monetary claim for compensation and assistance under the retained EU Regulation (EC) No 261/2004 as incorporated into UK law by the European Union (Withdrawal) Act 2018 (commonly referred to as UK261), the Air Passenger Rights and Air Travel Organisers’ Licensing (Amendment) (EU Exit) Regulations 2019, or under any other applicable UK or international regulation (including the Montreal Convention where relevant), in respect of denied boarding, cancellation, long delay of the above-specified flight, including all related amounts such as taxes, compensation for disrupted travel, or any monetary compensation for lost, delayed or damaged baggage (“Claim”).
                        </p>

                        <p>
                          The Client grants SkyRight Legal co irrevocable authority to:<br />

                          Communicate with the operating air carrier, any relevant authorities, and third parties on all matters relating to the Claim;
                          Institute legal proceedings in the Client’s name if necessary;
                          Organise and finance legal representation before courts, alternative dispute resolution bodies, and institutions;   Collect and receive any payments relating to the Claim on the Client’s behalf;
                          Deduct fees as agreed per claim and remit the remaining balance to the Client in accordance with the Terms & Conditions.

                        </p>

                        <p>
                          The Client understands that by signing this Form, they should not engage in direct contact with the air carrier regarding the Claim or accept any direct payment or vouchers from the airline, as this may affect the pursuit or value of the Claim.
                          If full assignment of the Claim is not permissible or effective under applicable law, this Form shall be treated as a Power of Attorney and contract for services, whereby SkyRight Legal co is authorised to administer and pursue the Claim on the Client’s behalf as described above on a “no win, no fee” basis.
                        </p>

                        <p>
                          This authorisation may be withdrawn by the Client within 14 days of signing by written notice sent to service@skyrightlegal.com. The Client acknowledges that SkyRight Legal co may commence work on the Claim immediately upon receipt of this signed Form, which may limit or end the right of withdrawal if the Claim is fully resolved within that period.
                          The Privacy Policy and General Terms & Conditions available at https://skyrightlegal.com/ apply to this Form and form part of this agreement.

                        </p>

                        <p>
                          <strong>Client Declaration:</strong><br />
                          I confirm that the information provided is correct and that I am entitled to pursue this Claim.
                        </p>

                        {/* <p>
                          By signing this agreement, the Client confirms that all information provided
                          is accurate and complete and confirms acceptance of the applicable Privacy
                          Policy and General Terms & Conditions.
                        </p> */}
                      </div>

                      {/* SEPARATOR */}
                      <div className="my-10 border-t" />

                      {/* BOTTOM CONTRACT SECTION */}
                      <div className="flex justify-between items-end gap-8">

                        {/* LEFT — CLIENT / FLIGHT INFO
  <div className="text-sm text-gray-700 max-w-xs">
    <p className="font-semibold text-gray-900 mb-2">
      Client Information
    </p>
    <p>
      Name:{" "}
      {formData.passengers?.length > 0
        ? formData.passengers.filter(Boolean).join(", ")
        : formData.passengerName || ""}
    </p>
    <p>Flight Date: {formData.flightDate}</p>
    <p>Airline: {formData.airlineName}</p>
    <p>Flight Number: {formData.flightNumber}</p>
    {formData.eSignName && (
      <p>Signed Name: {formData.eSignName}</p>
    )}
  </div> */}

                        {/* LEFT — CLIENT / FLIGHT INFO */}
                        <div className="text-sm text-gray-700 max-w-xs space-y-2">
                          <p className="font-semibold text-gray-900 mb-2">
                            Client & Claim Information
                          </p>

                          {/* PASSENGERS */}
                          <p>
                            <b>Passenger(s):</b>{" "}
                            {formData.passengers?.filter(Boolean).join(", ")}
                          </p>

                          {/* PNR */}
                          {formData.pnr && (
                            <p>
                              <b>Booking reference (PNR):</b> {formData.pnr}
                            </p>
                          )}

                          {/* ROUTE */}
                          {/* <p>
    <b>Route:</b> {fullRoute}
  </p> */}

                          {/* DISRUPTED FLIGHT ONLY */}
                          {disruptedSegment && (
                            <>
                              <p>
                                <b>Disrupted flight:</b>{" "}
                                {disruptedSegment.from?.iata} → {disruptedSegment.to?.iata}
                              </p>

                              <p>
                                <b>Flight date:</b> {disruptedSegment.flightDate}
                              </p>

                              <p>
                                <b>Airline:</b> {disruptedSegment.airlineName}
                              </p>

                              <p>
                                <b>Flight number:</b> {disruptedSegment.flightNumber}
                              </p>
                            </>
                          )}

                          {/* DISRUPTION */}
                          <p>
                            <b>Disruption type:</b> {formData.disruptionType}
                          </p>

                          <p>
                            <b>Delay / impact:</b> {formData.delayDuration}
                          </p>

                          {/* REASON */}
                          {/* {formData.disruptionReasonKnown && (
    <p>
      <b>Reason known:</b> {formData.disruptionReasonKnown}
    </p>
  )} */}

                          {/* {formData.disruptionReason && (
    <p>
      <b>Reason provided:</b> {formData.disruptionReason}
    </p>
  )} */}

                          {/* TRAVEL MODE */}
                          {/* <p>
    <b>Travelled:</b> {formData.additional}
  </p> */}
                        </div>


                        {/* RIGHT — SIGNATURES */}
                        {eSignatures.length > 0 && (
                          <div className="text-right space-y-4">
                            {eSignatures.map((sig, i) => (
                              <div key={i}>
                                <img
                                  src={sig.signatureData}
                                  alt={`Signature ${i + 1}`}
                                  className="h-16 ml-auto"
                                />
                                <p className="text-xs text-gray-500">
                                  e-Signature of {sig.passengerName}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}

                      </div>
                    </div>




                    {/* FOOTER BUTTON */}
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

                  {/* PASSENGER INFO */}
                  <p className="text-lg font-semibold">
                    Passenger {activePassengerIndex + 1} of {formData.passengers.length}
                  </p>

                  <p className="text-gray-600">
                    Signing for: <b>{formData.passengers[activePassengerIndex]}</b>
                  </p>

                  {/* SIGNATURE CANVAS (HIDDEN AFTER DONE) */}
                  {/* {showESignCanvas && (
                    <div className="border-2 border-dashed rounded-2xl p-6">
                      <SignatureBox
                        // ref={sigRef}
                        // penColor="black"
                        // canvasProps={{
                        //   width: 600,
                        //   height: 200,
                        //   className: "w-full h-52 bg-white rounded-xl",
                        // }}
                      />
                    </div>
                  )} */}
                  {showESignCanvas && (
  <div className="border-2 border-dashed rounded-2xl p-6">
    <SignatureBox ref={sigRef} />
  </div>
)}




                  {/* ACTION BUTTONS */}
                  {showESignCanvas && (
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
                        {activePassengerIndex < formData.passengers.length - 1
                          ? "Save & Next Passenger"
                          : "Save & Finish Signing"}
                      </button>
                    </div>
                  )}

                  {/* STATUS MESSAGE */}
                  {!allPassengersSigned && (
                    <p className="text-sm text-red-500 font-medium">
                      Please complete e-signatures for all passengers to continue.
                    </p>
                  )}

                  {/* REVIEW AGREEMENT */}
                  <button
                    onClick={() => setShowAgreement(true)}
                    disabled={!allPassengersSigned}
                    className={`px-6 py-3 rounded-full font-semibold ${allPassengersSigned
                      ? "bg-blue-600 text-white"
                      : "bg-gray-300 cursor-not-allowed"
                      }`}
                  >
                    Review Agreement
                  </button>
                </div>
              )}


              {/* ================= STEP 7 ================= */}
              {step === 6 && !isSubmitting && (
                <div className="space-y-10">
                  <h2 className="text-3xl font-bold">Upload documents</h2>
                  <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-3xl p-10 cursor-pointer">
                    <FaFileUpload className="text-4xl text-orange-500" />
                    <span className="mt-4 text-gray-600">Upload boarding pass or confirmation</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*,.pdf"
                      hidden
                      onChange={(e) => {
                        setBoardingPasses((prev) => [
                          ...prev,
                          ...Array.from(e.target.files),
                        ]);
                      }}
                    />


                  </label>
                  {/* TERMS & CONDITIONS */}
                  <div className="mt-8 bg-orange-50 border border-orange-200 rounded-2xl p-6">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={acceptTerms}
                        onChange={(e) => setAcceptTerms(e.target.checked)}
                        className="mt-1 w-5 h-5 accent-orange-500"
                      />

                      <span className="text-sm text-gray-700">
                        I confirm that all information provided is accurate and I agree to the{" "}
                        <a
                          href="/terms-and-conditions"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-orange-600 hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Terms & Conditions
                        </a>{" "}
                        and authorize SkyRight to act on my behalf.
                      </span>
                    </label>
                  </div>
                  {boardingPasses.length > 0 && (
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {boardingPasses.map((file, index) => {
                        const isImage = file.type.startsWith("image/");

                        return (
                          <div
                            key={index}
                            className="relative border rounded-xl p-2 bg-gray-50"
                          >
                            {/* Remove button */}
                            <button
                              type="button"
                              onClick={() =>
                                setBoardingPasses((prev) =>
                                  prev.filter((_, i) => i !== index)
                                )
                              }
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 text-xs"
                            >
                              ✕
                            </button>

                            {/* Preview */}
                            {isImage ? (
                              <img
                                src={URL.createObjectURL(file)}
                                alt="Boarding pass preview"
                                className="h-40 w-full object-contain rounded-lg"
                              />
                            ) : (
                              <div className="h-40 flex flex-col items-center justify-center text-sm text-gray-600">
                                <FaFileUpload className="text-3xl mb-2 text-orange-500" />
                                <span className="text-center break-all">{file.name}</span>
                              </div>
                            )}

                          </div>
                        );
                      })}
                    </div>
                  )}

                </div>
              )}

              {isSubmitting && (
                <div className="flex flex-col items-center justify-center py-24 space-y-6">
                  {/* Spinner */}
                  <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin" />

                  <h3 className="text-xl font-semibold text-gray-800">
                    Submitting your claim…
                  </h3>

                  <p className="text-sm text-gray-500 text-center max-w-md">
                    Please wait while we securely upload your documents and create your case.
                    Do not close this page.
                  </p>
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
            </div>

            {/* ACTION BAR */}
            <div className="flex items-center justify-between border-t pt-4">
              {step > 0 && step < 7 && (
                <button
                  onClick={back}
                  className="px-4 py-2 rounded-lg border text-sm"
                >
                  Back
                </button>
              )}


              {step < 7 && !isSubmitting && (
                <button
                  onClick={() => {
                    if (step === 6) submitClaim();
                    else next();
                  }}
                  disabled={
                    (step === 0 && !isStep0Valid()) ||
                    (step === 1 && !isStep1Valid()) ||
                    (step === 2 && !isStep2Valid()) ||
                    (step === 3 && !isStep3Valid()) ||
                    (step === 4 && !isStep4Valid()) ||
                    (step === 5 && !allPassengersSigned) ||

                    (step === 6 && !acceptTerms)
                  }
                  className="ml-auto px-6 py-2 rounded-lg text-sm font-semibold bg-orange-500 text-white hover:bg-orange-600 disabled:bg-gray-300"
                >
                  {step === 6 ? "Submit Claim" : "Continue →"}
                </button>
              )}


            </div>
          </main>
        </div>
      </div>

      {/* ANIMATION */}
      <style>{`
        .animate-fade {
          animation: fade 0.25s ease-out;
        }
        @keyframes fade {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
