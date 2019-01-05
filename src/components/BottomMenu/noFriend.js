import React from 'react'
import Chip from '@material-ui/core/Chip'

import { withStyles } from '@material-ui/core/styles'

const styling = themes => ({
    noFriendButton: {
        background: '#484D52',
    },
})

function noFriend(props) {
    const { classes } = props
    return <Chip label="Add Friends" className={classes.noFriendButton} />
}

export default withStyles(styling)(noFriend)
