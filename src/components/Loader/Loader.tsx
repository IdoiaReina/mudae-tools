/* Framework imports -------------------------------------------------------- */
import React from 'react'
import styled from '@emotion/styled'

/* Styled components -------------------------------------------------------- */
const LoaderWrapperDiv = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #00000080;
  z-index: 100;

  @-webkit-keyframes loader-3d-animation {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes loader-3d-animation {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`

const LoaderDiv = styled.div`
  font-size: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -6em;
  margin-left: -6em;
  text-indent: -9999em;
  border-top: 1em solid rgba(255, 255, 255, 0.2);
  border-right: 1em solid rgba(255, 255, 255, 0.2);
  border-bottom: 1em solid rgba(255, 255, 255, 0.2);
  border-left: 1em solid #ffffff;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: loader-3d-animation 1.1s infinite linear;
  animation: loader-3d-animation 1.1s infinite linear;

  &, &:after {
    border-radius: 50%;
    width: 10em;
    height: 10em;
  }
`

/* Component declaration ---------------------------------------------------- */
interface LoaderProps {}

const Loader: React.FC<LoaderProps> = () => {
  return (
    <LoaderWrapperDiv>
      <LoaderDiv />
    </LoaderWrapperDiv>
  )
}

export default Loader
