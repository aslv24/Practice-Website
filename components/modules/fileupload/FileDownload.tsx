"use client"

import { useState } from "react"
import { FaCheckCircle, FaDownload, FaFileCsv, FaFileImage, FaFilePdf, FaFileWord } from "react-icons/fa"

interface DownloadItem {
  id: string
  title: string
  filename: string
  url: string
  size: string
  format: "PDF" | "PNG" | "CSV"
  description: string
}

const downloadableFiles: DownloadItem[] = [
  {
    id: "pdf",
    title: "PDF Document",
    filename: "sample-document.pdf",
    url: "/downloads/sample-document.pdf",
    size: "1.2 KB",
    format: "PDF",
    description: "Sample PDF document for testing PDF downloads & content validation.",
  },
  {
    id: "image",
    title: "PNG Image",
    filename: "sample-image.png",
    url: "/downloads/sample-image.png",
    size: "85 B",
    format: "PNG",
    description: "Sample image asset for testing image download and binary verification.",
  },
  {
    id: "csv",
    title: "CSV Dataset",
    filename: "sample-data.csv",
    url: "/downloads/sample-data.csv",
    size: "128 B",
    format: "CSV",
    description: "Tabular test records for verifying data file exports.",
  },
]

export default function FileDownload() {
  const [downloadLog, setDownloadLog] = useState<{
    filename: string
    timestamp: string
  } | null>(null)

  const handleDownloadClick = (filename: string) => {
    const time = new Date().toLocaleTimeString()
    setDownloadLog({ filename, timestamp: time })
  }

  const renderIcon = (format: DownloadItem["format"]) => {
    switch (format) {
      case "PDF":
        return <FaFilePdf className="h-6 w-6 text-red-500" />
      case "PNG":
        return <FaFileImage className="h-6 w-6 text-emerald-500" />
      case "CSV":
        return <FaFileCsv className="h-6 w-6 text-blue-500" />
      default:
        return <FaFileWord className="h-6 w-6 text-gray-500" />
    }
  }

  return (
    <section
      id="file-download-section"
      data-testid="file-download-section"
      data-component="file-download"
      aria-label="File Download Practice Section"
      className="file-card md:col-span-2"
    >
      <header className="file-card__header">
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-emerald-100 p-2 text-emerald-600">
            <FaDownload className="h-5 w-5" />
          </span>
          <div>
            <h2 id="file-download-title" data-testid="file-download-title" className="file-card__title">
              File Downloads
            </h2>
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-200">
              Selenium &amp; Playwright Download Assertions
            </span>
          </div>
        </div>
        <p className="file-card__description">
          Practice triggering file downloads, configuring headless browser download directories, and handling Playwright&apos;s <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">page.waitForEvent(&apos;download&apos;)</code>.
        </p>
      </header>

      {/* Download Action Confirmation */}
      {downloadLog && (
        <div
          id="download-status-banner"
          data-testid="download-status-banner"
          aria-live="polite"
          className="mb-4 flex items-center justify-between rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-800"
        >
          <div className="flex items-center gap-2">
            <FaCheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>
              Download triggered: <strong id="downloaded-filename" data-testid="downloaded-filename">{downloadLog.filename}</strong> at {downloadLog.timestamp}
            </span>
          </div>
          <span className="text-[10px] text-emerald-600">Event Dispatched</span>
        </div>
      )}

      {/* Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-3">
        {downloadableFiles.map((item) => (
          <div
            key={item.id}
            id={`download-card-${item.id}`}
            data-testid={`download-card-${item.id}`}
            className="flex flex-col justify-between rounded-xl border border-gray-100 bg-gray-50/70 p-4 transition-all hover:bg-white hover:shadow-md"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                {renderIcon(item.format)}
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-gray-200/60 px-2 py-0.5 rounded">
                  {item.format} • {item.size}
                </span>
              </div>
              <h3 className="text-sm font-bold text-gray-800">{item.title}</h3>
              <p className="mt-1 text-xs text-gray-500 leading-relaxed">{item.description}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100">
              <a
                id={`download-${item.id}-button`}
                data-testid={`download-${item.id}-button`}
                href={item.url}
                download={item.filename}
                onClick={() => handleDownloadClick(item.filename)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white shadow-xs hover:bg-emerald-700 transition-colors focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1 focus:outline-none"
              >
                <FaDownload className="h-3 w-3" />
                Download {item.format}
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
