"use client"

export default function NewWindow() {

  const openWindow = () => {
    window.open(
      "https://www.naukri.com",
      "_blank",
      "width=800,height=600"
    )
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition border border-gray-100">

      <h2 className="text-lg font-semibold mb-4 text-gray-800">
        Open New Window
      </h2>

      <p className="text-sm text-gray-500 mb-3">
        Click the button to open Naukri in a new window
      </p>

      <button
        onClick={openWindow}
        className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg transition"
      >
        Open Naukri (Window)
      </button>

    </div>
  )
}