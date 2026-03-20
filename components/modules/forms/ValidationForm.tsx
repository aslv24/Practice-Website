"use client"

import { useState } from "react"

export default function ValidationForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSubmit = async () => {
    setError("")
    setSuccess("")

    if (!name || !email) {
      setError("All fields are required")
      return
    }

    if (!email.includes("@")) {
      setError("Invalid email format")
      return
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setSuccess("Form submitted successfully.")
      setName("")
      setEmail("")
    } catch {
      setError("Something went wrong")
    }
  }

  return (
    <div className="mx-auto max-w-md rounded-lg border p-5 shadow">
      <h2 className="mb-4 text-xl font-bold">Validation Form</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          void handleSubmit()
        }}
      >
        <div className="mb-3">
          <label htmlFor="validation-name" className="mb-1 block">
            Name
          </label>
          <input
            id="validation-name"
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded border px-3 py-2"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="validation-email" className="mb-1 block">
            Email
          </label>
          <input
            id="validation-email"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded border px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Submit
        </button>
      </form>

      {error && <p className="mt-3 text-red-500">{error}</p>}
      {success && <p className="mt-3 text-green-600">{success}</p>}
    </div>
  )
}
