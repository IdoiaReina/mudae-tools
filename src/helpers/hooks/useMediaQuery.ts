/* Framework imports -------------------------------------------------------- */
import {
  useEffect,
  useState,
} from 'react'

/* useScreenSize hook ---------------------------------- */
export const useMediaQuery = (pQuery: string): boolean => {
  const [ matches, setMatches ] = useState<boolean>(false)

  useEffect(() => {
    const media = window.matchMedia(pQuery)

    if (media.matches !== matches) {
      setMatches(media.matches)
    }

    const listener = () => setMatches(media.matches)

    window.addEventListener(
      'resize',
      listener,
    )

    return () => {
      window.removeEventListener(
        'resize',
        listener,
      )
    }
  }, [ matches, pQuery ])

  return matches
}
