"use client"

import { useState } from "react"

type BasicFormState = {
  name: string
  email: string
  gender: string
  course: string
  agree: boolean
}

export default function BasicForm() {
  const [form, setForm] = useState<BasicFormState>({
    name: "",
    email: "",
    gender: "",
    course: "",
    agree: false
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target

    setForm((prev) => ({
      ...prev,
      [name]: e.target instanceof HTMLInputElement && e.target.type === "checkbox"
        ? e.target.checked
        : value
    }))
  }

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">Basic Form</h2>

      <div className="space-y-4">
        <div>
          <label htmlFor="basic-form-name" className="text-sm text-gray-600">
            Name
          </label>
          <input
            id="basic-form-name"
            name="name"
            placeholder="Enter Name"
            value={form.name}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border p-2"
          />
        </div>

        <div>
          <label htmlFor="basic-form-email" className="text-sm text-gray-600">
            Email
          </label>
          <input
            id="basic-form-email"
            type="email"
            name="email"
            placeholder="Enter Email"
            value={form.email}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border p-2"
          />
        </div>

        <div>
          <span className="text-sm text-gray-600">Gender</span>
          <div className="mt-1 flex gap-4">
            <label>
              <input type="radio" name="gender" value="male" onChange={handleChange} /> Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                onChange={handleChange}
              />{" "}
              Female
            </label>
          </div>
        </div>

        <div>
          <label htmlFor="basic-form-course" className="text-sm text-gray-600">
            Course
          </label>
          <select
            id="basic-form-course"
            name="course"
            value={form.course}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border p-2"
          >
            <option value="">Select Course</option>
            <option value="selenium">Selenium</option>
            <option value="playwright">Playwright</option>
          </select>
        </div>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="agree"
            checked={form.agree}
            onChange={handleChange}
          />
          Accept Terms
        </label>
      </div>

      <div className="mt-4 rounded bg-gray-100 p-3 text-sm">
        <strong>Filled Data:</strong>
        <pre>{JSON.stringify(form, null, 2)}</pre>
      </div>
    </div>
  )
}
