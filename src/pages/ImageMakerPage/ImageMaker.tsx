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
import { selectImgurToken } from 'store/slices/imgurSlice'
import { copyToClipBoard } from 'helpers/copyToClipBoard'

/* Component imports -------------------------------------------------------- */
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material'
import {
  CloudUpload,
  ContentCopy,
  Delete,
  Download,
  Edit,
} from '@mui/icons-material'
import {
  ReactCrop,
  type Crop,
} from 'react-image-crop'
import { toast } from 'react-toastify'
import LongButton from 'components/LongButton/LongButton'
import CustomIconButton from 'components/IconButtons/CustomIconButton/CustomIconButton'
import FormBoldTitle from 'components/BoldTitle/FormBoldTitle'
import BoldTitle from 'components/BoldTitle/BoldTitle'

/* Type imports ------------------------------------------------------------- */
import type { ImgurUploadResponse } from 'types/Imgur'

/* Styled components -------------------------------------------------------- */
const ImageProcessorContainer = styled.div`
  width: 100%;

  .FIE_rotate-tool-button {
    display: none;
  }
`

const TitleButtons = styled.div`
  display: flex;
  gap: 5px;
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

const DialogContentContainer = styled(DialogContent)`
  text-align: center;
`

const UploadContainer = styled.div`
  border: 2px dashed ${(props) => props.theme.palette.secondary.main};
  color: ${(props) => props.theme.palette.secondary.main};
  font-weight: bold;
  padding: 20px;
  text-align: center;
`

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 300px;
`

/* Component declaration ---------------------------------------------------- */
interface ImageMakerProps {
  id: number;
  onDeleteContainer: () => void;
}

