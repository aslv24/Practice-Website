"use client"

type CheckboxOptions = {
  option1: boolean
  option2: boolean
  option3: boolean
}

type Props = {
  options: CheckboxOptions
  setOptions: React.Dispatch<React.SetStateAction<CheckboxOptions>>
}

export default function MultipleCheckbox({ options, setOptions }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target

    setOptions((prev) => ({
      ...prev,
      [name]: checked
    }))
  }

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md transition hover:shadow-lg">
      <h2 className="mb-4 text-lg font-semibold text-gray-800">
        Multiple Checkboxes
      </h2>

      <div className="space-y-3">
        {(["option1", "option2", "option3"] as const).map((opt, index) => (
          <label key={opt} className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              name={opt}
              checked={options[opt]}
              onChange={handleChange}
              className="h-5 w-5 accent-blue-600"
            />
            <span className="text-gray-700">Option {index + 1}</span>
          </label>
        ))}
      </div>
    </div>
  )
}
