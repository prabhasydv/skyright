import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../Auth/config";

const statusBadge = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  completed: "bg-green-100 text-green-700 border-green-200",
  cancelled: "bg-red-100 text-red-700 border-red-200",
};

const AdminClaims = () => {
  const [claims, setClaims] = useState([]);
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [searchClaimId, setSearchClaimId] = useState(""); // ✅ FILTER STATE
  const token = localStorage.getItem("token");

  /* ================= FETCH CLAIMS ================= */
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/v1/admin/claims`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setClaims(data.claims || []))
      .catch(console.error);
  }, [token]);

  /* ================= FILTER LOGIC ================= */
  const filteredClaims = claims.filter((claim) =>
    claim._id.toLowerCase().includes(searchClaimId.toLowerCase())
  );

  /* ================= UPDATE STATUS ================= */
  const updateStatus = async (id, status) => {
    await fetch(`${API_BASE_URL}/api/v1/admin/claims/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    setClaims((prev) =>
      prev.map((c) => (c._id === id ? { ...c, status } : c))
    );
  };

  /* ================= UI ================= */
  return (
    <div className="pt-32 pb-20 px-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Admin · Claims
            </h1>
            <p className="text-gray-600 mt-2">
              Review claims, agreements, and documents
            </p>
          </div>

          <div className="text-sm text-gray-500">
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search by Claim ID"
              value={searchClaimId}
              onChange={(e) => setSearchClaimId(e.target.value)}
              className="px-4 py-2 rounded-xl border focus:ring-2 focus:ring-orange-500 outline-none text-sm w-64"
            />
            <span className="text-sm text-gray-500">
              Showing <b>{filteredClaims.length}</b> / {claims.length}
            </span>
          </div>
            Total claims:{" "}
            <span className="font-semibold">{claims.length}</span>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-3xl shadow-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="p-4 text-left">User</th>
                  <th className="p-4 text-left">Route</th>
                  <th className="p-4 text-left">Disrupted Flight</th>
                  <th className="p-4 text-left">Disruption</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Documents</th>
                  <th className="p-4 text-left">Action</th>
                </tr>
              </thead>

              <tbody>
  {filteredClaims.map((claim) => {
    const disrupted = claim.segments?.find((s) => s.disrupted);

    return (
      <tr
        key={claim._id}
        onClick={() => setSelectedClaim(claim)}
        className="border-t hover:bg-orange-50 cursor-pointer"
      >
        {/* USER */}
        <td className="p-4">
          <p className="font-semibold">
            {claim.user?.name || "—"}
          </p>
          <p className="text-xs text-gray-500">
            {claim.user?.email}
          </p>
        </td>

        {/* ROUTE */}
        <td className="p-4">
          {claim.departure?.iata} → {claim.destination?.iata}
        </td>

        {/* FLIGHT */}
        <td className="p-4">
          <p className="font-medium">
            {disrupted?.airlineName}
          </p>
          <p className="text-xs text-gray-500">
            {disrupted?.flightNumber} · {disrupted?.flightDate}
          </p>
        </td>

        {/* DISRUPTION */}
        <td className="p-4">{claim.disruptionType}</td>

        {/* STATUS */}
        <td className="p-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold border capitalize ${statusBadge[claim.status]}`}
          >
            {claim.status}
          </span>
        </td>

        {/* DOCUMENTS */}
        <td className="p-4">
          <div className="flex flex-wrap gap-2">
            {claim.agreements?.map((ag, i) => (
              <a
                key={i}
                href={`${API_BASE_URL}/${ag.path}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold"
              >
                Agreement
              </a>
            ))}
          </div>
        </td>

        {/* ACTION */}
        <td className="p-4">
          <select
            value={claim.status}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) =>
              updateStatus(claim._id, e.target.value)
            }
            className="px-3 py-2 rounded-xl border bg-white"
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </td>
      </tr>
    );
  })}

  {filteredClaims.length === 0 && (
    <tr>
      <td colSpan={7} className="text-center py-10 text-gray-400">
        No claims found
      </td>
    </tr>
  )}
</tbody>

            </table>
          </div>
        </div>
      </div>

      {/* ================= CLAIM DETAILS MODAL ================= */}
{selectedClaim && (
  <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-6">
    <div className="bg-gray-50 w-full max-w-6xl rounded-3xl shadow-2xl overflow-hidden">

      {/* HEADER */}
      <div className="flex items-center justify-between px-8 py-6 bg-white border-b">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            Claim Details
          </h2>
          <p className="text-xs text-gray-400 pt-2">
                      Claim ID:     {selectedClaim._id.slice(0, 7).toUpperCase()}

                    </p>
        </div>

        <button
          onClick={() => setSelectedClaim(null)}
          className="text-2xl text-gray-400 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      {/* CONTENT */}
      <div className="p-8 space-y-8 max-h-[85vh] overflow-y-auto">

        {/* META GRID */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-5 border">
            <p className="text-xs text-gray-500">Status</p>
            <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold capitalize ${statusBadge[selectedClaim.status]}`}>
              {selectedClaim.status}
            </span>
          </div>

          <div className="bg-white rounded-2xl p-5 border">
            <p className="text-xs text-gray-500">Created</p>
            <p className="font-medium">
              {new Date(selectedClaim.createdAt).toLocaleString()}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 border">
            <p className="text-xs text-gray-500">Last Updated</p>
            <p className="font-medium">
              {new Date(selectedClaim.updatedAt).toLocaleString()}
            </p>
          </div>
        </div>

        {/* USER & ROUTE */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-6 border">
            <h3 className="font-semibold text-lg mb-4">Passenger Account</h3>
            <p><b>Name:</b> {selectedClaim.user?.name}</p>
            <p><b>Email:</b> {selectedClaim.user?.email}</p>
            <p className="text-xs text-gray-500 mt-2">
              User ID: {selectedClaim.user?._id}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border">
            <h3 className="font-semibold text-lg mb-4">Route</h3>
            <p className="text-xl font-bold">
              {selectedClaim.departure?.iata} → {selectedClaim.destination?.iata}
            </p>
            <p className="mt-2">
              Connected Flight: <b>{selectedClaim.connectedFlight}</b>
            </p>
            {selectedClaim.stops && <p>Stops: {selectedClaim.stops}</p>}
            {selectedClaim.connections?.length > 0 && (
  <p className="text-sm text-gray-600">
    <span className="font-medium">Connections:</span>{" "}
    {selectedClaim.connections
      .map((c) =>
        c?.iata && c?.name
          ? `${c.iata} (${c.name})`
          : c?.iata || c?.name
      )
      .join(", ")}
  </p>
)}

          </div>
        </div>

        {/* FLIGHT SEGMENTS */}
<div className="bg-white rounded-2xl p-6 border">
  <div className="flex items-center justify-between mb-4">
    <h3 className="font-semibold text-lg">Flight Segments</h3>

    {selectedClaim.pnr && (
      <span className="text-sm text-gray-600">
        <span className="font-medium">PNR:</span>{" "}
        <span className="font-mono">{selectedClaim.pnr}</span>
      </span>
    )}
  </div>

  <div className="space-y-4">
    {selectedClaim.segments.map((s, i) => (
      <div
        key={i}
        className={`p-4 rounded-xl border flex items-center justify-between ${
          s.disrupted ? "bg-red-50 border-red-400" : "bg-gray-50"
        }`}
      >
        <div>
          <p className="font-semibold">
            {s.from?.iata} → {s.to?.iata}
          </p>
          <p className="text-sm text-gray-600">
            {s.airlineName} · {s.flightNumber} · {s.flightDate}
          </p>
        </div>

        {s.disrupted && (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-500 text-white">
            DISRUPTED
          </span>
        )}
      </div>
    ))}
  </div>
</div>


        {/* DISRUPTION DETAILS */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-6 border">
            <h3 className="font-semibold text-lg mb-4">Disruption</h3>
            <p><b>Type:</b> {selectedClaim.disruptionType}</p>
            <p><b>Delay:</b> {selectedClaim.delayDuration}</p>
            <p><b>Reason Known:</b> {selectedClaim.disruptionReasonKnown}</p>
            <p><b>Reason:</b> {selectedClaim.disruptionReason}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border">
            <h3 className="font-semibold text-lg mb-4">Passengers</h3>
            <ul className="list-disc ml-6">
              {selectedClaim.passengers.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>
        </div>


        {/* CONTACT & CONSENT INFO */}
<div className="grid md:grid-cols-2 gap-8">
  {/* CONTACT DETAILS */}
  <div className="bg-white rounded-2xl p-6 border">
    <h3 className="font-semibold text-lg mb-4">
      Contact details (provided in claim)
    </h3>

    <p>
      <b>Email:</b>{" "}
      {selectedClaim.email || (
        <span className="text-gray-400">Not provided</span>
      )}
    </p>

    <p className="mt-2">
      <b>Phone:</b>{" "}
      {selectedClaim.phone
        ? `${selectedClaim.countryCode || ""} ${selectedClaim.phone}`
        : "—"}
    </p>

    <p className="mt-2">
      <b>Address:</b>{" "}
      {selectedClaim.address || "—"}
    </p>
  </div>

  {/* CONSENT / META */}
  <div className="bg-white rounded-2xl p-6 border">
    <h3 className="font-semibold text-lg mb-4">
      Consent & Metadata
    </h3>

    <p>
      <b>IP Address:</b>{" "}
      {selectedClaim.ipAddress || "—"}
    </p>

    <p className="mt-2">
      <b>Submitted on:</b>{" "}
      {new Date(selectedClaim.createdAt).toLocaleString()}
    </p>

    <p className="mt-2 text-xs text-gray-500">
      IP address and timestamp recorded for legal consent verification.
    </p>
  </div>
</div>


        {/* SIGNATURES */}
        <div className="bg-white rounded-2xl p-6 border">
          <h3 className="font-semibold text-lg mb-4">E-Signatures</h3>

          <div className="flex flex-wrap gap-8">
            {selectedClaim.eSignatures.map((sig, i) => (
              <div key={i} className="text-center">
                <img
                  src={sig.signatureData}
                  alt="Signature"
                  className="h-24 border rounded-lg bg-white"
                />
                <p className="text-sm font-medium mt-2">
                  {sig.passengerName}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(sig.signedAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* DOCUMENTS */}
        <div className="bg-white rounded-2xl p-6 border">
          <h3 className="font-semibold text-lg mb-4">Documents</h3>

          <div className="flex flex-wrap gap-4">
            {/* {selectedClaim.agreement && (
              <a
                href={`http://localhost:8080/${selectedClaim.agreement.path}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-green-100 text-green-800 font-semibold hover:bg-green-200"
              >
                📄 Agreement PDF
              </a>
            )} */}

{selectedClaim.agreements?.map((ag, i) => (
  <a
    key={i}
    href={`${API_BASE_URL}/${ag.path}`}
    target="_blank"
    rel="noopener noreferrer"
    className="px-5 py-3 rounded-xl bg-green-100 text-green-800 font-semibold hover:bg-green-200"
  >
    📄 Agreement
  </a>
))}

            {selectedClaim.boardingPasses.map((bp, i) => (
              <a
                key={i}
                href={`${API_BASE_URL}/${bp.path}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-orange-100 text-orange-800 font-semibold hover:bg-orange-200"
              >
                ✈️ Boarding Pass {i + 1}
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  </div>
)}


    </div>
  );
};

export default AdminClaims;
