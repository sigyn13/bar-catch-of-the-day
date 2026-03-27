export function useClipboard() {
  async function copy(text) {
    if (typeof text !== 'string') text = String(text ?? '')

    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return
    }

    // Fallback for older browsers / restricted contexts
    const el = document.createElement('textarea')
    el.value = text
    el.setAttribute('readonly', '')
    el.style.position = 'fixed'
    el.style.top = '-9999px'
    el.style.left = '-9999px'
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
  }

  return { copy }
}

