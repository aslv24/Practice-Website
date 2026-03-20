"use client"

import { useState } from "react"

export default function FileUpload() {

  const [fileName, setFileName] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setFileName(file.name)
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border">

      <h2 className="text-lg font-semibold mb-4 text-blue-600">
        📥 File Upload (Input Tag)
      </h2>

      {/* REAL INPUT (Important for Selenium) */}
      <input
        type="file"
        id="fileUploadInput"
        onChange={handleChange}
        className="block w-full text-sm text-gray-600
        file:mr-4 file:py-2 file:px-4
        file:rounded-lg file:border-0
        file:bg-blue-600 file:text-white
        hover:file:bg-blue-700"
      />

      <p className="mt-3 text-sm text-gray-600">
        {fileName ? `Selected: ${fileName}` : "No file selected"}
      </p>

    </div>
  )
}