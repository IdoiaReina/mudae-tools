/* Framework imports -------------------------------------------------------- */
import React from 'react'
import styled from '@emotion/styled'

/* Component imports -------------------------------------------------------- */
import MainLogo from 'components/MainLogo/MainLogo'

/* Styled components -------------------------------------------------------- */
const MainLogoContainer = styled.div`
  text-align: center;

  .main-logo {
    max-height: 125px;

    @media ${(props) => props.theme.media.mobile.portrait} {
      max-width: min(40vh, 40vw);
      max-height: min(20vh, 20vw);
    }

    @media ${(props) => props.theme.media.mobile.main} {
      max-width: min(40vh, 40vw);
      max-height: min(15vh, 15vw);
    }
  }
`

const WelcomeMessage = styled.div`
  font-size: 1.8rem;
  color: ${(props) => props.theme.palette.secondary.main};
  margin-bottom: 2rem;

  @media ${(props) => props.theme.media.mobile.main} {
    font-size: 1.2rem;
  }

  @media ${(props) => props.theme.media.mobile.landscape} {
    margin-bottom: 0;
  }
`

/* Component declaration ---------------------------------------------------- */
interface AuthWelcomeMessageProps {
  children: React.ReactNode;
}

const AuthWelcomeMessage: React.FC<AuthWelcomeMessageProps> = ({ children }) => {

  return (
    <MainLogoContainer>
      <MainLogo />
      <WelcomeMessage>
        {children}
      </WelcomeMessage>
    </MainLogoContainer>
  )
}

export default AuthWelcomeMessage
