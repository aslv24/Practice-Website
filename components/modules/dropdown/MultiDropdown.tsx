"use client"

type Props = {
  multiSelected: string[]
  setMultiSelected: React.Dispatch<React.SetStateAction<string[]>>
}

export default function MultiDropdown({ multiSelected, setMultiSelected }: Props) {

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const values = Array.from(e.target.selectedOptions, option => option.value)
    setMultiSelected(values)
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition border border-gray-100">

      <h2 className="text-lg font-semibold mb-4 text-gray-800">
        Multi Select Dropdown
      </h2>

      <select
        multiple
        value={multiSelected}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg p-2 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="java">Java</option>
<option value="python">Python</option>
<option value="javascript">JavaScript</option>
<option value="typescript">TypeScript</option>
<option value="csharp">C#</option>
<option value="kotlin">Kotlin</option>
<option value="selenium">Selenium</option>
<option value="playwright">Playwright</option>
<option value="cypress">Cypress</option>
<option value="appium">Appium</option>
<option value="manual-testing">Manual Testing</option>
<option value="automation-testing">Automation Testing</option>
<option value="api-testing">API Testing</option>
<option value="performance-testing">Performance Testing</option>
      </select>

      <p className="mt-3 text-sm text-gray-600">
        Selected: {multiSelected.length > 0 ? multiSelected.join(", ") : "None"}
      </p>

    </div>
  )
}