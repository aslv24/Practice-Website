"use client"

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  countries,
  type Country,
} from "@/data/countries"

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

type FormErrors = {
  fullName?: string
  email?: string
  phone?: string
  topic?: string
  gender?: string
  countrySearch?: string
  practiceDate?: string
  acceptedTerms?: string
  skills?: string
}

type SubmitState =
  | "idle"
  | "validating"
  | "submitting"
  | "success"

type SubmittedFormState =
  FormState & {
    selectedCountry: string
  }

const topics = [
  "Selenium WebDriver",
  "Playwright",
  "API Testing",
  "Performance Testing",
]

const skillOptions = [
  "Text Field",
  "Dropdown",
  "Checkbox",
  "Radio Button",
  "Suggestion List",
  "Calendar",
  "Alert",
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
  skills: [],
}

export default function SeleniumPracticeForm() {
  const [form, setForm] =
    useState<FormState>(emptyForm)

  const [errors, setErrors] =
    useState<FormErrors>({})

  const [submitState, setSubmitState] =
    useState<SubmitState>("idle")

  const [submittedData, setSubmittedData] =
    useState<SubmittedFormState | null>(
      null
    )

  const [showSuggestions, setShowSuggestions] =
    useState(false)

  const [activeCountryIndex, setActiveCountryIndex] =
    useState(-1)

  const [isSearchingCountries, setIsSearchingCountries] =
    useState(false)

  const suggestionWrapperRef =
    useRef<HTMLDivElement>(null)

  // Close Suggestion Dropdown
  useEffect(() => {
    const handleOutsideClick = (
      event: MouseEvent
    ) => {
      if (
        suggestionWrapperRef.current &&
        !suggestionWrapperRef.current.contains(
          event.target as Node
        )
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener(
      "click",
      handleOutsideClick
    )

    return () => {
      document.removeEventListener(
        "click",
        handleOutsideClick
      )
    }
  }, [])

  // Debounced Suggestion Loading
  useEffect(() => {
    if (!showSuggestions) return

    const timer = setTimeout(() => {
      setIsSearchingCountries(false)
    }, 600)

    return () => clearTimeout(timer)
  }, [
    form.countrySearch,
    showSuggestions,
  ])

  // Filter Countries
  const filteredCountries =
    useMemo(() => {
      const query =
        form.countrySearch
          .trim()
          .toLowerCase()

      if (!query) {
        return countries.slice(0, 8)
      }

      return countries
        .filter(
          (country) =>
            country.name
              .toLowerCase()
              .includes(query) ||
            country.isoCode
              .toLowerCase()
              .includes(query) ||
            country.dialCode.includes(
              query
            )
        )
        .slice(0, 8)
    }, [form.countrySearch])

  // Handle Inputs
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target

    setForm((prev) => ({
      ...prev,
      [name]:
        e.target instanceof
          HTMLInputElement &&
        e.target.type === "checkbox"
          ? e.target.checked
          : value,
    }))

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }))
  }

  // Handle Skills
  const handleSkillChange = (
    skill: string,
    checked: boolean
  ) => {
    setForm((prev) => ({
      ...prev,
      skills: checked
        ? [...prev.skills, skill]
        : prev.skills.filter(
            (item) => item !== skill
          ),
    }))

    setErrors((prev) => ({
      ...prev,
      skills: "",
    }))
  }

  // Select Country
  const handleCountrySelect = (
    country: Country
  ) => {
    setForm((prev) => ({
      ...prev,
      countrySearch: country.name,
      countryCode: country.isoCode,
    }))

    setShowSuggestions(false)
  }

  // Country Keyboard Navigation
  const handleCountryKeyboardNavigation =
    (
      event: React.KeyboardEvent<HTMLInputElement>
    ) => {
      if (!filteredCountries.length)
        return

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault()

          setActiveCountryIndex(
            (prev) =>
              prev <
              filteredCountries.length - 1
                ? prev + 1
                : 0
          )

          break

        case "ArrowUp":
          event.preventDefault()

          setActiveCountryIndex(
            (prev) =>
              prev > 0
                ? prev - 1
                : filteredCountries.length -
                  1
          )

          break

        case "Enter":
          event.preventDefault()

          if (
            activeCountryIndex >= 0
          ) {
            handleCountrySelect(
              filteredCountries[
                activeCountryIndex
              ]
            )
          }

          break

        case "Escape":
          setShowSuggestions(false)
          break
      }
    }

  // Validation
  const validateForm = () => {
    const newErrors: FormErrors = {}

    if (!form.fullName.trim()) {
      newErrors.fullName =
        "Full name is required"
    }

    if (!form.email.trim()) {
      newErrors.email =
        "Email address is required"
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        form.email
      )
    ) {
      newErrors.email =
        "Invalid email address"
    }

    if (
      form.phone &&
      !/^[0-9]{10,15}$/.test(
        form.phone
      )
    ) {
      newErrors.phone =
        "Phone number must contain 10 to 15 digits"
    }

    if (!form.topic) {
      newErrors.topic =
        "Please select topic"
    }

    if (!form.gender) {
      newErrors.gender =
        "Please select gender"
    }

    if (!form.countrySearch) {
      newErrors.countrySearch =
        "Country is required"
    }

    if (!form.practiceDate) {
      newErrors.practiceDate =
        "Practice date is required"
    }

    if (!form.acceptedTerms) {
      newErrors.acceptedTerms =
        "You must accept terms"
    }

    if (
      form.skills.length === 0
    ) {
      newErrors.skills =
        "Select at least one skill"
    }

    setErrors(newErrors)

    return (
      Object.keys(newErrors).length === 0
    )
  }

  // Submit
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()

    setSubmitState("validating")

    const isValid = validateForm()

    if (!isValid) {
      setSubmitState("idle")
      return
    }

    setSubmitState("submitting")

    await new Promise((resolve) =>
      setTimeout(resolve, 2500)
    )

    const submitted: SubmittedFormState =
      {
        ...form,
        selectedCountry:
          form.countryCode
            ? `${form.countrySearch} (${form.countryCode})`
            : form.countrySearch,
      }

    setSubmittedData(submitted)

    setSubmitState("success")
  }

  // Reset
  const handleReset = () => {
    setForm(emptyForm)

    setErrors({})

    setSubmittedData(null)

    setSubmitState("idle")

    setShowSuggestions(false)

    setActiveCountryIndex(-1)
  }

  // Alert
  const handlePreviewAlert = () => {
    alert(
      "Selenium practice alert triggered."
    )
  }

  const requiredMark = (
    <span className="ml-1 font-semibold text-red-500">
      *
    </span>
  )

  return (
    <div className="space-y-6">
      {/* Main Form */}
      <section
        id="practice-form-card"
        data-testid="practice-form-card"
        data-component="selenium-practice-form"
        data-submit-state={
          submitState
        }
        aria-label="Complete selenium practice form"
        className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        {/* Header */}
        <header className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900">
            Selenium Practice Form
          </h2>

          <p className="mt-2 text-sm text-slate-600">
            Practice real-world Selenium
            automation using text fields,
            dropdowns, suggestions,
            checkboxes, alerts, tables,
            validation, and synchronization.
          </p>

          <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50 p-4">
            <p className="text-sm font-medium text-blue-700">
              Selenium Skills Covered:
            </p>

            <p className="mt-2 text-sm text-blue-600">
              Explicit Waits • Dynamic
              Dropdowns • Table Assertions •
              Alerts • Radio Buttons •
              Checkbox Groups • Date Picker
            </p>
          </div>
        </header>

        {/* Form */}
        <form
          id="practice-form"
          data-testid="practice-form"
          aria-label="Selenium practice form"
          className="space-y-8"
          onSubmit={handleSubmit}
        >
          {/* Basic Fields */}
          <div className="grid gap-5 md:grid-cols-2">
            {/* Full Name */}
            <div>
              <label
                htmlFor="practice-full-name"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Full Name
                {requiredMark}
              </label>

              <input
                id="practice-full-name"
                name="fullName"
                value={form.fullName}
                data-testid="practice-full-name-input"
                aria-label="Full name"
                aria-invalid={
                  !!errors.fullName
                }
                placeholder="Enter full name"
                onChange={
                  handleInputChange
                }
                className={`w-full rounded-xl border px-4 py-3 outline-none transition focus-visible:ring-2 ${
                  errors.fullName
                    ? "border-red-500 focus-visible:ring-red-500"
                    : "border-slate-300 focus-visible:ring-blue-500"
                }`}
              />

              {errors.fullName && (
                <p
                  id="practice-full-name-error"
                  data-testid="practice-full-name-error"
                  className="mt-1 text-sm text-red-600"
                >
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="practice-email"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Email Address
                {requiredMark}
              </label>

              <input
                id="practice-email"
                type="email"
                name="email"
                value={form.email}
                data-testid="practice-email-input"
                aria-label="Email address"
                aria-invalid={
                  !!errors.email
                }
                placeholder="Enter email"
                onChange={
                  handleInputChange
                }
                className={`w-full rounded-xl border px-4 py-3 outline-none transition focus-visible:ring-2 ${
                  errors.email
                    ? "border-red-500 focus-visible:ring-red-500"
                    : "border-slate-300 focus-visible:ring-blue-500"
                }`}
              />

              {errors.email && (
                <p
                  id="practice-email-error"
                  data-testid="practice-email-error"
                  className="mt-1 text-sm text-red-600"
                >
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone */}
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
                data-testid="practice-phone-input"
                aria-label="Phone number"
                placeholder="Enter phone number"
                onChange={
                  handleInputChange
                }
                className={`w-full rounded-xl border px-4 py-3 outline-none transition focus-visible:ring-2 ${
                  errors.phone
                    ? "border-red-500 focus-visible:ring-red-500"
                    : "border-slate-300 focus-visible:ring-blue-500"
                }`}
              />

              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Topic */}
            <div>
              <label
                htmlFor="practice-topic"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Automation Topic
                {requiredMark}
              </label>

              <select
                id="practice-topic"
                name="topic"
                value={form.topic}
                data-testid="practice-topic-dropdown"
                aria-label="Automation topic"
                onChange={
                  handleInputChange
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <option value="">
                  Select topic
                </option>

                {topics.map((topic) => (
                  <option
                    key={topic}
                    value={topic}
                  >
                    {topic}
                  </option>
                ))}
              </select>

              {errors.topic && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.topic}
                </p>
              )}
            </div>
          </div>

          {/* Gender + Country */}
          <div className="grid gap-5 md:grid-cols-2">
            {/* Gender */}
            <fieldset>
              <legend className="mb-2 text-sm font-medium text-slate-700">
                Gender
                {requiredMark}
              </legend>

              <div className="flex flex-wrap gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                {[
                  "Male",
                  "Female",
                  "Other",
                ].map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-2"
                  >
                    <input
                      id={`practice-gender-${option.toLowerCase()}-radio`}
                      type="radio"
                      name="gender"
                      value={option}
                      checked={
                        form.gender ===
                        option
                      }
                      data-testid={`practice-gender-${option.toLowerCase()}-radio`}
                      onChange={
                        handleInputChange
                      }
                    />

                    <span className="text-sm text-slate-700">
                      {option}
                    </span>
                  </label>
                ))}
              </div>

              {errors.gender && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.gender}
                </p>
              )}
            </fieldset>

            {/* Country Suggestion */}
            <div
              className="relative"
              ref={
                suggestionWrapperRef
              }
            >
              <label
                htmlFor="practice-country"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Country Suggestion
                {requiredMark}
              </label>

              <input
                id="practice-country"
                name="countrySearch"
                value={
                  form.countrySearch
                }
                role="combobox"
                autoComplete="off"
                data-testid="practice-country-input"
                aria-expanded={
                  showSuggestions
                }
                aria-controls="practice-country-suggestions-dropdown"
                aria-label="Country suggestion"
                placeholder="Search country"
                onFocus={() => {
                  setIsSearchingCountries(
                    true
                  )
                  setShowSuggestions(
                    true
                  )
                }}
                onChange={(e) => {
                  handleInputChange(e)

                  setIsSearchingCountries(
                    true
                  )

                  setShowSuggestions(
                    true
                  )
                }}
                onKeyDown={
                  handleCountryKeyboardNavigation
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus-visible:ring-2 focus-visible:ring-blue-500"
              />

              {/* Loading */}
              {showSuggestions &&
                isSearchingCountries && (
                  <div className="absolute z-10 mt-2 w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-lg">
                    <p className="text-sm text-slate-500">
                      Loading suggestions...
                    </p>
                  </div>
                )}

              {/* Suggestions */}
              {showSuggestions &&
                !isSearchingCountries && (
                  <>
                    {filteredCountries.length >
                    0 ? (
                      <ul
                        id="practice-country-suggestions-dropdown"
                        role="listbox"
                        data-testid="practice-country-suggestions-dropdown"
                        className="absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-lg"
                      >
                        {filteredCountries.map(
                          (
                            country,
                            index
                          ) => (
                            <li
                              key={
                                country.id
                              }
                              role="option"
                              aria-selected={
                                activeCountryIndex ===
                                index
                              }
                            >
                              <button
                                id={`practice-country-${country.isoCode.toLowerCase()}-button`}
                                type="button"
                                data-testid={`practice-country-${country.isoCode.toLowerCase()}-button`}
                                onClick={() =>
                                  handleCountrySelect(
                                    country
                                  )
                                }
                                className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition-colors ${
                                  activeCountryIndex ===
                                  index
                                    ? "bg-blue-100"
                                    : "hover:bg-slate-100"
                                }`}
                              >
                                <div>
                                  <p className="font-medium text-slate-800">
                                    {
                                      country.name
                                    }
                                  </p>

                                  <p className="text-sm text-slate-500">
                                    ISO:
                                    {
                                      country.isoCode
                                    }
                                    • Dial:
                                    {
                                      country.dialCode
                                    }
                                  </p>
                                </div>

                                <span className="rounded bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                                  {
                                    country.isoCode
                                  }
                                </span>
                              </button>
                            </li>
                          )
                        )}
                      </ul>
                    ) : (
                      <div className="absolute z-10 mt-2 w-full rounded-2xl border border-red-200 bg-white p-4 shadow-lg">
                        <p className="text-sm text-red-600">
                          No countries found.
                        </p>
                      </div>
                    )}
                  </>
                )}

              {errors.countrySearch && (
                <p className="mt-1 text-sm text-red-600">
                  {
                    errors.countrySearch
                  }
                </p>
              )}
            </div>
          </div>

          {/* Date + Alert */}
          <div className="grid gap-5 md:grid-cols-2">
            {/* Date */}
            <div>
              <label
                htmlFor="practice-date"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Practice Date
                {requiredMark}
              </label>

              <input
                id="practice-date"
                name="practiceDate"
                type="date"
                value={
                  form.practiceDate
                }
                data-testid="practice-date-input"
                onChange={
                  handleInputChange
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus-visible:ring-2 focus-visible:ring-blue-500"
              />

              {errors.practiceDate && (
                <p className="mt-1 text-sm text-red-600">
                  {
                    errors.practiceDate
                  }
                </p>
              )}
            </div>

            {/* Alert */}
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <p className="font-medium text-amber-900">
                Alert Practice
              </p>

              <p className="mt-1 text-sm text-amber-700">
                Trigger a JavaScript alert
                before submission.
              </p>

              <button
                id="practice-alert-button"
                type="button"
                data-testid="practice-alert-button"
                onClick={
                  handlePreviewAlert
                }
                className="mt-4 rounded-xl bg-amber-500 px-4 py-2 text-white transition hover:bg-amber-600"
              >
                Trigger Alert
              </button>
            </div>
          </div>

          {/* Skills */}
          <fieldset>
            <legend className="mb-3 text-sm font-medium text-slate-700">
              Selenium Skills Used
              {requiredMark}
            </legend>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {skillOptions.map(
                (skill) => (
                  <label
                    key={skill}
                    className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                  >
                    <input
                      id={`practice-skill-${skill.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-checkbox`}
                      type="checkbox"
                      checked={form.skills.includes(
                        skill
                      )}
                      data-testid={`practice-skill-${skill.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-checkbox`}
                      onChange={(e) =>
                        handleSkillChange(
                          skill,
                          e.target.checked
                        )
                      }
                    />

                    <span className="text-sm text-slate-700">
                      {skill}
                    </span>
                  </label>
                )
              )}
            </div>

            {errors.skills && (
              <p className="mt-1 text-sm text-red-600">
                {errors.skills}
              </p>
            )}
          </fieldset>

          {/* Terms */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="space-y-3">
              <label className="flex items-center gap-3">
                <input
                  id="practice-receive-updates-checkbox"
                  type="checkbox"
                  name="receiveUpdates"
                  checked={
                    form.receiveUpdates
                  }
                  data-testid="practice-receive-updates-checkbox"
                  onChange={
                    handleInputChange
                  }
                />

                <span className="text-sm text-slate-700">
                  Receive practice
                  updates
                </span>
              </label>

              <label className="flex items-center gap-3">
                <input
                  id="practice-accept-terms-checkbox"
                  type="checkbox"
                  name="acceptedTerms"
                  checked={
                    form.acceptedTerms
                  }
                  data-testid="practice-accept-terms-checkbox"
                  onChange={
                    handleInputChange
                  }
                />

                <span className="text-sm font-medium text-slate-800">
                  I accept terms &
                  conditions
                  {requiredMark}
                </span>
              </label>

              {errors.acceptedTerms && (
                <p className="text-sm text-red-600">
                  {
                    errors.acceptedTerms
                  }
                </p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <button
              id="practice-form-submit-button"
              type="submit"
              data-testid="practice-form-submit-button"
              disabled={
                submitState ===
                "submitting"
              }
              className={`rounded-2xl px-6 py-3 text-white transition ${
                submitState ===
                "submitting"
                  ? "cursor-not-allowed bg-slate-400"
                  : "bg-slate-900 hover:bg-slate-800"
              }`}
            >
              {submitState ===
              "submitting"
                ? "Submitting..."
                : "Submit Practice Form"}
            </button>

            <button
              id="practice-form-reset-button"
              type="button"
              data-testid="practice-form-reset-button"
              onClick={handleReset}
              className="rounded-2xl bg-red-500 px-6 py-3 text-white transition hover:bg-red-600"
            >
              Reset Form
            </button>
          </div>
        </form>
      </section>

      {/* Results */}
      {submittedData && (
        <section
          id="practice-form-results-card"
          data-testid="practice-form-results-card"
          aria-label="Submitted form results"
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="mb-5">
            <h3 className="text-2xl font-bold text-slate-900">
              Submitted Form Details
            </h3>

            <p className="mt-1 text-sm text-slate-600">
              Useful for Selenium table
              assertions and validation.
            </p>
          </div>

          <Table
            id="practice-form-results-table"
            data-testid="practice-form-results-table"
          >
            <TableHeader>
              <TableRow>
                <TableHead>
                  Field
                </TableHead>

                <TableHead>
                  Value
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {Object.entries({
                "Full Name":
                  submittedData.fullName,
                Email:
                  submittedData.email,
                Phone:
                  submittedData.phone ||
                  "Not provided",
                Topic:
                  submittedData.topic,
                Gender:
                  submittedData.gender,
                Country:
                  submittedData.selectedCountry,
                "Practice Date":
                  submittedData.practiceDate,
                "Receive Updates":
                  submittedData.receiveUpdates
                    ? "Yes"
                    : "No",
                "Accepted Terms":
                  submittedData.acceptedTerms
                    ? "Accepted"
                    : "Not accepted",
                Skills:
                  submittedData.skills.join(
                    ", "
                  ),
              }).map(
                ([field, value]) => (
                  <TableRow
                    key={field}
                  >
                    <TableCell className="font-medium">
                      {field}
                    </TableCell>

                    <TableCell>
                      {value}
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </section>
      )}
    </div>
  )
}
