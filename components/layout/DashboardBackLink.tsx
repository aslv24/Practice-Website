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
      className="inline-flex items-center rounded-lg bg-gray-800 px-5 py-2 text-white transition hover:bg-black"
    >
      {`<- ${label}`}
    </Link>
  )
}
