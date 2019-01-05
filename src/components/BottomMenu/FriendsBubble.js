import React from 'react'

import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const styling = theme => ({
    userChip: {
        margin: '5px',
        background: '#484D52',
        '&:hover': {
            backgroundColor: '#4A545D',
        },
    },
    userImg: {
        border: '1px solid',
    },
    userChipName: {
        color: '#FFF',
    },
})

const FriendsBubble = props => {
    const { classes } = props
    const { fullName, img, status } = props.onlineUser
    return (
        <Chip
            clickable={true}
            avatar={
                <Avatar
                    className={classes.userImg}
                    style={{ borderColor: status }}
                    alt={fullName}
                    src={img}
                />
            }
            label={
                <Typography variant="subtitle1" className={classes.userChipName}>
                    {fullName}
                </Typography>
            }
            className={classes.userChip}
        />
    )
}

export default withStyles(styling)(FriendsBubble)
