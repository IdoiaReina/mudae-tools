/* Framework imports -------------------------------------------------------- */
import React from 'react'
import styled from '@emotion/styled'

/* Module imports ----------------------------------------------------------- */
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

/* Type imports ------------------------------------------------------------- */
import type { Waifu } from 'types/Waifu'

/* Styled components -------------------------------------------------------- */
interface ItemProps {
  zoomLevel: number;
}

const Item = styled.div<ItemProps>`
  width: ${(props) => props.zoomLevel * 130}px;
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
  displayName: boolean;
  zoomLevel: number;
}

const SortableItem: React.FC<SorterItemProps> = ({ waifu, displayName, zoomLevel }) => {
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
      zoomLevel={zoomLevel}
      {...listeners}
      {...attributes}
    >
      {
        waifu.url ?
          <div>
            <Image
              src={waifu.url}
              alt={waifu.id}
              referrerPolicy="no-referrer"
            />
            {
              displayName &&
                <div>
                  {waifu.id}
                </div>
            }
          </div> :
          <p>
            {waifu.id}
          </p>
      }
    </Item>
  )
}

export default SortableItem
