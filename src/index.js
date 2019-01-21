import React from 'react'
import ReactDOM from 'react-dom'
import { CssBaseline } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import Root from './components/Root'
import theme from './theme'
import './Style.css'

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Root />
    </ThemeProvider>,
    document.getElementById('main')
)
