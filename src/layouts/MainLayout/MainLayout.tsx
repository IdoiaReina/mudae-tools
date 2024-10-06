/* Framework imports -------------------------------------------------------- */
import React, { useState } from 'react'
import styled from '@emotion/styled'

/* Module imports ----------------------------------------------------------- */
import {
  Outlet,
  useNavigate,
} from 'react-router-dom'
import { useAppDispatch } from 'store/hooks'
import { toggleThemeMode } from 'store/slices/themeSlice'

/* Component imports -------------------------------------------------------- */
import { Button } from '@mui/material'
import { Brightness4Rounded } from '@mui/icons-material'
import BaseLayout from 'layouts/BaseLayout/BaseLayout'
import ErrorBoundaryPage from 'layouts/MainLayout/ErrorBoundaryPage/ErrorBoundaryPage'
import PageContainer from 'layouts/PageContainer/PageContainer'
import MainLogo from 'components/MainLogo/MainLogo'
import CustomIconButton from 'components/IconButtons/CustomIconButton/CustomIconButton'
import MainLayoutNavTabs from './MainLayoutComponents/MainLayoutNavTabs'
import ImgurButton from 'components/ImgurButton/ImgurButton'

/* Styled components -------------------------------------------------------- */
const DesktopHeader = styled.div`
  display: none;

  @media ${(props) => props.theme.media.desktop} {
    display: initial;
  }
`

const MobileHeader = styled.div`
  div {
    padding-right: 1px;
  }

  @media ${(props) => props.theme.media.desktop} {
    display: none;
  }
`

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-self: end;
  overflow-x: overlay;
  overflow-y: hidden;
  z-index: 200;

  background-color: ${(props) => props.theme.colors.main};;
  border-bottom: 2px solid ${(props) => props.theme.colors.grey};

  padding: 10px 0px;
  height: 50px;

  button {
    font-size: 1rem;
  }

  @media ${(props) => props.theme.media.desktop} {
    height: 70px;
    // On right side we add an additional 15px because the rest of the outlet
    // layout will have that extra padding for the possible scrollbar width.
    // If we change the scrollbar we may have to change this value
    // The rest of the calcul is to add more padding on large screens, as in PageContainer
    padding: 10px max(calc(15vw - 200px + 15px), calc(0.5rem + 15px)) 0px max(calc(15vw - 200px), 0.5rem);
  }
`

const HeaderTitleContainer = styled.div`
  color: ${(props) => props.theme.palette.secondary.main};
  font-weight: bold;

  display: flex;
  align-items: center;
  font-size: 1.2rem;
  gap: 10px;

  .main-logo {
    max-height: 50px;
  }
`

const HeaderTitleButton = HeaderTitleContainer.withComponent(Button)

const HeaderTitleButtonContainer = styled(HeaderTitleButton)`
  height: max-content;
  align-self: center;

  b {
    flex: none;
  }

  @media ${(props) => props.theme.media.desktop} {
    margin-bottom: 10px;
  }
`

const SearchBar = styled.div`
  display: flex;
  padding-bottom: 15px;
  gap: 10px;
`

const MainLayoutContainer = styled.div`
  background-color: ${(props) => props.theme.colors.lightgrey};
  flex-grow: 1;
  flex-shrink: 1;

  @media ${(props) => props.theme.media.desktop}, ${(props) => props.theme.media.tablet} {
    display: contents;
  }

  @media ${(props) => props.theme.media.mobile.main} {
    overflow-x: hidden;
    overflow-y: scroll;
  }

  .outlet-scrollable-content {
    overflow-x: hidden;
    flex-grow: 1;
    flex-shrink: 1;
    background-color: ${(props) => props.theme.colors.lightgrey};;
    padding: ${(props) => props.theme.layoutPadding.main};

    @media ${(props) => props.theme.media.mobile.main} {
      overflow-y: hidden;
    }

    @media ${(props) => props.theme.media.desktop} {
      // Add padding on sides the larger the screen is
      padding: ${(props) => props.theme.layoutPadding.desktop};
    }
  }
`

const CardMobileContainer = styled.div`
  background-color: ${(props) => props.theme.colors.main};
  border-bottom: 2px solid ${(props) => props.theme.colors.grey};
  padding-top: 5px;

  @media ${(props) => props.theme.media.desktop} {
    display: none;
  }
`

const BlankDiv = styled.div`
  @media ${(props) => props.theme.media.desktop} {
    height: 30px;
    background-color: ${(props) => props.theme.colors.lightgrey};
    flex-shrink: 0;
  }
`

const Page = styled(PageContainer)`
  display: contents;
`

/* Component declaration ---------------------------------------------------- */
interface MainLayoutProps {}

const MainLayout: React.FC<MainLayoutProps> = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [ tabValue, setTabValue ] = useState<number | boolean>(0)

  const handleThemeModeClick = () => {
    dispatch(toggleThemeMode())
  }

  const navigateToMainPage = () => {
    navigate('/')
  }

  return (
    <BaseLayout>
      <ErrorBoundaryPage>
        <DesktopHeader>
          <HeaderContainer>
            <HeaderTitleButtonContainer onClick={navigateToMainPage}>
              <MainLogo />
              <b>
                Mudae Tools
              </b>
            </HeaderTitleButtonContainer>
            <MainLayoutNavTabs
              tabValue={tabValue}
              setTabValue={setTabValue}
            />
            <HeaderTitleContainer>
              <SearchBar>
                <ImgurButton />
                <CustomIconButton
                  Icon={Brightness4Rounded}
                  variant="contained"
                  onClick={handleThemeModeClick}
                />
              </SearchBar>
            </HeaderTitleContainer>
          </HeaderContainer>
        </DesktopHeader>
        <MobileHeader>
          <HeaderContainer>
            <HeaderTitleButtonContainer onClick={navigateToMainPage}>
              <MainLogo />
              Mudae Tools
            </HeaderTitleButtonContainer>
            <HeaderTitleContainer>
              <ImgurButton />
              <CustomIconButton
                Icon={Brightness4Rounded}
                variant="contained"
                onClick={handleThemeModeClick}
              />
            </HeaderTitleContainer>
          </HeaderContainer>
        </MobileHeader>
        <Page>
          <MainLayoutContainer>
            <CardMobileContainer>
              <MainLayoutNavTabs
                tabValue={tabValue}
                setTabValue={setTabValue}
                mobile
              />
            </CardMobileContainer>
            <BlankDiv />
            <div
              id="outlet-scrollable-content"
              className="outlet-scrollable-content"
            >
              <Outlet />
            </div>
          </MainLayoutContainer>
        </Page>
      </ErrorBoundaryPage>
    </BaseLayout>
  )
}

export default MainLayout
