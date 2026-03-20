"use client"

type Props = {
  selected: string
  setSelected: React.Dispatch<React.SetStateAction<string>>
}

export default function GroupRadio({ selected, setSelected }: Props) {

  const options = [
    { label: "Selenium", value: "selenium" },
    { label: "Playwright", value: "playwright" },
    { label: "Cypress", value: "cypress" }
  ]

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition border border-gray-100">

      <h2 className="text-lg font-semibold mb-4 text-gray-800">
        Group Radio Buttons
      </h2>

      <div className="space-y-3">

        {options.map((opt) => (
          <label key={opt.value} className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="course"
              value={opt.value}
              checked={selected === opt.value}
              onChange={(e) => setSelected(e.target.value)}
              className="w-5 h-5 accent-blue-600"
            />
            <span className="text-gray-700">{opt.label}</span>
          </label>
        ))}

      </div>

      <p className="mt-3 text-sm font-medium text-gray-600">
        Selected: {selected || "None"}
      </p>

    </div>
  )
}