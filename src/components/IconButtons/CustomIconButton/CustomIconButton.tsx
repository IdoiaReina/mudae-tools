/* Framework imports -------------------------------------------------------- */
import React from 'react'

/* Component imports -------------------------------------------------------- */
import CustomIconButtonContainer from './CustomIconButtonContainer'

/* Type imports ------------------------------------------------------------- */
import type { ButtonProps } from '@mui/material'
import type { SvgIconComponent } from '@mui/icons-material'

/* Component declaration ---------------------------------------------------- */
interface CustomIconButtonProps extends ButtonProps {
  Icon: SvgIconComponent;
}

const CustomIconButton: React.FC<CustomIconButtonProps> = ({ Icon, ...rest }) => {
  return (
    <CustomIconButtonContainer {...rest}>
      <Icon />
    </CustomIconButtonContainer>
  )
}

export default CustomIconButton
