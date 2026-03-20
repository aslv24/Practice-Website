"use client"

export default function AlertCard({
  title,
  children
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="mb-4 text-lg font-medium">{title}</h2>
      {children}
    </div>
  )
}
