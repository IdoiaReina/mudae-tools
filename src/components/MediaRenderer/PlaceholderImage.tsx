/* Framework imports -------------------------------------------------------- */
import React from 'react'
import styled from '@emotion/styled'

/* Component imports -------------------------------------------------------- */
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported'

/* Styled components -------------------------------------------------------- */
interface ImageSizeProps {
  width: string;
  height: string;
}

const PlaceholderImageStyled = styled.div<ImageSizeProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 3px;
  background-color: white;
  border: 1px dashed ${(props) => props.theme.palette.secondary.main};
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    font-size: 36px !important;
  }
`

/* Component declaration ---------------------------------------------------- */
interface PlaceholderImageProps {
  width: string;
  height: string;
}

const PlaceholderImage: React.FC<PlaceholderImageProps> = ({
  width,
  height,
}) => {

  return (
    <PlaceholderImageStyled
      width={width}
      height={height}
      className="image-container"
    >
      <ImageNotSupportedIcon color="secondary" />
    </PlaceholderImageStyled>
  )
}

export default PlaceholderImage
