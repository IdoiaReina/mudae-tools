/* Framework imports -------------------------------------------------------- */
import React from 'react'
import styled from '@emotion/styled'

/* Module imports ----------------------------------------------------------- */
import { useLocation } from 'react-router-dom'

/* Component imports -------------------------------------------------------- */
import PageContainer from 'layouts/PageContainer/PageContainer'
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary'

/* Styled components -------------------------------------------------------- */
const ErrorBoundaryPageContainer = styled(PageContainer)`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: hidden;
`

const ErrorBoundaryInformationsContainer = styled.div`
  text-align: center;
  align-items: center;
  justify-content: left;
  border: 1px solid ${(props) => props.theme.colors.darkgrey};
  box-shadow: .25rem .25rem 0.25rem ${(props) => props.theme.colors.grey};
  border-radius: 1rem;
  color: ${(props) => props.theme.palette.common.white};
  background-color: ${(props) => props.theme.palette.secondary.main};
  padding: 3rem;
  margin: 1rem;
`

/* Component declaration ---------------------------------------------------- */
interface ErrorBoundaryPageProps {
  children: React.ReactNode;
}

const ErrorBoundaryPage: React.FC<ErrorBoundaryPageProps> = ({ children }) => {
  const { pathname } = useLocation()

  return (
    <ErrorBoundary
      pathname={pathname}
      errorMessage={
        <ErrorBoundaryPageContainer>
          <ErrorBoundaryInformationsContainer>
            <div>
              <h1>
                Oups...😅
              </h1>
              <br />
              <h3>
                Une erreur est survenue lors de l'affichage de cette page.
                <br />
                <br />
                Vous pouvez tenter de réessayer, ou bien contacter les développeurs.
              </h3>
            </div>
          </ErrorBoundaryInformationsContainer>
        </ErrorBoundaryPageContainer>
      }
    >
      {children}
    </ErrorBoundary>
  )
}

export default ErrorBoundaryPage
