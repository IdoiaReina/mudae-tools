/* Framework imports -------------------------------------------------------- */
import React from 'react'

/* Component declaration ---------------------------------------------------- */
interface AttachmentButtonProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const AttachmentButton: React.FC<AttachmentButtonProps> = ({
  onChange,
  children,
  disabled = false,
}) => {

  return (
    <label htmlFor="attachment-button">
      <input
        accept="image/*,.pdf,.doc,.docx,.docm,.xlsx,.xls,.xlsm,.odt,.msg,.eml"
        id="attachment-button"
        multiple
        type="file"
        hidden
        onChange={onChange}
        disabled={disabled}
      />
      {children}
    </label>
  )
}

export default AttachmentButton
