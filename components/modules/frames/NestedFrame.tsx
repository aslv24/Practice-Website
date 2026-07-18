"use client"

import { useEffect, useState } from "react"

const NESTED_CHILD_FRAME_DOC = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Child Frame</title>
<style>
body{font-family:sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;gap:16px;margin:0;background:#ffffff;}
h3{color:#16a34a;margin:0;}
p{color:#64748b;margin:0;}
input{width:240px;padding:10px;border:1px solid #cbd5e1;border-radius:8px;font-size:14px;outline:none;}
input:focus{border-color:#16a34a;box-shadow:0 0 0 3px rgba(22,163,74,.15);}
button{padding:10px 24px;background:#16a34a;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:14px;font-weight:600;}
button:hover{background:#15803d;}
#nestedChildResult{color:#2563eb;font-weight:bold;min-height:20px;}
</style></head>
<body>
<h3 id="childFrameHeading">Child Frame</h3>
<p id="childFrameStatus" data-testid="child-frame-status">Enter value and submit</p>
<input id="nestedChildInput" name="nestedChildInput" data-testid="nested-child-input" aria-label="Nested child input" type="text" placeholder="Enter framework name"/>
<button id="nestedChildSubmitBtn" name="nestedChildSubmit" data-testid="nested-child-submit-button" aria-label="Submit nested child input" onclick="var val=document.getElementById('nestedChildInput').value;document.getElementById('nestedChildResult').innerText=val?'Entered: '+val:'No input provided';">Submit</button>
<p id="nestedChildResult" data-testid="nested-child-result" aria-live="polite"></p>
</body></html>`

function buildParentFrameDoc(childLoaded: boolean) {
  const childContent = childLoaded
    ? `<iframe id="nestedChildFrame" name="nestedChildFrame" title="Nested Child Frame" data-testid="nested-child-frame-iframe" aria-label="Nested child frame iframe" style="width:85%;height:55%;border:1px solid #cbd5e1;border-radius:12px;" srcdoc="${NESTED_CHILD_FRAME_DOC.replace(/"/g, "&quot;")}"></iframe>`
    : `<div id="child-frame-loading" data-testid="child-frame-loading" style="display:flex;align-items:center;justify-content:center;width:85%;height:55%;border:1px dashed #cbd5e1;border-radius:12px;color:#64748b;font-size:14px;">Loading child frame...</div>`

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Parent Frame</title>
<style>
body{font-family:sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;gap:16px;margin:0;background:#f8fafc;}
h2{color:#2563eb;margin:0;}
p{color:#475569;margin:0;}
</style></head>
<body>
<h2 id="parentFrameHeading">Parent Frame</h2>
<p id="parentFrameMessage" data-testid="parent-frame-message">Switch to child frame and perform action</p>
${childContent}
</body></html>`
}

export default function NestedFrame() {
  const [parentLoaded, setParentLoaded] = useState(false)
  const [childLoaded, setChildLoaded] = useState(false)

  useEffect(() => {
    const parentTimer = setTimeout(() => setParentLoaded(true), 1500)
    return () => clearTimeout(parentTimer)
  }, [])

  useEffect(() => {
    if (!parentLoaded) return
    const childTimer = setTimeout(() => setChildLoaded(true), 2000)
    return () => clearTimeout(childTimer)
  }, [parentLoaded])

  return (
    <section
      id="nested-frame-card"
      data-testid="nested-frame-card"
      data-component="nested-frame"
      aria-label="Nested frames scenario"
      className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
    >
      {/* Header */}
      <header className="mb-6">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-blue-600">
          Nested Frames
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Practice Selenium nested frame handling using delayed frame loading, parent-child switching, and dynamic frame interaction.
        </p>
      </header>

      {/* Status Section */}
      <div aria-live="polite" className="mb-6 rounded-xl border bg-gray-50 p-4">
        <div className="space-y-2 text-sm">
          <p
            id="parent-frame-status"
            data-testid="parent-frame-status"
            data-frame-loaded={parentLoaded}
            className="font-medium text-gray-700"
          >
            Parent Frame:{parentLoaded ? " Loaded" : " Loading..."}
          </p>
          <p
            id="child-frame-status"
            data-testid="child-frame-status"
            data-frame-loaded={childLoaded}
            className="font-medium text-gray-700"
          >
            Child Frame:{childLoaded ? " Loaded" : " Waiting..."}
          </p>
        </div>
      </div>

      {/* Loading State */}
      {!parentLoaded && (
        <div
          id="parent-frame-loading"
          data-testid="parent-frame-loading"
          className="rounded-xl border border-dashed p-6"
        >
          <div className="flex items-center gap-3">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
            <p className="text-sm text-gray-600">Loading parent frame...</p>
          </div>
        </div>
      )}

      {/* Parent Frame */}
      {parentLoaded && (
        <iframe
          id="nested-parent-frame-iframe"
          name="nestedParentFrame"
          title="Nested Parent Frame"
          data-testid="nested-parent-frame-iframe"
          aria-label="Nested parent frame iframe"
          className="h-96 w-full rounded-xl border"
          srcDoc={buildParentFrameDoc(childLoaded)}
        />
      )}
    </section>
  )
}
