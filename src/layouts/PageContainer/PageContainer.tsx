/* Framework imports -------------------------------------------------------- */
import styled from '@emotion/styled'

/* Component declaration ---------------------------------------------------- */
const PageContainer = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  overflow-y: scroll;

  background-color: ${(props) => props.theme.colors.lightgrey};

  padding: ${(props) => props.theme.layoutPadding.main};

  @media ${(props) => props.theme.media.desktop} {
    // Add padding on sides the larger the screen is
    padding: ${(props) => props.theme.layoutPadding.desktop};
    padding-top: 25px;
  }
`

export default PageContainer
