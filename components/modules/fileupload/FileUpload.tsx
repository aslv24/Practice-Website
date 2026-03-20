"use client"

import { useState } from "react"

export default function SingleFileUpload() {

  const [fileName, setFileName] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setFileName(file.name)
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border">

      <h2 className="text-lg font-semibold mb-4 text-blue-600">
        📄 File Upload (Styled)
      </h2>

      {/* Hidden input */}
      <input
        type="file"
        id="singleUpload"
        onChange={handleChange}
        className="hidden"
      />

      {/* Button */}
      <label
        htmlFor="singleUpload"
        className="cursor-pointer inline-block bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Choose File
      </label>

      {/* File name */}
      <p className="mt-3 text-sm text-gray-600">
        {fileName ? `Selected: ${fileName}` : "No file selected"}
      </p>

    </div>
  )
}