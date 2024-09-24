/* Framework imports -------------------------------------------------------- */
import { useEffect } from 'react'

/* Module imports ----------------------------------------------------------- */
import {
  useLocation,
  useMatch,
} from 'react-router-dom'
import { isValidString } from 'helpers/isValidString'

/* Component declaration ---------------------------------------------------- */
interface RouteTitleProps {
  title: string;
}

const RouteTitle: React.FC<RouteTitleProps> = ({ title }) => {
  const location = useLocation()
  const match = useMatch(location.pathname)

  useEffect(() => {
    if (isValidString(title)) {
      document.title = title
    }
  }, [ match, title ])

  return null
}

export default RouteTitle
