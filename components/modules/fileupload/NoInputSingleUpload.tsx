"use client"

import { useEffect, useState } from "react"
import {
  FaCheckCircle,
  FaCloudUploadAlt,
  FaExclamationCircle,
  FaFileAlt,
  FaFolderOpen,
  FaTrashAlt,
} from "react-icons/fa"
import { dynamicWidth } from "@/lib/dynamicStyles"
import { openFilePicker } from "@/lib/openFilePicker"

type UploadStatus = "idle" | "uploading" | "success" | "error"

interface UploadedFile {
  name: string
  size: number
  type: string
}

export default function NoInputSingleUpload() {
  const [file, setFile] = useState<UploadedFile | null>(null)
  const [status, setStatus] = useState<UploadStatus>("idle")
  const [progress, setProgress] = useState(0)
  const [message, setMessage] = useState("")

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

  const handleChooseFile = async () => {
    setMessage("")

    try {
      const [selectedFile] = await openFilePicker(false)
      if (!selectedFile) return

      setFile({
        name: selectedFile.name,
        size: selectedFile.size,
        type: selectedFile.type || "unknown",
      })
      setProgress(0)
      setStatus("uploading")
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return
      setStatus("error")
      setMessage(
        error instanceof Error ? error.message : "Unable to open the file picker."
      )
    }
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
      aria-label="Single file upload without an input tag"
      className="file-card"
    >
      <header className="file-card__header">
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-amber-100 p-2 text-amber-600">
            <FaCloudUploadAlt className="h-5 w-5" />
          </span>
          <div>
            <h2 id="no-input-single-title" data-testid="no-input-single-title" className="file-card__title">
              Single File Upload Without Input
            </h2>
            <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-700">
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
        id="no-input-single-select-button"
        data-testid="no-input-single-select-button"
        type="button"
        onClick={handleChooseFile}
        className="inline-flex w-fit items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 font-medium text-white transition-colors hover:bg-amber-600"
      >
        <FaFolderOpen aria-hidden="true" /> Choose File
      </button>

      {status === "uploading" && (
        <div id="no-input-single-progress" data-testid="no-input-single-progress" className="file-card__progress-box">
          <div className="mb-1 flex items-center justify-between text-xs font-semibold text-amber-700">
            <span>Uploading file...</span>
            <span id="no-input-single-progress-value" data-testid="no-input-single-progress-value">
              {progress}%
            </span>
          </div>
          <div className="file-card__progress-track">
            <div className="file-card__progress-bar bg-amber-500" style={dynamicWidth(progress)} />
          </div>
        </div>
      )}

      {status === "error" && (
        <div id="no-input-single-error" data-testid="no-input-single-error" className="file-card__alert file-card__alert--error">
          <FaExclamationCircle className="h-4 w-4 shrink-0" />
          <span className="text-sm font-medium">{message}</span>
        </div>
      )}

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
                  <span id="no-input-single-filesize" data-testid="no-input-single-filesize">
                    {(file.size / 1024).toFixed(1)} KB
                  </span>
                  {" · "}
                  <span id="no-input-single-filetype" data-testid="no-input-single-filetype">
                    {file.type}
                  </span>
                </p>
              </div>
            </div>
            {status === "success" && (
              <span id="no-input-single-success-badge" data-testid="no-input-single-success-badge" className="inline-flex items-center gap-1 rounded-md bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
                <FaCheckCircle className="h-3 w-3" /> Uploaded
              </span>
            )}
          </div>
          <div className="mt-4 flex justify-end">
            <button
              id="no-input-single-reset-btn"
              data-testid="no-input-single-reset-btn"
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-100"
            >
              <FaTrashAlt className="h-3 w-3" /> Remove File
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
