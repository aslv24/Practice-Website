"use client"

import { useEffect, useState } from "react"
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaFileAlt,
  FaFolderOpen,
  FaLayerGroup,
  FaTimes,
  FaTrashAlt,
} from "react-icons/fa"
import { dynamicWidth } from "@/lib/dynamicStyles"
import { openFilePicker } from "@/lib/openFilePicker"

type UploadStatus = "idle" | "uploading" | "success" | "error"

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
}

export default function NoInputMultipleUpload() {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [status, setStatus] = useState<UploadStatus>("idle")
  const [progress, setProgress] = useState(0)
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    if (status !== "uploading") return

    const interval = setInterval(() => {
      setProgress((current) => {
        if (current >= 100) {
          clearInterval(interval)
          setStatus("success")
          return 100
        }
        return current + 25
      })
    }, 200)

    return () => clearInterval(interval)
  }, [status])

  const handleChooseFiles = async () => {
    setErrorMessage("")

    try {
      const selectedFiles = await openFilePicker(true)
      if (selectedFiles.length === 0) return

      const newFiles = selectedFiles.map((file, index) => ({
        id: `${file.name}-${file.size}-${Date.now()}-${index}`,
        name: file.name,
        size: file.size,
        type: file.type || "unknown",
      }))

      setFiles((current) => [...current, ...newFiles])
      setProgress(0)
      setStatus("uploading")
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return
      setStatus("error")
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to open the file picker."
      )
    }
  }

  const handleRemoveOne = (id: string) => {
    setFiles((current) => {
      const remaining = current.filter((file) => file.id !== id)
      if (remaining.length === 0) {
        setStatus("idle")
        setProgress(0)
      }
      return remaining
    })
  }

  const handleClearAll = () => {
    setFiles([])
    setStatus("idle")
    setProgress(0)
  }

  const totalSize = (files.reduce((total, file) => total + file.size, 0) / 1024).toFixed(1)

  return (
    <section
      id="no-input-multiple-card"
      data-testid="no-input-multiple-card"
      data-component="no-input-multiple-upload"
      data-upload-state={status}
      aria-label="Multiple file upload without an input tag"
      className="file-card"
    >
      <header className="file-card__header">
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-teal-100 p-2 text-teal-600">
            <FaLayerGroup className="h-5 w-5" />
          </span>
          <div>
            <h2 id="no-input-multiple-title" data-testid="no-input-multiple-title" className="file-card__title">
              Multiple Files Upload Without Input
            </h2>
            <span className="rounded-full border border-teal-200 bg-teal-50 px-2 py-0.5 text-xs font-semibold text-teal-700">
              No &lt;input type=&quot;file&quot;&gt; tag · Any file type
            </span>
          </div>
        </div>
        <p className="file-card__description">
          Choose any file type using a button that opens the browser file picker without a file input.
        </p>
        <p className="file-card__helper">
          Requires a browser that supports the File System Access API, such as Chrome or Edge.
        </p>
      </header>

      <button
        id="no-input-multiple-select-button"
        data-testid="no-input-multiple-select-button"
        type="button"
        onClick={handleChooseFiles}
        className="inline-flex w-fit items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 font-medium text-white transition-colors hover:bg-teal-700"
      >
        <FaFolderOpen aria-hidden="true" /> Choose Files
      </button>

      {status === "uploading" && (
        <div id="no-input-multiple-progress" data-testid="no-input-multiple-progress" className="file-card__progress-box">
          <div className="mb-1 flex items-center justify-between text-xs font-semibold text-teal-700">
            <span>Uploading files...</span>
            <span id="no-input-multiple-progress-value" data-testid="no-input-multiple-progress-value">
              {progress}%
            </span>
          </div>
          <div className="file-card__progress-track">
            <div className="file-card__progress-bar bg-teal-600" style={dynamicWidth(progress)} />
          </div>
        </div>
      )}

      {status === "error" && (
        <div id="no-input-multiple-error" data-testid="no-input-multiple-error" className="file-card__alert file-card__alert--error">
          <FaExclamationCircle className="h-4 w-4 shrink-0" />
          <span className="text-sm font-medium">{errorMessage}</span>
        </div>
      )}

      {files.length > 0 && (
        <div id="no-input-multiple-summary" data-testid="no-input-multiple-summary" className="file-card__meta-box">
          <div className="mb-3 flex items-center justify-between border-b pb-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Uploaded Files</span>
              <span id="no-input-multiple-count" data-testid="no-input-multiple-count" className="rounded-full bg-teal-100 px-2 py-0.5 text-xs font-bold text-teal-800">
                {files.length} {files.length === 1 ? "file" : "files"}
              </span>
              <span className="text-xs text-gray-400">({totalSize} KB total)</span>
            </div>
            {status === "success" && (
              <span id="no-input-multiple-success-badge" data-testid="no-input-multiple-success-badge" className="inline-flex items-center gap-1 rounded bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                <FaCheckCircle className="h-3 w-3" /> Uploaded
              </span>
            )}
          </div>

          <div id="no-input-multiple-list" data-testid="no-input-multiple-list" className="max-h-48 space-y-2 overflow-y-auto pr-1">
            {files.map((file, index) => (
              <div
                key={file.id}
                id={`no-input-item-${index}`}
                data-testid={`no-input-item-${index}`}
                className="flex items-center justify-between rounded-lg border border-gray-100 bg-white p-2 shadow-xs"
              >
                <div className="flex min-w-0 items-center gap-2">
                  <FaFileAlt className="h-4 w-4 shrink-0 text-teal-500" />
                  <span className="truncate text-xs font-medium text-gray-700" title={file.name}>
                    {file.name}
                  </span>
                  <span className="text-[10px] text-gray-400">({(file.size / 1024).toFixed(1)} KB)</span>
                </div>
                <button
                  id={`remove-no-input-file-${index}`}
                  data-testid={`remove-no-input-file-${index}`}
                  type="button"
                  aria-label={`Remove ${file.name}`}
                  onClick={() => handleRemoveOne(file.id)}
                  className="p-1 text-gray-400 transition-colors hover:text-red-500"
                >
                  <FaTimes className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-end">
            <button
              id="no-input-multiple-clear-btn"
              data-testid="no-input-multiple-clear-btn"
              type="button"
              onClick={handleClearAll}
              className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-100"
            >
              <FaTrashAlt className="h-3 w-3" /> Clear All Files
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
