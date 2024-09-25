/* Framework imports -------------------------------------------------------- */
import React from 'react'

/* Component imports -------------------------------------------------------- */
import mainLogo from './logo.png'

/* Component declaration ---------------------------------------------------- */
interface MainLogoProps {}

const MainLogo: React.FC<MainLogoProps> = () => {

  return (
    <img
      src={mainLogo}
      alt="logo"
      width="60px"
    />
  )
}

export default MainLogo
