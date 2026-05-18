"use client"

import { useEffect, useState } from "react"

export default function SingleFrame() {
  const [frameLoaded, setFrameLoaded] =
    useState(false)

  // Simulate Frame Loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setFrameLoaded(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      id="single-frame-card"
      data-testid="single-frame-card"
      data-component="single-frame"
      aria-label="Single frame interaction"
      className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
    >
      {/* Header */}
      <header className="mb-6">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-blue-600">
          Single Frame
        </h2>

        <p className="mt-2 text-sm text-gray-600">
          Practice Selenium iframe handling
          using delayed frame loading, dynamic
          interaction, and synchronization
          scenarios.
        </p>
      </header>

      {/* Status Section */}
      <div
        aria-live="polite"
        className="mb-6 rounded-xl border bg-gray-50 p-4"
      >
        <p
          id="single-frame-status"
          data-testid="single-frame-status"
          data-frame-loaded={frameLoaded}
          className="font-medium text-gray-700"
        >
          Frame Status:
          {frameLoaded
            ? " Loaded"
            : " Loading..."}
        </p>
      </div>

      {/* Loading State */}
      {!frameLoaded && (
        <div
          id="single-frame-loading"
          data-testid="single-frame-loading"
          className="flex h-64 items-center justify-center rounded-xl border border-dashed"
        >
          <div className="flex items-center gap-3">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />

            <p className="text-sm text-gray-600">
              Loading iframe content...
            </p>
          </div>
        </div>
      )}

      {/* Iframe */}
      {frameLoaded && (
        <iframe
          id="single-frame-iframe"
          name="singleFrame"
          title="Single Frame Interaction"
          data-testid="single-frame-iframe"
          aria-label="Single frame iframe"
          className="h-72 w-full rounded-xl border"
          srcDoc={`
            <html>
              <body style="
                font-family:sans-serif;
                display:flex;
                flex-direction:column;
                align-items:center;
                justify-content:center;
                height:100vh;
                gap:16px;
                background:#f8fafc;
              ">

                <h2 style="color:#2563eb;">
                  Employee Search Frame
                </h2>

                <p
                  id="singleFrameInstruction"
                  data-testid="single-frame-instruction"
                  style="color:#64748b;"
                >
                  Enter employee ID and submit
                </p>

                <input
                  id="singleFrameInput"
                  name="singleFrameInput"
                  data-testid="single-frame-input"
                  aria-label="Employee ID input"
                  type="text"
                  placeholder="Enter employee ID"
                  style="
                    width:240px;
                    padding:10px;
                    border:1px solid #cbd5e1;
                    border-radius:8px;
                  "
                />

                <button
                  id="singleFrameSubmitBtn"
                  name="singleFrameSubmit"
                  data-testid="single-frame-submit-button"
                  aria-label="Submit employee ID"
                  onclick="
                    const btn =
                      document.getElementById(
                        'singleFrameSubmitBtn'
                      );

                    const result =
                      document.getElementById(
                        'singleFrameResult'
                      );

                    const value =
                      document.getElementById(
                        'singleFrameInput'
                      ).value;

                    btn.disabled = true;

                    result.innerText =
                      'Processing request...';

                    setTimeout(() => {

                      result.innerText =
                        value
                          ? 'Employee Found: ' + value
                          : 'Employee ID is required';

                      btn.disabled = false;

                    }, 2000);
                  "
                  style="
                    padding:10px 20px;
                    background:#2563eb;
                    color:white;
                    border:none;
                    border-radius:8px;
                    cursor:pointer;
                  "
                >
                  Search
                </button>

                <p
                  id="singleFrameResult"
                  data-testid="single-frame-result"
                  aria-live="polite"
                  style="
                    color:#16a34a;
                    font-weight:bold;
                  "
                ></p>

              </body>
            </html>
          `}
        />
      )}
    </section>
  )
}