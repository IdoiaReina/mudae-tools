/* Framework imports -------------------------------------------------------- */
import React from 'react'
import styled from '@emotion/styled'

/* Module imports ----------------------------------------------------------- */
import { useNavigate } from 'react-router-dom'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
  useAppDispatch,
  useAppSelector,
} from 'store/hooks'
import {
  selectSavedPickers,
  setSavedPickers,
} from 'store/slices/pickerSlice'
import { getRandomInt } from 'helpers/getRandomInt'
import { copyToClipBoard } from 'helpers/copyToClipBoard'

/* Component imports -------------------------------------------------------- */
import {
  AspectRatio,
  Colorize,
} from '@mui/icons-material'
import CustomIconButton from 'components/IconButtons/CustomIconButton/CustomIconButton'

/* Type imports ------------------------------------------------------------- */
import type { Waifu } from 'types/Waifu'
import { IconButtonSize } from 'components/IconButtons/CustomIconButton/CustomIconButtonContainer'
import {
  selectSavedMakers,
  setSavedMakers,
} from 'store/slices/makerSlice'

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
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const savedPickers = useAppSelector(selectSavedPickers)
  const savedMakers = useAppSelector(selectSavedMakers)
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

  const goToPicker = async () => {
    if (!savedPickers.some((picker) => picker.name === waifu.id)) {
      dispatch(setSavedPickers([ ...savedPickers, { images: [], index: getRandomInt(1000000000), name: waifu.id } ] ))
    }
    await copyToClipBoard(`$imi-s ${waifu.id}`)
    navigate('/image-picker')
  }

  const goToMaker = async () => {
    if (!savedMakers.some((picker) => picker.name === waifu.id)) {
      dispatch(setSavedMakers([ ...savedMakers, { id: getRandomInt(1000000000), name: waifu.id, imageBase64: '', link: '' } ] ))
    }
    await copyToClipBoard(waifu.id)
    navigate('/custom-image-maker')
  }

  if (!waifu.url) {
    return (
      <Item
        ref={setNodeRef}
        style={style}
        zoomLevel={zoomLevel}
        {...listeners}
        {...attributes}
      >
        <p>
          {waifu.id}
        </p>
      </Item>
    )
  }

  return (
    <Item
      ref={setNodeRef}
      style={style}
      zoomLevel={zoomLevel}
    >
      {
        displayName &&
          <Line onClick={(e) => e.stopPropagation()}>
            <CustomIconButton
              Icon={Colorize}
              variant="contained"
              onClick={goToPicker}
              customSize={IconButtonSize.small}
              label="Go to Picker"
            />
            <CustomIconButton
              Icon={AspectRatio}
              variant="contained"
              onClick={goToMaker}
              customSize={IconButtonSize.small}
              label="Go to Maker"
            />
          </Line>
      }
      <Image
        src={waifu.url}
        alt={waifu.id}
        referrerPolicy="no-referrer"
        {...listeners}
        {...attributes}
      />
    </Item>
  )
}

export default SorterItem
