import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../Auth/config";

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-800",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const MyClaims = () => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/v1/claims/my`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setClaims(data.claims || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchClaims();
  }, [token]);

  const deleteClaim = async (id) => {
    if (!window.confirm("Delete this claim permanently?")) return;

    await fetch(`${API_BASE_URL}/api/v1/claims/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    setClaims((prev) => prev.filter((c) => c._id !== id));
  };

  if (loading) {
    return <div className="pt-40 text-center text-gray-500">Loading claims…</div>;
  }

  return (
    <div className="pt-32 pb-16 px-4 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-10 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
          My Claims
        </h1>

        {claims.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl text-center shadow-sm">
            <p className="text-gray-500 mb-4">No claims found ✈️</p>
            <button
              onClick={() => navigate("/check-compensation")}
              className="px-6 py-3 rounded-full bg-orange-500 text-white font-semibold"
            >
              Create Claim
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {claims.map((claim) => {
              const disruptedSegment = claim.segments?.find(
                (s) => s.disrupted === true
              );

              return (
                <div
                  key={claim._id}
                  className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition hover:-translate-y-1"
                >
                  {/* Route + Status */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-lg font-semibold">
                        {claim.departure?.iata} → {claim.destination?.iata}
                      </h2>
                      <p className="text-sm text-gray-500">
                        {disruptedSegment?.airlineName} ·{" "}
                        {disruptedSegment?.flightNumber}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                        statusStyles[claim.status]
                      }`}
                    >
                      {claim.status}
                    </span>
                  </div>

                  {/* Claim Details */}
                  <div className="text-sm text-gray-700 space-y-2">
                    <p>
                      <span className="font-medium">Flight date:</span>{" "}
                      {disruptedSegment?.flightDate}
                    </p>

                    <p>
                      <span className="font-medium">Disruption:</span>{" "}
                      {claim.disruptionType}
                    </p>

                    <p>
                      <span className="font-medium">Delay:</span>{" "}
                      {claim.delayDuration}
                    </p>

                    <p>
                      <span className="font-medium">Reason:</span>{" "}
                      {claim.disruptionReason}
                    </p>

                    <p>
                      <span className="font-medium">Passengers:</span>{" "}
                      {claim.passengers?.length}
                    </p>

                    <p className="text-xs text-gray-400 pt-2">
                      Claim ID:     {claim._id.slice(0, 7).toUpperCase()}

                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => navigate(`/claims/edit/${claim._id}`)}
                      className="flex-1 px-4 py-2 rounded-full text-sm font-semibold bg-orange-500 text-white hover:bg-orange-600 transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteClaim(claim._id)}
                      className="flex-1 px-4 py-2 rounded-full text-sm font-semibold bg-red-500 text-white hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyClaims;
