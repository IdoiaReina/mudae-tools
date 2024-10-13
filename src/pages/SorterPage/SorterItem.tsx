/* Framework imports -------------------------------------------------------- */
import React from 'react'
import styled from '@emotion/styled'

/* Module imports ----------------------------------------------------------- */
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

/* Type imports ------------------------------------------------------------- */
import type { Waifu } from 'types/Waifu'

/* Styled components -------------------------------------------------------- */
const Item = styled.div`
  width: 130px;
  height: 202px;
  margin: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  border-radius: 4px;
`

const Image = styled.img`
  width: 100%;
  object-fit: cover;
  border-radius: 4px;
`

/* Component declaration ---------------------------------------------------- */
interface SorterItemProps {
  waifu: Waifu;
}

const SortableItem: React.FC<SorterItemProps> = ({ waifu }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: waifu.id })

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
      {
        waifu.url ?
          <Image
            src={waifu.url}
            alt={waifu.id}
            referrerPolicy="no-referrer"
          /> :
          <p>
            {waifu.id}
          </p>
      }
    </Item>
  )
}

export default SortableItem
