/* Framework imports -------------------------------------------------------- */
import React from 'react'
import styled from '@emotion/styled'

/* Module imports ----------------------------------------------------------- */
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

/* Type imports ------------------------------------------------------------- */
import type { WaifuImage } from 'types/Waifu'
import CustomIconButton from 'components/IconButtons/CustomIconButton/CustomIconButton'
import {
  ContentCopy,
  Delete,
} from '@mui/icons-material'

/* Styled components -------------------------------------------------------- */
const Item = styled.div`
  width: 130px;
  height: 270px;
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

const Line = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  width: inherit;
`

/* Component declaration ---------------------------------------------------- */
interface ImageItemProps {
  image: WaifuImage;
  onDelete: () => void;
  onCopy: () => void;
}

const SortableItem: React.FC<ImageItemProps> = ({ image, onDelete, onCopy }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: image.id })

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
    >
      <Line onClick={(e) => e.stopPropagation()}>
        <CustomIconButton
          Icon={Delete}
          variant="outlined"
          color="error"
          onClick={onDelete}
        />
        {image.id}
        <CustomIconButton
          Icon={ContentCopy}
          variant="contained"
          onClick={onCopy}
        />
      </Line>
      <Card
        {...listeners}
        {...attributes}
      >
        <Image
          src={image.url}
          alt={image.url}
          referrerPolicy="no-referrer"
        />
      </Card>
    </Item>
  )
}

export default SortableItem
