/* Framework imports -------------------------------------------------------- */
import React from 'react'
import styled from '@emotion/styled'

/* Component imports -------------------------------------------------------- */
import { IconButton } from '@mui/material'
import Close from '@mui/icons-material/CloseOutlined'

/* Styled components -------------------------------------------------------- */
const IconButtonContainer = styled(IconButton)`
  position: absolute;
  right: 10px;
  top: 10px;
  color: ${(props) => props.theme.palette.primary.main};
  z-index: 10;

  @media ${(props) => props.theme.media.mobile.portrait} {
    right: 5px;
    top: 5px;
  }
`

/* Component declaration ---------------------------------------------------- */
interface CloseButtonProps {
  handleClose: () => void;
}

const CloseButton: React.FC<CloseButtonProps> = ({ handleClose }) => {
  return (
    <IconButtonContainer onClick={handleClose}>
      <Close />
    </IconButtonContainer>
  )
}

export default CloseButton
