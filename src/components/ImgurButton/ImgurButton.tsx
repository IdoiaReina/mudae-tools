/* Framework imports -------------------------------------------------------- */
import React, {
  useEffect,
  useState,
} from 'react'
import styled from '@emotion/styled'

/* Module imports ----------------------------------------------------------- */
import {
  useAppDispatch,
  useAppSelector,
} from 'store/hooks'
import type { Imgur } from 'store/slices/imgurSlice'
import {
  selectImgurToken,
  setImgurTokens,
} from 'store/slices/imgurSlice'

/* Components imports ------------------------------------------------------- */
import {
  ClickAwayListener,
  Fade,
  Paper,
  Popper,
} from '@mui/material'
import { Logout } from '@mui/icons-material'
import CustomIconButtonContainer from 'components/IconButtons/CustomIconButton/CustomIconButtonContainer'
import CustomIconButton from 'components/IconButtons/CustomIconButton/CustomIconButton'
import { ReactComponent as ImgurLogo } from './ImgurLogo.svg'

/* Type declarations -------------------------------------------------------- */
interface ImgurWindow extends Window {
  imgur?: Imgur;
}

/* Styled components -------------------------------------------------------- */
interface ImgurButtonContainerProps {
  connected?: string;
}

const ImgurButtonContainer = styled(CustomIconButtonContainer)<ImgurButtonContainerProps>`
  padding: 0px;
  filter: grayscale(${(props) => props.connected ? 0 : 1});
`

const PaperContainer = styled(Paper)`
  background-color: ${(props) => props.theme.colors.main};
  padding: 10px;
`

/* Component declaration ---------------------------------------------------- */
interface ImgurButtonProps {}

const ImgurButton: React.FC<ImgurButtonProps> = () => {
  const dispatch = useAppDispatch()
  const imgurTokens = useAppSelector(selectImgurToken)

  const [ connexionWindow, setConnexionWindow ] = useState<ImgurWindow | null>(null)
  const [ openMenu, setOpenMenu ] = useState<boolean>(false)
  const [ anchorEl, setAnchorEl ] = React.useState<HTMLButtonElement | null>(null)

  const resetAuth = () => {
    dispatch(setImgurTokens({ accessToken: '', refreshToken: '' }))
  }

  const refreshToken = () => {
    if (!imgurTokens.refreshToken) {
      resetAuth()
      return
    }

    const bodyToEncode: {[x: string]: string} = {
      'grant_type': 'refresh_token',
      'refresh_token': imgurTokens.refreshToken,
      'client_id': process.env.REACT_APP_IMGUR_CLIENT_ID || '',
      'client_secret': process.env.REACT_APP_IMGUR_CLIENT_SECRET || '',
    }

    const formBody: string[] = []

    for (const property in bodyToEncode) {
      const encodedKey = encodeURIComponent(property)
      const encodedValue = encodeURIComponent(bodyToEncode[property])
      formBody.push(`${encodedKey }=${ encodedValue}`)
    }

    fetch(`https://api.imgur.com/oauth2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: formBody.join('&'),
    }).then(async (response) => {
      const res = await response.json() as {'access_token': string; 'refresh_token': string}

      dispatch(setImgurTokens({ accessToken: res.access_token, refreshToken: res.refresh_token }))
    }).catch((error) => {
      console.error(error)
      resetAuth()
    })
  }

  useEffect(() => {
    if (imgurTokens.accessToken) {
      fetch(`https://api.imgur.com/3/account/me/images`, { headers: { 'Authorization': `Bearer ${imgurTokens.accessToken}` }})
        .then(async (data) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const res = await data.json()

          if ('error' in res) {
            console.error(res)
            refreshToken()
          } else if (res) {
            console.log(res)
          }
        })
        .catch((error) => {
          console.error(error)
          refreshToken()
        })
    }
  }, [ imgurTokens.accessToken ])

  useEffect(() => {
    if (connexionWindow) {
      const checkClosed = setInterval(() => {
        if (connexionWindow?.closed) {
          clearInterval(checkClosed)

          try {
            if (connexionWindow?.imgur) {
              dispatch(setImgurTokens(connexionWindow.imgur))
            }
          } catch(error) {
            console.error(error)
            setConnexionWindow(null)
          }
        }
      }, 1000)
    }
  }, [ connexionWindow ])

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (imgurTokens.accessToken) {
      setAnchorEl(event.currentTarget)
      setOpenMenu(!openMenu)
    } else {
      setConnexionWindow(window.open(`https://api.imgur.com/oauth2/authorize?client_id=${process.env.REACT_APP_IMGUR_CLIENT_ID}&response_type=token`,
        'sub',
        'scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=600,height=800',
      ))
    }
  }

  return (
    <ClickAwayListener onClickAway={() => setOpenMenu(false)}>
      <div>
        <ImgurButtonContainer
          onClick={onClick}
          connected={imgurTokens.accessToken}
        >
          <ImgurLogo />
        </ImgurButtonContainer>
        <Popper
          open={openMenu}
          anchorEl={anchorEl}
          placement="bottom-end"
          transition
        >
          {
            ({ TransitionProps }) => (
              <Fade
                {...TransitionProps}
                timeout={350}
              >
                <PaperContainer>
                  <CustomIconButton
                    Icon={Logout}
                    onClick={resetAuth}
                    variant="contained"
                    color="error"
                    label="Logout of Imgur"
                  />
                </PaperContainer>
              </Fade>
            )
          }
        </Popper>
      </div>
    </ClickAwayListener>
  )
}

export default ImgurButton
