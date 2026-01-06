import { useEffect, useState } from "react";
import airports from "../assets/airports.json";

const AirportSelect = ({ label, placeholder, onSelect }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase();

    const filtered = airports
      .filter((a) => {
        if (!a || a.type !== "airport" || !a.iata) return false;

        const iata = a.iata.toLowerCase();
        const name = a.name ? a.name.toLowerCase() : "";

        // Exact IATA match when 3 letters typed
        if (q.length === 3) {
          return iata === q;
        }

        // Otherwise search by name
        return name.includes(q);
      })
      .slice(0, 10);

    setResults(filtered);
  }, [query]);

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      <input
        type="text"
        value={query}
        placeholder={placeholder}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        className="w-full px-5 py-4 rounded-full border border-orange-200 focus:ring-2 focus:ring-orange-400 focus:outline-none text-sm shadow-sm"
      />

      {open && results.length > 0 && (
        <ul className="absolute z-50 mt-2 w-full bg-white border border-orange-200 rounded-2xl shadow-lg max-h-72 overflow-auto">
          {results.map((a) => (
            <li
              key={a.iata}
              onClick={() => {
                setQuery(`${a.name} (${a.iata})`);
                setOpen(false);
                onSelect?.(a);
              }}
              className="px-4 py-3 cursor-pointer hover:bg-orange-50"
            >
              <div className="font-medium">
                {a.name} ({a.iata})
              </div>
              <div className="text-xs text-gray-500">
                {a.iso} • {a.continent} • {a.size}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AirportSelect;
