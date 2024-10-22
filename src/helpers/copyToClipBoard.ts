/* onCopyToClipBoard helper function ---------------------------------------- */
export const copyToClipBoard = async (value: string) => {
  if (typeof ClipboardItem !== 'undefined') {
    const html = new Blob([ value ], { type: 'text/html' })
    const text = new Blob([ value ], { type: 'text/plain' })
    const data = new ClipboardItem({ 'text/html': html, 'text/plain': text })
    await navigator.clipboard.write([ data ]).then(() => {return true})
  }
  return false
}
