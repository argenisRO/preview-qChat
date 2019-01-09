import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Fade from '@material-ui/core/Fade'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core'

const styling = theme => ({
    whisperMessageBox: {
        marginTop: '1px',
        marginBottom: '1px',
    },
    whisperUsername: {
        fontWeight: 'bold',
        letterSpacing: '0.4px',
        color: '#A7A7A7',
        fontSize: 8,
        marginLeft: 10,
    },
    whisperMessage: {
        fontSize: 12,
        marginLeft: 10,
        paddingBottom: 5,
        color: 'white',
        wordBreak: 'break-word',
        whiteSpace: 'pre-wrap',
    },
    whisperDate: {
        float: 'right',
        opacity: 0.35,
    },
})

class WhisperMessage extends Component {
    static propTypes = {
        prop: PropTypes,
    }

    componentDidMount() {
        this.props.updater()
    }

    render() {
        const { username, message, date } = this.props.WhisperMessageSent
        const { classes } = this.props
        return (
            <Fade {...this.props.TransitionProps} timeout={250}>
                <Paper elevation={0} square>
                    <Grid
                        className={classes.whisperMessageBox}
                        style={{
                            /* 
                                The following is just for testing purposes 
                                Will be removed in a later date
                            */
                            background: username === 'Argenis Rodriguez' ? '#455F77' : '#4A545D',
                        }}>
                        <Typography className={classes.whisperUsername}>
                            {username} <span className={classes.whisperDate}>{date}</span>
                        </Typography>
                        <Typography className={classes.whisperMessage}>{message}</Typography>
                    </Grid>
                </Paper>
            </Fade>
        )
    }
}

export default withStyles(styling)(WhisperMessage)
