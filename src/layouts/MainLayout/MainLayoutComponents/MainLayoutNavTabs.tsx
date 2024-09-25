/* Framework imports -------------------------------------------------------- */
import React, {
  useEffect,
  useState,
} from 'react'
import styled from '@emotion/styled'

/* Module imports ----------------------------------------------------------- */
import {
  useLocation,
  useNavigate,
} from 'react-router-dom'

/* Component imports -------------------------------------------------------- */
import {
  Tab,
  Tabs,
} from '@mui/material'
import RouteTitle from 'router/RouteTitle'

/* Internal variables ------------------------------------------------------- */
const tabs = [
  {
    label: 'Harem Sorter',
    path: 'harem-sorter',
  },
  {
    label: 'Image Picker',
    path: 'image-picker',
  },
  // {
  //   label: 'Custom Image Maker',
  //   path: 'custom-image-maker',
  // },
]

/* Styled components -------------------------------------------------------- */
const TabsContainer = styled(Tabs)`
  button {
    padding-bottom: 0px !important;

    @media ${(props) => props.theme.media.tablet}, ${(props) => props.theme.media.mobile.main} {
      padding-top: 2px !important;
    }
  }

  // Here we want the tabs to be scrollable but we want to hide the scrollbar under it
  .MuiTabs-scroller {
    overflow-x: auto !important;
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none;  /* Firefox */
  }

  .MuiTabs-scroller::-webkit-scrollbar {
    display: none;  /* Safari and Chrome */
  }
`

/* Component declaration ---------------------------------------------------- */
interface MainLayoutNavTabsProps {
  mobile?: boolean;
  tabValue: number | boolean;
  setTabValue: (value: number | boolean) => void;
}

const MainLayoutNavTabs: React.FC<MainLayoutNavTabsProps> = ({
  mobile = false,
  tabValue,
  setTabValue,
}) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [ title, setTitle ] = useState<string>('')

  useEffect(() => {
    const newTabValue = tabs.findIndex((tab) => location.pathname.indexOf(tab.path) !== -1)
    setTabValue(newTabValue)
    if (tabs[newTabValue]?.label) {
      setTitle(tabs[newTabValue].label)
    }
  }, [ location.pathname ])

  const handleTabChange = (newValue: number): void => {
    setTabValue(newValue)
    if (newValue !== -1) {
      navigate(`/${tabs[newValue].path}/`)
    }
  }

  return (
    <>
      <RouteTitle title={title} />
      {
        <TabsContainer
          value={tabValue === -1 ? false : tabValue}
          variant={mobile ? 'fullWidth' : 'standard'}
        >
          {
            tabs.map((tab, index) => (
              <Tab
                key={`${tab.path}-${index}`}
                onClick={() => handleTabChange(index)}
                label={tab.label}
              />
            ))
          }
        </TabsContainer>
      }
    </>
  )
}

export default MainLayoutNavTabs
