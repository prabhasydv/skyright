import React, { useEffect, useRef, useState } from "react";
import AirportSelect from "../Components/AirportSelect";
import SignatureCanvas from "react-signature-canvas";
import { useNavigate } from "react-router-dom";

const steps = [
  "Eligibility",
  "Flight Details",
  "Disruption",
  "Reason",
  "Passengers",
  "E-Signature",
  "Documents",
];

const Compensation3 = () => {
  const navigate = useNavigate();
  const sigRef = useRef(null);
  const token = localStorage.getItem("token");

  const [step, setStep] = useState(0);
  const [signature, setSignature] = useState("");
  const [files, setFiles] = useState([]);

  const [formData, setFormData] = useState({
    departure: null,
    destination: null,
    connectedFlight: "",
    stops: 0,
    connections: [],
    segments: [],
    pnr: "",
    disruptionType: "",
    delayDuration: "",
    disruptionReasonKnown: "",
    disruptionReason: "",
    additional: "",
    passengers: [""],
  });

  /* ---------------- SEGMENTS AUTO BUILD ---------------- */
  useEffect(() => {
    if (!formData.departure || !formData.destination) return;

    const points = [
      formData.departure,
      ...formData.connections,
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

  /* ---------------- SUBMIT CLAIM ---------------- */
  const submitClaim = async () => {
    try {
      const fd = new FormData();

      // JSON fields
      Object.entries(formData).forEach(([key, value]) => {
        fd.append(key, JSON.stringify(value));
      });

      // signature
      fd.append("eSignature", signature);

      // documents
      files.forEach((file) => {
        fd.append("documents", file);
      });

      const res = await fetch("http://localhost:8080/api/v1/claims", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: fd,
      });

      const data = await res.json();
      if (!res.ok) {
        console.error("Backend error:", data);
        alert(data.message || "Backend rejected the claim");
        return;
      }

      navigate("/claim-status");
    } catch (err) {
      alert("Submission failed");
      console.error(err);
    }
  };

  /* ---------------- SIGNATURE ---------------- */
  const saveSignature = () => {
    if (sigRef.current.isEmpty()) {
      alert("Please sign");
      return;
    }
    setSignature(sigRef.current.toDataURL("image/png"));
    setStep(step + 1);
  };

  return (
    <div className="max-w-5xl mx-auto mt-24 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Flight Compensation Claim
      </h1>

      {/* ================= STEP 0 ================= */}
      {step === 0 && (
        <div className="space-y-6">
          <AirportSelect
            label="Departure Airport"
            onSelect={(v) => setFormData({ ...formData, departure: v })}
          />
          <AirportSelect
            label="Destination Airport"
            onSelect={(v) => setFormData({ ...formData, destination: v })}
          />

          <input
            placeholder="PNR (optional)"
            className="w-full border rounded-full px-4 py-2"
            value={formData.pnr}
            onChange={(e) =>
              setFormData({ ...formData, pnr: e.target.value })
            }
          />
        </div>
      )}

      {/* ================= STEP 1 ================= */}
      {step === 1 && (
        <div className="space-y-4">
          {formData.segments.map((seg, i) => (
            <div key={i} className="border p-4 rounded-xl space-y-3">
              <p className="font-semibold">
                {seg.from?.iata} → {seg.to?.iata}
              </p>

              <input
                type="date"
                className="w-full border rounded-full px-4 py-2"
                onChange={(e) => {
                  const s = [...formData.segments];
                  s[i].flightDate = e.target.value;
                  setFormData({ ...formData, segments: s });
                }}
              />

              <input
                placeholder="Airline"
                className="w-full border rounded-full px-4 py-2"
                onChange={(e) => {
                  const s = [...formData.segments];
                  s[i].airlineName = e.target.value;
                  setFormData({ ...formData, segments: s });
                }}
              />

              <input
                placeholder="Flight Number"
                className="w-full border rounded-full px-4 py-2"
                onChange={(e) => {
                  const s = [...formData.segments];
                  s[i].flightNumber = e.target.value;
                  setFormData({ ...formData, segments: s });
                }}
              />

              <label className="flex gap-2">
                <input
                  type="radio"
                  name="disrupted"
                  onChange={() => {
                    const s = formData.segments.map((x, idx) => ({
                      ...x,
                      disrupted: idx === i,
                    }));
                    setFormData({ ...formData, segments: s });
                  }}
                />
                Disrupted flight
              </label>
            </div>
          ))}
        </div>
      )}

      {/* ================= STEP 2 ================= */}
      {step === 2 && (
        <div className="space-y-4">
          <select
            className="w-full border rounded-full px-4 py-2"
            onChange={(e) =>
              setFormData({ ...formData, disruptionType: e.target.value })
            }
          >
            <option value="">Disruption type</option>
            <option>Delayed</option>
            <option>Cancelled</option>
            <option>Denied boarding</option>
          </select>

          <select
            className="w-full border rounded-full px-4 py-2"
            onChange={(e) =>
              setFormData({ ...formData, delayDuration: e.target.value })
            }
          >
            <option value="">Delay duration</option>
            <option>Less than 3 hours</option>
            <option>More than 3 hours</option>
          </select>
        </div>
      )}

      {/* ================= STEP 3 ================= */}
      {step === 3 && (
        <div className="space-y-4">
          <select
            className="w-full border rounded-full px-4 py-2"
            onChange={(e) =>
              setFormData({
                ...formData,
                disruptionReasonKnown: e.target.value,
              })
            }
          >
            <option value="">Reason known?</option>
            <option>Yes</option>
            <option>No</option>
          </select>

          <input
            placeholder="Reason"
            className="w-full border rounded-full px-4 py-2"
            onChange={(e) =>
              setFormData({
                ...formData,
                disruptionReason: e.target.value,
              })
            }
          />
        </div>
      )}

      {/* ================= STEP 4 ================= */}
      {step === 4 && (
        <div className="space-y-4">
          {formData.passengers.map((p, i) => (
            <input
              key={i}
              placeholder={`Passenger ${i + 1}`}
              className="w-full border rounded-full px-4 py-2"
              value={p}
              onChange={(e) => {
                const arr = [...formData.passengers];
                arr[i] = e.target.value;
                setFormData({ ...formData, passengers: arr });
              }}
            />
          ))}

          <button
            onClick={() =>
              setFormData({
                ...formData,
                passengers: [...formData.passengers, ""],
              })
            }
            className="px-4 py-2 bg-gray-200 rounded-full"
          >
            + Add Passenger
          </button>
        </div>
      )}

      {/* ================= STEP 5 ================= */}
      {step === 5 && (
        <div>
          <SignatureCanvas
            ref={sigRef}
            canvasProps={{
              width: 600,
              height: 200,
              className: "border rounded-xl",
            }}
          />
          <button
            onClick={saveSignature}
            className="mt-4 px-6 py-2 bg-black text-white rounded-full"
          >
            Save Signature
          </button>
        </div>
      )}

      {/* ================= STEP 6 ================= */}
      {step === 6 && (
        <div className="space-y-4">
          <input
            type="file"
            multiple
            onChange={(e) => setFiles([...e.target.files])}
          />

          <button
            onClick={submitClaim}
            className="w-full py-3 bg-orange-500 text-white rounded-full"
          >
            Submit Claim
          </button>
        </div>
      )}

      {/* NAVIGATION */}
      <div className="flex justify-between mt-10">
        {step > 0 && (
          <button onClick={() => setStep(step - 1)}>Back</button>
        )}
        {step < steps.length - 1 && (
          <button
            onClick={() => setStep(step + 1)}
            className="px-6 py-2 bg-orange-500 text-white rounded-full"
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
};

export default Compensation3;
