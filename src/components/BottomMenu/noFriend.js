import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Typography, Fab, withStyles } from '@material-ui/core'

import PersonAdd from '@material-ui/icons/PersonAdd'

const styling = themes => ({
    noFriendButton: {
        background: '#484D52',
        height: '38px',
        boxShadow: 'none',
        '&:hover': {
            backgroundColor: '#4A545D',
        },
    },
    helperText: {
        color: '#6F7C88',
        marginLeft: '10px',
        fontWeight: 'bold',
    },
})

class NoFriend extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    }

    render() {
        const { classes } = this.props
        return (
            <React.Fragment>
                <Fab
                    variant="extended"
                    size="medium"
                    color="inherit"
                    aria-label="Add Friends"
                    className={classes.noFriendButton}
                    disableFocusRipple>
                    <PersonAdd fontSize="inherit" className={classes.extendedIcon} />
                    Add Friends
                </Fab>
                <Typography className={classes.helperText}>
                    We noticed your friends list is empty. Use our friend finder and start connecting with
                    others!
                </Typography>
            </React.Fragment>
        )
    }
}

export default withStyles(styling)(NoFriend)
