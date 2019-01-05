import React, { Component } from 'react'
import PropTypes from 'prop-types'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip'
import Typography from '@material-ui/core/Typography'

import { withStyles } from '@material-ui/core/styles'
import noFriend from './noFriend'

const styles = theme => ({
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
        onlineUsers: [],
    }

    render() {
        const { classes } = this.props

        return (
            <AppBar position="fixed" color="primary" className={classes.friendsBar}>
                <Toolbar variant="dense" className={classes.toolbar}>
                    {this.state.onlineUsers.length > 0 ? (
                        this.state.onlineUsers.map(onlineUser => {
                            return (
                                <Chip
                                    clickable={true}
                                    avatar={
                                        <Avatar
                                            className={classes.userImg}
                                            style={{ borderColor: onlineUser.status }}
                                            alt={onlineUser.fullName}
                                            src={onlineUser.img}
                                        />
                                    }
                                    label={
                                        <Typography variant="subtitle1" className={classes.userChipName}>
                                            {onlineUser.fullName}
                                        </Typography>
                                    }
                                    className={classes.userChip}
                                />
                            )
                        })
                    ) : (
                        <noFriend />
                    )}
                </Toolbar>
            </AppBar>
        )
    }
}

export default withStyles(styles)(BottomMenu)
