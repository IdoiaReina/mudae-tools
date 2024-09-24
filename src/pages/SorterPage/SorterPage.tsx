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
import { TextField } from '@mui/material'
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
import FormBoldTitle from 'components/FormBoldTitle/FormBoldTitle'
import SortableItem from './SortableItem'

/* Type declarations -------------------------------------------------------- */
export interface Waifu {
  id: string;
  url: string;
}

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
  margin: 20px 0px;
  padding: 10px;
  background-color: ${(props) => props.theme.colors.main};
  border-radius: 4px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`

/* Component declaration ---------------------------------------------------- */
interface SorterPageProps {}

const SorterPage: React.FC<SorterPageProps> = () => {
  const [ input, setInput ] = useState<string>('Hako-Maro - https://mudae.net/uploads/8696781/JFbqZbh~J4tzpBl.png\nYumemi Yumemite - https://mudae.net/uploads/8550277/AgjGreD~ZbQ3L5t.png')
  const [ output, setOutput ] = useState<string>('')
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
    setWaifus(w)
  }

  const onOutputClick = () => {
    const firstMarry = `$fm ${waifus[0].id} \n\n`
    const haremOrder = `$smp ${waifus.map((w) => w.id).join('$')}`

    setOutput(firstMarry + haremOrder)
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleDragEnd = (event: {active: {id: string}; over: {id: string}} ) => {
    const { active, over } = event

    if (active.id !== over.id) {
      setWaifus((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id)
        const newIndex = items.findIndex((i) => i.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

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
          Input ($mmi-s)
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
        <FormBoldTitle>
          Output
          <ButtonsContainer>
            <LongButton
              variant="contained"
              onClick={onOutputClick}
            >
              Générer la commande Mudae
            </LongButton>
          </ButtonsContainer>
        </FormBoldTitle>
        <TextField
          value={output}
          onChange={(e) => setOutput(e.target.value)}
          multiline
          rows={4}
        />
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
                  <SortableItem
                    key={w.id}
                    id={w.id}
                    waifu={w}
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
