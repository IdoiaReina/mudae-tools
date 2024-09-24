/* Framework imports -------------------------------------------------------- */
import React from 'react'
import styled from '@emotion/styled'

/* Component imports -------------------------------------------------------- */
import Router from 'router/Router'
import ScrollToTop from 'router/ScrollToTop'

/* Component declaration ---------------------------------------------------- */
const AppMain = styled.main`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  overflow: hidden;
`

const App: React.FC = () => {

  return (
    <AppMain>
      <ScrollToTop />
      <Router />
    </AppMain>
  )
}

export default App
