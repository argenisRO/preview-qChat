import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import Root from './components/Root'
import store from './store'
import './styles/main.scss'

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        secondary: {
            main: '#8F8F8F',
        },
    },
    typography: {
        body1: {
            fontWeight: 560,
        },
    },
})

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <Root />
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('main')
)
