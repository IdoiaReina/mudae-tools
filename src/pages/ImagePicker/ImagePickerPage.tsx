/* Framework imports -------------------------------------------------------- */
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

/* Component declaration ---------------------------------------------------- */
interface ImagePickerPageProps {}

const ImagePickerPage: React.FC<ImagePickerPageProps> = () => {
  const [ waifus, setWaifus ] = useState<string[]>([ 'new' ])

  const onAddNewWaifu = () => {
    setWaifus([ ...waifus, 'new' ])
  }

  return (
    <div>
      <LargeTitle>
        <Title>
          Image Picker
        </Title>
        <TitleButtons>
          {
            waifus.length > 1 &&
              <LongButton
                onClick={onAddNewWaifu}
                variant="contained"
              >
                Add another waifu
              </LongButton>
          }
        </TitleButtons>
      </LargeTitle>
      {
        waifus.map((_, index) =>
          <ImagePicker key={index} />,
        )
      }
    </div>
  )
}

export default ImagePickerPage
