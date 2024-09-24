/* Framework imports -------------------------------------------------------- */
import React from 'react'
import styled from '@emotion/styled'

/* Module imports ----------------------------------------------------------- */
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { Waifu } from './SorterPage'

/* Styled components -------------------------------------------------------- */
const Item = styled.div`
  width: 130px;
  height: 220px;
  margin: 5px;
  padding: 10px;
`

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  border-radius: 4px;
  width: 130px;
`

const Image = styled.img`
  width: 100%;
  object-fit: cover;
  border-radius: 4px;
`

/* Component declaration ---------------------------------------------------- */
interface SortableItemProps {
  id: string;
  waifu: Waifu;
}

const SortableItem: React.FC<SortableItemProps> = ({ id, waifu }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? '100' : 'auto',
    opacity: isDragging ? 0.3 : 1,
  }

  return (
    <Item
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      <Card>
        <Image
          src={waifu.url}
          alt={waifu.id}
          referrerPolicy="no-referrer"
        />
      </Card>
    </Item>
  )
}

export default SortableItem
