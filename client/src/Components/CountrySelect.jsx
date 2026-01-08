import { Listbox } from "@headlessui/react"
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/20/solid"

export default function CountryCodeSelect({
  value,
  onChange,
  countries,
}) {
  const selected = countries.find((c) => c.dialCode === value)

  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative">
        {/* CLOSED STATE */}
        <Listbox.Button
          className="flex-1 px-6 py-4 rounded-2xl border border-gray-300 aligh-center"
        >
          <span>{selected?.dialCode}</span>
          <ChevronUpDownIcon
            className="absolute right-1 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
          />
        </Listbox.Button>

        {/* OPENED DROPDOWN */}
        <Listbox.Options
          className="absolute z-50 mt-2 max-h-60 w-64 overflow-auto
                     rounded-xl bg-white shadow-lg border border-gray-200
                     focus:outline-none text-sm"
        >
          {countries.map((c) => (
            <Listbox.Option
              key={c.iso2}
              value={c.dialCode}
              className={({ active }) =>
                `cursor-pointer select-none px-4 py-3 ${
                  active ? "bg-orange-50 text-orange-600" : "text-gray-900"
                }`
              }
            >
              {({ selected }) => (
                <div className="flex justify-between items-center">
                  <span>
                    {c.name} ({c.dialCode})
                  </span>
                  {selected && (
                    <CheckIcon className="h-4 w-4 text-orange-500" />
                  )}
                </div>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  )
}
