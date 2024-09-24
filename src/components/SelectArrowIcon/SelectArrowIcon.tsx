/* Framework imports -------------------------------------------------------- */
import React from 'react'
import styled from '@emotion/styled'

/* Component imports -------------------------------------------------------- */
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded'

/* Styled components -------------------------------------------------------- */
const SelectArrow = styled(KeyboardArrowRightRounded)`
  color: ${(props) => props.theme.palette.primary.main};
  font-size: 30px;
  margin-right: 10px;
  position: absolute !important;
  right: 0 !important;
  pointer-events: none !important;
`

/* Component declaration ---------------------------------------------------- */
const SelectArrowIcon = (): React.ReactElement => <SelectArrow />

export default SelectArrowIcon
