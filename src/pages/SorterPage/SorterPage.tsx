/* Framework imports -------------------------------------------------------- */
import React, { useState } from 'react'
import styled from '@emotion/styled'

/* Module imports ----------------------------------------------------------- */
import { isValidString } from 'helpers/isValidString'

/* Component imports -------------------------------------------------------- */
import { TextField } from '@mui/material'
import LargeTitle from 'components/LargeTitle/LargeTitle'
import LongButton from 'components/LongButton/LongButton'
import FormBoldTitle from 'components/FormBoldTitle/FormBoldTitle'
import {
  DragDropContext,
  Draggable,
  Droppable,
  type DropResult,
} from 'react-beautiful-dnd'
import StrictModeDroppable from 'components/StrictModeDroppable/StrictModeDroppable'
import ReactGridLayout from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable'
import SortableItem from './SortableItem'

/* Type imports ------------------------------------------------------------- */

/* Styled components -------------------------------------------------------- */
const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;

  @media ${(props) => props.theme.media.mobile.portrait} {
    flex-direction: column;
  }
`

const Title = styled.div`
  display: flex;
  align-items: center;
`

const Board = styled.div`
  width: 100%;

  .griditemUI {
  background-color: #949c9c;
  border: 2px solid #fff;
  line-height: 100px;
  }
`

const Container = styled.div`
  margin-top: 20px;
  padding: 10px;
  background-color: ${(props) => props.theme.colors.main};
  border-radius: 4px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`

const Card = styled.div`
  width: 150px;
  height: 180px;
  background-color: ${(props) => props.theme.colors.lightgrey};
  padding: 5px;
  font-size: 13px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`

const Image = styled.img`
  width: 100px;
`

/* Component declaration ---------------------------------------------------- */
interface SorterPageProps {}

const SorterPage: React.FC<SorterPageProps> = () => {
  interface Waifu {
    id: string;
    url: string;
  }

  const [ input, setInput ] = useState<string>('Hako-Maro - https://mudae.net/uploads/8696781/JFbqZbh~J4tzpBl.png\nYumemi Yumemite - https://mudae.net/uploads/8550277/AgjGreD~ZbQ3L5t.png')
  const [ waifus, setWaifus ] = useState<Waifu[]>([])

  const onParseClick = () => {
    const lines = input.split('\n')
    const w: Waifu[] = []
    lines.forEach((line) => {
      const id = line.split(' - http')[0]
      const url = `http${line.split(' - http')[1]}`
      if (isValidString(id))
        w.push({ id, url })
    })
    console.log(w)
    setWaifus(w)
  }

  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source } = result

    if (!destination) return

    const updatedImages = [ ...waifus ]
    const [ movedImage ] = updatedImages.splice(source.index, 1)
    updatedImages.splice(destination.index, 0, movedImage)

    setWaifus(updatedImages)
  }

  const [ activeId, setActiveId ] = useState(null)
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleDragStart = (event: {active: {id: React.SetStateAction<null> }} ) => {
    setActiveId(event.active.id)
  }

  const handleDragEnd = (event: {active: Waifu; over: Waifu} ) => {
    setActiveId(null)
    const { active, over } = event

    if (active.id !== over.id) {
      setWaifus((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id)
        const newIndex = items.findIndex((i) => i.id === over.id)

        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  console.log(waifus)

  return (
    <div>
      <div>
        <LargeTitle>
          <Title>
            Harem Sorter
          </Title>
        </LargeTitle>
      </div>
      <Board>
        <FormBoldTitle>
          Input
          <ButtonsContainer>
            <LongButton
              variant="contained"
              onClick={onParseClick}
            >
              Afficher mon harem
            </LongButton>
          </ButtonsContainer>
        </FormBoldTitle>
        <TextField
          value={input}
          onChange={(e) => setInput(e.target.value)}
          multiline
          rows={4}
        />
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          onDragEnd={handleDragEnd}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          onDragStart={handleDragStart}
        >
          <Container
            style={{ display: 'flex-wrap', flexDirection: 'row' }}
          >
            <SortableContext
              items={waifus}
              strategy={rectSortingStrategy}
            >
              {
                waifus.map((w) => (
                  <SortableItem
                    key={w.id}
                    id={w.id}
                    content={
                      <Card>
                        {w.id}
                        <Image
                          src={w.url}
                          alt={w.id}
                          referrerPolicy="no-referrer"
                        />
                      </Card>
                    }
                  />
                ))
              }
              <DragOverlay>
                {
                  activeId ?
                    (
                      <div
                        style={
                          {
                            width: '120px',
                            height: '220px',
                          }
                        }
                      />
                    ) :
                    null
                }
              </DragOverlay>
            </SortableContext>
          </Container>
        </DndContext>
      </Board>
    </div>
  )
}

export default SorterPage
