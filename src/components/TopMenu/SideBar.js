import React, { Component } from 'react'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import qChat_Icon from '../../imgs/icons/qChat_Icon.svg'
import { withStyles } from '@material-ui/core/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import SideBarLogo from './SideBarLogo'
import SideBarRooms from './SideBarRooms'

const styling = themes => ({
    sidebar_icon: {
        width: 34,
        height: 34,
    },
    paper: {
        width: '410px',
        backgroundColor: '#343A40',
    },
})

class SideBar extends Component {
    static propTypes = {
        prop: PropTypes,
    }

    state = {
        opened: false,
    }

    toggleSidebar = () => {
        this.setState({ opened: !this.state.opened })
    }

    render() {
        const { classes } = this.props
        return (
            <React.Fragment>
                <IconButton aria-label="Chatrooms Menu" onClick={this.toggleSidebar}>
                    <img className={classes.sidebar_icon} src={qChat_Icon} alt="Sidebar Icon" />
                </IconButton>
                <SwipeableDrawer
                    classes={{ paper: classes.paper }}
                    open={this.state.opened}
                    onClose={this.toggleSidebar}
                    swipeAreaWidth="70"
                    transitionDuration={{ enter: 350, exit: 510 }}>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleSidebar}
                        onKeyDown={this.toggleSidebar}>
                        <SideBarLogo />
                        <SideBarRooms />
                    </div>
                </SwipeableDrawer>
            </React.Fragment>
        )
    }
}

export default withStyles(styling)(SideBar)
