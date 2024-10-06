/* Framework imports -------------------------------------------------------- */
import React, { useEffect } from 'react'
import styled from '@emotion/styled'

/* Module imports ----------------------------------------------------------- */
import {
  useAppDispatch,
  useAppSelector,
} from 'store/hooks'
import {
  selectSavedMakers,
  setSavedMakers,
} from 'store/slices/makerSlice'
import { getRandomInt } from 'helpers/getRandomInt'

/* Component imports -------------------------------------------------------- */
import LargeTitle from 'components/LargeTitle/LargeTitle'
import LongButton from 'components/LongButton/LongButton'
import ImageMaker from './ImageMaker'

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
interface ImageMakerPageProps {}

const ImageMakerPage: React.FC<ImageMakerPageProps> = () => {
  const defaultName = process.env.NODE_ENV === 'production' ? '' : 'Madoka Kaname'
  const defaultUrl = process.env.NODE_ENV === 'production' ? '' : 'https://static.zerochan.net/Mahou.Shoujo.Madoka%E2%98%86Magica.full.3522716.jpg'
  const dispatch = useAppDispatch()
  const savedMakers = useAppSelector(selectSavedMakers)

  useEffect(() => {
    if (!savedMakers.length) {
      dispatch(setSavedMakers([ { name: defaultName, imageUrl: defaultUrl, id: 0 } ] ))
    }
  }, [])

  const onDeleteContainer = (id: number) => {
    dispatch(setSavedMakers(savedMakers.filter((saved) => saved.id !== id) ))
  }

  const onAddNewWaifu = () => {
    dispatch(setSavedMakers([ ...savedMakers, { id: getRandomInt(1000000000), name: defaultName, imageUrl: defaultUrl } ] ))
  }

  const onChangeName = (value: string, id: number) => {
    dispatch(setSavedMakers(savedMakers.map((saved) => saved.id === id ? { ...saved, name: value } : saved) ))
  }

  return (
    <div>
      <LargeTitle>
        <Title>
          Custom Image Maker
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
        {
          savedMakers.map((maker) => (
            <ImageMaker
              key={maker.id}
              id={maker.id}
              onDeleteContainer={() => onDeleteContainer(maker.id)}
              name={maker.name}
              onChangeName={(value) => onChangeName(value, maker.id)}
            />
          ))
        }
      </Container>
    </div>
  )
}

export default ImageMakerPage
