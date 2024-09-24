/* Framework imports -------------------------------------------------------- */
import styled from '@emotion/styled'

/* Component declaration ---------------------------------------------------- */
const AuthErrorMessage = styled.div`
  color: ${(props) => props.theme.palette.error.main};
  font-size: .9rem;
  margin-bottom: 20px;

  @media ${(props) => props.theme.media.mobile.landscape} {
    margin-bottom: -10px;
  }
`

export default AuthErrorMessage
