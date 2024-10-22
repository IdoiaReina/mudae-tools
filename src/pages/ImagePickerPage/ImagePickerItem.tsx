/* Framework imports -------------------------------------------------------- */
import React from 'react'
import styled from '@emotion/styled'

/* Module imports ----------------------------------------------------------- */
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

/* Component imports -------------------------------------------------------- */
import {
  ContentCopy,
  Delete,
} from '@mui/icons-material'
import CustomIconButton from 'components/IconButtons/CustomIconButton/CustomIconButton'

/* Type imports ------------------------------------------------------------- */
import type { WaifuImage } from 'types/Waifu'
import { IconButtonSize } from 'components/IconButtons/CustomIconButton/CustomIconButtonContainer'

/* Styled components -------------------------------------------------------- */
interface ItemProps {
  zoomLevel: number;
}

const Item = styled.div<ItemProps>`
  width: ${(props) => props.zoomLevel * 130}px;
  margin: 5px;
`

const Card = styled.div`
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

const Line = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2px;
  width: inherit;
  font-weight: bold;
`

/* Component declaration ---------------------------------------------------- */
interface ImageItemProps {
  image: WaifuImage;
  onDelete: () => void;
  onCopy: () => void;
  zoomLevel: number;
}

const ImagePickerItemProps: React.FC<ImageItemProps> = ({ image, onDelete, onCopy, zoomLevel }) => {
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
      zoomLevel={zoomLevel}
    >
      <Line onClick={(e) => e.stopPropagation()}>
        <CustomIconButton
          Icon={Delete}
          variant="outlined"
          color="error"
          onClick={onDelete}
          customsize={IconButtonSize.small}
          label="Remove image from picker"
        />
        {image.id}
        <CustomIconButton
          Icon={ContentCopy}
          variant="contained"
          onClick={onCopy}
          customsize={IconButtonSize.small}
          label="Copy command to select this image in discord"
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

export default ImagePickerItemProps
