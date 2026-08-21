"use client"

import { useEffect, useRef, useState } from "react"

import { dynamicWidth } from "@/lib/dynamicStyles"

type UploadStatus =
  | "idle"
  | "uploading"
  | "success"
  | "error"

export default function FileUpload() {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [fileName, setFileName] =
    useState("")

  const [fileSize, setFileSize] =
    useState("")

  const [fileType, setFileType] =
    useState("")

  const [status, setStatus] =
    useState<UploadStatus>("idle")

  const [progress, setProgress] =
    useState(0)

  const [errorMessage, setErrorMessage] =
    useState("")

  // Upload Simulation
  useEffect(() => {
    if (status !== "uploading") return

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)

          setStatus("success")

          return 100
        }

        return prev + 10
      })
    }, 300)

    return () => clearInterval(interval)
  }, [status])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0]

    if (!file) return

    // Reset
    setErrorMessage("")
    setProgress(0)

    const allowedTypes = [
      "application/pdf",
      "image/png",
      "image/jpeg",
    ]

    const maxSize = 5 * 1024 * 1024

    // Validate File Type
    if (
      !allowedTypes.includes(file.type)
    ) {
      setStatus("error")

      setErrorMessage(
        "Only PDF, PNG, and JPG files are allowed."
      )

      return
    }

    // Validate Size
    if (file.size > maxSize) {
      setStatus("error")

      setErrorMessage(
        "File size exceeds 5MB limit."
      )

      return
    }

    setFileName(file.name)

    setFileSize(
      `${(file.size / 1024).toFixed(
        2
      )} KB`
    )

    setFileType(file.type)

    setStatus("uploading")
  }

  const handleRemove = () => {
    setFileName("")
    setFileSize("")
    setFileType("")
    setProgress(0)
    setErrorMessage("")
    setStatus("idle")

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <section
      id="input-file-upload-card"
      data-testid="input-file-upload-card"
      data-component="input-file-upload"
      data-upload-state={status}
      aria-label="Resume upload component"
      className="file-upload"
    >
      {/* Header */}
      <header className="file-upload__header">
        <h2 className="file-upload__title">
          Resume Upload
        </h2>

        <p className="file-upload__description">
          Practice Selenium file upload
          automation using a real input tag,
          upload validation, and synchronization
          scenarios.
        </p>
      </header>

      {/* Upload Section */}
      <div className="file-upload__section">
        <label
          htmlFor="file-upload-input"
          className="file-upload__label"
        >
          Upload Resume
        </label>

        {/* REAL INPUT */}
        <input
          ref={fileInputRef}
          type="file"
          id="file-upload-input"
          name="fileUpload"
          accept=".pdf,.png,.jpg,.jpeg"
          data-testid="file-upload-input"
          aria-label="Upload file"
          onChange={handleChange}
          disabled={
            status === "uploading"
          }
          className="file-upload__input"
        />

        {/* Helper Text */}
        <p
          id="upload-helper-text"
          className="file-upload__helper-text"
        >
          Supported formats: PDF, PNG, JPG
          • Maximum size: 5MB
        </p>
      </div>

      {/* Status Section */}
      <div
        aria-live="polite"
        className="file-upload__status"
      >
        {/* Upload Progress */}
        {status === "uploading" && (
          <div
            id="upload-progress-section"
            data-testid="upload-progress-section"
            className="file-upload__progress"
          >
            <div className="file-upload__progress-header">
              <p className="file-upload__progress-label">
                Uploading Resume...
              </p>

              <p
                id="upload-progress-value"
                data-testid="upload-progress-value"
                className="file-upload__progress-value"
              >
                {progress}%
              </p>
            </div>

            <div className="file-upload__progress-track">
              <div
                className="file-upload__progress-bar"
                style={dynamicWidth(progress)}
              />
            </div>
          </div>
        )}

        {/* Success Message */}
        {status === "success" && (
          <div
            id="upload-success-message"
            data-testid="upload-success-message"
            className="file-upload__message file-upload__message--success"
          >
            <p className="file-upload__message-text file-upload__message-text--success">
              Resume uploaded successfully.
            </p>
          </div>
        )}

        {/* Error Message */}
        {status === "error" && (
          <div
            id="upload-error-message"
            data-testid="upload-error-message"
            className="file-upload__message file-upload__message--error"
          >
            <p className="file-upload__message-text file-upload__message-text--error">
              {errorMessage}
            </p>
          </div>
        )}

        {/* File Details */}
        <div
          id="file-upload-details"
          data-testid="file-upload-details"
          className="file-upload__details"
        >
          <div className="file-upload__details-content">
            <p
              id="file-upload-selected-name"
              data-testid="file-upload-selected-name"
              className="file-upload__detail"
            >
              File:
              {fileName || " No file selected"}
            </p>

            <p
              id="file-upload-size"
              data-testid="file-upload-size"
              className="file-upload__detail file-upload__detail--secondary"
            >
              Size:
              {fileSize || " --"}
            </p>

            <p
              id="file-upload-type"
              data-testid="file-upload-type"
              className="file-upload__detail file-upload__detail--secondary"
            >
              Type:
              {fileType || " --"}
            </p>

            <p
              id="file-upload-status"
              data-testid="file-upload-status"
              className="file-upload__detail file-upload__detail--secondary"
            >
              Status: {status}
            </p>
          </div>
        </div>

        {/* Remove Button */}
        {fileName && (
          <button
            id="remove-file-button"
            data-testid="remove-file-button"
            aria-label="Remove uploaded file"
            onClick={handleRemove}
            disabled={
              status === "uploading"
            }
            className={`file-upload__remove-button${
              status === "uploading"
                ? " file-upload__remove-button--disabled"
                : ""
            }`}
          >
            Remove File
          </button>
        )}
      </div>
    </section>
  )
}