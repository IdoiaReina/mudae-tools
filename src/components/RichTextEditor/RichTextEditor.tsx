/* eslint-disable camelcase */
/* Framework imports -------------------------------------------------------- */
import React, { useState } from 'react'

/* Module imports ----------------------------------------------------------- */
import { useAppSelector } from 'store/hooks'
import { selectTheme } from 'store/slices/themeSlice'

/* Component imports -------------------------------------------------------- */
import { Editor } from '@tinymce/tinymce-react'
import LoadingOverlay from 'components/Loader/LoadingOverlay'

/* Component declaration ---------------------------------------------------- */
interface RichTextEditorProps {
  height?: string;
  value: string;
  onValueChange: (value: string) => void;
  isLoading?: boolean;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  height = '70vh',
  value,
  onValueChange,
  isLoading = false,
}) => {
  const themeState = useAppSelector(selectTheme)
  const [ isEditorReady, setIsEditorReady ] = useState<boolean>(false)

  return (
    <LoadingOverlay
      isLoading={!isEditorReady || isLoading}
      placeholder="500px"
    >
      <Editor
        apiKey={process.env.REACT_APP_TINY_MCE_KEY || ''}
        init={
          {
            plugins: 'autolink codesample emoticons image link lists searchreplace table wordcount linkchecker',
            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | forecolor backcolor blockquote | checklist numlist bullist indent outdent | addcomment showcomments | align lineheight | emoticons link image table | removeformat',
            content_css: themeState.mode,
            skin: `oxide${themeState.mode === 'dark' ? '-dark' : ''}`,
            paste_webkit_styles: 'color',
            height,
            paste_preprocess: (e, args) => {
              args.content = args.content
                .replaceAll('<span>o<span>   ', '')
                .replaceAll('color: #ffffff;', '')
                .replaceAll('color: #000000;', '')
                .replaceAll('color: white;', '')
                .replaceAll('color: black;', '')
            },
          }
        }
        value={value}
        onEditorChange={onValueChange}
        onInit={() => setIsEditorReady(true)}
      />
    </LoadingOverlay>
  )
}

export default RichTextEditor
