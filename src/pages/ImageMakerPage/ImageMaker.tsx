/* Framework imports -------------------------------------------------------- */
import React, {
  useEffect,
  useRef,
  useState,
} from 'react'
import styled from '@emotion/styled'

/* Module imports ----------------------------------------------------------- */
import {
  useAppDispatch,
  useAppSelector,
} from 'store/hooks'
import {
  selectSavedMakers,
  setSavedMakers,
} from 'store/slices/makerSlice'

/* Component imports -------------------------------------------------------- */
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material'
import { Delete } from '@mui/icons-material'
import {
  ReactCrop,
  type Crop,
} from 'react-image-crop'
import LargeTitle from 'components/LargeTitle/LargeTitle'
import LongButton from 'components/LongButton/LongButton'
import CustomIconButton from 'components/IconButtons/CustomIconButton/CustomIconButton'
import FormBoldTitle from 'components/FormBoldTitle/FormBoldTitle'

/* Styled components -------------------------------------------------------- */
const ImageProcessorContainer = styled.div`
  width: 100%;

  .FIE_rotate-tool-button {
    display: none;
  }
`

const TitleButtons = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
`

const ModalTitle = styled(DialogTitle)`
  text-align: center;
  color: ${(props) => props.theme.palette.secondary.main};
  font-weight: bold;
`

const ModalAction = styled(DialogActions)`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
`

const Container = styled.div`
  max-height: calc(100vh - 230px);
  display: flex;
  justify-content: center;

  img {
    max-height: calc(100vh - 230px);
  }
`

/* Component declaration ---------------------------------------------------- */
interface ImageMakerProps {
  id: number;
  onDeleteContainer: () => void;
  name: string;
  onChangeName: (value: string) => void;
}

const ImageMaker: React.FC<ImageMakerProps> = ({
  id,
  onChangeName,
  name,
  onDeleteContainer,
}) => {
  const defaultUrl = process.env.NODE_ENV === 'production' ? '' : 'https://static.zerochan.net/Mahou.Shoujo.Madoka%E2%98%86Magica.full.3522716.jpg'
  const dispatch = useAppDispatch()
  const savedMakers = useAppSelector(selectSavedMakers)
  const imgRef = useRef<HTMLImageElement | null>(null)
  const [ openInput, setOpenInput ] = useState<boolean>(!savedMakers.some((val) => val.id === id))
  const [ input, setInput ] = useState<string>(savedMakers.find((val) => val.id === id)?.imageUrl || '')
  const [ crop, setCrop ] = useState<Crop>({ unit: 'px', width: 225, height: 350, x: 0, y: 0 })

  const loadImage = () => {
    const image = new Image()
    image.referrerPolicy = 'no-referrer'
    image.src = input
    dispatch(setSavedMakers(savedMakers.map((value) => value.id === id ? { ...value, imageUrl: input } : value)))
  }

  const onClickLoad = () => {
    setOpenInput(false)
    loadImage()
  }

  useEffect(() => {
    loadImage()
  }, [])

  const onCloseModal = () => {
    setOpenInput(false)
    if (!name && !input)
      onDeleteContainer()
  }

  const downloadCroppedImage = () => {
    const image = new Image()
    image.crossOrigin = 'anonymous'
    image.referrerPolicy = 'no-referrer'
    image.src = input

    image.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      if (!imgRef.current || !ctx) return

      const scaleX = image.naturalWidth / imgRef.current.width
      const scaleY = image.naturalHeight / imgRef.current.height
      const offscreen = new OffscreenCanvas(crop.width * scaleX, crop.height * scaleY)

      canvas.width = offscreen.width
      canvas.height = offscreen.height

      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        offscreen.width,
        offscreen.height,
        0,
        0,
        offscreen.width,
        offscreen.height,
      )

      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = `${name}.png`
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
          URL.revokeObjectURL(url)
        }
      }, 'image/png')
    }
  }

  return (
    <ImageProcessorContainer>
      <LargeTitle>
        {name}
        <TitleButtons>
          <LongButton
            onClick={() => setOpenInput(true)}
            variant="contained"
          >
            Input image
          </LongButton>
          <LongButton
            onClick={downloadCroppedImage}
            variant="contained"
          >
            Download Image
          </LongButton>
          <CustomIconButton
            Icon={Delete}
            variant="outlined"
            color="error"
            onClick={onDeleteContainer}
          />
        </TitleButtons>
      </LargeTitle>
      <Dialog
        open={openInput}
        onClose={onCloseModal}
        maxWidth="md"
        fullWidth
      >
        <ModalTitle>
          Add image
        </ModalTitle>
        <DialogContent>
          <FormBoldTitle>
            Waifu's name (as displayed in Mudae)
          </FormBoldTitle>
          <TextField
            value={name}
            placeholder="Madoka Kaname"
            onChange={(e) => onChangeName(e.target.value)}
            size="small"
          />
          <FormBoldTitle>
            Image's URL (right-click on image + "copy image url address")
          </FormBoldTitle>
          <TextField
            value={input}
            placeholder={defaultUrl}
            onChange={(e) => setInput(e.target.value)}
            size="small"
          />
        </DialogContent>
        <ModalAction>
          <LongButton
            onClick={onCloseModal}
            variant="outlined"
          >
            Cancel
          </LongButton>
          <LongButton
            onClick={onClickLoad}
            variant="contained"
            disabled={!input || !name}
          >
            Load Image
          </LongButton>
        </ModalAction>
      </Dialog>
      <Container>
        <ReactCrop
          crop={crop}
          onChange={(c) => setCrop(c)}
          aspect={225/350}
          // style={{ height: '100%', width: '100%', objectFit: 'contain' }}
        >
          <img
            ref={imgRef}
            src={input}
            referrerPolicy="no-referrer"
          />
        </ReactCrop>
      </Container>
    </ImageProcessorContainer>
  )
}

export default ImageMaker
