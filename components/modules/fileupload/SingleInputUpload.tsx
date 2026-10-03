"use client"

import { useEffect, useRef, useState } from "react"
import { FaCheckCircle, FaExclamationCircle, FaFileAlt, FaTrashAlt, FaUpload } from "react-icons/fa"
import { dynamicWidth } from "@/lib/dynamicStyles"

type UploadStatus = "idle" | "uploading" | "success" | "error"

export default function SingleInputUpload() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState<UploadStatus>("idle")
  const [progress, setProgress] = useState(0)
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    if (status !== "uploading") return

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setStatus("success")
          return 100
        }
        return prev + 25
      })
    }, 200)

    return () => clearInterval(interval)
  }, [status])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    setErrorMessage("")
    setProgress(0)

    const allowedExtensions = [".pdf", ".png", ".jpg", ".jpeg", ".csv", ".txt"]
    const fileExt = "." + selectedFile.name.split(".").pop()?.toLowerCase()
    const maxSizeBytes = 5 * 1024 * 1024 // 5MB

    if (!allowedExtensions.includes(fileExt)) {
      setStatus("error")
      setErrorMessage(`Invalid file format '${fileExt}'. Allowed: PDF, PNG, JPG, CSV, TXT`)
      return
    }

    if (selectedFile.size > maxSizeBytes) {
      setStatus("error")
      setErrorMessage("File size exceeds 5MB maximum limit.")
      return
    }

    setFile(selectedFile)
    setStatus("uploading")
  }

  const handleReset = () => {
    setFile(null)
    setStatus("idle")
    setProgress(0)
    setErrorMessage("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <section
      id="single-input-upload-card"
      data-testid="single-input-upload-card"
      data-component="single-file-upload"
      data-upload-state={status}
      aria-label="Single File Upload with Input Tag"
      className="file-card"
    >
      <header className="file-card__header">
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-blue-100 p-2 text-blue-600">
            <FaUpload className="h-5 w-5" />
          </span>
          <div>
            <h2 id="single-input-title" data-testid="single-input-title" className="file-card__title">
              Single File Upload
            </h2>
            <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700 border border-blue-200">
              With &lt;input type=&quot;file&quot;&gt;
            </span>
          </div>
        </div>
        <p className="file-card__description">
          Automate single file selection using standard Selenium <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">sendKeys()</code> or Playwright <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">setInputFiles()</code>.
        </p>
      </header>

      {/* Input Form Area */}
      <div className="file-card__control">
        <label htmlFor="single-file-input" className="file-card__label">
          Choose a single file:
        </label>
        <input
          ref={fileInputRef}
          id="single-file-input"
          name="singleFileInput"
          data-testid="single-file-input"
          type="file"
          accept=".pdf,.png,.jpg,.jpeg,.csv,.txt"
          onChange={handleFileChange}
          className="file-card__input"
        />
        <p className="file-card__helper">
          Max size: 5MB • Formats: PDF, PNG, JPG, CSV, TXT
        </p>
      </div>

      {/* Upload Progress */}
      {status === "uploading" && (
        <div id="single-input-progress" data-testid="single-input-progress" className="file-card__progress-box">
          <div className="flex items-center justify-between text-xs font-semibold text-blue-700 mb-1">
            <span>Uploading...</span>
            <span id="single-input-progress-value" data-testid="single-input-progress-value">{progress}%</span>
          </div>
          <div className="file-card__progress-track">
            <div className="file-card__progress-bar" style={dynamicWidth(progress)} />
          </div>
        </div>
      )}

      {/* Error State */}
      {status === "error" && (
        <div id="single-input-error" data-testid="single-input-error" className="file-card__alert file-card__alert--error">
          <FaExclamationCircle className="h-4 w-4 shrink-0 text-red-600" />
          <span className="text-sm font-medium text-red-800">{errorMessage}</span>
        </div>
      )}

      {/* Success / File Meta Display */}
      {file && (
        <div id="single-input-result" data-testid="single-input-result" className="file-card__meta-box">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FaFileAlt className="h-6 w-6 text-blue-500" />
              <div>
                <p id="single-file-name" data-testid="single-file-name" className="text-sm font-bold text-gray-800">
                  {file.name}
                </p>
                <p className="text-xs text-gray-500">
                  <span id="single-file-size" data-testid="single-file-size">{(file.size / 1024).toFixed(1)} KB</span> •{" "}
                  <span id="single-file-type" data-testid="single-file-type">{file.type || "unknown"}</span>
                </p>
              </div>
            </div>

            {status === "success" && (
              <span id="single-input-success-badge" data-testid="single-input-success-badge" className="inline-flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-md">
                <FaCheckCircle className="h-3 w-3" /> Uploaded
              </span>
            )}
          </div>

          <div className="mt-4 flex justify-end">
            <button
              id="single-input-reset-btn"
              data-testid="single-input-reset-btn"
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-100 transition-colors"
            >
              <FaTrashAlt className="h-3 w-3" /> Remove File
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
