/* Framework imports -------------------------------------------------------- */
import React, {
  useEffect,
  useRef,
  useState,
} from 'react'
import styled from '@emotion/styled'

/* Module imports ----------------------------------------------------------- */

/* Component imports -------------------------------------------------------- */
import FilerobotImageEditor, {
  TABS,
  TOOLS,
} from 'react-filerobot-image-editor'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material'
import {
  useAppDispatch,
  useAppSelector,
} from 'store/hooks'
import { selectSavedPickers } from 'store/slices/pickerSlice'
import {
  selectSavedMakers,
  setSavedMakers,
} from 'store/slices/makerSlice'
import LargeTitle from 'components/LargeTitle/LargeTitle'
import LongButton from 'components/LongButton/LongButton'
import CustomIconButton from 'components/IconButtons/CustomIconButton/CustomIconButton'
import { Delete } from '@mui/icons-material'
import FormBoldTitle from 'components/FormBoldTitle/FormBoldTitle'

/* Styled components -------------------------------------------------------- */
const ImageProcessorContainer = styled.div`
  width: 100%;
  height: calc(100vh - 250px);

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
  const defaultUrl = process.env.NODE_ENV === 'production' ? '' : 'https://static.wikia.nocookie.net/madoka-magica/images/5/51/MK_GOD.jpg/revision/latest?cb=20200916211931&path-prefix=fr'
  const dispatch = useAppDispatch()
  const savedMakers = useAppSelector(selectSavedMakers)
  const [ openInput, setOpenInput ] = useState<boolean>((savedMakers.some((val) => val.id === id)))
  const [ input, setInput ] = useState<string>(savedMakers.find((val) => val.id === id)?.imageUrl || '')
  const [ source, setSource ] = useState<string | HTMLImageElement>(defaultUrl)
  const ref = useRef()

  const downloadBase64File = (base64Data: string, fileName: string): void => {
    console.log('hey', fileName)
    const downloadLink = document.createElement('a')
    downloadLink.href = base64Data
    downloadLink.download = fileName
    downloadLink.click()
  }

  const loadImage = () => {
    const image = new Image()
    image.referrerPolicy = 'no-referrer'
    image.src = input
    setSource(image)
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

  const onDownloadClick = () => {
    if (typeof ref.current === 'function') {
      const fnOptionsIfNeededFoundInDocs = {}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const imgData = ref.current(fnOptionsIfNeededFoundInDocs)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      downloadBase64File(imgData.imageData.imageBase64 || '', `${name}.png`)
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
            onClick={onDownloadClick}
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
      <FilerobotImageEditor
        getCurrentImgDataFnRef={ref}
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
        avoidChangesNotSavedAlertOnLeave
      />
    </ImageProcessorContainer>
  )

}

export default ImageMaker
