/* Framework imports -------------------------------------------------------- */
import React, { useState } from 'react'
import styled from '@emotion/styled'

/* Module imports ----------------------------------------------------------- */

/* Component imports -------------------------------------------------------- */
import FilerobotImageEditor, {
  TABS,
  TOOLS,
} from 'react-filerobot-image-editor'
import {
  Button,
  TextField,
} from '@mui/material'

/* Internal variables ------------------------------------------------------- */
const defaultSourceUrl: string = 'https://scaleflex.cloudimg.io/v7/demo/river.png'

/* Styled components -------------------------------------------------------- */
const ImageProcessorContainer = styled.div`
  height: calc(100vh - 160px);

  .FIE_rotate-tool-button {
    display: none;
  }
`

const LineContainer = styled.div`
  margin-bottom: 10px;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  justify-content: center;
  gap: 10px;
`

/* Component declaration ---------------------------------------------------- */
interface ImageMakerProps {}

const ImageMaker: React.FC<ImageMakerProps> = () => {
  const [ source, setSource ] = useState<string | HTMLImageElement>(defaultSourceUrl)
  const [ value, setValue ] = useState<string>(defaultSourceUrl)

  const downloadBase64File = (base64Data: string, fileName: string): void => {
    const downloadLink = document.createElement('a')
    downloadLink.href = base64Data
    downloadLink.download = fileName
    downloadLink.click()
  }

  const loadImage = () => {
    const image = new Image()
    image.referrerPolicy = 'no-referrer'
    image.src = value
    setSource(image)
  }

  return (
    <ImageProcessorContainer>
      <LineContainer>
        <TextField
          value={value}
          placeholder=""
          onChange={(e) => setValue(e.target.value)}
          size="small"
        />
        <Button
          variant="contained"
          onClick={loadImage}
        >
          Load Image
        </Button>
      </LineContainer>
      <FilerobotImageEditor
        previewPixelRatio={0}
        savingPixelRatio={0}
        source={source}
        onSave={(editedImageObject): void => downloadBase64File(editedImageObject.imageBase64 || '', editedImageObject.fullName || editedImageObject.name)}
        Crop={{ noPresets: true, ratio: 225 / 350, autoResize: true }}
        tabsIds={[ TABS.ADJUST ]}
        defaultTabId={TABS.ADJUST}
        defaultToolId={TOOLS.CROP}
        Rotate={{ componentType: 'buttons', angle: 90 }}
        resetOnImageSourceChange
      />
    </ImageProcessorContainer>
  )

}

export default ImageMaker
