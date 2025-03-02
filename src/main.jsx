import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'

const theme = extendTheme({
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Poppins', sans-serif`,
  },
  colors: {
    brand: {
      50: '#f5f0ff',
      100: '#ecdcff',
      200: '#dcb9ff',
      300: '#c894fd',
      400: '#b46ef7',
      500: '#9f4aef',
      600: '#8932d7',
      700: '#7026ae',
      800: '#5a1e8c',
      900: '#441a6a',
    },
  },
  styles: {
    global: {
      body: {
        bg: 'gray.150',
      }
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
)