"use client"

import { useEffect, useRef, useState } from "react"
import { dynamicWidth } from "@/lib/dynamicStyles"

type UploadStatus =
  | "idle"
  | "uploading"
  | "success"
  | "error"

export default function SingleFileUpload() {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [fileName, setFileName] =
    useState("")

  const [fileSize, setFileSize] =
    useState("")

  const [status, setStatus] =
    useState<UploadStatus>("idle")

  const [errorMessage, setErrorMessage] =
    useState("")

  const [progress, setProgress] =
    useState(0)

  // Simulate Upload Progress
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

    // Validation
    const allowedTypes = [
      "application/pdf",
      "image/png",
      "image/jpeg",
    ]

    const maxSize = 5 * 1024 * 1024

    if (
      !allowedTypes.includes(file.type)
    ) {
      setStatus("error")

      setErrorMessage(
        "Invalid file type. Only PDF, PNG, and JPG are allowed."
      )

      return
    }

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

    setStatus("uploading")
  }

  const handleRemove = () => {
    setFileName("")
    setFileSize("")
    setProgress(0)
    setErrorMessage("")
    setStatus("idle")

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <section
      id="single-file-upload-card"
      data-testid="single-file-upload-card"
      data-component="single-file-upload"
      data-upload-state={status}
      aria-label="Single file upload component"
      className="single-file-upload"
    >
      {/* Header */}
      <header className="single-file-upload__header">
        <h2 className="single-file-upload__title">
          Resume Upload
        </h2>

        <p className="single-file-upload__description">
          Practice Selenium file upload
          automation with validation, async
          upload simulation, and status
          assertions.
        </p>
      </header>

      {/* Upload Area */}
      <div className="single-file-upload__area">
        <input
          ref={fileInputRef}
          type="file"
          id="single-upload-input"
          name="singleUpload"
          data-testid="single-upload-input"
          aria-label="Upload resume"
          onChange={handleChange}
          className="hidden"
          accept=".pdf,.png,.jpg,.jpeg"
        />

        {/* Upload Button */}
        <label
          id="choose-file-button"
          htmlFor="single-upload-input"
          data-testid="choose-file-button"
          aria-label="Choose file"
          className={`single-file-upload__choose-button${
            status === "uploading"
              ? " single-file-upload__choose-button--disabled"
              : ""
          }`}
        >
          Choose File
        </label>

        {/* Helper Text */}
        <p
          id="file-upload-helper-text"
          className="single-file-upload__helper-text"
        >
          Supported formats: PDF, PNG, JPG
          • Maximum size: 5MB
        </p>
      </div>

      {/* Upload Status */}
      <div
        aria-live="polite"
        className="single-file-upload__status"
      >
        {/* Progress */}
        {status === "uploading" && (
          <div
            id="upload-progress-section"
            data-testid="upload-progress-section"
            className="single-file-upload__progress"
          >
            <div className="single-file-upload__progress-header">
              <p className="single-file-upload__progress-label">
                Uploading File...
              </p>

              <p
                id="upload-progress-value"
                data-testid="upload-progress-value"
                className="single-file-upload__progress-value"
              >
                {progress}%
              </p>
            </div>

            <div className="single-file-upload__progress-track">
              <div
                className="single-file-upload__progress-bar"
                style={dynamicWidth(progress)}
              />
            </div>
          </div>
        )}

        {/* Success */}
        {status === "success" && (
          <div
            id="upload-success-message"
            data-testid="upload-success-message"
            className="single-file-upload__message single-file-upload__message--success"
          >
            <p className="single-file-upload__message-text single-file-upload__message-text--success">
              File uploaded successfully.
            </p>
          </div>
        )}

        {/* Error */}
        {status === "error" && (
          <div
            id="upload-error-message"
            data-testid="upload-error-message"
            className="single-file-upload__message single-file-upload__message--error"
          >
            <p className="single-file-upload__message-text single-file-upload__message-text--error">
              {errorMessage}
            </p>
          </div>
        )}

        {/* File Details */}
        <div
          id="uploaded-file-details"
          data-testid="uploaded-file-details"
          className="single-file-upload__details"
        >
          <div className="single-file-upload__details-content">
            <p
              id="single-upload-selected-name"
              data-testid="single-upload-selected-name"
              className="single-file-upload__detail"
            >
              File:
              {fileName || " No file selected"}
            </p>

            <p
              id="single-upload-file-size"
              data-testid="single-upload-file-size"
              className="single-file-upload__detail single-file-upload__detail--secondary"
            >
              Size:
              {fileSize || " --"}
            </p>

            <p
              id="single-upload-status"
              data-testid="single-upload-status"
              className="single-file-upload__detail single-file-upload__detail--secondary"
            >
              Status: {status}
            </p>
          </div>
        </div>

        {/* Remove Button */}
        {fileName && (
          <button
            id="remove-uploaded-file-button"
            data-testid="remove-uploaded-file-button"
            aria-label="Remove uploaded file"
            onClick={handleRemove}
            disabled={
              status === "uploading"
            }
            className={`single-file-upload__remove-button${
              status === "uploading"
                ? " single-file-upload__remove-button--disabled"
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