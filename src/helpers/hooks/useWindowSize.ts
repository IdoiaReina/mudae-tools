/* Framework imports -------------------------------------------------------- */
import {
  useState,
  useEffect,
} from 'react'

/* Type imports ------------------------------------------------------------- */
import type { Size2D } from 'types/Vectors'

/* useWindowSize hook implementation ------------------ */
export const useWindowSize = (): Size2D => {
  const [ windowSize, setWindowSize ] = useState<Size2D>({ width: 0, height: 0 })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(
        {
          width: window.innerWidth,
          height: window.innerHeight,
        },
      )
    }
    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return windowSize
}
