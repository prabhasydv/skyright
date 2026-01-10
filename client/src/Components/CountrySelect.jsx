// import { Listbox } from "@headlessui/react"
// import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/20/solid"

// const INDIA_FALLBACK = {
//   name: "India",
//   iso2: "IN",
//   dialCode: "+91",
// }

// export default function CountryCodeSelect({
//   value,
//   onChange,
//   countries,
//    }) 
//    {
//   // const selected = countries.find((c) => c.dialCode === value)
//   const selected = countries.find(
//     (c) => (c.dialCode || c.dial_code) === value
//   )
//     let normalized = countries
//     .map((c) => ({
//       name: c.name,
//       iso2: (c.iso2 || c.code || "").toUpperCase(),
//       dialCode:
//         c.dialCode ||
//         c.dial_code ||
//         (c.callingCodes?.[0] && `+${c.callingCodes[0]}`),
//     }))
//     .filter((c) => c.name && c.dialCode)
  
//     if (!normalized.some((c) => c.dialCode === "+91")) {
//       normalized.unshift(INDIA_FALLBACK)
//     }

//   return (
//     <Listbox value={value} onChange={onChange}>
//       <div className="relative">
//         {/* CLOSED STATE */}
//         <Listbox.Button
//           className="flex items-center w-full px-4 sm:px-6 py-4 rounded-2xl border border-gray-300"
//           >
//           {/* <span>{selected?.dialCode}</span> */}
//           <span className="flex-1 text-left">
//             {selected?.dialCode || selected?.dial_code || "Code"}
//           </span>
//           <ChevronUpDownIcon
//             className="absolute right-1 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
//           />
//         </Listbox.Button>

//         {/* OPENED DROPDOWN */}
//         <Listbox.Options
//           className="absolute z-50 mt-2 max-h-60 w-64 overflow-auto
//                      rounded-xl bg-white shadow-lg border border-gray-200
//                      focus:outline-none text-sm"
//         >
//           {countries.map((c) => (
//             <Listbox.Option
//               key={c.iso2}
//               value={c.dialCode}
//               className={({ active }) =>
//                 `cursor-pointer select-none px-4 py-3 ${
//                   active ? "bg-orange-50 text-orange-600" : "text-gray-900"
//                 }`
//               }
//             >
//               {({ selected }) => (
//                 <div className="flex justify-between items-center">
//                   <span>
//                     {c.name} ({c.dialCode})
//                   </span>
//                   {selected && (
//                     <CheckIcon className="h-4 w-4 text-orange-500" />
//                   )}
//                 </div>
//               )}
//             </Listbox.Option>
//           ))}
//         </Listbox.Options>
//       </div>
//     </Listbox>
//   )
// }


import { Listbox } from "@headlessui/react"
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/20/solid"

const INDIA_FALLBACK = {
  name: "India",
  iso2: "IN",
  dialCode: "+91",
}

export default function CountryCodeSelect({
  value,
  onChange,
  countries,
}) {
  const normalized = countries
    .map((c) => ({
      name: c.name,
      iso2: (c.iso2 || c.code || "").toUpperCase(),
      dialCode:
        c.dialCode ||
        c.dial_code ||
        (c.callingCodes?.[0] && `+${c.callingCodes[0]}`),
    }))
    .filter((c) => c.name && c.dialCode)

  if (!normalized.some((c) => c.dialCode === "+91")) {
    normalized.unshift(INDIA_FALLBACK)
  }

  const selected = normalized.find((c) => c.dialCode === value)

  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative">
        {/* CLOSED STATE */}
        <Listbox.Button
          className="flex items-center w-full px-4 sm:px-6 py-4 rounded-2xl border border-gray-300"
        >
          <span className="flex-1 text-left">
            {selected?.dialCode || "Code"}
          </span>
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
          {normalized.map((c) => (
            <Listbox.Option
              key={`${c.iso2}-${c.dialCode}`}
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



