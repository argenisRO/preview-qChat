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
    },
    whisperMessageBox: {
        marginTop: '1.3px',
        marginBottom: '1.3px',
    },
    whisperUsername: {
        color: '#A7A7A7',
        fontSize: 8,
        marginLeft: 10,
    },
    whisperMessage: {
        fontSize: 12,
        marginLeft: 10,
        color: 'white',
    },
})

class FriendsBubble extends Component {
    static propTypes = {
        prop: PropTypes,
    }

    state = {
        chipAnchor: null,
        opened: false,
        messages: [],
    }

    handleOpenWhisper = e => {
        this.setState({
            chipAnchor: e.currentTarget,
            opened: !this.state.opened,
        })
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

        return (
            <React.Fragment>
                {userChipBubble}
                <Popper
                    style={{ color: 'white' }}
                    open={this.state.opened}
                    anchorEl={this.state.chipAnchor}
                    transition>
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={500}>
                            <Paper className={classes.whisperBox}>
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
                                            <IconButton classes={{ root: classes.whisperButtons }}>
                                                <img src={Exit_Icon} alt="Exit" />
                                            </IconButton>
                                        </Tooltip>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Paper className={classes.whisperChatBoxOuter} elevation={0} square>
                                            {this.state.messages.map(({ username, message, date }) => {
                                                return (
                                                    <Paper elevation={0} square>
                                                        <Grid
                                                            className={classes.whisperMessageBox}
                                                            style={{
                                                                background:
                                                                    username === 'Argenis Rodriguez'
                                                                        ? '#455F77'
                                                                        : '#4A545D',
                                                            }}>
                                                            <Typography className={classes.whisperUsername}>
                                                                {username}
                                                            </Typography>
                                                            <Typography className={classes.whisperMessage}>
                                                                {message}
                                                            </Typography>
                                                        </Grid>
                                                    </Paper>
                                                )
                                            })}
                                        </Paper>
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
