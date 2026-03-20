"use client"

import AlertCard from "./AlertCard"

export default function ConfirmAlert() {

  const handleConfirm = () => {
    const result = confirm("Do you want to proceed?")
    alert(result ? "You clicked OK" : "You clicked Cancel")
  }

  return (
    <AlertCard title="Confirmation Alert">
      <button
        onClick={handleConfirm}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Click for Confirm
      </button>
    </AlertCard>
  )
}