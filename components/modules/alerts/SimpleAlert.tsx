"use client"

import AlertCard from "./AlertCard"

export default function SimpleAlert() {

  const handleAlert = () => {
    alert("This is a simple alert!")
  }

  return (
    <AlertCard title="Simple Alert">
      <button
        onClick={handleAlert}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Click for Alert
      </button>
    </AlertCard>
  )
}
