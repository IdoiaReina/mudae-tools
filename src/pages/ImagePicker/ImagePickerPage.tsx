/* Framework imports -------------------------------------------------------- */
import type { ReactNode } from 'react'
import React, {
  useEffect,
  useState,
} from 'react'
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

/* Component imports -------------------------------------------------------- */
import LargeTitle from 'components/LargeTitle/LargeTitle'
import LongButton from 'components/LongButton/LongButton'
import ImagePicker from './ImagePicker'

/* Styled components -------------------------------------------------------- */
const Title = styled.div`
  display: flex;
  align-items: center;
`

const TitleButtons = styled.div`
  display: flex;
  gap: 10px;
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
  const dispatch = useAppDispatch()
  const savedPickers = useAppSelector(selectSavedPickers)
  const [ waifus, setWaifus ] = useState<{render: ReactNode; index: number}[]>([])

  useEffect(() => {
    if (savedPickers.length) {
      setWaifus( savedPickers.map((_, index) => (
        {
          index,
          render: (
            <ImagePicker
              key={index}
              index={index}
              // eslint-disable-next-line @typescript-eslint/no-use-before-define
              onDeletePickerClick={() => onDeleteContainer(index)}
            />
          ),
        }
      )))
    } else {
      setWaifus( [ {
        index: 0,
        render: (
          <ImagePicker
            key={0}
            index={0}
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            onDeletePickerClick={() => onDeleteContainer(0)}
          />
        ),
      } ])
      dispatch(setSavedPickers([ { index: 0, images: []} ]))
    }
  }, [])

  const onDeleteContainer = (index: number) => {
    setWaifus(waifus.filter((_, i) => i !== index))
    dispatch(setSavedPickers(savedPickers.filter((value) => value.index === index)))
  }

  const onAddNewWaifu = () => {
    const index = waifus.length
    setWaifus([
      ...waifus,
      {
        index,
        render: (
          <ImagePicker
            key={index}
            index={index}
            onDeletePickerClick={() => onDeleteContainer(index)}
          />
        ),
      },
    ])
    dispatch(setSavedPickers([ ...savedPickers, { index, images: []} ]))
  }

  return (
    <div>
      <LargeTitle>
        <Title>
          Image Picker
        </Title>
        <TitleButtons>
          <LongButton
            onClick={onAddNewWaifu}
            variant="contained"
          >
            Add another waifu
          </LongButton>
        </TitleButtons>
      </LargeTitle>
      <Container>
        {waifus.map((picker) => picker.render)}
      </Container>
    </div>
  )
}

export default ImagePickerPage
