import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from '../src/store/store.js'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import TagManager from 'react-gtm-module'
import { UserProvider } from './context/userContext'

const tagManagerArgs = {
  gtmId: 'G-XEM56GK8PH'
}

TagManager.initialize(tagManagerArgs)


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ChakraProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </ChakraProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
)
