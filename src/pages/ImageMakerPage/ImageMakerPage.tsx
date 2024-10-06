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
import { PersonAddAlt1 } from '@mui/icons-material'
import LargeTitle from 'components/LargeTitle/LargeTitle'
import CustomIconButton from 'components/IconButtons/CustomIconButton/CustomIconButton'
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
  const dispatch = useAppDispatch()
  const savedMakers = useAppSelector(selectSavedMakers)

  useEffect(() => {
    if (!savedMakers.length) {
      dispatch(setSavedMakers([ { name: '', imageBase64: '', id: 0, link: '' } ] ))
    }
  }, [])

  const onDeleteContainer = (id: number) => {
    dispatch(setSavedMakers(savedMakers.filter((saved) => saved.id !== id)))
  }

  const onAddNewWaifu = () => {
    dispatch(setSavedMakers([ ...savedMakers, { id: getRandomInt(1000000000), name: '', imageBase64: '', link: '' } ] ))
  }

  return (
    <div>
      <LargeTitle>
        <Title>
          Custom Image Maker
        </Title>
        <TitleButtons>
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
          savedMakers.map((maker) => (
            <ImageMaker
              key={maker.id}
              id={maker.id}
              onDeleteContainer={() => onDeleteContainer(maker.id)}
            />
          ))
        }
      </Container>
    </div>
  )
}

export default ImageMakerPage
