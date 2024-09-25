/* Framework imports -------------------------------------------------------- */
import styled from '@emotion/styled'

/* Component imports -------------------------------------------------------- */
import Button from '@mui/material/Button'

/* Component declaration ---------------------------------------------------- */
const CustomIconButtonContainer = styled(Button)`
  min-width: 38px;
  width: 38px;
  min-height: 38px;
  height: 38px;
  margin: 0 2px;

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    font-size: 26px;
  }
`

export default CustomIconButtonContainer
