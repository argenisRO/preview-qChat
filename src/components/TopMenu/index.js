import React, { Component } from 'react'
import PropTypes from 'prop-types'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'

import Sidebar_Icon from '../../imgs/icons/Sidebar_Icon.svg'

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
                    <IconButton aria-label="Chatrooms Menu">
                        <img src={Sidebar_Icon} alt="Sidebar Icon" />
                    </IconButton>

                    <Typography variant="h6" color="inherit">
                        qChat
                    </Typography>
                </Toolbar>
            </AppBar>
        )
    }
}

export default withStyles(styling)(TopMenu)
