import React, { Component } from 'react'
import PropTypes from 'prop-types'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import { withStyles } from '@material-ui/core/styles'

import SideBar from './SideBar'

const styling = theme => ({
    menuBar: {
        background: '#343A40',
        minHeight: '60px',
    },
})

class TopMenu extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    }

    render() {
        const { classes } = this.props

        return (
            <AppBar position="relative" color="primary">
                <Toolbar variant="dense" className={classes.menuBar}>
                    <SideBar />
                    <Typography variant="h6" color="inherit">
                        qChat
                    </Typography>
                </Toolbar>
            </AppBar>
        )
    }
}

export default withStyles(styling)(TopMenu)
