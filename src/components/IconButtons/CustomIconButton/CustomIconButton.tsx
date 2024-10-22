/* Framework imports -------------------------------------------------------- */
import React from 'react'

/* Component imports -------------------------------------------------------- */
import {
  Tooltip,
  type ButtonProps,
} from '@mui/material'
import CustomIconButtonContainer from './CustomIconButtonContainer'

/* Type imports ------------------------------------------------------------- */
import type { SvgIconComponent } from '@mui/icons-material'
import type { IconButtonSize } from './CustomIconButtonContainer'

/* Component declaration ---------------------------------------------------- */
interface CustomIconButtonProps extends ButtonProps {
  Icon: SvgIconComponent;
  label?: string;
  customsize?: IconButtonSize;
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
