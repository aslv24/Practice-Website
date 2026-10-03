"use client"

import { useEffect, useState } from "react"
import { FaCheckCircle, FaCloudUploadAlt, FaExclamationCircle, FaFileAlt, FaLayerGroup, FaTimes, FaTrashAlt } from "react-icons/fa"
import { dynamicWidth } from "@/lib/dynamicStyles"

interface DroppedFileInfo {
  id: string
  name: string
  size: number
  type: string
}

type UploadStatus = "idle" | "uploading" | "success" | "error"

export default function NoInputMultipleUpload() {
  const [fileList, setFileList] = useState<DroppedFileInfo[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
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
        return prev + 30
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
    setErrorMessage("")
    setProgress(0)

    const droppedFiles = e.dataTransfer.files
    if (!droppedFiles || droppedFiles.length === 0) return

    const newFiles: DroppedFileInfo[] = []
    for (let i = 0; i < droppedFiles.length; i++) {
      const f = droppedFiles[i]
      newFiles.push({
        id: `${f.name}-${f.size}-${Date.now()}-${i}`,
        name: f.name,
        size: f.size,
        type: f.type || "unknown",
      })
    }

    setFileList((prev) => [...prev, ...newFiles])
    setStatus("uploading")
  }

  const handleRemoveOne = (id: string) => {
    setFileList((prev) => {
      const filtered = prev.filter((item) => item.id !== id)
      if (filtered.length === 0) {
        setStatus("idle")
        setProgress(0)
      }
      return filtered
    })
  }

  const handleClearAll = () => {
    setFileList([])
    setStatus("idle")
    setProgress(0)
    setErrorMessage("")
  }

  const totalSize = (fileList.reduce((acc, curr) => acc + curr.size, 0) / 1024).toFixed(1)

  return (
    <section
      id="no-input-multiple-card"
      data-testid="no-input-multiple-card"
      data-component="no-input-multiple-upload"
      data-upload-state={status}
      aria-label="Multiple Files Upload Without Input Tag"
      className="file-card"
    >
      <header className="file-card__header">
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-teal-100 p-2 text-teal-600">
            <FaLayerGroup className="h-5 w-5" />
          </span>
          <div>
            <h2 id="no-input-multiple-title" data-testid="no-input-multiple-title" className="file-card__title">
              Multiple Files Drop Zone
            </h2>
            <span className="rounded-full bg-teal-50 px-2 py-0.5 text-xs font-semibold text-teal-700 border border-teal-200">
              No &lt;input&gt; Tag (Multi-Drop)
            </span>
          </div>
        </div>
        <p className="file-card__description">
          Contains <strong>zero</strong> <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">&lt;input&gt;</code> tags. Test dropping batch files via synthetic DataTransfer arrays or OS automation.
        </p>
      </header>

      {/* Pure Multi-Drop Zone - Zero input tag */}
      <div
        id="no-input-multiple-dropzone"
        data-testid="no-input-multiple-dropzone"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`file-card__dropzone ${
          isDragOver ? "file-card__dropzone--active-teal" : "file-card__dropzone--idle"
        }`}
      >
        <FaCloudUploadAlt className={`h-10 w-10 transition-transform ${isDragOver ? "scale-110 text-teal-600" : "text-gray-400"}`} />
        <p className="mt-2 text-sm font-semibold text-gray-700">
          {isDragOver ? "Drop all files now!" : "Drag & Drop multiple files here"}
        </p>
        <p className="mt-1 text-xs text-gray-400">
          Drop batches together or drop repeatedly to accumulate files
        </p>
      </div>

      {/* Progress Box */}
      {status === "uploading" && (
        <div id="no-input-multiple-progress" data-testid="no-input-multiple-progress" className="file-card__progress-box">
          <div className="flex items-center justify-between text-xs font-semibold text-teal-700 mb-1">
            <span>Accumulating and processing batch...</span>
            <span id="no-input-multiple-progress-value" data-testid="no-input-multiple-progress-value">{progress}%</span>
          </div>
          <div className="file-card__progress-track">
            <div className="file-card__progress-bar bg-teal-600" style={dynamicWidth(progress)} />
          </div>
        </div>
      )}

      {/* Error */}
      {status === "error" && (
        <div id="no-input-multiple-error" data-testid="no-input-multiple-error" className="file-card__alert file-card__alert--error">
          <FaExclamationCircle className="h-4 w-4 shrink-0 text-red-600" />
          <span className="text-sm font-medium text-red-800">{errorMessage}</span>
        </div>
      )}

      {/* Uploaded Items List */}
      {fileList.length > 0 && (
        <div id="no-input-multiple-summary" data-testid="no-input-multiple-summary" className="file-card__meta-box">
          <div className="flex items-center justify-between border-b pb-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Accumulated Items</span>
              <span id="no-input-multiple-count" data-testid="no-input-multiple-count" className="rounded-full bg-teal-100 text-teal-800 px-2 py-0.5 text-xs font-bold">
                {fileList.length} {fileList.length === 1 ? "file" : "files"}
              </span>
              <span className="text-xs text-gray-400">({totalSize} KB total)</span>
            </div>

            {status === "success" && (
              <span id="no-input-multiple-success-badge" data-testid="no-input-multiple-success-badge" className="inline-flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded">
                <FaCheckCircle className="h-3 w-3" /> Processed
              </span>
            )}
          </div>

          <div id="no-input-multiple-list" data-testid="no-input-multiple-list" className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {fileList.map((item, index) => (
              <div
                key={item.id}
                id={`no-input-item-${index}`}
                data-testid={`no-input-item-${index}`}
                className="flex items-center justify-between rounded-lg border border-gray-100 bg-white p-2 shadow-xs"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <FaFileAlt className="h-4 w-4 shrink-0 text-teal-500" />
                  <span className="truncate text-xs font-medium text-gray-700" title={item.name}>
                    {item.name}
                  </span>
                  <span className="text-[10px] text-gray-400">
                    ({(item.size / 1024).toFixed(1)} KB)
                  </span>
                </div>

                <button
                  id={`remove-no-input-file-${index}`}
                  data-testid={`remove-no-input-file-${index}`}
                  type="button"
                  aria-label={`Remove ${item.name}`}
                  onClick={() => handleRemoveOne(item.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors p-1"
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
              className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-100 transition-colors"
            >
              <FaTrashAlt className="h-3 w-3" /> Clear All Dropped
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
