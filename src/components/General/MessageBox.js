import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles, Fade, Paper, Grid, Typography } from '@material-ui/core'

const styling = theme => ({
    root: {
        flexGrow: 1,
        marginBottom: '1px',
    },
    paper: {
        height: '100%',
    },
    textWrap: {
        wordBreak: 'break-word',
    },
})

class MessageBox extends Component {
    /* Message Box Component
     The message box component is avaiable for use by any chat component.
     the only requirement is proper 'info' data
    
     !info = {}

     @username
     @img
     @status
     @message
     @date

        - @displayImage is the component variable 
           that displays the image.
           'false' by default
        - @small is a boolean for smaller chatboxes
           Shrinks text sizes
        
    */
    static propTypes = {
        classes: PropTypes.object.isRequired,
        displayImage: PropTypes.bool,
        username: PropTypes.string,
        message: PropTypes.string,
        status: PropTypes.string,
        img: PropTypes.string,
        small: PropTypes.bool,
        date: PropTypes.func,
    }

    render() {
        const { classes, small, displayImage } = this.props
        const { username, img, status, message, date } = this.props.info
        return (
            <Fade in>
                <div className={classes.root} style={{ height: !small && 40 }}>
                    <Paper
                        className={classes.paper}
                        square
                        elevation={small ? 0 : 2}
                        style={{
                            background: username === 'Argenis Rodriguez' ? '#2E4B65' : '#4A545D',
                        }}>
                        <Grid container>
                            {displayImage && (
                                <Grid item>
                                    <img
                                        src={img}
                                        alt={username}
                                        width="38"
                                        height="38"
                                        className={classes.chatroomUserImg}
                                        style={{ border: `1px solid ${status}` }}
                                    />
                                </Grid>
                            )}
                            <Grid item xs={12} sm container style={{ padding: '0px 5px' }}>
                                <Grid item xs container direction="column" spacing={16}>
                                    <Grid item xs>
                                        <Typography color="secondary" style={{ fontSize: small ? 8 : 10 }}>
                                            {username}
                                        </Typography>
                                        <Typography
                                            className={classes.textWrap}
                                            style={{ fontSize: small ? 12 : 16 }}>
                                            {message}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Typography color="secondary" style={{ fontSize: 8, opacity: 0.6 }}>
                                        {date.calendar(null, {
                                            sameDay: 'h:mma',
                                            lastDay: '[Yesterday]',
                                            lastWeek: `[${date.fromNow()}]`,
                                            sameElse: `[${date.fromNow()}]`,
                                        })}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </div>
            </Fade>
        )
    }
}

export default withStyles(styling)(MessageBox)
