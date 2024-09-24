/* Framework imports -------------------------------------------------------- */
import styled from '@emotion/styled'

/* Component declaration ---------------------------------------------------- */
interface BaseLayoutProps {
  addTopGap?: boolean;
}

const BaseLayout = styled.div<BaseLayoutProps>`
  flex-grow: 1;
  display: flex;
  flex-direction: column;

  overflow: hidden;
  position: absolute;
  left: 0;
  top: ${(props) => props.addTopGap ? '40px' : '0px'};
  right: 0;
  bottom: 0;
`

export default BaseLayout
