/* Framework imports -------------------------------------------------------- */
import styled from '@emotion/styled'

/* Component declaration ---------------------------------------------------- */
const AuthInputContainer = styled.div`
  @media ${(props) => props.theme.media.mobile.landscape} {
    display: grid;
    align-items: center;
    grid-template-columns: 140px 1fr;
    margin-top: 20px;
  }
`

export default AuthInputContainer
