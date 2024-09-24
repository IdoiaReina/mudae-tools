/* Framework imports -------------------------------------------------------- */
import styled from '@emotion/styled'

/* Component declaration ---------------------------------------------------- */
const ImageHoverContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  -webkit-filter: brightness(100%);
  -moz-filter: brightness(100%);
  -o-filter: brightness(100%);
  -ms-filter: brightness(100%);
  filter: brightness(100%);

  &:hover {
    -webkit-filter: brightness(50%);
    -moz-filter: brightness(50%);
    -o-filter: brightness(50%);
    -ms-filter: brightness(50%);
    filter: brightness(50%);
  }
`

export default ImageHoverContainer
