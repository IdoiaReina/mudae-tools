/* Framework imports -------------------------------------------------------- */
import React, {
  useEffect,
  useState,
} from 'react'

/* Component imports -------------------------------------------------------- */
import { Droppable } from 'react-beautiful-dnd'

/* Type imports ------------------------------------------------------------- */
import type { DroppableProps } from 'react-beautiful-dnd'

/* Component declaration ---------------------------------------------------- */
// eslint-disable-next-line @typescript-eslint/unbound-method
const StrictModeDroppable: React.FC<DroppableProps> = ({ children, ...props }: DroppableProps) => {
  const [ enabled, setEnabled ] = useState<boolean>(false)

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true))

    return () => {
      cancelAnimationFrame(animation)
      setEnabled(false)
    }
  }, [])

  if (!enabled) {
    return null
  }

  return (
    <Droppable {...props}>
      {children}
    </Droppable>
  )
}

export default StrictModeDroppable
