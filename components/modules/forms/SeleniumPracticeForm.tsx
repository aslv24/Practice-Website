"use client"

import { useMemo, useState } from "react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { countries, type Country } from "@/data/countries"

type FormState = {
  fullName: string
  email: string
  phone: string
  topic: string
  gender: string
  countrySearch: string
  countryCode: string
  practiceDate: string
  receiveUpdates: boolean
  acceptedTerms: boolean
  skills: string[]
}

type SubmittedFormState = FormState & {
  selectedCountry: string
}

const topics = [
  "Selenium WebDriver",
  "Playwright",
  "API Testing",
  "Performance Testing"
]

const skillOptions = [
  "Text Field",
  "Dropdown",
  "Checkbox",
  "Radio Button",
  "Suggestion List",
  "Calendar",
  "Alert"
]

const emptyForm: FormState = {
  fullName: "",
  email: "",
  phone: "",
  topic: "",
  gender: "",
  countrySearch: "",
  countryCode: "",
  practiceDate: "",
  receiveUpdates: false,
  acceptedTerms: false,
  skills: []
}

export default function SeleniumPracticeForm() {
  const [form, setForm] = useState<FormState>(emptyForm)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [submittedData, setSubmittedData] = useState<SubmittedFormState | null>(null)
  const [formError, setFormError] = useState("")

  const filteredCountries = useMemo(() => {
    const query = form.countrySearch.trim().toLowerCase()

    if (!query) {
      return countries.slice(0, 8)
    }

    return countries
      .filter((country) => country.name.toLowerCase().includes(query))
      .slice(0, 8)
  }, [form.countrySearch])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target

    setForm((prev) => ({
      ...prev,
      [name]:
        e.target instanceof HTMLInputElement && e.target.type === "checkbox"
          ? e.target.checked
          : value
    }))
  }

  const handleSkillChange = (skill: string, checked: boolean) => {
    setForm((prev) => ({
      ...prev,
      skills: checked
        ? [...prev.skills, skill]
        : prev.skills.filter((item) => item !== skill)
    }))
  }

  const handleCountrySelect = (country: Country) => {
    setForm((prev) => ({
      ...prev,
      countrySearch: country.name,
      countryCode: country.code
    }))
    setShowSuggestions(false)
  }

  const handlePreviewAlert = () => {
    alert("Selenium practice alert triggered.")
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormError("")

    if (
      !form.fullName ||
      !form.email ||
      !form.topic ||
      !form.gender ||
      !form.countrySearch ||
      !form.practiceDate ||
      form.skills.length === 0 ||
      !form.acceptedTerms
    ) {
      setFormError("Please complete all required fields before submitting.")
      return
    }

    const submitted: SubmittedFormState = {
      ...form,
      selectedCountry: form.countryCode
        ? `${form.countrySearch} (${form.countryCode})`
        : form.countrySearch
    }

    setSubmittedData(submitted)
    alert("Form submitted successfully.")
  }

  const requiredMark = <span className="ml-1 font-semibold text-red-500">*</span>

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-slate-900">
            Complete Practice Form
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Use this single form to practice typing, selecting, clicking,
            alerts, and validating submitted data in Selenium.
          </p>
          <p className="mt-3 text-sm font-medium text-slate-700">
            <span className="font-semibold text-red-500">*</span> Required fields
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label
                htmlFor="practice-full-name"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Full Name {requiredMark}
              </label>
              <input
                id="practice-full-name"
                name="fullName"
                value={form.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="practice-email"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Email Address {requiredMark}
              </label>
              <input
                id="practice-email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="practice-phone"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Phone Number
              </label>
              <input
                id="practice-phone"
                name="phone"
                value={form.phone}
                onChange={handleInputChange}
                placeholder="Enter phone number"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="practice-topic"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Automation Topic {requiredMark}
              </label>
              <select
                id="practice-topic"
                name="topic"
                value={form.topic}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
              >
                <option value="">Select a topic</option>
                {topics.map((topic) => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <p className="mb-2 text-sm font-medium text-slate-700">
                Gender {requiredMark}
              </p>
              <div className="flex flex-wrap gap-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                {["Male", "Female", "Other"].map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-2 text-sm text-slate-700"
                  >
                    <input
                      type="radio"
                      name="gender"
                      value={option}
                      checked={form.gender === option}
                      onChange={handleInputChange}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>

            <div className="relative">
              <label
                htmlFor="practice-country"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Country Suggestion {requiredMark}
              </label>
              <input
                id="practice-country"
                name="countrySearch"
                value={form.countrySearch}
                onFocus={() => setShowSuggestions(true)}
                onChange={(e) => {
                  handleInputChange(e)
                  setShowSuggestions(true)
                }}
                placeholder="Type a country"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
              />

              {showSuggestions && filteredCountries.length > 0 && (
                <ul className="absolute z-10 mt-2 max-h-48 w-full overflow-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-lg">
                  {filteredCountries.map((country) => (
                    <li key={country.name}>
                      <button
                        type="button"
                        onClick={() => handleCountrySelect(country)}
                        className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100"
                      >
                        <span>{country.name}</span>
                        <span className="text-slate-500">{country.code}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label
                htmlFor="practice-date"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Practice Date {requiredMark}
              </label>
              <input
                id="practice-date"
                name="practiceDate"
                type="date"
                value={form.practiceDate}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
              />
            </div>

            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
              <p className="text-sm font-medium text-amber-900">
                Alert Practice
              </p>
              <p className="mt-1 text-sm text-amber-700">
                Use this button to handle a JavaScript alert before form
                submission.
              </p>
              <button
                id="practice-alert-button"
                type="button"
                onClick={handlePreviewAlert}
                className="mt-3 rounded-xl bg-amber-500 px-4 py-2 text-white transition hover:bg-amber-600"
              >
                Trigger Alert
              </button>
            </div>
          </div>

          <div>
            <p className="mb-3 text-sm font-medium text-slate-700">
              Selenium Skills Used {requiredMark}
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {skillOptions.map((skill) => (
                <label
                  key={skill}
                  className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
                >
                  <input
                    type="checkbox"
                    checked={form.skills.includes(skill)}
                    onChange={(e) =>
                      handleSkillChange(skill, e.target.checked)
                    }
                  />
                  {skill}
                </label>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  name="receiveUpdates"
                  checked={form.receiveUpdates}
                  onChange={handleInputChange}
                />
                Receive practice updates
              </label>

              <label className="flex items-center gap-2 text-sm font-medium text-slate-800">
                <input
                  type="checkbox"
                  name="acceptedTerms"
                  checked={form.acceptedTerms}
                  onChange={handleInputChange}
                />
                I accept the form terms {requiredMark}
              </label>
            </div>
          </div>

          {formError && (
            <p id="practice-form-error" className="text-sm text-red-600">
              {formError}
            </p>
          )}

          <button
            id="practice-form-submit"
            type="submit"
            className="rounded-2xl bg-slate-900 px-6 py-3 text-white transition hover:bg-slate-800"
          >
            Submit Practice Form
          </button>
        </form>
      </div>

      {submittedData && (
        <div
          id="practice-form-results"
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-slate-900">
              Submitted Form Details
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              This table is useful for Selenium assertions after submission.
            </p>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Field</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Full Name</TableCell>
                <TableCell>{submittedData.fullName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>{submittedData.email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Phone</TableCell>
                <TableCell>{submittedData.phone || "Not provided"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Topic</TableCell>
                <TableCell>{submittedData.topic}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Gender</TableCell>
                <TableCell>{submittedData.gender}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Country</TableCell>
                <TableCell>{submittedData.selectedCountry}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Practice Date</TableCell>
                <TableCell>{submittedData.practiceDate}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Receive Updates</TableCell>
                <TableCell>
                  {submittedData.receiveUpdates ? "Yes" : "No"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Accepted Terms</TableCell>
                <TableCell>
                  {submittedData.acceptedTerms ? "Accepted" : "Not accepted"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Skills</TableCell>
                <TableCell>{submittedData.skills.join(", ")}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
