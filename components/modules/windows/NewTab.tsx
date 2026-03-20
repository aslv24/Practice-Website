"use client"

export default function NewTab() {

  const openTab = () => {
    window.open("https://www.naukri.com", "_blank")
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition border border-gray-100">

      <h2 className="text-lg font-semibold mb-4 text-gray-800">
        Open New Tab
      </h2>

      <p className="text-sm text-gray-500 mb-3">
        Click the button to open Naukri in a new tab
      </p>

      <button
        onClick={openTab}
        className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg transition"
      >
        Open Naukri (Tab)
      </button>

    </div>
  )
}