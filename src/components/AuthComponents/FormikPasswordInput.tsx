/* Framework imports -------------------------------------------------------- */
import React, { useState } from 'react'

/* Component imports -------------------------------------------------------- */
import {
  IconButton,
  InputAdornment,
} from '@mui/material'
import {
  Visibility,
  VisibilityOff,
} from '@mui/icons-material'
import { TextField } from 'formik-mui'

/* Type imports ------------------------------------------------------------- */
import {
  Field,
  type FieldAttributes,
} from 'formik'

/* Component declaration ---------------------------------------------------- */
interface FormikPasswordInputProps {
  name: string;
  size?: string;
  error?: string | boolean;
  placeholder?: string;
}

const FormikPasswordInput: React.FC<FieldAttributes<FormikPasswordInputProps>> = ({ ...props }) => {
  const [ showPassword, setShowPassword ] = useState<boolean>(false)

  const handleClickShowPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setShowPassword((show) => !show)
  }

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <Field
      component={TextField}
      type={showPassword ? 'text' : 'password'}
      placeholder={props.placeholder ? props.placeholder : 'Mot de passe'}
      InputProps={
        {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }
      }
      {...props}
    />
  )
}

export default FormikPasswordInput
