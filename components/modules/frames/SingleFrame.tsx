"use client"

import { useEffect, useState } from "react"

const SINGLE_FRAME_DOC = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Employee Search Frame</title>
<style>
body{font-family:sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;gap:16px;margin:0;background:#f8fafc;}
h2{color:#2563eb;margin:0;}
p{color:#64748b;margin:0;}
input{width:240px;padding:10px;border:1px solid #cbd5e1;border-radius:8px;font-size:14px;outline:none;}
input:focus{border-color:#2563eb;box-shadow:0 0 0 3px rgba(37,99,235,.15);}
button{padding:10px 24px;background:#2563eb;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:14px;font-weight:600;}
button:hover{background:#1d4ed8;}
button:disabled{opacity:.5;cursor:not-allowed;}
#singleFrameResult{color:#16a34a;font-weight:bold;min-height:20px;}
</style></head>
<body>
<h2 id="singleFrameHeading">Employee Search Frame</h2>
<p id="singleFrameInstruction" data-testid="single-frame-instruction">Enter employee ID and submit</p>
<input id="singleFrameInput" name="singleFrameInput" data-testid="single-frame-input" aria-label="Employee ID input" type="text" placeholder="Enter employee ID"/>
<button id="singleFrameSubmitBtn" name="singleFrameSubmit" data-testid="single-frame-submit-button" aria-label="Submit employee ID" onclick="var btn=document.getElementById('singleFrameSubmitBtn');var result=document.getElementById('singleFrameResult');var val=document.getElementById('singleFrameInput').value;btn.disabled=true;result.innerText='Processing...';setTimeout(function(){result.innerText=val?'Employee Found: '+val:'Employee ID is required';btn.disabled=false;},2000);">Search</button>
<p id="singleFrameResult" data-testid="single-frame-result" aria-live="polite"></p>
</body></html>`

export default function SingleFrame() {
  const [frameLoaded, setFrameLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setFrameLoaded(true), 2000)
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
          Practice Selenium iframe handling using delayed frame loading, dynamic interaction, and synchronization scenarios.
        </p>
      </header>

      {/* Status Section */}
      <div aria-live="polite" className="mb-6 rounded-xl border bg-gray-50 p-4">
        <p
          id="single-frame-status"
          data-testid="single-frame-status"
          data-frame-loaded={frameLoaded}
          className="font-medium text-gray-700"
        >
          Frame Status:{frameLoaded ? " Loaded" : " Loading..."}
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
            <p className="text-sm text-gray-600">Loading iframe content...</p>
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
          srcDoc={SINGLE_FRAME_DOC}
        />
      )}
    </section>
  )
}