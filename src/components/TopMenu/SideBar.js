import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { IconButton, Drawer, withStyles } from '@material-ui/core'

import qChat_Icon from '../../imgs/icons/qChat_Icon.svg'

import SideBarLogo from './SideBarLogo'
import SideBarRooms from './SideBarRooms'

const styling = themes => ({
    sidebar_icon: {
        width: 34,
        height: 34,
    },
    separator: {
        margin: '10px 40px 10px 40px',
        border: '0.5px solid #484D52',
    },
    paper: {
        width: '410px',
        backgroundColor: '#343A40',
        [themes.breakpoints.down('sm')]: {
            width: '360px',
        },
    },
})

class SideBar extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
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
                <Drawer
                    classes={{ paper: classes.paper }}
                    open={this.state.opened}
                    onClose={this.toggleSidebar}
                    transitionDuration={{ enter: 350, exit: 510 }}>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleSidebar}
                        onKeyDown={this.toggleSidebar}>
                        <SideBarLogo />
                        <hr className={classes.separator} />
                        <SideBarRooms />
                        <hr className={classes.separator} />
                    </div>
                </Drawer>
            </React.Fragment>
        )
    }
}

export default withStyles(styling)(SideBar)
