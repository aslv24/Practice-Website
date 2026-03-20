"use client"

export default function NestedFrame() {

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition border border-gray-100">

      <h2 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
        🧩 Nested Frames
      </h2>

      <p className="text-sm text-gray-500 mb-3">
        Switch parent → child → perform action
      </p>

      <iframe
        className="w-full h-72 border rounded-xl"
        srcDoc={`
          <html>
            <body style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;">
              
              <h3>Parent Frame</h3>

              <iframe 
                style="width:80%;height:70%;border:1px solid black;"
                srcdoc="
                  <html>
                    <body style='font-family:sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;gap:10px;'>

                      <h4>Child Frame</h4>

                      <input id='childInput' placeholder='Enter data'
                        style='padding:8px;border:1px solid #ccc;border-radius:6px;' />

                      <button onclick=\"
                        const val = document.getElementById('childInput').value;
                        document.getElementById('childResult').innerText = val ? 'Entered: ' + val : 'No input';
                      \"
                        style='padding:8px 16px;background:green;color:white;border:none;border-radius:6px;'>
                        Submit
                      </button>

                      <p id='childResult' style='color:blue;'></p>

                    </body>
                  </html>
                ">
              </iframe>

            </body>
          </html>
        `}
      />

    </div>
  )
}