"use client"

export default function SingleFrame() {

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition border border-gray-100">

      <h2 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
        🧩 Single Frame
      </h2>

      <p className="text-sm text-gray-500 mb-3">
        Enter text inside iframe and click submit
      </p>

      <iframe
        className="w-full h-56 border rounded-xl"
        srcDoc={`
          <html>
            <body style="font-family:sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;gap:10px;">
              
              <h3>Single Frame Interaction</h3>

              <input id="inputBox" type="text" placeholder="Enter text"
                style="padding:8px;border:1px solid #ccc;border-radius:6px;" />

              <button onclick="
                const val = document.getElementById('inputBox').value;
                document.getElementById('result').innerText = val ? 'You entered: ' + val : 'Please enter text';
              "
                style="padding:8px 16px;background:#2563eb;color:white;border:none;border-radius:6px;">
                Submit
              </button>

              <p id="result" style="margin-top:10px;color:green;"></p>

            </body>
          </html>
        `}
      />

    </div>
  )
}