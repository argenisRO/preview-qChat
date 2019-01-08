import React, { Component } from 'react'
import PropTypes from 'prop-types'

import NoFriend from './NoFriend'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import FriendsBubble from './FriendsBubble'
import { withStyles } from '@material-ui/core/styles'

const styling = theme => ({
    friendsBar: {
        top: 'auto',
        bottom: 0,
        zIndex: 1500,
    },
    toolbar: {
        background: '#343A40',
        minHeight: '50px',
    },
    userChip: {
        margin: '5px',
        background: '#484D52',
    },
    userImg: {
        border: '1px solid',
    },
    userChipName: {
        color: '#FFF',
    },
})

const status = {
    online: '#A5F134',
    busy: '#F13434',
    away: '#F1F11E',
    offline: '#FFFFFF',
}

class BottomMenu extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    }

    state = {
        onlineUsers: [{}, {}, {}],
    }

    render() {
        const { classes } = this.props

        return (
            <AppBar position="fixed" color="primary" className={classes.friendsBar}>
                <Toolbar variant="dense" className={classes.toolbar}>
                    {this.state.onlineUsers.length > 0 ? (
                        this.state.onlineUsers.map(User => {
                            return <FriendsBubble onlineUser={User} />
                        })
                    ) : (
                        <NoFriend />
                    )}
                </Toolbar>
            </AppBar>
        )
    }
}

export default withStyles(styling)(BottomMenu)
