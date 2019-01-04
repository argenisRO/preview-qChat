import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Sidebar_Icon from '../imgs/icons/Sidebar_Icon.svg'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'

import friendsBar from './test'

const styles = theme => ({
    menuBar: {
        background: '#343A40',
    },
})

class Root extends Component {
    static propTypes = {
        prop: PropTypes,
    }

    render() {
        const { classes } = this.props
        return (
            <React.Fragment>
                <AppBar position="relative" color="primary">
                    <Toolbar variant="dense" className={classes.menuBar}>
                        {/* Sidebar Menu */}
                        <IconButton aria-label="Chatrooms Menu">
                            <img src={Sidebar_Icon} alt="Sidebar Icon" />
                        </IconButton>

                        {/* Site Title */}
                        <Typography variant="h6" color="inherit">
                            qChat
                        </Typography>
                    </Toolbar>
                </AppBar>

                <friendsBar />
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(Root)
