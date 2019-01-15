import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles, Paper, Typography } from '@material-ui/core'

const styling = theme => ({
    root: {
        margin: '10px',
        padding: theme.spacing.unit * 2,
        width: '100%',
        background: '#1F2933',
    },
})

class ChatBox extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    }

    render() {
        const { classes } = this.props
        return (
            <Paper className={classes.root}>
                <Typography variant="title">Chat Box WIP</Typography>
            </Paper>
        )
    }
}

export default withStyles(styling)(ChatBox)
