/* Framework imports -------------------------------------------------------- */
import React, { useState } from 'react'

/* Component imports -------------------------------------------------------- */
import {
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material'
import {
  Visibility,
  VisibilityOff,
} from '@mui/icons-material'

/* Type imports ------------------------------------------------------------- */
import type { BaseTextFieldProps } from '@mui/material'

/* Component declaration ---------------------------------------------------- */
interface PasswordInputProps extends BaseTextFieldProps {
  value: string;
  onChange?: (value: string) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ value, onChange, ...props }) => {
  const [ showPassword, setShowPassword ] = useState<boolean>(false)

  const handleClickShowPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setShowPassword((show) => !show)
  }

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <TextField
      type={showPassword ? 'text' : 'password'}
      placeholder={props.placeholder ? props.placeholder : 'Mot de passe'}
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
      {...props}
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
    />
  )
}

export default PasswordInput
