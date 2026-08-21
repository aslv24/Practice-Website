"use client"

import { memo, useCallback, useState } from "react"
import { FaSearch, FaTimes } from "react-icons/fa"

import { useModuleContext } from "@/hooks/useModuleContext"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

/**
 * ModuleFilter Component
 * Memoized to prevent unnecessary re-renders
 * Only re-renders when context values it depends on change
 */
const ModuleFilter = memo(function ModuleFilter() {
  const { moduleFilter, setSearchQuery, resetFilters } = useModuleContext()
  const [inputValue, setInputValue] = useState(moduleFilter.searchQuery)

  // Memoize event handlers to prevent recreating on every render
  const handleSearchChange = useCallback(
    (value: string) => {
      setInputValue(value)
      setSearchQuery(value)
    },
    [setSearchQuery]
  )

  const handleClearSearch = useCallback(() => {
    setInputValue("")
    resetFilters()
  }, [resetFilters])

  const hasActiveFilters = moduleFilter.searchQuery.length > 0

  return (
    <div
      id="module-filter-section"
      data-testid="module-filter-section"
      className="module-filter"
    >
      <div className="module-filter__content">
        {/* Search Input */}
        <div className="module-filter__search-group">
          <label
            htmlFor="module-search"
            className="module-filter__label"
          >
            Search Modules
          </label>

          <div className="module-filter__search-row">
            <div className="module-filter__input-wrapper">
              <FaSearch
                className="module-filter__search-icon"
                aria-hidden="true"
              />

              <Input
                id="module-search"
                type="search"
                placeholder="Search by module name or description..."
                data-testid="module-search-input"
                aria-label="Search modules"
                value={inputValue}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="module-filter__input"
              />

              {hasActiveFilters && (
                <button
                  onClick={handleClearSearch}
                  className="module-filter__clear"
                  aria-label="Clear search"
                  type="button"
                >
                  <FaTimes size={16} />
                </button>
              )}
            </div>

            {hasActiveFilters && (
              <Button
                onClick={handleClearSearch}
                variant="outline"
                data-testid="module-filter-reset"
                aria-label="Reset all filters"
                className="module-filter__reset"
              >
                Reset
              </Button>
            )}
          </div>
        </div>

        {/* Active Filters Info */}
        {hasActiveFilters && (
          <div
            id="active-filters"
            data-testid="active-filters"
            className="module-filter__active"
          >
            <span className="module-filter__active-label">
              Filters active:
            </span>

            {moduleFilter.searchQuery && (
              <span className="module-filter__badge">
                Search: &quot;{moduleFilter.searchQuery}&quot;
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
})

ModuleFilter.displayName = "ModuleFilter"

export default ModuleFilter