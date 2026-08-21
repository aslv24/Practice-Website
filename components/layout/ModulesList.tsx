"use client"

import Link from "next/link"
import { memo, useMemo } from "react"

import { useModuleContext } from "@/hooks/useModuleContext"
import { modules } from "@/data/modules"
import { filterModules } from "@/lib/filterModules"
import ModuleFilter from "@/components/layout/ModuleFilter"
import type { PracticeModule } from "@/data/modules"

/**
 * ModuleCard Component
 * Memoized to prevent re-renders when parent updates
 * Only re-renders if the module prop changes
 */
const ModuleCard = memo(function ModuleCard({
  module,
}: {
  module: PracticeModule
}) {
  const Icon = module.icon
  const moduleSlug = module.id

  return (
    <Link
      href={module.link}
      id={`${moduleSlug}-link`}
      data-testid={`${moduleSlug}-link`}
      aria-label={`Open ${module.title} module`}
      className="module-card__link"
    >
      <div
        id={`${moduleSlug}-card`}
        data-testid={`${moduleSlug}-card`}
        aria-label={`${module.title} module card`}
        className="module-card"
      >
        <div className={`module-card__icon ${module.color}`}>
          <Icon aria-hidden="true" />
        </div>

        <h3 className="module-card__title">
          {module.title}
        </h3>

        <p className="module-card__description">
          {module.description}
        </p>

        <span className="module-card__action">
          Open Module
        </span>
      </div>
    </Link>
  )
})

ModuleCard.displayName = "ModuleCard"

/**
 * ModulesList Component
 * Displays filtered list of practice modules with search functionality
 * Memoizes the filtering operation to avoid recalculating on every render
 */
const ModulesList = memo(function ModulesList() {
  const { moduleFilter, resetFilters } = useModuleContext()

  // Memoize filtered modules to avoid recalculating on every render
  // Only recalculates when searchQuery or selectedCategory changes
  const filteredModules = useMemo(
    () =>
      filterModules(
        modules,
        moduleFilter.searchQuery,
        moduleFilter.selectedCategory
      ),
    [moduleFilter.searchQuery, moduleFilter.selectedCategory]
  )

  return (
    <>
      {/* Module Filter */}
      <ModuleFilter />

      {/* Modules Grid or No Results */}
      {filteredModules.length > 0 ? (
        <nav
          id="dashboard-modules-navigation"
          data-testid="dashboard-modules-navigation"
          aria-label="Practice module navigation"
          className="module-grid"
        >
          {filteredModules.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </nav>
      ) : (
        <div
          id="no-results-message"
          data-testid="no-results-message"
          className="module-empty-state"
        >
          <h3 className="module-empty-state__title">
            No modules found
          </h3>

          <p className="module-empty-state__description">
            Try adjusting your search or filters to find what you&apos;re
            looking for.
          </p>

          <button
            type="button"
            onClick={resetFilters}
            className="mt-4 inline-flex items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            Clear Filters
          </button>
        </div>
      )}
    </>
  )
})

ModulesList.displayName = "ModulesList"

export default ModulesList