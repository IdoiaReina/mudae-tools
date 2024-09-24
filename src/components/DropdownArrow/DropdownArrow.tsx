/* Framework imports -------------------------------------------------------- */
import styled from '@emotion/styled'

/* Component imports -------------------------------------------------------- */
import { ExpandMoreRounded } from '@mui/icons-material'

/* Component declaration ---------------------------------------------------- */
interface DropdownArrowProps {
  expanded: string;
}

const DropdownArrow = styled(ExpandMoreRounded)<DropdownArrowProps>`
  font-size: 2.2rem;
  margin-left: auto;

  transform: scaleY(${(props) => props.expanded === 'true' ? -1 : 1});
  transition: transform .2s;
  color: ${(props) => props.theme.palette.secondary.main};
`

export default DropdownArrow
