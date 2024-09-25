/* Framework imports -------------------------------------------------------- */
import React, { useState } from 'react'
import styled from '@emotion/styled'

/* Module imports ----------------------------------------------------------- */
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable'
import { isValidString } from 'helpers/isValidString'

/* Component imports -------------------------------------------------------- */
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import LargeTitle from 'components/LargeTitle/LargeTitle'
import LongButton from 'components/LongButton/LongButton'
import SorterItem from './ImageItem'

/* Type imports ------------------------------------------------------------- */
import type { WaifuImage } from 'types/Waifu'
import FormBoldTitle from 'components/FormBoldTitle/FormBoldTitle'

/* Styled components -------------------------------------------------------- */
const Board = styled.div`
  width: 100%;

  .griditemUI {
  background-color: #949c9c;
  border: 2px solid #fff;
  line-height: 100px;
  }
`

const Container = styled.div`
  margin: 20px 0px;
  background-color: ${(props) => props.theme.colors.main};
  border-radius: 4px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
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
  gap: 10px;
  justify-content: center;
  align-items: center;
`

/* Component declaration ---------------------------------------------------- */
interface ImagePickerProps {}

const ImagePicker: React.FC<ImagePickerProps> = () => {
  const defaultName = 'Ai Hoshino'
  const defaultText = '5. https://mudae.net/uploads/5711403/GQDcKbx~8dFbzJa.png\n4. https://mudae.net/uploads/5711403/fHsuYUE~8TzHYol.png\n3. https://mudae.net/uploads/5711403/85N8SSu~xOIACK2.png\n2. https://mudae.net/uploads/5711403/dbJKvS-~yDZcBc0.png\n1. https://mudae.net/uploads/5711403/mwfbqTN~w5sjhP3.png'
  const [ openInput, setOpenInput ] = useState<boolean>(true)
  const [ waifuName, setWaifuName ] = useState<string>(process.env.NODE_ENV === 'production' ? '' : defaultName)
  const [ input, setInput ] = useState<string>(process.env.NODE_ENV === 'production' ? '' : defaultText)
  const [ images, setImages ] = useState<WaifuImage[]>([])
  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }))

  const onParseClick = () => {
    const lines = input.split('\n')
    const w: WaifuImage[] = []
    lines.reverse().forEach((line, index) => {
      if (!line.includes('. http')) return
      const url = `http${line.split('. http')[1]}`
      if (isValidString(url))
        w.push({ id: index + 1, url })
    })
    setImages(w)
    setOpenInput(false)
  }

  const onCopyToClipBoard = async (image: WaifuImage) => {
    const value = `$c ${waifuName}$${image.id}`

    if (typeof ClipboardItem !== 'undefined') {
      const html = new Blob([ value ], { type: 'text/html' })
      const text = new Blob([ value ], { type: 'text/plain' })
      const data = new ClipboardItem({ 'text/html': html, 'text/plain': text })
      await navigator.clipboard.write([ data ])
    }
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

  return (
    <div>
      <LargeTitle>
        {waifuName}
        <TitleButtons>
          <LongButton
            onClick={() => setOpenInput(true)}
            variant="contained"
          >
            Enter Waifu Image List
          </LongButton>
        </TitleButtons>
      </LargeTitle>
      <Dialog
        open={openInput}
        onClose={() => setOpenInput(false)}
        maxWidth="md"
        fullWidth
      >
        <ModalTitle>
          Paste text from Mudae command ($imi-s WaifuName)
        </ModalTitle>
        <DialogContent>
          <FormBoldTitle>
            Waifu's name
          </FormBoldTitle>
          <TextField
            value={waifuName}
            placeholder={defaultName}
            onChange={(e) => setWaifuName(e.target.value)}
            size="small"
          />
          <FormBoldTitle>
            Waifu's images
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
            onClick={() => setOpenInput(false)}
            variant="outlined"
          >
            Cancel
          </LongButton>
          <LongButton
            onClick={onParseClick}
            variant="contained"
            disabled={!input || !waifuName}
          >
            Display waifu's images
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
        >
          <Container>
            <SortableContext
              items={images}
              strategy={rectSortingStrategy}
            >
              {
                images.map((image) => (
                  <SorterItem
                    key={image.id}
                    image={image}
                    onCopy={() => onCopyToClipBoard(image)}
                    onDelete={() => onDeleteImage(image.id)}
                  />
                ))
              }
            </SortableContext>
          </Container>
        </DndContext>
      </Board>
    </div>
  )
}

export default ImagePicker
