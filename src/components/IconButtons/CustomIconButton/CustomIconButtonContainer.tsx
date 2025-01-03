/* Framework imports -------------------------------------------------------- */
import styled from '@emotion/styled'

/* Component imports -------------------------------------------------------- */
import Button from '@mui/material/Button'

/* Component declaration ---------------------------------------------------- */
export enum IconButtonSize {
  small = 28,
  medium = 38,
  large = 45,
}

interface CustomIconButtonContainer {
  customsize?: IconButtonSize;
}

const CustomIconButtonContainer = styled(Button)<CustomIconButtonContainer>`
  min-width: ${(props) => props.customsize || IconButtonSize.medium}px;
  width: ${(props) => props.customsize || IconButtonSize.medium}px !important;
  min-height: ${(props) => props.customsize || IconButtonSize.medium}px;
  height: ${(props) => props.customsize || IconButtonSize.medium}px;
  margin: 0 2px;
  padding: 0px;

  display: flex;
  justify-content: center;
  align-items: center;
`

export default CustomIconButtonContainer
