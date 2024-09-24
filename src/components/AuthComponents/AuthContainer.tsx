/* Framework imports -------------------------------------------------------- */
import React from 'react'
import styled from '@emotion/styled'

/* Component imports -------------------------------------------------------- */
import PageContainer from 'layouts/PageContainer/PageContainer'

/* Styled components -------------------------------------------------------- */
const AuthContainerContainer = styled(PageContainer)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: ${(props) => props.theme.colors.grey};
  color: ${(props) => props.theme.palette.primary.main};
  overflow-y: hidden;
`

const LoginFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.main};
  color: ${(props) => props.theme.palette.primary.main};
  width: 75%;
  max-width: 600px;
  padding: 3rem;
  border-radius: 10px;

  @media ${(props) => props.theme.media.mobile.main} {
    padding: 1.5rem;
    width: 100%;
    margin: 0 !important;
    overflow-y: auto;
  }

  @media ${(props) => props.theme.media.mobile.landscape} {
    padding: 1rem;
  }
`

/* Component declaration ---------------------------------------------------- */
interface AuthContainerProps {
  children: React.ReactNode;
}

const AuthContainer: React.FC<AuthContainerProps> = ({ children }) => {

  return (
    <AuthContainerContainer>
      <LoginFormContainer>
        {children}
      </LoginFormContainer>
    </AuthContainerContainer>
  )
}

export default AuthContainer
