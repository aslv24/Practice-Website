"use client"

import { useEffect, useState } from "react"

type UploadStatus =
  | "idle"
  | "uploading"
  | "success"
  | "error"

export default function FileUpload() {
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
  }

  return (
    <section
      id="input-file-upload-card"
      data-testid="input-file-upload-card"
      data-component="input-file-upload"
      data-upload-state={status}
      aria-label="Resume upload component"
      className="rounded-2xl border bg-white p-6 shadow-sm"
    >
      {/* Header */}
      <header className="mb-6">
        <h2 className="text-2xl font-bold text-blue-600">
          Resume Upload
        </h2>

        <p className="mt-2 text-sm text-gray-600">
          Practice Selenium file upload
          automation using a real input tag,
          upload validation, and synchronization
          scenarios.
        </p>
      </header>

      {/* Upload Section */}
      <div className="rounded-xl border p-5">
        <label
          htmlFor="file-upload-input"
          className="mb-3 block text-sm font-medium text-gray-700"
        >
          Upload Resume
        </label>

        {/* REAL INPUT */}
        <input
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
          className="block w-full cursor-pointer rounded-lg border text-sm text-gray-600
          file:mr-4 file:rounded-lg file:border-0
          file:bg-blue-600 file:px-4
          file:py-2 file:text-white
          hover:file:bg-blue-700
          disabled:cursor-not-allowed disabled:opacity-60"
        />

        {/* Helper Text */}
        <p
          id="upload-helper-text"
          className="mt-3 text-sm text-gray-500"
        >
          Supported formats: PDF, PNG, JPG
          • Maximum size: 5MB
        </p>
      </div>

      {/* Status Section */}
      <div
        aria-live="polite"
        className="mt-6 space-y-4"
      >
        {/* Upload Progress */}
        {status === "uploading" && (
          <div
            id="upload-progress-section"
            data-testid="upload-progress-section"
            className="rounded-xl border border-blue-200 bg-blue-50 p-4"
          >
            <div className="mb-2 flex items-center justify-between">
              <p className="font-medium text-blue-700">
                Uploading Resume...
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

        {/* Success Message */}
        {status === "success" && (
          <div
            id="upload-success-message"
            data-testid="upload-success-message"
            className="rounded-xl border border-green-200 bg-green-50 p-4"
          >
            <p className="font-medium text-green-700">
              Resume uploaded successfully.
            </p>
          </div>
        )}

        {/* Error Message */}
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
          id="file-upload-details"
          data-testid="file-upload-details"
          className="rounded-xl border bg-gray-50 p-4"
        >
          <div className="space-y-2">
            <p
              id="file-upload-selected-name"
              data-testid="file-upload-selected-name"
              className="text-sm font-medium text-gray-700"
            >
              File:
              {fileName || " No file selected"}
            </p>

            <p
              id="file-upload-size"
              data-testid="file-upload-size"
              className="text-sm text-gray-600"
            >
              Size:
              {fileSize || " --"}
            </p>

            <p
              id="file-upload-type"
              data-testid="file-upload-type"
              className="text-sm text-gray-600"
            >
              Type:
              {fileType || " --"}
            </p>

            <p
              id="file-upload-status"
              data-testid="file-upload-status"
              className="text-sm text-gray-600"
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