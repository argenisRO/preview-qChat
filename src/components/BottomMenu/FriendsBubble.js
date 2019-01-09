import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Fade from '@material-ui/core/Fade'
import Popper from '@material-ui/core/Popper'
import Grid from '@material-ui/core/Grid'
import AddFriend_Icon from '../../imgs/icons/AddFriend_Icon.svg'
import Enlarge_Icon from '../../imgs/icons/Enlarge_Icon.svg'
import Exit_Icon from '../../imgs/icons/Exit_Icon.svg'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import WhisperMessage from './WhisperMessage'
import Badge from '@material-ui/core/Badge'
import InputBase from '@material-ui/core/InputBase'
import { withStyles } from '@material-ui/core/styles'

const styling = theme => ({
    userChip: {
        margin: '5px',
        background: '#484D52',
        '&:hover': {
            backgroundColor: '#4A545D',
        },
        '&:focus': {
            backgroundColor: '#677E92',
        },
    },
    userImg: {
        border: '1px solid',
    },
    userChipName: {
        color: '#FFF',
    },
    whisperBox: {
        background: '#343A40',
        color: 'white',
        width: '315px',
        height: '330px',
        padding: '15px 1px 14px 1px',
        borderTopRightRadius: '11px',
        borderTopLeftRadius: '11px',
    },
    whisperButtons: {
        padding: '5px',
    },
    whisperChatBoxOuter: {
        background: '#2E3339',
        height: '256px',
        overflow: 'auto',
    },
    whisperInputText: {
        color: '#707070',
        background: '#272C31',
        borderRadius: '10px',
        paddingLeft: '10px',
        paddingRight: '10px',
        width: '93.5%',
    },
    notificationCircle: {
        top: '-7px',
        right: '-1px',
        backgroundColor: '#455F77',
    },
})

class FriendsBubble extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    }

    state = {
        writtenMessage: '',
        chipAnchor: null,
        opened: false,
        messages: [
            {
                username: 'Argenis Rodriguez',
                message: 'Testing Self Messages',
                date: new Date()
                    .toJSON()
                    .slice(0, 10)
                    .replace(/-/g, '/'),
                watched: false,
            },
            {
                username: 'Test User One',
                message: 'Testing Second Party Message',
                date: new Date()
                    .toJSON()
                    .slice(0, 10)
                    .replace(/-/g, '/'),
                watched: false,
            },
            {
                username: 'Test User One',
                message: 'Testing the second line of a message box to see how words wrap around.',
                date: new Date()
                    .toJSON()
                    .slice(0, 10)
                    .replace(/-/g, '/'),
                watched: false,
            },
        ],
    }

    updateWatchedMessage = () => {
        let updateWatchedMSGS = this.state.messages
        updateWatchedMSGS.map(MSG => {
            return (MSG.watched = true)
        })
        this.setState({ messages: updateWatchedMSGS })
    }

    handleOpenWhisper = e => {
        this.setState({
            chipAnchor: e.currentTarget,
            opened: !this.state.opened,
        })
    }

    handleWritingMessage = e => {
        this.setState({ writtenMessage: e.target.value })
    }

    handleSendMessage = e => {
        e.preventDefault()
        // Execute Send Message Here <--
        /* 
            The following function is only for testing purposes 
        */
        this.setState({
            messages: [
                ...this.state.messages,
                {
                    username: 'Argenis Rodriguez',
                    message: this.state.writtenMessage,
                    date: new Date()
                        .toJSON()
                        .slice(0, 10)
                        .replace(/-/g, '/'),
                },
            ],
        })
        setTimeout(() => {
            this.setState({
                messages: [
                    ...this.state.messages,
                    {
                        username: 'Eris Cortez',
                        message: 'Test Notification',
                        date: new Date()
                            .toJSON()
                            .slice(0, 10)
                            .replace(/-/g, '/'),
                        watched: this.state.opened,
                    },
                ],
            })
        }, 5000)
        e.target.reset()
    }

    render() {
        /* Vars */
        const { classes } = this.props
        const { fullName, img, status } = this.props.onlineUser

        /* Objects */
        const userChipBubble = (
            <Chip
                clickable
                onClick={this.handleOpenWhisper}
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

        const unreadMessages = this.state.messages.filter(message => {
            return message.watched === false
        }).length

        return (
            <React.Fragment>
                <Badge
                    classes={{ badge: classes.notificationCircle }}
                    badgeContent={unreadMessages}
                    invisible={this.state.opened || unreadMessages === 0}>
                    {userChipBubble}
                </Badge>
                <Popper
                    style={{ color: 'white' }}
                    open={this.state.opened}
                    anchorEl={this.state.chipAnchor}
                    transition>
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={500}>
                            <Paper elevation={12} className={classes.whisperBox}>
                                <Grid container>
                                    <Grid item xs={9}>
                                        <Chip
                                            clickable
                                            avatar={
                                                <Avatar
                                                    className={classes.userImg}
                                                    style={{ borderColor: status }}
                                                    alt={fullName}
                                                    src={img}
                                                />
                                            }
                                            label={
                                                <Typography
                                                    variant="subtitle1"
                                                    className={classes.userChipName}>
                                                    {fullName}
                                                </Typography>
                                            }
                                            className={classes.userChip}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Tooltip title="Remove Friend">
                                            <IconButton classes={{ root: classes.whisperButtons }}>
                                                <img src={AddFriend_Icon} alt="Add" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Enlarge Chat">
                                            <IconButton classes={{ root: classes.whisperButtons }}>
                                                <img src={Enlarge_Icon} alt="Enlarge" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Close">
                                            <IconButton
                                                onClick={this.handleOpenWhisper}
                                                classes={{ root: classes.whisperButtons }}>
                                                <img src={Exit_Icon} alt="Exit" />
                                            </IconButton>
                                        </Tooltip>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Paper className={classes.whisperChatBoxOuter} elevation={0} square>
                                            {this.state.messages.map((message, id) => {
                                                return (
                                                    <WhisperMessage
                                                        key={id}
                                                        TransitionProps={TransitionProps}
                                                        WhisperMessageSent={message}
                                                        updater={this.updateWatchedMessage}
                                                    />
                                                )
                                            })}
                                        </Paper>
                                        <form style={{ paddingTop: '2px' }} onSubmit={this.handleSendMessage}>
                                            <InputBase
                                                autoFocus
                                                fullWidth
                                                className={classes.whisperInputText}
                                                onChange={this.handleWritingMessage}
                                            />
                                        </form>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Fade>
                    )}
                </Popper>
            </React.Fragment>
        )
    }
}

export default withStyles(styling)(FriendsBubble)
