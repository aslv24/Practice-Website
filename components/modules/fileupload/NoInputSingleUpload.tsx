"use client"

import { useEffect, useState } from "react"
import { FaCheckCircle, FaCloudUploadAlt, FaExclamationCircle, FaFileAlt, FaTrashAlt } from "react-icons/fa"
import { dynamicWidth } from "@/lib/dynamicStyles"

type UploadStatus = "idle" | "uploading" | "success" | "error"

export default function NoInputSingleUpload() {
  const [file, setFile] = useState<{ name: string; size: number; type: string } | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [status, setStatus] = useState<UploadStatus>("idle")
  const [progress, setProgress] = useState(0)
  const [message, setMessage] = useState("")

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

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)
    setMessage("")
    setProgress(0)

    const droppedFiles = e.dataTransfer.files
    if (!droppedFiles || droppedFiles.length === 0) return

    if (droppedFiles.length > 1) {
      setMessage("Multiple files detected! Only the first file was accepted for this single-upload zone.")
    }

    const selectedFile = droppedFiles[0]
    const allowedExtensions = [".pdf", ".png", ".jpg", ".jpeg", ".csv", ".txt"]
    const fileExt = "." + selectedFile.name.split(".").pop()?.toLowerCase()

    if (!allowedExtensions.includes(fileExt)) {
      setStatus("error")
      setMessage(`Unsupported file '${fileExt}'. Allowed: PDF, PNG, JPG, CSV, TXT`)
      return
    }

    setFile({
      name: selectedFile.name,
      size: selectedFile.size,
      type: selectedFile.type || "unknown",
    })
    setStatus("uploading")
  }

  const handleReset = () => {
    setFile(null)
    setStatus("idle")
    setProgress(0)
    setMessage("")
  }

  return (
    <section
      id="no-input-single-card"
      data-testid="no-input-single-card"
      data-component="no-input-single-upload"
      data-upload-state={status}
      aria-label="Single File Upload Without Input Tag"
      className="file-card"
    >
      <header className="file-card__header">
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-amber-100 p-2 text-amber-600">
            <FaCloudUploadAlt className="h-5 w-5" />
          </span>
          <div>
            <h2 id="no-input-single-title" data-testid="no-input-single-title" className="file-card__title">
              Single File Drop Zone
            </h2>
            <span className="rounded-full bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-700 border border-amber-200">
              No &lt;input&gt; Tag (Pure Dropzone)
            </span>
          </div>
        </div>
        <p className="file-card__description">
          Contains <strong>zero</strong> <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">&lt;input&gt;</code> tags. Test synthetic drag-and-drop event dispatching or custom JS <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">DataTransfer</code> injection.
        </p>
      </header>

      {/* Pure Drop Area - Absolutely NO input tag */}
      <div
        id="no-input-single-dropzone"
        data-testid="no-input-single-dropzone"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`file-card__dropzone ${
          isDragOver ? "file-card__dropzone--active" : "file-card__dropzone--idle"
        }`}
      >
        <FaCloudUploadAlt className={`h-10 w-10 transition-transform ${isDragOver ? "scale-110 text-amber-600" : "text-gray-400"}`} />
        <p className="mt-2 text-sm font-semibold text-gray-700">
          {isDragOver ? "Release to drop single file here" : "Drag & Drop 1 file here"}
        </p>
        <p className="mt-1 text-xs text-gray-400">
          Pure event listener zone (no native file dialog trigger)
        </p>
      </div>

      {/* Progress Box */}
      {status === "uploading" && (
        <div id="no-input-single-progress" data-testid="no-input-single-progress" className="file-card__progress-box">
          <div className="flex items-center justify-between text-xs font-semibold text-amber-700 mb-1">
            <span>Processing dropped file...</span>
            <span id="no-input-single-progress-value" data-testid="no-input-single-progress-value">{progress}%</span>
          </div>
          <div className="file-card__progress-track">
            <div className="file-card__progress-bar bg-amber-500" style={dynamicWidth(progress)} />
          </div>
        </div>
      )}

      {/* Error / Alert */}
      {status === "error" && (
        <div id="no-input-single-error" data-testid="no-input-single-error" className="file-card__alert file-card__alert--error">
          <FaExclamationCircle className="h-4 w-4 shrink-0 text-red-600" />
          <span className="text-sm font-medium text-red-800">{message}</span>
        </div>
      )}

      {/* Warning message if multiple were dropped */}
      {status !== "error" && message && (
        <div id="no-input-single-warning" data-testid="no-input-single-warning" className="file-card__alert file-card__alert--warning">
          <span className="text-xs font-medium text-amber-800">{message}</span>
        </div>
      )}

      {/* Dropped File Meta */}
      {file && (
        <div id="no-input-single-result" data-testid="no-input-single-result" className="file-card__meta-box">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FaFileAlt className="h-6 w-6 text-amber-500" />
              <div>
                <p id="no-input-single-filename" data-testid="no-input-single-filename" className="text-sm font-bold text-gray-800">
                  {file.name}
                </p>
                <p className="text-xs text-gray-500">
                  <span id="no-input-single-filesize" data-testid="no-input-single-filesize">{(file.size / 1024).toFixed(1)} KB</span> •{" "}
                  <span id="no-input-single-filetype" data-testid="no-input-single-filetype">{file.type}</span>
                </p>
              </div>
            </div>

            {status === "success" && (
              <span id="no-input-single-success-badge" data-testid="no-input-single-success-badge" className="inline-flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-md">
                <FaCheckCircle className="h-3 w-3" /> Captured
              </span>
            )}
          </div>

          <div className="mt-4 flex justify-end">
            <button
              id="no-input-single-reset-btn"
              data-testid="no-input-single-reset-btn"
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-100 transition-colors"
            >
              <FaTrashAlt className="h-3 w-3" /> Reset Zone
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
