/* Framework imports -------------------------------------------------------- */
import styled from '@emotion/styled'

/* Module imports ----------------------------------------------------------- */
import { isValidHexColor } from 'helpers/isValidString'

/* Type imports ------------------------------------------------------------- */
import type { Theme } from '@emotion/react'
import type { ChipColor } from 'types/ChipColor'

/* Internal Variables ------------------------------------------------------- */
const getChipColor = (color: ChipColor, customColor: string, theme: Theme): string => {
  const cleanColor = isValidHexColor(customColor) ? customColor : color

  switch (cleanColor) {
    case 'green':
      return '#9fd79a'
    case 'orange':
      return '#f8ca9d'
    case 'red':
      return theme.palette.error.main
    case 'salmon':
      return '#FFC0BC'
    case 'grey':
      return '#dfe1e6'
    case 'yellow':
      return '#fff9a6'
    case 'purple':
      return '#daccfa'
    case 'blue':
      return '#aaddff'
    case 'primary':
      return theme.palette.primary.main
    case 'secondary':
      return theme.palette.secondary.main
    default:
      return cleanColor
  }
}

/* Component declaration ---------------------------------------------------- */
interface ColoredSquareChipProps {
  variant?: 'outlined' | 'filled';
  color: ChipColor;
  customColor?: string;
  textColor?: string;
  bold?: boolean;
  smaller?: boolean;
}

const ColoredSquareChip = styled.div<ColoredSquareChipProps>`
  background: ${(props) => props.variant === 'outlined' ? 'white' : getChipColor(props.color, props.customColor || '', props.theme)};
  color: ${(props) => props.variant === 'outlined' ? getChipColor(props.color, props.customColor || '', props.theme) : props.textColor ?? '#000000'};
  border: ${(props) => props.variant === 'outlined' ? `2px solid ${getChipColor(props.color, props.customColor || '', props.theme)}` : ''};
  font-weight: ${(props) => props.bold ? 'bold' : 'initial'};
  text-align: center;
  align-self: center;
  width: fit-content;
  min-width: 40px;
  height: auto;
  border-radius: ${(props) => props.smaller ? '3px' : '4px'};
  padding: ${(props) => props.smaller ? '0.2rem' : '0.3rem'} 0.4rem;
  font-size: ${(props) => props.smaller ? '.8rem' : '.9rem'};
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: normal;
`

export default ColoredSquareChip
