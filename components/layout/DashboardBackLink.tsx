import Link from "next/link"

type DashboardBackLinkProps = {
  href?: string
  label?: string
}

export default function DashboardBackLink({
  href = "/",
  label = "Back to Dashboard"
}: DashboardBackLinkProps) {
  return (
    <Link
      href={href}
      id="dashboard-back-link"
      data-testid="dashboard-back-link"
      aria-label={label}
      title={label}
      className="inline-flex items-center rounded-lg bg-gray-800 px-5 py-2 text-white transition hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-500"
    >
      ← {label}
    </Link>
  )
}