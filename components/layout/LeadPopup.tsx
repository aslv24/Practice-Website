"use client"

import { useEffect, useState } from "react"
import { FaEnvelope, FaPhone, FaUser } from "react-icons/fa"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

export default function LeadPopup() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [mobile, setMobile] = useState("")
  const [emailError, setEmailError] = useState("")
  const [mobileError, setMobileError] = useState("")

  useEffect(() => {
    const alreadyShown = localStorage.getItem("leadPopupShown")

    if (!alreadyShown) {
      const timer = window.setTimeout(() => {
        setOpen(true)
      }, 1000)

      localStorage.setItem("leadPopupShown", "true")

      return () => window.clearTimeout(timer)
    }
  }, [])

  const validateEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

  const handleEmailChange = (value: string) => {
    setEmail(value)
    setEmailError(value && !validateEmail(value) ? "Please enter a valid email" : "")
  }

  const handleMobileChange = (value: string) => {
    const onlyNumbers = value.replace(/[^0-9]/g, "")
    setMobile(onlyNumbers)
    setMobileError(
      onlyNumbers && onlyNumbers.length !== 10 ? "Mobile must be 10 digits" : ""
    )
  }

  const isFormValid =
    name.trim().length > 0 && validateEmail(email) && mobile.length === 10

  const handleSubmit = () => {
    localStorage.setItem("userRegistered", "true")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="rounded-2xl bg-white p-8 shadow-xl sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-center text-3xl font-semibold text-gray-800">
            Join Selenium Practice
          </DialogTitle>

          <p className="mt-2 text-center text-sm text-gray-500">
            Register to explore real automation scenarios
          </p>
        </DialogHeader>

        <div className="mt-6 space-y-5">
          <div className="flex items-center rounded-lg border border-gray-300 px-4 py-3 focus-within:border-blue-500">
            <FaUser className="mr-3 text-gray-400" />
            <Input
              id="name"
              placeholder="Enter your name"
              className="border-0 focus-visible:ring-0"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <div className="flex items-center rounded-lg border border-gray-300 px-4 py-3 focus-within:border-blue-500">
              <FaEnvelope className="mr-3 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="border-0 focus-visible:ring-0"
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
              />
            </div>
            {emailError && <p className="mt-1 text-sm text-red-500">{emailError}</p>}
          </div>

          <div>
            <div className="flex items-center rounded-lg border border-gray-300 px-4 py-3 focus-within:border-blue-500">
              <FaPhone className="mr-3 text-gray-400" />
              <Input
                id="mobile"
                inputMode="numeric"
                placeholder="Enter your mobile number"
                className="border-0 focus-visible:ring-0"
                value={mobile}
                maxLength={10}
                onChange={(e) => handleMobileChange(e.target.value)}
              />
            </div>
            {mobileError && <p className="mt-1 text-sm text-red-500">{mobileError}</p>}
          </div>

          <Button
            id="submitBtn"
            disabled={!isFormValid}
            onClick={handleSubmit}
            className="w-full rounded-lg bg-blue-600 py-5 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            Register Now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
