/* Framework imports -------------------------------------------------------- */
import React from 'react'
import fuzzysort from 'fuzzysort'

/* Module imports ----------------------------------------------------------- */
import { isValidString } from 'helpers/isValidString'

/* Component imports -------------------------------------------------------- */
import { TextField } from '@mui/material'
import {
  Field,
  useField,
} from 'formik'
import { Autocomplete } from 'formik-mui'

/* Type imports ------------------------------------------------------------- */
import type { AutocompleteRenderInputParams } from '@mui/material'
import type { FieldAttributes } from 'formik'

/* Component declaration ---------------------------------------------------- */
interface AutocompleteFieldProps {
  name: string;
  options: (string | number)[];
  placeholder?: string;
  size?: string;
  getOptionLabel?: (option: string | number) => string;
  isOptionEqualToValue?: (option: string, value: string) => boolean;
  multiple?: boolean;
  sort?: boolean;
  disableAutoSelect?: boolean;
}

const AutocompleteField: React.FC<FieldAttributes<AutocompleteFieldProps>> = ({
  name,
  placeholder = 'Sélectionnez',
  options,
  sort = false,
  disableAutoSelect = false,
  getOptionLabel = (option: string): string => option || '',
  isOptionEqualToValue = (option: string, value: string): boolean => option === value || value === '',
  ...props
}) => {
  const [ field, meta ] = useField<string[] | string | number | number[] | null>(name)

  const filterOptions = (options: string[], { inputValue = '' }: {inputValue: string}) => {
    const opt = {
      limit: 100, // don't return more results than you need!
      threshold: -100, // don't return bad results
      all: true,
      keys: [ 'id', 'name' ],
    }
    const optionsLabels = options.map((option) => ({ id: option, name: getOptionLabel(option).normalize('NFD').replace(/[\u0300-\u036f]/g, '') }))
    const fuzzyResults = fuzzysort.go(inputValue.normalize('NFD').replace(/[\u0300-\u036f]/g, ''), optionsLabels, opt)
    let results = fuzzyResults.map(({ obj }) => ({ id: obj.id, name: obj.name }))

    if (sort) {
      results = results.sort((a, b) => a.name.localeCompare(b.name))
    }

    return results.map((res) => res.id)
  }

  const verifyValue = () => {
    if (!field.value) return false
    if (typeof field.value === 'string') return isValidString(field.value)
    if (typeof field.value === 'number') return field.value ? true : false
    if (field.value[0]) {
      if (typeof field.value[0] === 'string') return isValidString(field.value[0])
      if (typeof field.value[0] === 'number') return field.value ? true : false
    }
    return false
  }

  return (
    <Field
      component={Autocomplete}
      name={name}
      options={options}
      autoSelect={!disableAutoSelect || !verifyValue()}
      autoHighlight={!verifyValue()}
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={isOptionEqualToValue}
      filterOptions={filterOptions}
      renderInput={
        (params: AutocompleteRenderInputParams): React.ReactElement => (
          <TextField
            {...params}
            name={name}
            error={meta.touched && meta.error !== undefined}
            helperText={meta.touched && meta.error?.toString()}
            placeholder={placeholder}
            variant="outlined"
          />
        )
      }
      {...props}
    />
  )
}

export default AutocompleteField
