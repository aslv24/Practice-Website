import Link from "next/link"

type DashboardBackLinkProps = {
  href?: string
  label?: string
}

export default function DashboardBackLink({
  href = "/",
  label = "Back to Dashboard",
}: DashboardBackLinkProps) {
  return (
    <Link
      href={href}
      id="dashboard-back-link"
      data-testid="dashboard-back-link"
      aria-label={label}
      title={label}
      className="dashboard-back-link"
    >
      ← {label}
    </Link>
  )
}