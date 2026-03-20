"use client"

export default function MultipleWindows() {

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition border border-gray-100">

      <h2 className="text-lg font-semibold mb-4 text-gray-800">
        Multiple Windows (Real Websites)
      </h2>

      <p className="text-sm text-gray-500 mb-4">
        Open each website individually (recommended for Selenium)
      </p>

      <div className="flex flex-wrap gap-3">

        <button
          onClick={() => window.open("https://www.facebook.com", "_blank")}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Facebook
        </button>

        <button
          onClick={() => window.open("https://www.instagram.com", "_blank")}
          className="bg-pink-500 text-white px-4 py-2 rounded-lg"
        >
          Instagram
        </button>

        <button
          onClick={() => window.open("https://www.linkedin.com", "_blank")}
          className="bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          LinkedIn
        </button>

        <button
          onClick={() => window.open("https://www.naukri.com", "_blank")}
          className="bg-yellow-500 text-black px-4 py-2 rounded-lg"
        >
          Naukri
        </button>

      </div>

    </div>
  )
}