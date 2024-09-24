/* Framework imports -------------------------------------------------------- */
import React, {
  useEffect,
  useState,
} from 'react'

/* Module imports ----------------------------------------------------------- */
import {
  Outlet,
  useLocation,
} from 'react-router-dom'
import { useMobileStatusBarStyle } from 'helpers/hooks/useMobileStatusBarStyle'

/* Component imports -------------------------------------------------------- */
import RouteTitle from 'router/RouteTitle'
import BaseLayout from 'layouts/BaseLayout/BaseLayout'

/* Internal variables ------------------------------------------------------- */
const tabs = [
  {
    label: 'Connexion',
    path: 'connexion',
  },
  {
    label: 'Mot de passe oublié',
    path: 'mot-de-passe-oublie',
  },
  {
    label: 'Réinitialiser le mot de passe',
    path: 'reinitialiser-le-mot-de-passe',
  },
]

/* Component declaration ---------------------------------------------------- */
interface AuthLayoutProps {}

const AuthLayout: React.FC<AuthLayoutProps> = () => {
  useMobileStatusBarStyle('black-translucent')
  const location = useLocation()
  const [ title, setTitle ] = useState<string>('')

  useEffect(() => {
    const newTabValue = tabs.findIndex((tab) => location.pathname.indexOf(tab.path) !== -1)
    if (tabs[newTabValue]?.label) {
      setTitle(tabs[newTabValue].label)
    }
  }, [ location.pathname ])

  return (
    <BaseLayout className="AuthLayout">
      <RouteTitle title={title} />
      <Outlet />
    </BaseLayout>
  )
}

export default AuthLayout
