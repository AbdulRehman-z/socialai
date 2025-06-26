export const FIELD_NAMES = {
  name: "Full Name",
  email: "Email Address",
  password: "Password",
  confirmPassword: "Confirm Password",
} as const

export const FIELD_TYPES = {
  name: "text",
  email: "email",
  password: "password",
  confirmPassword: "password",
} as const


export const DEFAULT_PAGE_SIZE = 10
export const MIN_PAGE_SIZE = 1
export const MAX_PAGE_SIZE = 100
export const DEFAULT_PAGE = 1
