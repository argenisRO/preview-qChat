import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { v4 } from 'uuid'
import NoFriend from './NoFriend'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import FriendsBubble from './FriendsBubble'
import Slide from '@material-ui/core/Slide'
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
        onlineUsers: [
            {
                fullName: 'Test User One',
                img: 'https://d3iw72m71ie81c.cloudfront.net/male-93.jpg',
                status: status.online,
            },
            {
                fullName: 'Test User Two',
                img: 'https://d3iw72m71ie81c.cloudfront.net/female-83.jpg',
                status: status.busy,
            },
            {
                fullName: 'Test User Three',
                img: 'https://d3iw72m71ie81c.cloudfront.net/male-93.jpg',
                status: status.online,
            },
            {
                fullName: 'Test User Four',
                img: 'https://d3iw72m71ie81c.cloudfront.net/male-27.jpg',
                status: status.away,
            },
        ],
    }

    render() {
        const { classes } = this.props

        return (
            <Slide direction="up" in mountOnEnter unmountOnExit>
                <AppBar position="fixed" color="primary" className={classes.friendsBar}>
                    <Toolbar variant="dense" className={classes.toolbar}>
                        {this.state.onlineUsers.length > 0 ? (
                            this.state.onlineUsers.map(User => {
                                return <FriendsBubble key={v4()} onlineUser={User} />
                            })
                        ) : (
                            <NoFriend />
                        )}
                    </Toolbar>
                </AppBar>
            </Slide>
        )
    }
}

export default withStyles(styling)(BottomMenu)
