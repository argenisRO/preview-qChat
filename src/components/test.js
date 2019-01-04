import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
    friendsBar: {
        top: 'auto',
        bottom: 0,
    },
    toolbar: {
        background: '#343A40',
        boxShadow:
            '0px -2px 4px -1px rgba(0,0,0,0.2), 0px -4px 5px 0px rgba(0,0,0,0.14), 0px -1px 10px 0px rgba(0,0,0,0.12)',
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

function friendsBar(props) {
    const { classes } = props

    return (
        <AppBar position="fixed" color="primary" className={classes.friendsBar}>
            <Toolbar variant="dense" className={classes.toolbar}>
                {/* Dummy Data for now */}
                <Chip
                    avatar={
                        <Avatar
                            className={classes.userImg}
                            style={{ borderColor: status.online }}
                            alt="Kevin Rodriguez"
                            src="https://material-ui.com/static/images/avatar/1.jpg"
                        />
                    }
                    label={
                        <Typography variant="subtitle1" className={classes.userChipName}>
                            Kevin Rodriguez
                        </Typography>
                    }
                    className={classes.userChip}
                />
                <Chip
                    avatar={
                        <Avatar
                            className={classes.userImg}
                            style={{ borderColor: status.busy }}
                            alt="Miles Jefferson"
                            src="https://pmi.peoplemedia.com/pmicontent/151/images/external/man.jpg"
                        />
                    }
                    label={
                        <Typography variant="subtitle1" className={classes.userChipName}>
                            Miles Jefferson
                        </Typography>
                    }
                    className={classes.userChip}
                />
            </Toolbar>
        </AppBar>
    )
}

export default withStyles(styles)(friendsBar)
