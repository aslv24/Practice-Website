"use client"

import { useEffect, useState } from "react"

type UploadStatus =
  | "idle"
  | "uploading"
  | "success"
  | "error"

export default function SingleFileUpload() {
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
  }

  return (
    <section
      id="single-file-upload-card"
      data-testid="single-file-upload-card"
      data-component="single-file-upload"
      data-upload-state={status}
      aria-label="Single file upload component"
      className="rounded-2xl border bg-white p-6 shadow-sm"
    >
      {/* Header */}
      <header className="mb-6">
        <h2 className="text-2xl font-bold text-blue-600">
          Resume Upload
        </h2>

        <p className="mt-2 text-sm text-gray-600">
          Practice Selenium file upload
          automation with validation, async
          upload simulation, and status
          assertions.
        </p>
      </header>

      {/* Upload Area */}
      <div className="rounded-xl border border-dashed p-6">
        <input
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
          className={`inline-flex cursor-pointer items-center rounded-lg px-5 py-2 text-white transition-colors ${
            status === "uploading"
              ? "cursor-not-allowed bg-gray-400"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          Choose File
        </label>

        {/* Helper Text */}
        <p
          id="file-upload-helper-text"
          className="mt-3 text-sm text-gray-500"
        >
          Supported formats: PDF, PNG, JPG
          • Maximum size: 5MB
        </p>
      </div>

      {/* Upload Status */}
      <div
        aria-live="polite"
        className="mt-6 space-y-4"
      >
        {/* Progress */}
        {status === "uploading" && (
          <div
            id="upload-progress-section"
            data-testid="upload-progress-section"
            className="rounded-xl border bg-blue-50 p-4"
          >
            <div className="mb-2 flex items-center justify-between">
              <p className="font-medium text-blue-700">
                Uploading File...
              </p>

              <p
                id="upload-progress-value"
                data-testid="upload-progress-value"
                className="text-sm font-semibold text-blue-600"
              >
                {progress}%
              </p>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-blue-100">
              <div
                className="h-full rounded-full bg-blue-600 transition-all"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>
          </div>
        )}

        {/* Success */}
        {status === "success" && (
          <div
            id="upload-success-message"
            data-testid="upload-success-message"
            className="rounded-xl border border-green-200 bg-green-50 p-4"
          >
            <p className="font-medium text-green-700">
              File uploaded successfully.
            </p>
          </div>
        )}

        {/* Error */}
        {status === "error" && (
          <div
            id="upload-error-message"
            data-testid="upload-error-message"
            className="rounded-xl border border-red-200 bg-red-50 p-4"
          >
            <p className="font-medium text-red-700">
              {errorMessage}
            </p>
          </div>
        )}

        {/* File Details */}
        <div
          id="uploaded-file-details"
          data-testid="uploaded-file-details"
          className="rounded-xl border bg-gray-50 p-4"
        >
          <div className="space-y-2">
            <p
              id="single-upload-selected-name"
              data-testid="single-upload-selected-name"
              className="text-sm font-medium text-gray-700"
            >
              File:
              {fileName || " No file selected"}
            </p>

            <p
              id="single-upload-file-size"
              data-testid="single-upload-file-size"
              className="text-sm text-gray-600"
            >
              Size:
              {fileSize || " --"}
            </p>

            <p
              id="single-upload-status"
              data-testid="single-upload-status"
              className="text-sm text-gray-600"
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
            className={`rounded-lg px-5 py-2 text-white transition-colors ${
              status === "uploading"
                ? "cursor-not-allowed bg-gray-400"
                : "bg-red-500 hover:bg-red-600"
            }`}
          >
            Remove File
          </button>
        )}
      </div>
    </section>
  )
}