import Link from "next/link"
import Image from "next/image"
import { FaCheckCircle, FaTimesCircle, FaLink, FaImage } from "react-icons/fa"

export default function BrokenContent() {
  return (
    <section
      id="broken-content-card"
      data-testid="broken-content-card"
      className="w-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md"
    >
      <header className="mb-6">
        <h2
          id="broken-links-title"
          data-testid="broken-links-title"
          className="text-lg font-semibold text-gray-800"
        >
          Broken Links & Images
        </h2>
        <p
          id="broken-links-description"
          data-testid="broken-links-description"
          className="mt-1 text-sm text-gray-500"
        >
          Practice scraping links and images on a page, sending requests, or checking properties to detect broken resources (HTTP 404 or image errors).
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 border-t border-gray-100 pt-6">
        {/* Links section */}
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-5">
          <div className="flex items-center gap-2 mb-4">
            <FaLink className="text-slate-500 h-4 w-4" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">Links Check</h3>
          </div>
          
          <ul className="space-y-4">
            <li className="flex flex-col gap-2 rounded-lg border border-white bg-white p-3 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">Valid Link (200 OK)</span>
                <span className="inline-flex items-center gap-1 rounded bg-green-50 px-2 py-0.5 text-2xs font-bold text-green-700 uppercase">
                  <FaCheckCircle className="h-3 w-3 text-green-600" />
                  Active
                </span>
              </div>
              <Link
                id="valid-link"
                data-testid="valid-link"
                href="/"
                className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors inline-block"
              >
                Go to Home Page
              </Link>
            </li>

            <li className="flex flex-col gap-2 rounded-lg border border-white bg-white p-3 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">Broken Link (404 Error)</span>
                <span className="inline-flex items-center gap-1 rounded bg-red-50 px-2 py-0.5 text-2xs font-bold text-red-700 uppercase">
                  <FaTimesCircle className="h-3 w-3 text-red-600" />
                  Broken
                </span>
              </div>
              <Link
                id="broken-link"
                data-testid="broken-link"
                href="/non-existent-link-path-practice"
                className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors inline-block"
              >
                Link to Broken Page
              </Link>
            </li>
          </ul>
        </div>

        {/* Images section */}
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-5">
          <div className="flex items-center gap-2 mb-4">
            <FaImage className="text-slate-500 h-4 w-4" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">Images Check</h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center gap-2 rounded-lg border border-white bg-white p-3 shadow-xs">
              <span className="text-xs font-semibold text-slate-400 text-center">Valid Image (200)</span>
              <div className="relative h-20 w-full overflow-hidden rounded-md border border-slate-200 shadow-inner">
                <Image
                  id="valid-image"
                  data-testid="valid-image"
                  src="/screenshots/calendar.png"
                  alt="Valid Practice Thumbnail"
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              </div>
              <span className="inline-flex items-center gap-1 text-3xs font-bold text-green-600 uppercase">
                <FaCheckCircle className="h-2.5 w-2.5 text-green-500" />
                Valid
              </span>
            </div>

            <div className="flex flex-col items-center gap-2 rounded-lg border border-white bg-white p-3 shadow-xs">
              <span className="text-xs font-semibold text-slate-400 text-center">Broken Image (404)</span>
              <div className="relative h-20 w-full overflow-hidden rounded-md border border-slate-200 bg-slate-100 flex items-center justify-center shadow-inner">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  id="broken-image"
                  data-testid="broken-image"
                  src="/screenshots/non-existent-image-file.png"
                  alt="Broken Practice Thumbnail"
                  className="h-full w-full object-cover opacity-60"
                />
              </div>
              <span className="inline-flex items-center gap-1 text-3xs font-bold text-red-600 uppercase">
                <FaTimesCircle className="h-2.5 w-2.5 text-red-500" />
                Missing
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
BrokenContent.displayName = "BrokenContent"
