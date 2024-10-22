/* Framework imports -------------------------------------------------------- */
import React from 'react'
import styled from '@emotion/styled'

/* Module imports ----------------------------------------------------------- */
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

/* Component imports -------------------------------------------------------- */
import {
  AspectRatio,
  Colorize,
} from '@mui/icons-material'

/* Type imports ------------------------------------------------------------- */
import type { Waifu } from 'types/Waifu'
import CustomIconButton from 'components/IconButtons/CustomIconButton/CustomIconButton'
import { IconButtonSize } from 'components/IconButtons/CustomIconButton/CustomIconButtonContainer'

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

const Line = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
  font-weight: bold;
  width: 100%;
  overflow: hidden;
`

/* Component declaration ---------------------------------------------------- */
interface SorterItemProps {
  waifu: Waifu;
  displayName: boolean;
  zoomLevel: number;
}

const SorterItem: React.FC<SorterItemProps> = ({ waifu, displayName, zoomLevel }) => {
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

  const goToPicker = () => {

  }

  const goToMaker = () => {

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
          <>
            {
              displayName &&
                <Line onClick={(e) => e.stopPropagation()}>
                  <CustomIconButton
                    Icon={Colorize}
                    variant="contained"
                    onClick={goToPicker}
                    customSize={IconButtonSize.small}
                  />
                  <CustomIconButton
                    Icon={AspectRatio}
                    variant="contained"
                    onClick={goToMaker}
                    customSize={IconButtonSize.small}
                  />
                </Line>
            }
            <Image
              src={waifu.url}
              alt={waifu.id}
              referrerPolicy="no-referrer"
            />
          </> :
          <p>
            {waifu.id}
          </p>
      }
    </Item>
  )
}

export default SorterItem
