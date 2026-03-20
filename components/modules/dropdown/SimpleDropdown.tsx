"use client"

type Props = {
  selected: string
  setSelected: React.Dispatch<React.SetStateAction<string>>
}

export default function SimpleDropdown({ selected, setSelected }: Props) {

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition border border-gray-100">

      <h2 className="text-lg font-semibold mb-4 text-gray-800">
        Simple Dropdown
      </h2>

      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">-- Select Course --</option>
        <option value="selenium">Selenium</option>
        <option value="playwright">Playwright</option>
        <option value="cypress">Cypress</option>
      </select>

      <p className="mt-3 text-sm text-gray-600">
        Selected: {selected || "None"}
      </p>

    </div>
  )
}