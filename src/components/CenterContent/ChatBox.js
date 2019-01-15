import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Draw_Icon from '../../imgs/icons/Draw_Icon.svg'
import Emoticon_Icon from '../../imgs/icons/Emoticon_Icon.svg'
import Video_Icon from '../../imgs/icons/Video_Icon.svg'
import { withStyles, Paper, Grid, InputBase, Button } from '@material-ui/core'

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
    chatroomUtils: {
        borderRadius: '0px 0px 10px 10px',
        borderTop: '1px solid black',
        height: '30px',
        background: '#2A4A5A',
    },
    chatroomUtilChild: {
        margin: '0 5px ',
    },
    chatroomText: {
        width: '100%',
    },
    chatroomInput: {
        flexGrow: 1,
    },
    chatSendButton: {
        borderRadius: '30px',
        padding: '6px 30px',
        marginLeft: '20px',
        background: '#2E4B65',
        '&:hover': {
            background: '#376D9D',
        },
    },
})

class ChatBox extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    }

    state = {
        message: '',
    }

    handleWritingMessage = event => {
        this.setState({ message: event.target.value })
    }

    render() {
        const { classes } = this.props
        return (
            <React.Fragment>
                <Paper className={classes.root}>
                    <Grid container direction="column" spacing={8}>
                        <Grid container item direction="column">
                            <Paper square className={classes.chatroomMessages}>
                                Messages Here
                            </Paper>
                            <Paper className={classes.chatroomUtils}>
                                <Grid container style={{ paddingTop: '3px' }}>
                                    <Grid item className={classes.chatroomUtilChild}>
                                        <img src={Emoticon_Icon} alt="" />
                                    </Grid>
                                    <Grid item className={classes.chatroomUtilChild}>
                                        <img src={Draw_Icon} alt="" />
                                    </Grid>
                                    <Grid item className={classes.chatroomUtilChild}>
                                        <img src={Video_Icon} alt="" />
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid container item>
                            <InputBase
                                autoFocus
                                className={classes.chatroomInput}
                                onChange={this.handleWritingMessage}
                                inputProps={{
                                    style: {
                                        padding: '6px 10px',
                                        background: '#263238',
                                        color: '#707070',
                                        borderRadius: '10px',
                                    },
                                }}
                            />
                            <Button variant="contained" color="secondary" className={classes.chatSendButton}>
                                Send
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </React.Fragment>
        )
    }
}

export default withStyles(styling)(ChatBox)
