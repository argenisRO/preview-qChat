import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    Grid,
    withStyles,
    Paper,
    Typography,
    ButtonBase,
    SvgIcon,
    Tooltip,
    IconButton,
} from '@material-ui/core'
import EditTitle_Icon from '../../imgs/icons/EditTitle_Icon.svg'
import ExitChat_Icon from '../../imgs/icons/ExitChat_Icon.svg'
import EditVolume_Icon from '../../imgs/icons/EditVolume_Icon.svg'
import EditSettings_Icon from '../../imgs/icons/EditSettings_Icon.svg'

const styling = theme => ({
    root: {
        margin: '10px',
        padding: theme.spacing.unit * 2,
        width: '100%',
        background: '#1F2933',
    },
    chatImage: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    chatroomUserImg: {
        width: 35,
        height: 35,
        marginRight: 5,
        border: '1px solid',
    },
    chatroomExit: {
        width: 28,
        height: 28,
    },
})

const status = {
    online: '#A5F134',
    busy: '#F13434',
    away: '#F1F11E',
    offline: '#FFFFFF',
}
class ChatTitle extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    }

    state = {
        chatrooms: [
            {
                id: 0,
                title: 'Home Channel',
                description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sodales ultricies velit, non sollicitudin velit lacinia aliquet. Nam lacinia aliquot.',
                img: 'https://image.flaticon.com/icons/svg/23/23665.svg',
                public: true,
                connected: 4,
                maxConnection: 10,
            },
        ],
        connectedMembers: [
            {
                fullName: 'Test User One',
                img: 'https://d3iw72m71ie81c.cloudfront.net/male-93.jpg',
                status: status.online,
            },
            {
                fullName: 'Test User Two',
                img: 'https://d3iw72m71ie81c.cloudfront.net/female-83.jpg',
                status: status.busy,
            },
            {
                fullName: 'Test User Three',
                img: 'https://d3iw72m71ie81c.cloudfront.net/male-93.jpg',
                status: status.online,
            },
            {
                fullName: 'Test User Four',
                img: 'https://d3iw72m71ie81c.cloudfront.net/male-27.jpg',
                status: status.away,
            },
        ],
    }

    render() {
        const { classes } = this.props
        return (
            <Paper className={classes.root}>
                <Grid container spacing={8} style={{ height: '100%' }}>
                    <Grid item>
                        <Tooltip title="Exit Channel" placement="top">
                            <IconButton>
                                <img src={ExitChat_Icon} width={20} height={20} alt="Exit Chat" />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                    <Grid item>
                        <ButtonBase>
                            <img
                                className={classes.chatImage}
                                alt={`Home Channel Img`}
                                width={140}
                                height={140}
                                src="https://puu.sh/CwJ3x/bb0af721bf.png"
                            />
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={8} sm container>
                        <Grid item xs container>
                            <Grid item xs>
                                <Grid container>
                                    <Typography style={{ fontSize: 30 }}>Home Channel</Typography>
                                    <Tooltip title="Edit Title" placement="top">
                                        <IconButton>
                                            <img src={EditTitle_Icon} alt="Edit Title" />
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                                <Typography style={{ fontSize: 12 }} gutterBottom>
                                    Public
                                </Typography>
                                <Typography color="secondary" gutterBottom>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sodales
                                    ultricies velit, non sollicitudin velit lacinia aliquet. Nam lacinia
                                    aliquot.
                                </Typography>
                                <Grid container style={{ marginTop: '10px' }}>
                                    {this.state.connectedMembers.map((member, id) => {
                                        return (
                                            <Tooltip title={member.fullName} placement="top">
                                                <img
                                                    key={id}
                                                    src={member.img}
                                                    alt={member.fullName}
                                                    className={classes.chatroomUserImg}
                                                    style={{ borderColor: member.status }}
                                                />
                                            </Tooltip>
                                        )
                                    })}
                                </Grid>
                                <Grid container style={{ marginTop: '10px' }}>
                                    <SvgIcon
                                        style={{
                                            marginBottom: '5px',
                                            marginRight: '2px',
                                            width: '20px',
                                            height: '20px',
                                        }}
                                        viewBox="0 0 30 30"
                                        nativeColor={
                                            this.state.chatrooms[0].connected ===
                                            this.state.chatrooms[0].maxConnection
                                                ? '#D15555'
                                                : this.state.chatrooms[0].connected >=
                                                  this.state.chatrooms[0].maxConnection * 0.8
                                                ? '#C4C410'
                                                : '#8FD155'
                                        }>
                                        <path d="M7,21.667c0-2.667,5.333-4.133,8-4.133S23,19,23,21.667V23H7M19,11a4,4,0,1,1-4-4,4,4,0,0,1,4,4M3,5.667V24.333A2.667,2.667,0,0,0,5.667,27H24.333A2.667,2.667,0,0,0,27,24.333V5.667A2.667,2.667,0,0,0,24.333,3H5.667A2.666,2.666,0,0,0,3,5.667Z" />
                                    </SvgIcon>

                                    <Typography
                                        variant="subtitle2"
                                        style={{ fontSize: '12px' }}
                                        color="secondary">
                                        {`${this.state.chatrooms[0].connected}/${
                                            this.state.chatrooms[0].maxConnection
                                        } Connected`}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Tooltip title="Mute Sounds" placement="top">
                                <IconButton className={classes.topRightSettings}>
                                    <img src={EditVolume_Icon} alt="Volume Control" />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Chatroom Settings" placement="top">
                                <IconButton className={classes.topRightSettings}>
                                    <img src={EditSettings_Icon} alt="Edit Settings" />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}

export default withStyles(styling)(ChatTitle)
