import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Draw_Icon from '../../imgs/icons/Draw_Icon.svg'
import Emoticon_Icon from '../../imgs/icons/Emoticon_Icon.svg'
import Video_Icon from '../../imgs/icons/Video_Icon.svg'
import { withStyles, Paper, Grid, InputBase, Button, Tooltip } from '@material-ui/core'
import MessageBox from '../General/MessageBox'
import * as moment from 'moment'

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
        overflow: 'auto',
    },
    chatroomUtils: {
        borderRadius: '0px 0px 10px 10px',
        borderTop: '1px solid black',
        boxShadow: '0px -4px 20px 5px rgba(0,0,0,0.2)',
        height: '30px',
        background: '#253646',
    },
    chatroomUtilChild: {
        margin: '0 15px ',
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

const status = {
    online: '#A5F134',
    busy: '#F13434',
    away: '#F1F11E',
    offline: '#FFFFFF',
}

class ChatBox extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    }

    state = {
        message: '',
        testMessages: [
            {
                username: 'Argenis Rodriguez',
                date: moment(),
                message: 'test test one two three',
                img: 'https://d3iw72m71ie81c.cloudfront.net/male-93.jpg',
                status: status.online,
            },
            {
                username: 'Miles Jefferson',
                date: moment(),
                message: 'Test Two Three Four',
                img: 'https://d3iw72m71ie81c.cloudfront.net/male-27.jpg',
                status: status.busy,
            },
        ],
    }

    handleWritingMessage = event => {
        this.setState({ message: event.target.value })
    }

    onSendMessage = event => {
        event.preventDefault()
        if (this.state.message.length <= 0) return
        //send message code here

        /* Test */
        this.setState({
            testMessages: [
                ...this.state.testMessages,
                {
                    username: 'Argenis Rodriguez',
                    date: moment(),
                    message: this.state.message,
                    img: 'https://d3iw72m71ie81c.cloudfront.net/male-93.jpg',
                    status: status.online,
                },
            ],
            message: '',
        })
        event.target.reset()
    }

    render() {
        const { classes } = this.props
        return (
            <React.Fragment>
                <Paper className={classes.root}>
                    <Grid container direction="column" spacing={8}>
                        <Grid container item direction="column">
                            <Paper square className={classes.chatroomMessages}>
                                {this.state.testMessages.map((messageInfo, ID) => {
                                    return <MessageBox key={ID} info={messageInfo} displayImage />
                                })}
                            </Paper>
                            <Paper className={classes.chatroomUtils}>
                                <Grid container style={{ paddingTop: '4px' }}>
                                    <Grid item className={classes.chatroomUtilChild}>
                                        <Tooltip title="Emotes" placement="top">
                                            <img src={Emoticon_Icon} alt="" />
                                        </Tooltip>
                                    </Grid>

                                    <Grid item className={classes.chatroomUtilChild}>
                                        <Tooltip title="Draw" placement="top">
                                            <img src={Draw_Icon} alt="" />
                                        </Tooltip>
                                    </Grid>

                                    <Grid item className={classes.chatroomUtilChild}>
                                        <Tooltip title="Queue Video" placement="top">
                                            <img src={Video_Icon} alt="" />
                                        </Tooltip>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                        <form onSubmit={this.onSendMessage}>
                            <Grid container item onSubmit={this.onSendMessage}>
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
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                    className={classes.chatSendButton}>
                                    Send
                                </Button>
                            </Grid>
                        </form>
                    </Grid>
                </Paper>
            </React.Fragment>
        )
    }
}

export default withStyles(styling)(ChatBox)
