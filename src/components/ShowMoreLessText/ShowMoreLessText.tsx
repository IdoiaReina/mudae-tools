/* Framework imports -------------------------------------------------------- */
import React, {
  useEffect,
  useRef,
  useState,
} from 'react'
import styled from '@emotion/styled'

/* Component imports -------------------------------------------------------- */
import ShowMore from 'components/ShowMore/ShowMore'

/* Styled components -------------------------------------------------------- */
interface TextProps {
  showAll?: boolean;
}

const Text = styled.div<TextProps>`
  font-size: .9rem;
  margin-top: 5px;
  margin-bottom: 0px;
  text-align: justify;

  line-height: ${(props) => props.showAll ? '' : '1.5rem'};
  height: ${(props) => props.showAll ? '' : '3rem'};
  overflow: ${(props) => props.showAll ? '' : 'hidden'};

  img {
    object-fit: contain;
    max-width: 420px;
    max-width: -webkit-fill-available;
    max-width: -moz-fill-available;
  }
`

/* Component declaration ---------------------------------------------------- */
interface ShowMoreLessTextProps {
  content?: string | null;
  strLenLimit: number;
}

const ShowMoreLessText: React.FC<ShowMoreLessTextProps> = ({ content, strLenLimit }) => {
  const [ showAll, setShowAll ] = useState<boolean>(false)
  const spanRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (content === null || content === undefined) {
      return
    }

    if (spanRef.current) {
      spanRef.current.innerHTML = content
    }
  }, [ spanRef, content ])

  if (content === null || content === undefined) {
    return null
  }

  if (content.length <= strLenLimit) {
    return (
      <Text
        showAll
        ref={spanRef}
      >
        {content}
      </Text>
    )
  }

  return (
    <>
      <Text
        ref={spanRef}
        showAll={showAll}
      />
      <ShowMore
        onClick={() => setShowAll(!showAll)}
        isOpen={showAll}
      >
        {showAll ? ' Afficher moins' : 'Afficher plus'}
      </ShowMore>
    </>
  )
}

export default ShowMoreLessText
