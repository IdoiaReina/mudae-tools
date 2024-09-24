/* Framework imports -------------------------------------------------------- */
import React from 'react'
import styled from '@emotion/styled'

/* Component imports -------------------------------------------------------- */
import KeyboardArrowDownRounded from '@mui/icons-material/KeyboardArrowDownRounded'

/* Styled components -------------------------------------------------------- */
const ShowMoreLess = styled.div`
  font-size: .85rem;
  color: ${(props) => props.theme.palette.primary.main};
  text-decoration: underline;
  cursor: pointer;
  display: flex;
  align-items: center;
`

interface DropDownArrowProps {
  open: boolean;
}

const DropDownArrow = styled(KeyboardArrowDownRounded)<DropDownArrowProps>`
  transform: scaleY(${(props) => props.open ? '-1' : '1'});
  color: ${(props) => props.theme.palette.primary.main};
`

/* Component declaration ---------------------------------------------------- */
interface ShowMoreProps {
  children: React.ReactNode;
  onClick: () => void;
  isOpen: boolean;
}

const ShowMore: React.FC<ShowMoreProps> = ({ children, onClick, isOpen }) => {

  return (
    <ShowMoreLess onClick={onClick}>
      {children}
      <DropDownArrow open={isOpen} />
    </ShowMoreLess>
  )
}

export default ShowMore
