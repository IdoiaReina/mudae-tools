/* Framework imports -------------------------------------------------------- */
import React from 'react'
import styled from '@emotion/styled'

/* Component imports -------------------------------------------------------- */
import {
  Checkbox,
  FormControlLabel,
} from '@mui/material'
import {
  Check,
  CircleOutlined,
} from '@mui/icons-material'

/* Styled components -------------------------------------------------------- */
const CheckableButtonContainer = styled.div`
  align-self: end;
  height: fit-content;
  min-height: 50px;
`

interface CheckableFormControlLabelProps {
  checked: boolean;
  disabled: boolean;
}

const CheckableFormControlLabel = styled(FormControlLabel)<CheckableFormControlLabelProps>`
  border: 1px solid ${(props) => props.theme.colors.grey};
  border-radius: 4px;
  padding-top: 10px;
  padding-bottom: 10px;
  width: 100%;
  height: 100%;
  margin: 0;
  color: ${(props) => props.checked ? props.theme.colors.main : props.theme.palette.primary.main};
  background-color: ${(props) => props.checked ? props.disabled ? props.theme.colors.lightgrey : props.theme.palette.primary.main : props.theme.colors.main};
`

const ColoredCheckbox = styled(Checkbox)<CheckableFormControlLabelProps>`
  svg {
    fill: ${(props) => props.checked ? undefined : props.disabled ? props.theme.colors.lightgrey : props.theme.palette.primary.main};
  }
  height: 38px;
  width: 38px;
`

/* Component declaration ---------------------------------------------------- */
interface CheckableButtonProps {
  checked: boolean;
  onChange: (event: React.SyntheticEvent, checked: boolean) => void;
  label: React.ReactNode;
  type?: 'radio' | 'checkbox';
  className?: string;
  disabled?: boolean;
}

const CheckableButton: React.FC<CheckableButtonProps> = ({
  checked,
  onChange,
  label,
  type = 'checkbox',
  className,
  disabled = false,
}) => {
  return (
    <CheckableButtonContainer className={className}>
      <CheckableFormControlLabel
        checked={checked}
        onChange={onChange}
        label={label}
        disabled={disabled}
        control={
          <ColoredCheckbox
            icon={
              type === 'radio' ?
                <CircleOutlined
                  color="primary"
                  fontSize="small"
                /> :
                undefined
            }
            checked={checked}
            checkedIcon={<Check color="secondary" />}
            disabled={disabled}
          />
        }
      />
    </CheckableButtonContainer>
  )
}

export default CheckableButton
