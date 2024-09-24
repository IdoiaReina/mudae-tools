/* Framework imports -------------------------------------------------------- */
import React, {
  useEffect,
  useState,
} from 'react'
import {
  Form as FormikForm,
  FormikProvider,
  useFormik,
} from 'formik'

/* Type imports ------------------------------------------------------------- */
import type { EmotionJSX } from '@emotion/react/types/jsx-namespace'
import type {
  FormikContextType,
  FormikValues,
  FormikConfig,
} from 'formik'
import type { ObjectShape } from 'yup'

/* Formik logic wrappers ---------------------------------------------------- */
type FormProps<Value> = {
  form: FormikContextType<Value>;
  children: React.ReactNode;
  innerRef?: React.MutableRefObject<HTMLFormElement | undefined>;
} & React.ComponentProps<typeof FormikForm>

interface FormConfig<Values extends FormikValues = FormikValues> extends Omit<FormikConfig<Values>, 'onSubmit'> {
  onChange?: (pValues: Values) => void | Promise<void>;
  onSubmit?: FormikConfig<Values>['onSubmit'];
}

export const Form = <Values, >({ form, children, innerRef, ...rest }: FormProps<Values>): EmotionJSX.Element => {
  return (
    <FormikProvider value={form}>
      <FormikForm
        {...rest}
        ref={innerRef as React.MutableRefObject<HTMLFormElement>}
      >
        {children}
      </FormikForm>
    </FormikProvider>
  )
}

export const useForm = <Values extends FormikValues = FormikValues>(params: FormConfig<Values>) => {
  const [ firstUpdate, setFirstUpdate ] = useState<boolean>(true)
  const lFormikForm = useFormik<Values>(
    {
      onSubmit: () => {},
      ...params,
    },
  )

  useEffect(() => {
    if (firstUpdate) {
      setFirstUpdate(false)
    } else {
      if (params.onChange !== undefined) {
        Promise.resolve(params.onChange(lFormikForm.values)).catch(console.error)
      }
    }
  }, [ params, firstUpdate, lFormikForm.values ])

  return lFormikForm
}

type ObjectShapeValues = ObjectShape extends Record<string, infer V> ? V : never
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Shape<T extends Record<any, any>> = Partial<Record<keyof T, ObjectShapeValues>>
