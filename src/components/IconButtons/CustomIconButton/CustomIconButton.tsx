/* Framework imports -------------------------------------------------------- */
import React from 'react'
import styled from '@emotion/styled'

/* Component imports -------------------------------------------------------- */
import {
  Button,
  Tooltip,
  type ButtonProps,
} from '@mui/material'

/* Type imports ------------------------------------------------------------- */
import type { SvgIconComponent } from '@mui/icons-material'

/* Styled components -------------------------------------------------------- */
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

/* Component declaration ---------------------------------------------------- */
interface CustomIconButtonProps extends ButtonProps {
  Icon: SvgIconComponent;
  label?: string;
}

const CustomIconButton: React.FC<CustomIconButtonProps> = ({ Icon, label, ...rest }) => {
  return (
    <Tooltip
      arrow
      placement="top"
      title={label}
    >
      <CustomIconButtonContainer
        {...rest}
        ref={rest.ref}
      >
        <Icon />
      </CustomIconButtonContainer>
    </Tooltip>
  )
}

export default CustomIconButton
