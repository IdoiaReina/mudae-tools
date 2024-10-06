/* Framework imports -------------------------------------------------------- */
import styled from '@emotion/styled'

/* Component declaration ---------------------------------------------------- */
interface FormBoldTitleProps {
  bigger?: boolean;
  smaller?: boolean;
  required?: boolean;
}

const FormBoldTitle = styled.div<FormBoldTitleProps>`
  display: flex;
  justify-content: ${(props) => props.required ? 'initial' : 'space-between'};
  gap: ${(props) => props.required ? '3px' : 'initial'};
  align-items: center;
  color: ${(props) => props.theme.palette.secondary.main};
  font-weight: bold;
  font-size: ${(props) => props.bigger ? '1.25rem' : props.smaller ? '.9rem' : '1rem'};
  margin-bottom: 10px;
  margin-top: ${(props) => props.bigger ? '40px' : props.smaller ? '10px' : '20px'};

  &:after {
    content: ${(props) => props.required ? "' *'" : ''};
    color: ${(props) => props.theme.palette.error.main};
  }
`

export default FormBoldTitle
