import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { AppBar, Toolbar, Typography, Slide, withStyles } from '@material-ui/core'

import SideBar from './SideBar'

const styling = themes => ({
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
            <Slide direction="down" in mountOnEnter unmountOnExit>
                <AppBar position="relative" color="primary">
                    <Toolbar variant="dense" className={classes.menuBar}>
                        <SideBar />
                        <Typography variant="h6" color="inherit">
                            qChat
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Slide>
        )
    }
}

export default withStyles(styling)(TopMenu)
