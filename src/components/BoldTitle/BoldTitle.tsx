/* Framework imports -------------------------------------------------------- */
import styled from '@emotion/styled'

/* Component declaration ---------------------------------------------------- */
interface BoldTitleProps {
  bigger?: boolean;
  smaller?: boolean;
}

const BoldTitle = styled.div<BoldTitleProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${(props) => props.theme.palette.secondary.main};
  font-weight: bold;
  font-size: ${(props) => props.bigger ? '1.4rem' : props.smaller ? '.9rem' : '1.2rem'};
  margin-bottom: 10px;
`

export default BoldTitle
