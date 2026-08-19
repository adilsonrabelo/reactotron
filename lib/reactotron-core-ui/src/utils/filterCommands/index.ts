import { CommandType } from "reactotron-core-contract"
import type { CommandTypeKey } from "reactotron-core-contract"
import { escapeRegex } from "../escape-regex"
import { getStatusCategory, STATUS_CATEGORIES } from "../../components/StatusCodeTag"
import type { StatusCategory } from "../../components/StatusCodeTag"

function path(...searchPath) {
  return (obj) => {
    let scaledObj = obj

    for (let i = 0; i < searchPath.length; i++) {
      scaledObj = scaledObj[searchPath[i]]

      if (typeof scaledObj === "undefined" || scaledObj === null) return null
    }

    return scaledObj
  }
}

const COMMON_MATCHING_PATHS = [
  path("type"),
  path("payload", "message"),
  path("payload", "preview"),
  path("payload", "name"),
  path("payload", "path"),
  path("payload", "triggerType"),
  path("payload", "description"),
  path("payload", "request", "url"),
  path("payload", "request", "data"),
]

export function filterSearch(commands: any[], search: string) {
  const trimmedSearch = (search || "").trim()

  if (trimmedSearch === "") return [...commands]

  const searchRegex = new RegExp(escapeRegex(trimmedSearch).replace(/\s/, "."), "i")

  const matching = (value: string) => {
    if (!value) {
      return false
    }

    if (typeof value === "string") {
      return searchRegex.test(value)
    } else {
      try {
        const stringifiedValue = JSON.stringify(value)
        return searchRegex.test(stringifiedValue)
      } catch (error) {
        // console.log("Error stringifying value", value, error)
        return false
      }
    }
  }

  return commands.filter(
    (command) =>
      COMMON_MATCHING_PATHS.filter((c) => {
        if (matching(c(command))) return true
        if (
          command.type === CommandType.Log &&
          (matching("debug") || matching("warning") || matching("error"))
        )
          return true
        if (command.type === CommandType.ClientIntro && matching("connection")) return true
        return false
      }).length > 0
  )
}

export function filterHidden(commands: any[], hiddenCommands: CommandTypeKey[]) {
  if (hiddenCommands.length === 0) return commands

  return commands.filter((command) => hiddenCommands.indexOf(command.type) === -1)
}

// Only API response commands have a status category -- everything else passes through untouched.
function getCommandStatusCategory(command: any): StatusCategory | null {
  if (command.type !== CommandType.ApiResponse) return null
  return getStatusCategory(command.payload?.response?.status)
}

// Which status categories (2xx/3xx/4xx/5xx) actually show up among the given commands, in order.
// Used to only offer filter checkboxes for statuses that have actually been seen.
export function getAvailableStatusCategories(commands: any[]): StatusCategory[] {
  const present = new Set<StatusCategory>()

  commands.forEach((command) => {
    const category = getCommandStatusCategory(command)
    if (category) present.add(category)
  })

  return STATUS_CATEGORIES.filter((category) => present.has(category))
}

export function filterStatusCategory(commands: any[], hiddenStatusCategories: StatusCategory[]) {
  if (!hiddenStatusCategories || hiddenStatusCategories.length === 0) return commands

  return commands.filter((command) => {
    const category = getCommandStatusCategory(command)
    // Non-API commands (and unknown statuses) are never hidden by this filter.
    if (!category) return true
    return hiddenStatusCategories.indexOf(category) === -1
  })
}

function filterCommands(
  commands: any[],
  search: string,
  hiddenCommands: CommandTypeKey[],
  hiddenStatusCategories: StatusCategory[] = []
) {
  const searchFilteredCommands = filterSearch(commands, search)
  const hiddenFilteredCommands = filterHidden(searchFilteredCommands, hiddenCommands)
  return filterStatusCategory(hiddenFilteredCommands, hiddenStatusCategories)
}

export default filterCommands
