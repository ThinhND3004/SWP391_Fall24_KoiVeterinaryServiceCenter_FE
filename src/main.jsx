  import { CssBaseline, ThemeProvider } from '@mui/material'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '~/App.jsx'
import theme from '~/theme'
import '~/fonts.css'
import '~/styles.css'
import { Provider } from 'react-redux'
import store from '~/redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
        <ToastContainer position="bottom-left" theme="colored" />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
)
