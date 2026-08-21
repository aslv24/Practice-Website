import type { PracticeModule } from "@/data/modules"

/**
 * Filter modules based on search query and category
 * Searches through module title and description
 *
 * @param modules - Array of modules to filter
 * @param searchQuery - Search term (searches title and description)
 * @param selectedCategory - Optional category filter
 * @returns Filtered array of modules
 */
export function filterModules(
  modules: PracticeModule[],
  searchQuery: string = "",
  selectedCategory?: string
): PracticeModule[] {
  let filtered = modules

  // Filter by search query
  if (searchQuery.trim()) {
    const lowerQuery = searchQuery.toLowerCase().trim()
    filtered = filtered.filter((module) => {
      const titleMatch = module.title
        .toLowerCase()
        .includes(lowerQuery)
      const descriptionMatch = module.description
        .toLowerCase()
        .includes(lowerQuery)
      return titleMatch || descriptionMatch
    })
  }

  // Filter by category
  if (selectedCategory) {
    filtered = filtered.filter(
      (module) => module.category === selectedCategory
    )
  }

  return filtered
}

/**
 * Get search suggestions based on partial query
 * Useful for autocomplete-style search
 *
 * @param modules - Array of modules
 * @param query - Partial search term
 * @param limit - Maximum number of suggestions
 * @returns Array of suggested modules
 */
export function getSearchSuggestions(
  modules: PracticeModule[],
  query: string,
  limit: number = 5
): PracticeModule[] {
  return filterModules(modules, query).slice(0, limit)
}
