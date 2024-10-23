/* Framework imports -------------------------------------------------------- */
import React, {
  useEffect,
  useState,
} from 'react'
import styled from '@emotion/styled'

/* Module imports ----------------------------------------------------------- */
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
  selectSavedWaifus,
  setSavedWaifus,
} from 'store/slices/sorterSlice'
import {
  selectSorterDisplayName,
  selectSorterZoomLevel,
  setSorterDisplayName,
  setSorterZoomLevel,
} from 'store/slices/settingsSlice'
import { isValidString } from 'helpers/isValidString'
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
  ContentCopy,
  Done,
  Edit,
  Visibility,
  VisibilityOff,
  ZoomIn,
  ZoomOut,
} from '@mui/icons-material'
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
import CustomIconButton from 'components/IconButtons/CustomIconButton/CustomIconButton'
import SorterItem from './SorterItem'

/* Type imports ------------------------------------------------------------- */
import type { Waifu } from 'types/Waifu'

/* Styled components -------------------------------------------------------- */
const Title = styled.div`
  display: flex;
  align-items: center;
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

const Line = styled.div`
  display: flex;
  width: 100%;
  gap: 5px;
  align-items: center;
  margin-bottom: 10px;
`

/* Component declaration ---------------------------------------------------- */
interface SorterPageProps {}

const SorterPage: React.FC<SorterPageProps> = () => {
  const defaultText = 'Frieren - https://mudae.net/uploads/9949210/hg_e2HM~3RehmOY.png\nAi Hoshino - https://mudae.net/uploads/5711403/00gHdVh~x89DiGH.png'
  const dispatch = useAppDispatch()
  const savedWaifus = useAppSelector(selectSavedWaifus)
  const zoomLevel = useAppSelector(selectSorterZoomLevel)
  const displayName = useAppSelector(selectSorterDisplayName)
  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }))
  const [ openInput, setOpenInput ] = useState<boolean>(savedWaifus.length === 0)
  const [ input, setInput ] = useState<string>(process.env.NODE_ENV === 'production' ? '' : defaultText)
  const [ openOutput, setOpenOutput ] = useState<boolean>(false)
  const [ output, setOutput ] = useState<string[]>([])
  const [ waifus, setWaifus ] = useState<Waifu[]>(savedWaifus || [])

  useEffect(() => {
    dispatch(setSavedWaifus(waifus))
  }, [ waifus ])

  const onParseClick = () => {
    const lines = input.split('\n')
    const w: Waifu[] = []
    lines.forEach((line) => {
      if (!line.includes(' - http')) return
      const catRegex = /\[(.*?)\]/
      if (line.match(catRegex)?.[1]) {
        w.push({ id: line.match(catRegex)?.[1] || '', url: '' })
      }
      const id = line.replaceAll(/\|[^-]+(?=-)/g, '').split(' - http')[0]
      const url = `http${line.split(' - http')[1]}`
      if (isValidString(id))
        w.push({ id: id, url })
    })
    setWaifus(w)
    setOpenInput(false)
  }

  const onOutputClick = () => {
    const ids = waifus.filter((w) => w.url).map((w) => w.id)
    const maxLength = 2000
    const result: string[] = []
    let currentText = '$smp '
    let lastAddedId = ''

    ids.forEach((id) => {
      const nextText = `${currentText + id}$`

      if (nextText.length > maxLength) {
        result.push(currentText.trim().slice(0, -1))
        currentText = `$smp ${lastAddedId}$${id}$`
      } else {
        currentText = nextText
        lastAddedId = id
      }
    })

    if (currentText.trim()) {
      result.push(currentText.trim().slice(0, -1))
    }

    setOutput(result)
  }

  const onCopyToClipBoard = async (value: string) => {
    await copyToClipBoard(value)
  }

  const handleDragEnd = (event: {active: {id: string}; over: {id: string}}) => {
    const { active, over } = event

    if (!active.id || !over.id) return
    if (active.id !== over.id) {
      setWaifus((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id)
        const newIndex = items.findIndex((i) => i.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  const zoomOut = () => {
    dispatch(setSorterZoomLevel(zoomLevel - 0.1))
  }

  const zoomIn = () => {
    dispatch(setSorterZoomLevel(zoomLevel + 0.1))
  }

  const toggleDisplayName = () => {
    dispatch(setSorterDisplayName(!displayName))
  }

  return (
    <div>
      <LargeTitle>
        <Title>
          Harem Sorter
        </Title>
        <TitleButtons>
          <CustomIconButton
            onClick={toggleDisplayName}
            variant="outlined"
            label="Display or hide characters names"
            Icon={displayName ? VisibilityOff : Visibility}
          />
          <CustomIconButton
            onClick={zoomOut}
            variant="outlined"
            label="Zoom Out"
            Icon={ZoomOut}
          />
          <CustomIconButton
            onClick={zoomIn}
            variant="outlined"
            label="Zoom In"
            Icon={ZoomIn}
          />
          <CustomIconButton
            onClick={() => setOpenInput(true)}
            variant="contained"
            label="Input harem"
            Icon={Edit}
          />
          <CustomIconButton
            onClick={() => {setOpenOutput(true); onOutputClick()}}
            variant="contained"
            Icon={Done}
            label="Output Mudae's commands"
          />
        </TitleButtons>
      </LargeTitle>
      <Dialog
        open={openInput}
        onClose={() => setOpenInput(false)}
        maxWidth="md"
        fullWidth
      >
        <ModalTitle>
          Paste text from Mudae command ($mmi-s)
        </ModalTitle>
        <DialogContent>
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
            disabled={!input}
          >
            Display my harem
          </LongButton>
        </ModalAction>
      </Dialog>
      <Dialog
        open={openOutput}
        onClose={() => setOpenOutput(false)}
        maxWidth="lg"
        fullWidth
      >
        <ModalTitle>
          Copy Mudae commands one by one into discord
        </ModalTitle>
        <DialogContent>
          {
            output.map((value, index) => (
              <Line key={index}>
                <TextField
                  value={value}
                  multiline
                  size="small"
                />
                <CustomIconButton
                  Icon={ContentCopy}
                  variant="contained"
                  onClick={() => onCopyToClipBoard(value)}
                />
              </Line>
            ))
          }
        </DialogContent>
        <ModalAction>
          <LongButton
            onClick={() => setOpenOutput(false)}
            variant="outlined"
          >
            Close
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
              items={waifus}
              strategy={rectSortingStrategy}
            >
              {
                waifus.map((w) => (
                  <SorterItem
                    key={w.id}
                    waifu={w}
                    zoomLevel={zoomLevel}
                    displayName={displayName}
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

export default SorterPage