const ImageMaker: React.FC<ImageMakerProps> = ({
  id,
  onDeleteContainer,
}) => {
  const clientId = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_IMGUR_CLIENT_ID_PROD || '' : process.env.REACT_APP_IMGUR_CLIENT_ID_DEV || ''
  const defaultCrop = { unit: 'px', width: 225, height: 350, x: 0, y: 0 }
  const dispatch = useAppDispatch()
  const savedMakers = useAppSelector(selectSavedMakers)
  const tokens = useAppSelector(selectImgurToken)
  const imgRef = useRef<HTMLImageElement | null>(null)
  const [ openInput, setOpenInput ] = useState<boolean>(savedMakers.find((val) => val.id === id)?.imageBase64 === '')
  const [ name, setName ] = useState<string>(savedMakers.find((val) => val.id === id)?.name || '')
  const [ input, setInput ] = useState<string>(savedMakers.find((val) => val.id === id)?.imageBase64 || '')
  const [ newImage, setNewImage ] = useState<string>(savedMakers.find((val) => val.id === id)?.imageBase64 || '')
  const [ link, setLink ] = useState<string>(savedMakers.find((val) => val.id === id)?.link || '')
  const [ crop, setCrop ] = useState<Crop>(savedMakers.find((val) => val.id === id)?.crop as Crop || defaultCrop)
  const [ isUploading, setIsUploading ] = useState<boolean>(false)
  const [ first, setFirst ] = useState<'first' | 'second' | 'third'>(savedMakers.find((val) => val.id === id)?.crop ? 'first' : 'third')

  const updateCrop = (newCrop: Crop) => {
    if (first === 'first') {
      setFirst('second')
      return
    }
    if (first === 'second') {
      setFirst('third')
      return
    }
    setCrop(newCrop)
    dispatch(setSavedMakers(savedMakers.map((value) => value.id === id ? { ...value, crop } : value)))
  }

  const resizeImage = () => {
    if (imgRef.current) {
      const { width: imgWidth, height: imgHeight } = imgRef.current
      const aspectRatio = 225 / 350
      let cropWidth = imgWidth
      let cropHeight = imgHeight

      if (cropWidth / cropHeight > aspectRatio) {
        cropWidth = cropHeight * aspectRatio
      } else {
        cropHeight = cropWidth / aspectRatio
      }

      updateCrop({
        unit: 'px',
        x: (imgWidth - cropWidth) / 2,
        y: (imgHeight - cropHeight) / 2,
        width: cropWidth,
        height: cropHeight,
      })
    }
  }

  useEffect(() => {
    dispatch(setSavedMakers(savedMakers.map((value) => value.id === id ? { ...value, imageBase64: input } : value)))
  }, [ input ])

  useEffect(() => {
    dispatch(setSavedMakers(savedMakers.map((value) => value.id === id ? { ...value, link } : value)))
  }, [ link ])

  useEffect(() => {
    dispatch(setSavedMakers(savedMakers.map((value) => value.id === id ? { ...value, name } : value)))
  }, [ name ])

  useEffect(() => {
    resizeImage()
  }, [ savedMakers.length ])

  const onClickLoad = () => {
    setOpenInput(false)
    setInput(newImage)
    setLink('')
    resizeImage()
  }

  const onCloseModal = () => {
    setOpenInput(false)
    if (!name && !newImage) {
      onDeleteContainer()
    }
  }

  const handlePaste = (event: React.ClipboardEvent) => {
    if (!event.clipboardData) return

    if (event.clipboardData.files[0]) {
      const file = event.clipboardData.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onloadend = () => {
          if (reader.result) {
            setNewImage(reader.result as string)
          }
        }
        reader.readAsDataURL(file)
        return
      }
    }

    // for (const item of items) {
    //   if (item.kind === 'file' && item.type.startsWith('image/')) {
    //     const file = item.getAsFile()
    //     if (file) {
    //       const reader = new FileReader()
    //       reader.onloadend = () => {
    //         if (reader.result) {
    //           setNewImage(reader.result as string)
    //         }
    //       }
    //       reader.readAsDataURL(file)
    //     }
    //     return
    //   }
    // }

    // const url = event.clipboardData.getData('text/plain')
    // if (url) {
    //   try {
    //     const response = await fetch(`https://corsproxy.io/?${url}`)
    //     const blob = await response.blob()
    //     const reader = new FileReader()
    //     reader.onloadend = () => {
    //       if (reader.result) {
    //         setNewImage(reader.result as string)
    //       }
    //     }
    //     reader.readAsDataURL(blob)
    //   } catch(error) {
    //     toast.error('Could not read image from url.')
    //     console.error('Could not read image from url.', error)
    //   }
    // }
  }

  const onCopyToClipBoard = async (text?: string) => {
    const value = `$ai ${name}$${text || link}`
    if (await copyToClipBoard(value)) {
      toast.success('Copied to clipboard.')
    }
  }

  const downloadCroppedImage = (mode: 'upload' | 'download') => {
    const image = new Image()
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

      if (mode === 'download') {
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
      } else {
        const data = canvas.toDataURL('image/png').split(';base64,')[1]
        const formData = new FormData()
        formData.append('image', data)
        formData.append('title', name)
        formData.append('type', 'base64')
        formData.append('description', 'Imported with Mudae Tools')

        setIsUploading(true)
        fetch(`https://api.imgur.com/3/image`, {
          method: 'POST',
          headers: { 'Authorization': tokens.accessToken ? `Bearer ${tokens.accessToken}` : `Client-ID ${clientId}` },
          body: formData,
        }).then(async (response) => {
          const res = await response.json() as ImgurUploadResponse
          setLink(res.data.link)
          onCopyToClipBoard(res.data.link)
        }).catch((error) => {
          console.error(error)
          toast.error('Error, could not upload image.')
        }).finally(() => setIsUploading(false))
      }
    }
  }

  return (
    <ImageProcessorContainer>
      <BoldTitle>
        {name}
        <TitleButtons>
          <CustomIconButton
            onClick={() => setOpenInput(true)}
            variant="contained"
            Icon={Edit}
            label="Input image"
          />
          <CustomIconButton
            onClick={() => downloadCroppedImage('download')}
            variant="contained"
            Icon={Download}
            label="Download image"
          />
          <CustomIconButton
            onClick={() => downloadCroppedImage('upload')}
            variant="contained"
            Icon={CloudUpload}
            label="Upload image"
            disabled={isUploading}
          />
          <CustomIconButton
            onClick={() => onCopyToClipBoard()}
            variant="contained"
            Icon={ContentCopy}
            label="Copy command"
            disabled={isUploading || !link}
          />
          <CustomIconButton
            Icon={Delete}
            variant="outlined"
            color="error"
            onClick={onDeleteContainer}
            label="Remove image"
          />
        </TitleButtons>
      </BoldTitle>
      <Dialog
        open={openInput}
        onClose={onCloseModal}
        maxWidth="md"
        fullWidth
      >
        <ModalTitle>
          Add image
        </ModalTitle>
        <DialogContentContainer>
          <FormBoldTitle>
            Character's name (as displayed in Mudae)
          </FormBoldTitle>
          <TextField
            value={name}
            placeholder="Madoka Kaname"
            onChange={(e) => setName(e.target.value)}
            size="small"
          />
          <FormBoldTitle>
            Character's new image
          </FormBoldTitle>
          <UploadContainer onPaste={handlePaste}>
            CTRL + V your image here
          </UploadContainer>
          {
            newImage && (
              <div>
                <FormBoldTitle>
                  Image Preview
                </FormBoldTitle>
                <PreviewImage
                  src={newImage}
                  alt="Uploaded"
                />
              </div>
            )
          }
        </DialogContentContainer>
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
            disabled={!newImage || !name}
          >
            Load image
          </LongButton>
        </ModalAction>
      </Dialog>
      <Container>
        <ReactCrop
          crop={crop}
          onChange={updateCrop}
          aspect={225 / 350}
        >
          <img
            ref={imgRef}
            src={input}
            referrerPolicy="no-referrer"
            onLoad={() => resizeImage()}
          />
        </ReactCrop>
      </Container>
    </ImageProcessorContainer>
  )
}

export default ImageMaker
