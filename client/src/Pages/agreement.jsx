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
                {eSignatures.length > 0 && (
<div className="absolute right-6 bottom-6 space-y-4 text-right">
{eSignatures.map((sig, i) => (
<div key={i}>
<img
src={sig.signatureData}
alt={`Signature ${i + 1}`}
className="h-16 ml-auto"
/>
<p className="text-xs text-gray-500">
{sig.passengerName}
</p>
</div>
))}
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