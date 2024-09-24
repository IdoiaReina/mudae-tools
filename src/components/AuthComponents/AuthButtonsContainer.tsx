/* Framework imports -------------------------------------------------------- */
import styled from '@emotion/styled'

/* Component declaration ---------------------------------------------------- */
const AuthButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 40px;

  @media ${(props) => props.theme.media.mobile.portrait} {
    flex-direction: column;
  }
`

export default AuthButtonsContainer
