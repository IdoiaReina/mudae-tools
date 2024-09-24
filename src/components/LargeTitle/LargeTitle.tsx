/* Framework imports -------------------------------------------------------- */
import styled from '@emotion/styled'

/* Component declaration ---------------------------------------------------- */
const LargeTitle = styled.div`
  color: ${(props) => props.theme.palette.secondary.main};
  font-weight: bold;
  font-size: 1.4rem;
  margin-bottom: 20px;
  text-transform: uppercase;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media ${(props) => props.theme.media.mobile.main} {
    font-size: 1.1rem;
    align-items: initial;
    gap: 10px;
  }

  @media ${(props) => props.theme.media.mobile.portrait} {
    flex-direction: column;
  }
`

export default LargeTitle
