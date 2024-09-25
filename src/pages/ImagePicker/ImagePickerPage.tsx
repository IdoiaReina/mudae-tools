/* Framework imports -------------------------------------------------------- */
import type { ReactNode } from 'react'
import React, { useState } from 'react'
import styled from '@emotion/styled'

/* Module imports ----------------------------------------------------------- */

/* Component imports -------------------------------------------------------- */
import LargeTitle from 'components/LargeTitle/LargeTitle'
import LongButton from 'components/LongButton/LongButton'
import ImagePicker from './ImagePicker'

/* Type imports ------------------------------------------------------------- */

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
  const onDeleteContainer = (index: number) => {
    setWaifus(waifus.filter((_, i) => i !== index))
  }

  const [ waifus, setWaifus ] = useState<{render: ReactNode; index: number}[]>([
    {
      index: 0,
      render: <ImagePicker
        key={0}
        onDeletePickerClick={() => onDeleteContainer(0)}
      />,
    },
  ])

  const onAddNewWaifu = () => {
    setWaifus(
      [ ...waifus,
        {
          index: waifus.length - 1,
          render: <ImagePicker
            key={waifus.length - 1}
            onDeletePickerClick={() => onDeleteContainer(waifus.length - 1)}
          />,
        },
      ])
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
