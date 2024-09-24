/* Framework imports -------------------------------------------------------- */
import React, { useState } from 'react'
import * as Yup from 'yup'

/* Module imports ----------------------------------------------------------- */

/* Component imports -------------------------------------------------------- */
import AuthContainer from 'components/AuthComponents/AuthContainer'

/* Type imports ------------------------------------------------------------- */

/* Types declaration -------------------------------------------------------- */
const LoginFormSchema = Yup.object().shape({
  email: Yup.string().required('Email invalide'),
  password: Yup.string().required('Mot de passe invalide'),
})

/* Component declaration ---------------------------------------------------- */
interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = () => {
  return (
    <AuthContainer>
      IDOIATEST
    </AuthContainer>
  )
}

export default LoginPage
