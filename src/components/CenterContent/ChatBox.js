import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles, Paper, Grid } from '@material-ui/core'

const styling = theme => ({
    root: {
        margin: '10px',
        padding: '10px',
        flex: '1 1 auto',
        background: '#1F2933',
    },
    chatroomMessages: {
        background: '#2E3C4A',
        height: 'calc(100vh - 440px)',
    },
    chatroomText: {
        width: '100%',
    },
})

class ChatBox extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    }

    render() {
        const { classes } = this.props
        return (
            <React.Fragment>
                <Paper className={classes.root}>
                    <Grid container direction="column">
                        <Grid container item direction="column">
                            <Paper className={classes.chatroomMessages}>Messages Here{/* Message */}</Paper>
                        </Grid>
                        <Grid container item direction="column">
                            Input Box Here
                        </Grid>
                    </Grid>
                </Paper>
            </React.Fragment>
        )
    }
}

export default withStyles(styling)(ChatBox)
