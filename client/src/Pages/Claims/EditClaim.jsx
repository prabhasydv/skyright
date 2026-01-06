import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../Auth/config";

export default function EditClaim() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [claim, setClaim] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  /* ================= FETCH CLAIM ================= */
  useEffect(() => {
    if (!id) return;

    const fetchClaim = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/api/v1/claims/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = await res.json();
        setClaim(data.claim || data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchClaim();
  }, [id, token]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading claim…
      </div>
    );
  }

  if (!claim) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Claim not found
      </div>
    );
  }

  /* ================= SAVE ================= */
  const saveChanges = async (e) => {
    e.preventDefault();
    setSaving(true);

    await fetch(`${API_BASE_URL}/api/v1/claims/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        segments: claim.segments,
        disruptionType: claim.disruptionType,
        delayDuration:
          claim.disruptionType === "Cancelled"
            ? ""
            : claim.delayDuration,
        disruptionReasonKnown: claim.disruptionReasonKnown,
        disruptionReason: claim.disruptionReason,
        passengers: claim.passengers,
      }),
    });

    setSaving(false);
    navigate("/claim-status");
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-orange-100 via-white to-orange-200 px-4 pt-28 pb-16">
      <div className="max-w-4xl mx-auto backdrop-blur-xl bg-white/80 rounded-[2rem] shadow-2xl border border-white/60 p-10">

        {/* HEADER */}
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            Edit Your Claim
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Claim ID · {claim._id.slice(0, 5).toUpperCase()}
          </p>
        </div>

        <form onSubmit={saveChanges} className="space-y-12">

          {/* ROUTE */}
          <div className="rounded-2xl bg-gradient-to-r from-gray-50 to-gray-100 p-6 border">
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              Route
            </p>
            <p className="text-2xl font-bold mt-1">
              {claim.departure?.iata} → {claim.destination?.iata}
            </p>
          </div>

          {/* FLIGHT SEGMENTS */}
          <div className="space-y-5">
            <h3 className="text-xl font-semibold">Flight Segments</h3>

            {claim.segments.map((seg, i) => (
              <div
                key={i}
                className="rounded-2xl border bg-white p-5 space-y-4 shadow-sm"
              >
                <p className="font-semibold">
                  {seg.from?.iata} → {seg.to?.iata}
                </p>

                <input
                  type="date"
                  value={seg.flightDate}
                  onChange={(e) => {
                    const updated = [...claim.segments];
                    updated[i].flightDate = e.target.value;
                    setClaim({ ...claim, segments: updated });
                  }}
                  className="w-full px-5 py-3 rounded-full border focus:ring-2 focus:ring-orange-500"
                />

                <input
                  value={seg.flightNumber}
                  onChange={(e) => {
                    const updated = [...claim.segments];
                    updated[i].flightNumber = e.target.value;
                    setClaim({ ...claim, segments: updated });
                  }}
                  placeholder="Flight number"
                  className="w-full px-5 py-3 rounded-full border focus:ring-2 focus:ring-orange-500"
                />
              </div>
            ))}
          </div>

          {/* DISRUPTION TYPE */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Disruption Type</h3>

            <div className="grid sm:grid-cols-3 gap-4">
              {["Delayed", "Cancelled", "Denied boarding"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() =>
                    setClaim({
                      ...claim,
                      disruptionType: type,
                      delayDuration: "",
                    })
                  }
                  className={`py-4 rounded-2xl font-semibold border transition-all
                    ${
                      claim.disruptionType === type
                        ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg scale-[1.03]"
                        : "bg-white hover:bg-orange-50"
                    }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {(claim.disruptionType === "Delayed" ||
              claim.disruptionType === "Denied boarding") && (
              <select
                value={claim.delayDuration}
                onChange={(e) =>
                  setClaim({ ...claim, delayDuration: e.target.value })
                }
                className="w-full px-6 py-4 rounded-full border focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Select delay duration</option>
                <option value="Less than 2 hours">
                  Less than 2 hours
                </option>
                <option value="More than 2 hours">
                  More than 2 hours
                </option>
              </select>
            )}
          </div>

          {/* REASON (YES / NO / DON'T REMEMBER) */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">
              Reason for disruption
            </h3>

            <select
              value={claim.disruptionReasonKnown || ""}
              onChange={(e) =>
                setClaim({
                  ...claim,
                  disruptionReasonKnown: e.target.value,
                  disruptionReason: "",
                })
              }
              className="w-full px-6 py-4 rounded-full border focus:ring-2 focus:ring-orange-500"
            >
              <option value="">
                Did airline tell you the reason?
              </option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="Don’t remember">Don’t remember</option>
            </select>

            {claim.disruptionReasonKnown === "Yes" && (
              <select
                value={claim.disruptionReason || ""}
                onChange={(e) =>
                  setClaim({
                    ...claim,
                    disruptionReason: e.target.value,
                  })
                }
                className="w-full px-6 py-4 rounded-full border focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Reason provided</option>
                <option value="Technical issue">
                  Technical issue
                </option>
                <option value="Weather">Weather</option>
                <option value="Staff shortage">
                  Staff shortage
                </option>
                <option value="Air traffic control">
                  Air traffic control
                </option>
              </select>
            )}
          </div>

          {/* PASSENGERS */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Passengers</h3>

            {claim.passengers.map((p, i) => (
              <input
                key={i}
                value={p}
                onChange={(e) => {
                  const updated = [...claim.passengers];
                  updated[i] = e.target.value;
                  setClaim({ ...claim, passengers: updated });
                }}
                className="w-full px-6 py-4 rounded-full border focus:ring-2 focus:ring-orange-500"
              />
            ))}
          </div>

          {/* ACTIONS */}
          <div className="flex gap-5 pt-8">
            <button
              type="button"
              onClick={() => navigate("/claim-status")}
              className="flex-1 py-4 rounded-full border font-semibold hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              disabled={saving}
              className="flex-1 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-90 disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save Changes"}
            </button>
          </div>

        </form>
      </div>
    </section>
  );
}
