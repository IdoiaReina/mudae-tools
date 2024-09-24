/* Framework imports -------------------------------------------------------- */
import React from 'react'

/* Component imports -------------------------------------------------------- */
import { Field } from 'formik'
import { TextField } from 'formik-mui'

/* Type imports ------------------------------------------------------------- */
import type { FieldAttributes } from 'formik'

/* Component declaration ---------------------------------------------------- */
interface NumberFieldProps {
  placeholder?: string;
  name: string;
  size?: string;
}

const NumberField: React.FC<FieldAttributes<NumberFieldProps>> = ({
  name,
  placeholder = '0',
  ...props
}) => {
  return (
    <Field
      component={TextField}
      name={name}
      type="number"
      placeholder={placeholder}
      InputProps={
        {
          inputProps: {
            style: { textAlign: 'right' },
            min: 0,
          },
          onWheel: (e: React.ChangeEvent<HTMLInputElement>) => e.target.blur(),
        }
      }
      {...props}
    />
  )
}

export default NumberField
