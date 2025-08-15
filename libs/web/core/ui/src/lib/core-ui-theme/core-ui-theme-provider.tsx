import { ColorSchemeScript, createTheme, Loader, MantineColorsTuple, MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import { createContext, ReactNode, Suspense, useContext } from 'react'

// Import the mantine theme styles
import './ui-theme-styles'

export const brand: MantineColorsTuple = [
  '#edfbeb',
  '#ddf3da',
  '#abdea4',
  '#97d68f',
  '#79c96d',
  '#65c158',
  '#5abd4c',
  '#49a73c',
  '#3e9433',
  '#308028',
]

const defaultTheme = createTheme({
  colors: {
    brand,
  },
  primaryColor: 'brand',
  fontFamily: `Poppins, sans-serif`,
  headings: { fontFamily: 'Poppins, sans-serif' },
  components: {
    Autocomplete: {
      styles: {
        input: { border: 'none' },
        dropdown: { border: 'none' },
      },
    },
    Select: {
      styles: {
        input: { border: 'none' },
        dropdown: { border: 'none' },
      },
    },
  },
})

export interface CoreUiThemeProviderOptions {
  children: ReactNode
}

export interface CoreUiThemeProviderContext {
  name: string
}

const Context = createContext<CoreUiThemeProviderContext>({} as CoreUiThemeProviderContext)

export function CoreUiThemeProvider({ children }: CoreUiThemeProviderOptions) {
  const value: CoreUiThemeProviderContext = {
    name: 'default',
  }

  return (
    <Context.Provider value={value}>
      <ColorSchemeScript defaultColorScheme="dark" />
      <MantineProvider theme={defaultTheme} defaultColorScheme="dark">
        <ModalsProvider>
          <Notifications position="top-center" />
          <Suspense fallback={<Loader />}>{children}</Suspense>
        </ModalsProvider>
      </MantineProvider>
    </Context.Provider>
  )
}

export function useUiTheme() {
  return useContext(Context)
}
