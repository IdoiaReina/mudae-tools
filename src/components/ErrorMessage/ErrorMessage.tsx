/* Framework imports -------------------------------------------------------- */
import React from 'react'
import styled from '@emotion/styled'

/* Component imports -------------------------------------------------------- */
import { ErrorMessage as FormikErrorMessage } from 'formik'

/* Type imports ------------------------------------------------------------- */
import type { ErrorMessageProps as FormikErrorMessageProps } from 'formik'

/* Styled components -------------------------------------------------------- */
const RedErrorMessage = styled.div`
  color: ${(props) => props.theme.palette.error.main};
  font-size: .75rem;
  padding-left: 14px;
  margin-top: -5px;
`

/* Component declaration ---------------------------------------------------- */
interface ErrorMessageProps extends FormikErrorMessageProps {}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ name, ...props }) => {
  return (
    <FormikErrorMessage
      {...props}
      name={name}
      component={RedErrorMessage}
    />
  )
}

export default ErrorMessage
