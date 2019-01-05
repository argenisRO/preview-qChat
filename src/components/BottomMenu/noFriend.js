import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Fab from '@material-ui/core/Fab'
import PersonAdd from '@material-ui/icons/PersonAdd'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core'

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
    },
})

class NoFriend extends Component {
    static propTypes = {
        prop: PropTypes,
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
                    disableFocusRipple={true}>
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
