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
    },
    toolbar: {
        background: '#343A40',
        boxShadow:
            '0px -2px 4px -1px rgba(0,0,0,0.2), 0px -4px 5px 0px rgba(0,0,0,0.14), 0px -1px 10px 0px rgba(0,0,0,0.12)',
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
        onlineUsers: [
            {
                fullName: 'Kevin Rodriguez',
                img: 'https://puu.sh/CrSYK/db1ea36eb9.png',
                status: status.online,
            },
        ],
    }

    render() {
        const { classes } = this.props

        return (
            <AppBar position="fixed" color="primary" className={classes.friendsBar}>
                <Toolbar variant="dense" className={classes.toolbar}>
                    {this.state.onlineUsers.length > 0 ? (
                        this.state.onlineUsers.map(onlineUser => {
                            return <FriendsBubble onlineUser={onlineUser} />
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
