/* Framework imports -------------------------------------------------------- */
import React from 'react'
import styled from '@emotion/styled'

/* Component imports -------------------------------------------------------- */
import { CircularProgress } from '@mui/material'

/* Styled components -------------------------------------------------------- */
const LoadingOverlayWrapper = styled.div`
  position: relative;
`

interface LoadingOverlayContainerProps {
  radius: string;
  placeholder: string;
}

const LoadingOverlayContainer = styled.div<LoadingOverlayContainerProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${(props) => props.radius};
  min-height: ${(props) => props.placeholder};
`

/* Component declaration ---------------------------------------------------- */
interface CloseButtonProps {
  children: React.ReactNode;
  isLoading: boolean;
  size?: number;
  thickness?: number;
  borderRadius?: string | boolean;
  placeholder?: string;
}

const LoadingOverlay: React.FC<CloseButtonProps> = ({
  children,
  isLoading,
  size = 60,
  thickness = 5,
  borderRadius = true,
  placeholder = '0px',
}) => {
  return (
    <LoadingOverlayWrapper>
      {children}
      {
        isLoading && (
          <LoadingOverlayContainer
            radius={borderRadius === false ? 'initial' : borderRadius ? '4px' : borderRadius}
            placeholder={placeholder}
          >
            <CircularProgress
              color="info"
              size={size}
              thickness={thickness}
            />
          </LoadingOverlayContainer>
        )
      }
    </LoadingOverlayWrapper>
  )
}

export default LoadingOverlay
