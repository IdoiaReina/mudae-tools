/* isValidString helper function -------------------------------------------- */
export const isValidString = (stringToVerify?: string | null): boolean => {
  return Boolean(stringToVerify?.trim())
}

/* isValidHexColor helper function ------------------------------------------ */
export const isValidHexColor = (stringToVerify?: string | null): boolean => {
  const hexColorPattern = /^#([0-9A-Fa-f]{3}){1,2}$/

  if (!isValidString(stringToVerify) || stringToVerify?.length !== 7 || !hexColorPattern.test(stringToVerify)) {
    return false
  }
  return true
}
