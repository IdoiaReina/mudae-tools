/* Framework imports -------------------------------------------------------- */
import React, {
  useEffect,
  useState,
} from 'react'
import styled from '@emotion/styled'

/* Module imports ----------------------------------------------------------- */
import { useNavigate } from 'react-router-dom'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable'
import {
  useAppDispatch,
  useAppSelector,
} from 'store/hooks'
import {
  selectSavedPickers,
  setSavedPickers,
} from 'store/slices/pickerSlice'
import {
  selectSavedMakers,
  setSavedMakers,
} from 'store/slices/makerSlice'
import { isValidString } from 'helpers/isValidString'
import { copyToClipBoard } from 'helpers/copyToClipBoard'
import { getRandomInt } from 'helpers/getRandomInt'

/* Component imports -------------------------------------------------------- */
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material'
import {
  AspectRatio,
  Delete,
  Edit,
} from '@mui/icons-material'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import LongButton from 'components/LongButton/LongButton'
import FormBoldTitle from 'components/BoldTitle/FormBoldTitle'
import CustomIconButton from 'components/IconButtons/CustomIconButton/CustomIconButton'
import BoldTitle from 'components/BoldTitle/BoldTitle'
import ImagePickerItem from './ImagePickerItem'

/* Type imports ------------------------------------------------------------- */
import type { WaifuImage } from 'types/Waifu'

/* Styled components -------------------------------------------------------- */
const ContainerDiv = styled.div`
  width: 100%;
`

const Board = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colors.main};
  border-radius: 4px;
  margin-bottom: 10px;
`

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin: 5px;
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

const TitleButtons = styled.div`
  display: flex;
  gap: 5px;
  justify-content: center;
  align-items: center;
`

/* Component declaration ---------------------------------------------------- */
interface ImagePickerProps {
  onDeletePickerClick: () => void;
  index: number;
  name: string;
  onChangeName: (value: string) => void;
  zoomLevel: number;
}

const ImagePicker: React.FC<ImagePickerProps> = ({
  onDeletePickerClick,
  index,
  name,
  onChangeName,
  zoomLevel,
}) => {
  const defaultText = '5. https://mudae.net/uploads/5711403/GQDcKbx~8dFbzJa.png\n4. https://mudae.net/uploads/5711403/fHsuYUE~8TzHYol.png\n3. https://mudae.net/uploads/5711403/85N8SSu~xOIACK2.png\n2. https://mudae.net/uploads/5711403/dbJKvS-~yDZcBc0.png\n1. https://mudae.net/uploads/5711403/mwfbqTN~w5sjhP3.png'
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const savedPickers = useAppSelector(selectSavedPickers)
  const savedMakers = useAppSelector(selectSavedMakers)
  const [ openInput, setOpenInput ] = useState<boolean>((savedPickers.find((val) => val.index === index)?.images?.length || 0) === 0)
  const [ input, setInput ] = useState<string>(process.env.NODE_ENV === 'production' ? '' : defaultText)
  const [ images, setImages ] = useState<WaifuImage[]>(savedPickers.find((val) => val.index === index)?.images || [])
  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }))

  useEffect(() => {
    dispatch(setSavedPickers(savedPickers.map((value) => value.index === index ? { ...value, images } : value)))
  }, [ images ])

  const onParseClick = () => {
    const lines = input.split('\n')
    const w: WaifuImage[] = []
    lines.reverse().forEach((line) => {
      if (!line.includes('. http')) return
      const url = `http${line.split('. http')[1]}`
      const id = parseInt(line.split('. ')[0])
      if (isValidString(url))
        w.push({ id, url })
    })
    setImages(w)
    setOpenInput(false)
  }

  const onCopyToClipBoard = async (image: WaifuImage) => {
    const value = `$c ${name}$${image.id}`
    await copyToClipBoard(value)
  }

  const onDeleteImage = (id: number) => {
    setImages(images.filter((img) => id !== img.id))
  }

  const handleDragEnd = (event: {active: {id: number}; over: {id: number}} ) => {
    const { active, over } = event

    if (active.id !== over.id) {
      setImages((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id)
        const newIndex = items.findIndex((i) => i.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  const onCloseModal = () => {
    setOpenInput(false)
    if (!name && !images.length) {
      onDeletePickerClick()
    }
  }

  const goToMaker = async () => {
    if (!savedMakers.some((picker) => picker.name === name)) {
      dispatch(setSavedMakers([ ...savedMakers, { id: getRandomInt(1000000000), name, imageBase64: '', link: '' } ] ))
    }
    await copyToClipBoard(name)
    navigate('/custom-image-maker')
  }

  return (
    <ContainerDiv>
      <BoldTitle>
        {name}
        <TitleButtons>
          <CustomIconButton
            Icon={AspectRatio}
            variant="outlined"
            onClick={goToMaker}
            label="Go to Maker"
          />
          <CustomIconButton
            onClick={() => setOpenInput(true)}
            variant="contained"
            Icon={Edit}
            label="Input image list"
          />
          <CustomIconButton
            Icon={Delete}
            variant="outlined"
            color="error"
            onClick={onDeletePickerClick}
            label="Delete picker"
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
          Paste text from Mudae command ($imi-s CharacterName)
        </ModalTitle>
        <DialogContent>
          <FormBoldTitle>
            Character's name (as displayed in Mudae)
          </FormBoldTitle>
          <TextField
            value={name}
            placeholder="Iron Man (Tony Stark)"
            onChange={(e) => onChangeName(e.target.value)}
            size="small"
          />
          <FormBoldTitle>
            Character's images ($imi-s CharacterName)
          </FormBoldTitle>
          <TextField
            value={input}
            placeholder={defaultText}
            onChange={(e) => setInput(e.target.value)}
            multiline
            rows={15}
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
            onClick={onParseClick}
            variant="contained"
            disabled={!input || !name}
          >
            Display character's images
          </LongButton>
        </ModalAction>
      </Dialog>
      <Board>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          onDragEnd={handleDragEnd}
          autoScroll
        >
          <Container>
            <SortableContext
              items={images}
              strategy={rectSortingStrategy}
            >
              {
                images.map((image) => (
                  <ImagePickerItem
                    key={image.id}
                    image={image}
                    onCopy={() => onCopyToClipBoard(image)}
                    onDelete={() => onDeleteImage(image.id)}
                    zoomLevel={zoomLevel}
                  />
                ))
              }
            </SortableContext>
          </Container>
        </DndContext>
      </Board>
    </ContainerDiv>
  )
}

export default ImagePicker
