/* Framework imports -------------------------------------------------------- */
import React, { useEffect } from 'react'

/* Module imports ----------------------------------------------------------- */
import { useLocation } from 'react-router-dom'
import { useAppDispatch } from 'store/hooks'
import { setImgurTokens } from 'store/slices/imgurSlice'

/* Component imports -------------------------------------------------------- */
import RouteTitle from 'router/RouteTitle'
import BaseLayout from 'layouts/BaseLayout/BaseLayout'

/* Component declaration ---------------------------------------------------- */
interface ImgurLoginPageProps {}

const ImgurLoginPage: React.FC<ImgurLoginPageProps> = () => {
  const dispatch = useAppDispatch()
  const location = useLocation()

  useEffect(() => {
    const params = location.pathname.split('/imgur-auth/&')[1].split('&')
    const accessToken = params[0].split('=')[1]
    const refreshToken = params[3].split('=')[1]
    dispatch(setImgurTokens({ accessToken, refreshToken }))
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.imgur = { accessToken, refreshToken }
    window.close()
  }, [ location ])

  return (
    <BaseLayout className="AuthLayout">
      <RouteTitle title="Connexion Imgur" />
    </BaseLayout>
  )
}

export default ImgurLoginPage
