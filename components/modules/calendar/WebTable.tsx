"use client"

export default function WebTable() {

  const firstNames = ["Logesh","Arun","Karthik","Suresh","Ravi","Vignesh","Praveen","Dinesh","Saravanan","Ganesh"]
  const lastNames = ["Kumar","Prakash","R","Babu","Shankar","M","K","P","S","Reddy"]
  const cities = ["Chennai","Bangalore","Hyderabad","Mumbai","Delhi"]
  const domains = ["gmail.com","yahoo.com","outlook.com"]

  const tableData = Array.from({ length: 100 }, (_, i) => ({
    id: `IM${String(i + 1).padStart(4, "0")}`,
    firstName: firstNames[i % 10],
    lastName: lastNames[i % 10],
    email: `${firstNames[i % 10].toLowerCase()}.${lastNames[i % 10].toLowerCase()}${i}@${domains[i % 3]}`,
    city: cities[i % 5],
    status: i % 2 === 0 ? "Active" : "Inactive"
  }))

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border">

      <h2 className="text-lg font-semibold mb-4 text-blue-600">
        📊 Web Table
      </h2>

      <div className="overflow-auto max-h-[400px] border rounded-lg">

        <table className="w-full border text-left">

          <thead className="bg-blue-100 sticky top-0 z-10">
            <tr>
              <th className="border px-3 py-2">ID</th>
              <th className="border px-3 py-2">First Name</th>
              <th className="border px-3 py-2">Last Name</th>
              <th className="border px-3 py-2">Email</th>
              <th className="border px-3 py-2">City</th>
              <th className="border px-3 py-2">Status</th>
            </tr>
          </thead>

          <tbody>
            {tableData.map((row) => (
              <tr key={row.id} className="hover:bg-blue-50">
                <td className="border px-3 py-2">{row.id}</td>
                <td className="border px-3 py-2">{row.firstName}</td>
                <td className="border px-3 py-2">{row.lastName}</td>
                <td className="border px-3 py-2">{row.email}</td>
                <td className="border px-3 py-2">{row.city}</td>
                <td className={`border px-3 py-2 font-semibold ${
                  row.status === "Active" ? "text-green-600" : "text-red-500"
                }`}>
                  {row.status}
                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  )
}