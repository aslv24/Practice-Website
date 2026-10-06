"use client"

import { useEffect, useState } from "react"
import { FaEnvelope, FaPhone, FaUser } from "react-icons/fa"

import { useModuleContext } from "@/hooks/useModuleContext"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { OPEN_LEAD_REGISTRATION_EVENT } from "@/lib/browserEvents"

export default function LeadPopup() {
  const { userPreferences, setLeadPopupShown } = useModuleContext()

  const [open, setOpen] = useState(false)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [mobile, setMobile] = useState("")

  const [emailError, setEmailError] = useState("")
  const [mobileError, setMobileError] = useState("")

  useEffect(() => {
    if (userPreferences.leadPopupShown) return

    let hasExplored = false
    let dwellTimeElapsed = false

    const openFromPrompt = () => {
      setOpen(true)
      setLeadPopupShown(true)
    }

    window.addEventListener(OPEN_LEAD_REGISTRATION_EVENT, openFromPrompt)

    if (window.matchMedia("(pointer: coarse)").matches) {
      return () =>
        window.removeEventListener(
          OPEN_LEAD_REGISTRATION_EVENT,
          openFromPrompt
        )
    }

    const timer = window.setTimeout(() => {
      dwellTimeElapsed = true
    }, 30_000)

    const markExplored = () => {
      hasExplored = true
    }

    const handleExitIntent = (event: MouseEvent) => {
      if (
        dwellTimeElapsed &&
        hasExplored &&
        event.clientY <= 0 &&
        event.relatedTarget === null
      ) {
        openFromPrompt()
      }
    }

    window.addEventListener("pointerdown", markExplored, { once: true })
    window.addEventListener("scroll", markExplored, { once: true })
    document.addEventListener("mouseout", handleExitIntent)

    return () => {
      window.clearTimeout(timer)
      window.removeEventListener(
        OPEN_LEAD_REGISTRATION_EVENT,
        openFromPrompt
      )
      window.removeEventListener("pointerdown", markExplored)
      window.removeEventListener("scroll", markExplored)
      document.removeEventListener("mouseout", handleExitIntent)
    }
  }, [userPreferences.leadPopupShown, setLeadPopupShown])

  const validateEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

  const handleEmailChange = (value: string) => {
    setEmail(value)

    setEmailError(
      value && !validateEmail(value)
        ? "Please enter a valid email"
        : ""
    )
  }

  const handleMobileChange = (value: string) => {
    const onlyNumbers = value.replace(/[^0-9]/g, "")

    setMobile(onlyNumbers)

    setMobileError(
      onlyNumbers && onlyNumbers.length !== 10
        ? "Mobile must be 10 digits"
        : ""
    )
  }

  const isFormValid =
    name.trim().length > 0 &&
    validateEmail(email) &&
    mobile.length === 10

  /**
   * Persist the submitted registration data to localStorage.
   * No backend exists — this is a Selenium practice site.
   * Storing the data makes it inspectable via DevTools and assertable
   * in automated test suites (e.g. via executeScript / localStorage.getItem).
   */
  const handleSubmit = () => {
    try {
      localStorage.setItem(
        "leadRegistration",
        JSON.stringify({
          name: name.trim(),
          email,
          mobile,
          registeredAt: new Date().toISOString(),
        })
      )
    } catch (error) {
      console.error("Failed to save registration data:", error)
    }

    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen)
        if (!nextOpen) setLeadPopupShown(true)
      }}
    >
      <DialogContent
        id="lead-registration-modal"
        data-testid="lead-registration-modal"
        data-state={open ? "open" : "closed"}
        aria-label="Lead registration modal"
        className="lead-popup"
      >
        <DialogHeader>
          <DialogTitle className="lead-popup__title">
            Join Selenium Practice
          </DialogTitle>

          <DialogDescription className="lead-popup__subtitle">
            Register to explore real automation scenarios
          </DialogDescription>
        </DialogHeader>

        <div className="lead-popup__form">
          {/* Name Input */}
          <div className="lead-popup__field">
            <label className="sr-only" htmlFor="lead-name-input">
              Name
            </label>
            <div className="lead-popup__input-wrapper">
              <FaUser
                className="lead-popup__icon"
                aria-hidden="true"
              />

              <Input
                id="lead-name-input"
                name="leadName"
                type="text"
                required
                autoComplete="name"
                data-testid="lead-name-input"
                placeholder="Enter your name"
                className="lead-popup__input"
                value={name}
                onChange={(e) =>
                  setName(e.target.value.trimStart())
                }
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="lead-popup__field">
            <label className="sr-only" htmlFor="lead-email-input">
              Email address
            </label>
            <div className="lead-popup__input-wrapper">
              <FaEnvelope
                className="lead-popup__icon"
                aria-hidden="true"
              />

              <Input
                id="lead-email-input"
                type="email"
                name="leadEmail"
                required
                autoComplete="email"
                data-testid="lead-email-input"
                aria-invalid={Boolean(emailError)}
                aria-describedby={emailError ? "lead-email-error" : undefined}
                placeholder="Enter your email"
                className="lead-popup__input"
                value={email}
                onChange={(e) =>
                  handleEmailChange(e.target.value)
                }
              />
            </div>

            {emailError && (
              <p
                role="alert"
                id="lead-email-error"
                data-testid="lead-email-error"
                className="lead-popup__error"
              >
                {emailError}
              </p>
            )}
          </div>

          {/* Mobile Input */}
          <div className="lead-popup__field">
            <label className="sr-only" htmlFor="lead-mobile-input">
              Mobile number
            </label>
            <div className="lead-popup__input-wrapper">
              <FaPhone
                className="lead-popup__icon"
                aria-hidden="true"
              />

              <Input
                id="lead-mobile-input"
                type="tel"
                name="leadMobile"
                required
                autoComplete="tel"
                inputMode="numeric"
                data-testid="lead-mobile-input"
                aria-invalid={Boolean(mobileError)}
                aria-describedby={mobileError ? "lead-mobile-error" : undefined}
                placeholder="Enter your mobile number"
                className="lead-popup__input"
                value={mobile}
                maxLength={10}
                onChange={(e) =>
                  handleMobileChange(e.target.value)
                }
              />
            </div>

            {mobileError && (
              <p
                role="alert"
                id="lead-mobile-error"
                data-testid="lead-mobile-error"
                className="lead-popup__error"
              >
                {mobileError}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            id="lead-register-button"
            name="leadRegister"
            data-testid="lead-register-button"
            aria-label="Register now"
            disabled={!isFormValid}
            onClick={handleSubmit}
            className="lead-popup__submit"
          >
            Register Now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}