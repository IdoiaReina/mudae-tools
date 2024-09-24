import '@emotion/react'
import '@emotion/styled'
import type { AppTheme } from 'theme/emotionTheme'

declare module '@emotion/react' {
  export interface Theme extends AppTheme {}
}
declare module '@emotion/styled' {
  export interface Theme extends AppTheme {}
}
