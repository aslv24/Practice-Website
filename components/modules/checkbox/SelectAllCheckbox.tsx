"use client"

type CheckboxOptions = {
  option1: boolean
  option2: boolean
  option3: boolean
}

type Props = {
  setOptions: React.Dispatch<React.SetStateAction<CheckboxOptions>>
}

export default function SelectAllCheckbox({ setOptions }: Props) {
  const handleSelectAll = (value: boolean) => {
    setOptions({
      option1: value,
      option2: value,
      option3: value
    })
  }

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md transition hover:shadow-lg">
      <h2 className="mb-4 text-lg font-semibold text-gray-800">
        Select / Unselect All
      </h2>

      <div className="flex gap-4">
        <button
          onClick={() => handleSelectAll(true)}
          className="rounded-lg bg-green-500 px-5 py-2 font-medium text-white transition hover:bg-green-600"
        >
          Select All
        </button>

        <button
          onClick={() => handleSelectAll(false)}
          className="rounded-lg bg-red-500 px-5 py-2 font-medium text-white transition hover:bg-red-600"
        >
          Unselect All
        </button>
      </div>
    </div>
  )
}
