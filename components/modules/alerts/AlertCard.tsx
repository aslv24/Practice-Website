"use client"

import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type AlertCardProps = {
  automationId: string
  title: string
  children: ReactNode
  className?: string
}

export default function AlertCard({
  automationId,
  title,
  children,
  className
}: AlertCardProps) {
  const titleId = `${automationId}-title`

  return (
    <section
      id={`${automationId}-card`}
      data-testid={`${automationId}-card`}
      data-component="alert-card"
      aria-labelledby={titleId}
      className={cn(
        "rounded-xl border bg-white p-6 shadow-sm",
        className
      )}
    >
      <h2
        id={titleId}
        data-testid={titleId}
        className="mb-4 text-lg font-semibold tracking-tight"
      >
        {title}
      </h2>

      <div
        data-testid={`${automationId}-content`}
        className="space-y-4"
      >
        {children}
      </div>
    </section>
  )
}

AlertCard.displayName = "AlertCard"