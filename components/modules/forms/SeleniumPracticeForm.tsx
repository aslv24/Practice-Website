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
    <span className="practice-form__required-mark">
      *
    </span>
  )

  return (
    <div className="practice-form__wrapper">
      {/* Main Form */}
      <section
        id="practice-form-card"
        data-testid="practice-form-card"
        data-component="selenium-practice-form"
        data-submit-state={
          submitState
        }
        aria-label="Complete selenium practice form"
        className="practice-form"
      >
        {/* Header */}
        <header className="practice-form__header">
          <h2 className="practice-form__title">
            Selenium Practice Form
          </h2>

          <p className="practice-form__description">
            Practice real-world Selenium
            automation using text fields,
            dropdowns, suggestions,
            checkboxes, alerts, tables,
            validation, and synchronization.
          </p>

          <div className="practice-form__skills-summary">
            <p className="practice-form__skills-summary-title">
              Selenium Skills Covered:
            </p>

            <p className="practice-form__skills-summary-text">
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
          className="practice-form__form"
          onSubmit={handleSubmit}
        >
          {/* Basic Fields */}
          <div className="practice-form__grid">
            {/* Full Name */}
            <div className="practice-form__field">
              <label
                htmlFor="practice-full-name"
                className="practice-form__label"
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
                className={`practice-form__input${
                  errors.fullName
                    ? " practice-form__input--error"
                    : ""
                }`}
              />

              {errors.fullName && (
                <p
                  id="practice-full-name-error"
                  data-testid="practice-full-name-error"
                  className="practice-form__error"
                >
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="practice-form__field">
              <label
                htmlFor="practice-email"
                className="practice-form__label"
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
                className={`practice-form__input${
                  errors.email
                    ? " practice-form__input--error"
                    : ""
                }`}
              />

              {errors.email && (
                <p
                  id="practice-email-error"
                  data-testid="practice-email-error"
                  className="practice-form__error"
                >
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="practice-form__field">
              <label
                htmlFor="practice-phone"
                className="practice-form__label"
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
                className={`practice-form__input${
                  errors.phone
                    ? " practice-form__input--error"
                    : ""
                }`}
              />

              {errors.phone && (
                <p
                  id="practice-phone-error"
                  data-testid="practice-phone-error"
                  className="practice-form__error"
                >
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Topic */}
            <div className="practice-form__field">
              <label
                htmlFor="practice-topic"
                className="practice-form__label"
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
                className="practice-form__input"
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
                <p
                  id="practice-topic-error"
                  data-testid="practice-topic-error"
                  className="practice-form__error"
                >
                  {errors.topic}
                </p>
              )}
            </div>
          </div>

          {/* Gender + Country */}
          <div className="practice-form__grid">
            {/* Gender */}
            <fieldset className="practice-form__fieldset">
              <legend className="practice-form__label">
                Gender
                {requiredMark}
              </legend>

              <div className="practice-form__gender-options">
                {[
                  "Male",
                  "Female",
                  "Other",
                ].map((option) => (
                  <label
                    key={option}
                    className="practice-form__radio-label"
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

                    <span className="practice-form__option-text">
                      {option}
                    </span>
                  </label>
                ))}
              </div>

              {errors.gender && (
                <p
                  id="practice-gender-error"
                  data-testid="practice-gender-error"
                  className="practice-form__error"
                >
                  {errors.gender}
                </p>
              )}
            </fieldset>

            {/* Country Suggestion */}
            <div
              className="practice-form__country-field"
              ref={
                suggestionWrapperRef
              }
            >
              <label
                htmlFor="practice-country"
                className="practice-form__label"
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
                className="practice-form__input"
              />

              {/* Loading */}
              {showSuggestions &&
                isSearchingCountries && (
                  <div className="practice-form__suggestion-message">
                    <p className="practice-form__suggestion-message-text">
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
                        className="practice-form__suggestions"
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
                                className={`practice-form__suggestion-button${
                                  activeCountryIndex ===
                                  index
                                    ? " practice-form__suggestion-button--active"
                                    : ""
                                }`}
                              >
                                <div>
                                  <p className="practice-form__country-name">
                                    {
                                      country.name
                                    }
                                  </p>

                                  <p className="practice-form__country-meta">
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

                                <span className="practice-form__country-code">
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
                      <div className="practice-form__suggestion-message practice-form__suggestion-message--error">
                        <p className="practice-form__suggestion-message-text practice-form__suggestion-message-text--error">
                          No countries found.
                        </p>
                      </div>
                    )}
                  </>
                )}

              {errors.countrySearch && (
                <p
                  id="practice-country-error"
                  data-testid="practice-country-error"
                  className="practice-form__error"
                >
                  {
                    errors.countrySearch
                  }
                </p>
              )}
            </div>
          </div>

          {/* Date + Alert */}
          <div className="practice-form__grid">
            {/* Date */}
            <div className="practice-form__field">
              <label
                htmlFor="practice-date"
                className="practice-form__label"
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
                className="practice-form__input"
              />

              {errors.practiceDate && (
                <p
                  id="practice-date-error"
                  data-testid="practice-date-error"
                  className="practice-form__error"
                >
                  {
                    errors.practiceDate
                  }
                </p>
              )}
            </div>

            {/* Alert */}
            <div className="practice-form__alert">
              <p className="practice-form__alert-title">
                Alert Practice
              </p>

              <p className="practice-form__alert-description">
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
                className="practice-form__alert-button"
              >
                Trigger Alert
              </button>
            </div>
          </div>

          {/* Skills */}
          <fieldset className="practice-form__fieldset">
            <legend className="practice-form__label">
              Selenium Skills Used
              {requiredMark}
            </legend>

            <div className="practice-form__skills-grid">
              {skillOptions.map(
                (skill) => (
                  <label
                    key={skill}
                    className="practice-form__skill-option"
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

                    <span className="practice-form__option-text">
                      {skill}
                    </span>
                  </label>
                )
              )}
            </div>

            {errors.skills && (
              <p
                id="practice-skills-error"
                data-testid="practice-skills-error"
                className="practice-form__error"
              >
                {errors.skills}
              </p>
            )}
          </fieldset>

          {/* Terms */}
          <div className="practice-form__terms">
            <div className="practice-form__terms-content">
              <label className="practice-form__checkbox-label">
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

                <span className="practice-form__option-text">
                  Receive practice
                  updates
                </span>
              </label>

              <label className="practice-form__checkbox-label">
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

                <span className="practice-form__terms-text">
                  I accept terms &
                  conditions
                  {requiredMark}
                </span>
              </label>

              {errors.acceptedTerms && (
                <p
                  id="practice-accepted-terms-error"
                  data-testid="practice-accepted-terms-error"
                  className="practice-form__error"
                >
                  {
                    errors.acceptedTerms
                  }
                </p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="practice-form__actions">
            <button
              id="practice-form-submit-button"
              type="submit"
              data-testid="practice-form-submit-button"
              disabled={
                submitState ===
                "submitting"
              }
              className={`practice-form__submit-button${
                submitState ===
                "submitting"
                  ? " practice-form__submit-button--disabled"
                  : ""
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
              className="practice-form__reset-button"
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
          className="practice-form__results"
        >
          <div className="practice-form__results-header">
            <h3 className="practice-form__results-title">
              Submitted Form Details
            </h3>

            <p className="practice-form__results-description">
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
                    <TableCell className="practice-form__table-cell--label">
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