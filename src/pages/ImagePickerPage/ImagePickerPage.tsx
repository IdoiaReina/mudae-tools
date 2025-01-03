/* Framework imports -------------------------------------------------------- */
import React, { useEffect } from 'react'
import styled from '@emotion/styled'

/* Module imports ----------------------------------------------------------- */
import {
  useAppDispatch,
  useAppSelector,
} from 'store/hooks'
import {
  selectSavedPickers,
  setSavedPickers,
} from 'store/slices/pickerSlice'
import {
  selectPickerZoomLevel,
  setPickerZoomLevel,
} from 'store/slices/settingsSlice'
import { getRandomInt } from 'helpers/getRandomInt'

/* Component imports -------------------------------------------------------- */
import {
  PersonAddAlt1,
  ZoomIn,
  ZoomOut,
} from '@mui/icons-material'
import LargeTitle from 'components/LargeTitle/LargeTitle'
import CustomIconButton from 'components/IconButtons/CustomIconButton/CustomIconButton'
import ImagePicker from './ImagePicker'

/* Styled components -------------------------------------------------------- */
const Title = styled.div`
  display: flex;
  align-items: center;
`

const TitleButtons = styled.div`
  display: flex;
  gap: 5px;
  justify-content: center;
  align-items: center;
`

const Container = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
`

/* Component declaration ---------------------------------------------------- */
interface ImagePickerPageProps {}

const ImagePickerPage: React.FC<ImagePickerPageProps> = () => {
  const defaultName = process.env.NODE_ENV === 'production' ? '' : 'Ai Hoshino'
  const dispatch = useAppDispatch()
  const savedPickers = useAppSelector(selectSavedPickers)
  const zoomLevel = useAppSelector(selectPickerZoomLevel)

  useEffect(() => {
    if (!savedPickers.length) {
      dispatch(setSavedPickers([ { images: [], index: 0, name: defaultName } ] ))
    }
  }, [])

  const onDeleteContainer = (index: number) => {
    dispatch(setSavedPickers(savedPickers.filter((saved) => saved.index !== index) ))
  }

  const onAddNewWaifu = () => {
    dispatch(setSavedPickers([ ...savedPickers, { images: [], index: getRandomInt(1000000000), name: defaultName } ] ))
  }

  const onChangeName = (value: string, index: number) => {
    dispatch(setSavedPickers(savedPickers.map((saved) => saved.index === index ? { ...saved, name: value } : saved) ))
  }

  const zoomOut = () => {
    dispatch(setPickerZoomLevel(zoomLevel - 0.1))
  }

  const zoomIn = () => {
    dispatch(setPickerZoomLevel(zoomLevel + 0.1))
  }

  return (
    <div>
      <LargeTitle>
        <Title>
          Image Picker
        </Title>
        <TitleButtons>
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
            onClick={onAddNewWaifu}
            variant="contained"
            Icon={PersonAddAlt1}
            label="Add another character"
          />
        </TitleButtons>
      </LargeTitle>
      <Container>
        {
          savedPickers.map((picker) => (
            <ImagePicker
              key={picker.index}
              index={picker.index}
              onDeletePickerClick={() => onDeleteContainer(picker.index)}
              name={picker.name}
              onChangeName={(value) => onChangeName(value, picker.index)}
              zoomLevel={zoomLevel}
            />
          ))
        }
      </Container>
    </div>
  )
}

export default ImagePickerPage
