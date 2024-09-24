/* Framework imports -------------------------------------------------------- */
import React, {
  useState,
  useEffect,
  useMemo,
  createRef,
} from 'react'
import styled from '@emotion/styled'

/* Module imports ----------------------------------------------------------- */
import { useWindowSize } from 'helpers/hooks/useWindowSize'

/* Type declarations -------------------------------------------------------- */
export interface SegmentedButtonOption<T> {
  label?: string | null;
  value: T;
}

type Offset = {offsetLeft: number; offsetWidth: number}

/* Styled components -------------------------------------------------------- */
interface ControllerProps {
  smaller?: boolean;
  disabled: boolean;
}

const Controller = styled.div<ControllerProps & Offset>`
  border: 1px solid ${(props) => props.theme.colors.grey};
  border-radius: ${(props) => props.smaller ? '5px' : '10px'};
  background-color: ${(props) => props.theme.colors.main};
  width: 100%;
  padding: ${(props) => props.smaller ? '3px' : '5px'};
  margin: auto;
  justify-content: space-between;
  overflow: hidden;
  position: relative;
  display: inline-flex;

  input {
    opacity: 0;
    margin: 0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    cursor: ${(props) => props.disabled ? 'not-allowed' : 'pointer'};
  }

  &:before {
    content: "";
    background: ${(props) => props.disabled ? props.theme.palette.info.dark : props.theme.palette.primary.main};
    border-radius: ${(props) => props.smaller ? '2.5px' : '5px'};
    position: absolute;
    top: ${(props) => props.smaller ? '2px' : '5px'};
    bottom: ${(props) => props.smaller ? '2px' : '5px'};
    z-index: 0;
    transition: left 0.3s ease, width 0.3s ease;
  }

  &.ready {
    &:before {
      left: ${(props) => props.offsetLeft}px;
      width: ${(props) => props.offsetWidth}px;
    }
  }
`

const SegmentedButton = styled.div<ControllerProps>`
  width: 100%;
  position: relative;
  text-align: center;
  align-self: center;
  z-index: 1;

  label {
    cursor: pointer;
    display: block;
    font-weight: bold;
    padding: ${(props) => props.smaller ? '4px' : '10px'};
    &.label-ready {
      transition: color 0.3s ease;
    }
  }

  &.active {
    label {
      color: ${(props) => props.theme.colors.main};
    }
  }
`

/* Component declaration ---------------------------------------------------- */
interface SegmentedButtonsProps<T> {
  options: SegmentedButtonOption<T>[];
  setSelectedOption: (value: T) => void;
  selectedOption?: T;
  smaller?: boolean;
  disabled?: boolean;
}

function SegmentedButtons<T>({
  options,
  setSelectedOption,
  selectedOption,
  smaller,
  disabled = false,
}: React.PropsWithChildren<SegmentedButtonsProps<T>>) {
  const windowSize = useWindowSize()
  const [ activeIndex, setActiveIndex ] = useState<number>(-1)
  const [ offset, setOffset ] = useState<Offset>({ offsetLeft: 0, offsetWidth: 0 })
  const refs = useMemo(() => options.map(() => createRef<HTMLDivElement>()), [ options ])

  useEffect(() => {
    if (selectedOption === undefined) return
    const seg = options.map((s) => s.value)
    seg.indexOf(selectedOption) !== -1 && setActiveIndex(seg.indexOf(selectedOption))
  }, [ selectedOption, options ])

  useEffect(() => {
    if (!options[activeIndex]) return
    const activeSegment = refs[activeIndex]?.current
    activeSegment && setOffset({ offsetWidth: activeSegment.offsetWidth ?? 0, offsetLeft: activeSegment.offsetLeft ?? 0 })
  }, [ activeIndex, options, windowSize, refs ])

  const onInputChange = (value: T, index: number) => () => {
    setActiveIndex(index)
    setSelectedOption(value)
  }

  const valueToString = (value: T): string => typeof value === 'string' ? value : JSON.stringify(value)

  return (
    <Controller
      className={offset.offsetLeft === 0 ? '' : 'ready'}
      smaller={smaller}
      disabled={disabled}
      {...offset}
    >
      {
        options.map((item, i) => (
          <SegmentedButton
            key={`${valueToString(item.value)}-${i}`}
            className={`${i === activeIndex ? 'active' : 'inactive'}`}
            ref={refs[i]}
            smaller={smaller}
            disabled={disabled}
          >
            <label
              htmlFor={valueToString(item.value)}
              className={offset.offsetLeft === 0 ? '' : 'label-ready'}
            >
              {item.label ?? valueToString(item.value)}
            </label>
            <input
              id={valueToString(item.value)}
              name="SegmentedButtons"
              type="radio"
              value={valueToString(item.value)}
              onChange={onInputChange(item.value, i)}
              checked={i === activeIndex}
              disabled={disabled}
            />
          </SegmentedButton>
        ))
      }
    </Controller>
  )
}

export default SegmentedButtons
