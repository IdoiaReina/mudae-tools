/* Framework imports -------------------------------------------------------- */
import styled from '@emotion/styled'

/* Component imports -------------------------------------------------------- */
import Button from '@mui/material/Button'

/* Component declaration ---------------------------------------------------- */
const CustomIconButtonContainer = styled(Button)`
  min-width: 40px;
  width: 40px;
  height: 40px;
  margin: 0 2px;

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    font-size: 26px;
  }
`

export default CustomIconButtonContainer
