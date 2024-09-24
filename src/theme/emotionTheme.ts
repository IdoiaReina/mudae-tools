/* Module imports ----------------------------------------------------------- */
import { createTheme } from '@mui/material'
import { frFR } from '@mui/material/locale'

/* Component imports -------------------------------------------------------- */
import SelectArrowIcon from 'components/SelectArrowIcon/SelectArrowIcon'

/* Type imports ------------------------------------------------------------- */
import type {
  Theme as MuiTheme,
  PaletteMode,
} from '@mui/material'

/* Internal Variables ------------------------------------------------------- */
export const PRIMARY_COLOR = '#b178c9'
export const SECONDARY_COLOR = '#75C9B7'
export const INFO_COLOR = '#f6a8b9'

/* Material UI theme -------------------------------------------------------- */
interface MuiThemeProps {
  mode: PaletteMode;
  primary: string;
  secondary: string;
  info: string;
}

const muiTheme = ({ mode, primary, secondary, info }: MuiThemeProps): MuiTheme => createTheme(
  {
    palette: {
      mode: mode,
      primary: {
        main: primary,
      },
      secondary: {
        main: secondary,
      },
      info: {
        main: info,
      },
      error: {
        main: mode === 'light' ? '#DC143C' : '#ff4f72',
      },
    },
    typography: {
      fontFamily: `"Lunasima", sans-serif`,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: ({ ownerState }) => ({
            textTransform: 'none',
            fontWeight: 'bold',
            minHeight: '40px',
            ...(ownerState.variant === 'outlined' && {
              border: '2px solid',
              backgroundColor: mode === 'light' ? 'white' : '#1a1625',
              '&:hover': {
                border: '2px solid',
              },
            }),
          }),
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'light' ? 'white' : '#1a1625',
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          multiple: {
            backgroundColor: mode === 'light' ? 'white' : '#1a1625',
            whiteSpace: 'break-spaces',
          },
        },
        defaultProps: {
          IconComponent: SelectArrowIcon,
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'light' ? 'white' : '#1a1625',
            width: '100%',
          },
          notchedOutline: {
            borderColor: mode === 'light' ? '#E2E8F1' : '#46424f',
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          fontFamily: `"Lunasima", sans-serif`,
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            border: `1px solid ${mode === 'light' ? '#E2E8F1' : '#46424f'} !important`,
            boxShadow: 'none',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'light' ? 'white' : '#1a1625',
          },
        },
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            padding: '15px',
            ':last-child': {
              padding: '15px',
            },
          },
        },
      },
      MuiFormControl: {
        styleOverrides: {
          root: {
            backgroundColor: 'transparent !important',
            width: '100%',
          },
        },
      },
      MuiTabs: {
        styleOverrides: {
          indicator: {
            height: 6,
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            '&.Mui-selected': {
              fontWeight: 'bold',
            },
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            cursor: 'pointer !important',
          },
        },
      },
      MuiPopover: {
        styleOverrides: {
          paper: {
            maxHeight: '50vh',
          },
        },
      },
    },
  },
  frFR,
)

/* Custom theme properties -------------------------------------------------- */
interface AdditionaThemeProps {
  colors: {
    grey: string;
    lightgrey: string;
    darkgrey: string;
    main: string;
    teamviewer: string;
  };
  media: {
    mobile: {
      main: string;
      portrait: string;
      landscape: string;
    };
    tablet: string;
    desktop: string;
  };
  layoutPadding: {
    main: string;
    desktop: string;
    desktopSide: string;
  };
}

const additionalThemeProps = (mode: PaletteMode): AdditionaThemeProps => ({
  colors: {
    main: mode === 'light' ? '#FFFFFF' : '#1a1625',
    lightgrey: mode === 'light' ? '#F6F8FD' : '#2f2b3a',
    grey: mode === 'light' ? '#E2E8F1' : '#46424f',
    darkgrey: mode === 'light' ? '#5e5a66' : '#E2E8F1',
    teamviewer: mode === 'light' ? '#d3e7ff' : '#183048',
  },
  media: {
    mobile: {
      main: 'screen and (max-width: 480px), screen and (min-width: 481px) and (max-width: 1024px) and (max-height: 480px)',
      portrait: 'screen and (max-width: 480px)',
      landscape: 'screen and (min-width: 481px) and (max-width: 1024px) and (max-height: 480px)',
    },
    tablet: 'screen and (min-width: 481px) and (max-width: 1024px) and (min-height: 480px)',
    desktop: 'screen and (min-width: 1025px)',
  },
  layoutPadding: {
    main: '10px 0.5rem',
    desktop: '0px  20px',
    desktopSide: 'max(calc(15vw - 200px), 0.5rem)',
  },
})

export type AppTheme = MuiTheme & AdditionaThemeProps

/* Emotion.js theme --------------------------------------------------------- */
export const emotionTheme = (props: MuiThemeProps): AppTheme => ({
  ...muiTheme(props),
  ...additionalThemeProps(props.mode),
})
