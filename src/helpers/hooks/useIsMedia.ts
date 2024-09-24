/* Module imports ----------------------------------------------------------- */
import { useMediaQuery } from './useMediaQuery'

/* useIsMobile hook ------------------------------------ */
export const useIsDesktop = (): boolean => {
  return useMediaQuery('(min-width: 1025px)')
}

export const useIsTabletPortrait = (): boolean => {
  return useMediaQuery('(min-width: 481px) and (max-width: 1024px) and (min-height: 480px)')
}

export const useIsMobileLandscape = (): boolean => {
  return useMediaQuery('(min-width: 481px) and (max-width: 1024px) and (max-height: 480px)')
}

export const useIsMobilePortrait = (): boolean => {
  return useMediaQuery('(max-width: 480px)')
}

export const useIsMobile = (): boolean => {
  return useMediaQuery('(max-width: 480px), screen and (min-width: 481px) and (max-width: 1024px) and (max-height: 480px)')
}
