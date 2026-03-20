"use client"

type Props = {
  selectedDate: string
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>
}

export default function DateInput({ selectedDate, setSelectedDate }: Props) {

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition border">

      <h2 className="text-lg font-semibold mb-4 text-blue-600">
        📅 Date Picker (SendKeys)
      </h2>

      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        data-testid="date-input"
        className="border px-3 py-2 rounded w-full focus:ring-2 focus:ring-blue-400"
      />

    </div>
  )
}