import React from 'react'
import ReactDOM from 'react-dom'
import { CssBaseline } from '@material-ui/core'
import { MuiThemeProvider } from '@material-ui/core/styles'
import Root from './components/Root'
import theme from './theme'

import './Style.css'

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Root />
    </MuiThemeProvider>,
    document.getElementById('main')
)
