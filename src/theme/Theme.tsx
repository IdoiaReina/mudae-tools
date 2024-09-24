/* Framework imports -------------------------------------------------------- */
import React, { useMemo } from 'react'

/* Module imports ----------------------------------------------------------- */
import { selectTheme } from 'store/slices/themeSlice'
import { useAppSelector } from 'store/hooks'
import {
  INFO_COLOR,
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  emotionTheme,
} from './emotionTheme'

/* Component imports -------------------------------------------------------- */
import { ThemeProvider } from '@mui/material'

/* Component declaration ---------------------------------------------------- */
interface ThemeProps {
  children: React.ReactNode;
}

const Theme: React.FC<ThemeProps> = ({ children, ...props }) => {
  const themeState = useAppSelector(selectTheme)

  const theme = useMemo(() => emotionTheme({
    mode: themeState.mode ?? 'dark',
    primary: PRIMARY_COLOR,
    secondary: SECONDARY_COLOR,
    info: INFO_COLOR,
  }), [ themeState.mode ])

  return (
    <ThemeProvider
      theme={theme}
      {...props}
    >
      {children}
    </ThemeProvider>
  )
}

export default Theme
