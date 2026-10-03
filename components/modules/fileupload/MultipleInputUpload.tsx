"use client"

import { useEffect, useRef, useState } from "react"
import { FaCheckCircle, FaExclamationCircle, FaFileAlt, FaFolderPlus, FaTimes, FaTrashAlt } from "react-icons/fa"
import { dynamicWidth } from "@/lib/dynamicStyles"

interface UploadedFileInfo {
  id: string
  name: string
  size: number
  type: string
}

type UploadStatus = "idle" | "uploading" | "success" | "error"

export default function MultipleInputUpload() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [fileList, setFileList] = useState<UploadedFileInfo[]>([])
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

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setErrorMessage("")
    setProgress(0)

    const allowedExtensions = [".pdf", ".png", ".jpg", ".jpeg", ".csv", ".txt", ".xlsx", ".docx"]
    const newItems: UploadedFileInfo[] = []

    for (let i = 0; i < files.length; i++) {
      const f = files[i]
      const fileExt = "." + f.name.split(".").pop()?.toLowerCase()
      if (!allowedExtensions.includes(fileExt)) {
        setStatus("error")
        setErrorMessage(`Invalid format in '${f.name}'. Allowed: PDF, PNG, JPG, CSV, TXT, XLSX, DOCX`)
        return
      }

      newItems.push({
        id: `${f.name}-${f.size}-${Date.now()}-${i}`,
        name: f.name,
        size: f.size,
        type: f.type || "unknown",
      })
    }

    setFileList((prev) => [...prev, ...newItems])
    setStatus("uploading")
  }

  const handleRemoveOne = (id: string) => {
    setFileList((prev) => {
      const updated = prev.filter((item) => item.id !== id)
      if (updated.length === 0) {
        setStatus("idle")
        setProgress(0)
      }
      return updated
    })
  }

  const handleClearAll = () => {
    setFileList([])
    setStatus("idle")
    setProgress(0)
    setErrorMessage("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const totalSize = (fileList.reduce((acc, curr) => acc + curr.size, 0) / 1024).toFixed(1)

  return (
    <section
      id="multiple-input-upload-card"
      data-testid="multiple-input-upload-card"
      data-component="multiple-file-upload"
      data-upload-state={status}
      aria-label="Multiple Files Upload with Input Tag"
      className="file-card"
    >
      <header className="file-card__header">
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-purple-100 p-2 text-purple-600">
            <FaFolderPlus className="h-5 w-5" />
          </span>
          <div>
            <h2 id="multiple-input-title" data-testid="multiple-input-title" className="file-card__title">
              Multiple Files Upload
            </h2>
            <span className="rounded-full bg-purple-50 px-2 py-0.5 text-xs font-semibold text-purple-700 border border-purple-200">
              With &lt;input type=&quot;file&quot; multiple&gt;
            </span>
          </div>
        </div>
        <p className="file-card__description">
          Practice passing multiple file paths in Selenium via newline delimiter (<code className="text-xs bg-gray-100 px-1 py-0.5 rounded">file1 \n file2</code>) or Playwright array (<code className="text-xs bg-gray-100 px-1 py-0.5 rounded">setInputFiles([f1, f2])</code>).
        </p>
      </header>

      {/* Input Form Area */}
      <div className="file-card__control">
        <label htmlFor="multiple-file-input" className="file-card__label">
          Select multiple files:
        </label>
        <input
          ref={fileInputRef}
          id="multiple-file-input"
          name="multipleFileInput"
          data-testid="multiple-file-input"
          type="file"
          multiple
          accept=".pdf,.png,.jpg,.jpeg,.csv,.txt,.xlsx,.docx"
          onChange={handleFilesChange}
          className="file-card__input"
        />
        <p className="file-card__helper">
          Hold Ctrl/Cmd to select multiple files at once.
        </p>
      </div>

      {/* Upload Progress */}
      {status === "uploading" && (
        <div id="multiple-input-progress" data-testid="multiple-input-progress" className="file-card__progress-box">
          <div className="flex items-center justify-between text-xs font-semibold text-purple-700 mb-1">
            <span>Uploading batch files...</span>
            <span id="multiple-input-progress-value" data-testid="multiple-input-progress-value">{progress}%</span>
          </div>
          <div className="file-card__progress-track">
            <div className="file-card__progress-bar bg-purple-600" style={dynamicWidth(progress)} />
          </div>
        </div>
      )}

      {/* Error State */}
      {status === "error" && (
        <div id="multiple-input-error" data-testid="multiple-input-error" className="file-card__alert file-card__alert--error">
          <FaExclamationCircle className="h-4 w-4 shrink-0 text-red-600" />
          <span className="text-sm font-medium text-red-800">{errorMessage}</span>
        </div>
      )}

      {/* Uploaded Files List */}
      {fileList.length > 0 && (
        <div id="multiple-files-summary" data-testid="multiple-files-summary" className="file-card__meta-box">
          <div className="flex items-center justify-between border-b pb-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Uploaded Batch</span>
              <span id="multiple-file-count" data-testid="multiple-file-count" className="rounded-full bg-purple-100 text-purple-800 px-2 py-0.5 text-xs font-bold">
                {fileList.length} {fileList.length === 1 ? "file" : "files"}
              </span>
              <span className="text-xs text-gray-400">({totalSize} KB total)</span>
            </div>

            {status === "success" && (
              <span id="multiple-input-success-badge" data-testid="multiple-input-success-badge" className="inline-flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded">
                <FaCheckCircle className="h-3 w-3" /> Ready
              </span>
            )}
          </div>

          <div id="multiple-files-list" data-testid="multiple-files-list" className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {fileList.map((item, index) => (
              <div
                key={item.id}
                id={`multiple-file-item-${index}`}
                data-testid={`multiple-file-item-${index}`}
                className="flex items-center justify-between rounded-lg border border-gray-100 bg-white p-2 shadow-xs"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <FaFileAlt className="h-4 w-4 shrink-0 text-purple-500" />
                  <span className="truncate text-xs font-medium text-gray-700" title={item.name}>
                    {item.name}
                  </span>
                  <span className="text-[10px] text-gray-400">
                    ({(item.size / 1024).toFixed(1)} KB)
                  </span>
                </div>

                <button
                  id={`remove-multiple-file-${index}`}
                  data-testid={`remove-multiple-file-${index}`}
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
              id="multiple-input-clear-btn"
              data-testid="multiple-input-clear-btn"
              type="button"
              onClick={handleClearAll}
              className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-100 transition-colors"
            >
              <FaTrashAlt className="h-3 w-3" /> Clear All Files
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
