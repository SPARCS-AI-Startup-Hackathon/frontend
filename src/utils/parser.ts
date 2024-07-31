export const parseContent = (response: string): string => {
  try {
    const parsed = JSON.parse(response)
    if (parsed.message && parsed.message.content) {
      return parsed.message.content
    }
  } catch (e) {
    console.error('Failed to parse JSON:', e)
  }
  return ''
}

export const parseData = (response: string): string => {
  try {
    const parsed = JSON.parse(response)
    if (parsed.stopReason) {
      return parsed.stopReason
    }
  } catch (e) {
    console.error('Failed to parse JSON:', e)
  }
  return ''
}
