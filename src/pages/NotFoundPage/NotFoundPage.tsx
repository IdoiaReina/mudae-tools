/* Framework imports ----------------------------------- */
import React from 'react'
import styled from '@emotion/styled'

/* Module imports -------------------------------------- */

/* Component imports ----------------------------------- */
import PageContainer from 'layouts/PageContainer/PageContainer'

/* Styled components ----------------------------------- */
const NotFoundPageContainer = styled(PageContainer)`
  display: flex;
  justify-content: center;
  align-items: center;
`

const NotFoundInformationsContainer = styled.div`
  text-align: center;
  align-items: center;
  justify-content: left;
  border: 1px solid #DDDDDD;
  box-shadow: .25rem .25rem 0.25rem #EEEEEE;
  border-radius: 1rem;
  color: ${(props) => props.theme.palette.common.white};
  background-color: ${(props) => props.theme.palette.secondary.main};
  padding: 3rem;
  margin: 1rem;
`

const NotFoundLine = styled.hr`
  width: 50%;
  border: 1px solid ${(props) => props.theme.palette.primary.main};
`

/* Component declaration ------------------------------- */
interface NotFoundPageProps {}

const NotFoundPage: React.FC<NotFoundPageProps> = () => {
  return (
    <NotFoundPageContainer>
      <NotFoundInformationsContainer>
        <h1>
          404
        </h1>
        <NotFoundLine />
        <h4>
          Cette page n'existe pas
        </h4>
      </NotFoundInformationsContainer>
    </NotFoundPageContainer>
  )
}

export default NotFoundPage
