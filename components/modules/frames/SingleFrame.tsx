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
  const [frameLoaded, setFrameLoaded] =
    useState(false)

  useEffect(() => {
    const timer = setTimeout(
      () => setFrameLoaded(true),
      2000
    )

    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      id="single-frame-card"
      data-testid="single-frame-card"
      data-component="single-frame"
      aria-label="Single frame interaction"
      className="single-frame"
    >
      {/* Header */}
      <header className="single-frame__header">
        <h2 className="single-frame__title">
          Single Frame
        </h2>

        <p className="single-frame__description">
          Practice Selenium iframe handling using delayed frame loading, dynamic interaction, and synchronization scenarios.
        </p>
      </header>

      {/* Status Section */}
      <div
        aria-live="polite"
        className="single-frame__status"
      >
        <p
          id="single-frame-status"
          data-testid="single-frame-status"
          data-frame-loaded={frameLoaded}
          className="single-frame__status-text"
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
          className="single-frame__loading"
        >
          <div className="single-frame__loading-content">
            <div className="single-frame__loading-spinner" />

            <p className="single-frame__loading-text">
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
          className="single-frame__iframe"
          srcDoc={SINGLE_FRAME_DOC}
        />
      )}
    </section>
  )
}