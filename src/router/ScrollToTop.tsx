/* Framework imports -------------------------------------------------------- */
import { useEffect } from 'react'

/* Module imports ----------------------------------------------------------- */
import { useLocation } from 'react-router-dom'

/* Component declaration ---------------------------------------------------- */
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    const view: HTMLElement | null = document.getElementById('outlet-scrollable-content')

    view?.scroll({ top: 0, left: 0 })
  }, [ pathname ])

  return null
}
