import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import SvgIcon from '@material-ui/core/SvgIcon'
import Typography from '@material-ui/core/Typography'

const styling = themes => ({
    chatroom: {
        height: '70px',
        color: 'white',
        width: '100%',
        backgroundColor: '#4A545D',
        marginBottom: '6px',
    },
    chatroomContent: {
        padding: '0px 5px 0px 5px',
    },
    chatroomImage: {
        borderRadius: 0,
        width: 40,
        height: 40,
    },
    chatroomTitle: {
        margin: 0,
        color: 'white',
        fontSize: 20,
    },
    chatroomDescription: {
        color: '#8F8F8F',
        fontSize: 10,
    },
    chatroomConnection: {
        color: 'white',
        fontSize: 10.5,
    },
    noChannelsMSG: {
        color: '#8F8F8F',
    },
})

class SideBarRooms extends Component {
    static propTypes = {
        prop: PropTypes,
    }

    state = {
        chatrooms: [],
    }

    render() {
        const { classes } = this.props
        return (
            <React.Fragment>
                {this.state.chatrooms.length > 0 ? (
                    this.state.chatrooms.map(room => {
                        return (
                            <Card square={true} className={classes.chatroom}>
                                <Grid container spacing={16} className={classes.chatroomContent}>
                                    <Grid item style={{ paddingLeft: 2, paddingRight: 2 }}>
                                        <IconButton aria-label="Home Channel">
                                            <Avatar
                                                className={classes.chatroomImage}
                                                alt={`${room.title} Icon`}
                                                src={room.img}
                                            />
                                        </IconButton>
                                    </Grid>
                                    <Grid item xs={12} sm container>
                                        <Grid item xs container direction="column" spacing={16}>
                                            <Grid item xs>
                                                <Typography className={classes.chatroomTitle}>
                                                    {room.title}
                                                </Typography>
                                                <Typography className={classes.chatroomDescription}>
                                                    {room.description}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid item style={{ padding: 3 }}>
                                            <SvgIcon
                                                /*
                                                @nativeColor:
                                                    nativeColor is 2 colors that if 80%
                                                    of a room is full, the SVG will fill Yellow,
                                                    if 100% of a room is full, the SVG will fill Red
                                                    and otherwise, it would be green.

                                                @viewBox:    
                                                    Encountered an issue with the default viewBox
                                                    where half the SVG was being removed.
                                                    Having it set to '0 0 30 30' fixed the issue.
                                                    Currently looking for a better way to solve this problem.
                                                        
                                                @ArgenisRO
                                            */
                                                style={{
                                                    marginBottom: '7px',
                                                    marginRight: '2px',
                                                    width: '12px',
                                                    height: '12px',
                                                }}
                                                viewBox="0 0 30 30"
                                                nativeColor={
                                                    room.connected === room.maxConnection
                                                        ? '#D15555'
                                                        : room.connected >= room.maxConnection * 0.8
                                                        ? '#C4C410'
                                                        : '#8FD155'
                                                }>
                                                <path d="M7,21.667c0-2.667,5.333-4.133,8-4.133S23,19,23,21.667V23H7M19,11a4,4,0,1,1-4-4,4,4,0,0,1,4,4M3,5.667V24.333A2.667,2.667,0,0,0,5.667,27H24.333A2.667,2.667,0,0,0,27,24.333V5.667A2.667,2.667,0,0,0,24.333,3H5.667A2.666,2.666,0,0,0,3,5.667Z" />
                                            </SvgIcon>
                                        </Grid>
                                        <Grid item>
                                            <Typography
                                                className={classes.chatroomConnection}
                                                color="textSecondary">
                                                {`${room.connected}/${room.maxConnection}`}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Card>
                        )
                    })
                ) : (
                    /* 
                        Incase no channels are present on the sidebar,
                        the following message will be displayed.
                    */
                    <Grid container direction="column" justify="center" alignItems="center">
                        <Grid item>
                            <SvgIcon viewBox="0 0 24 24" nativeColor="#8f8f8f">
                                <path d="M0,12A12,12,0,1,1,12,24,12.013,12.013,0,0,1,0,12Zm2,0A10,10,0,1,0,12,2,10.012,10.012,0,0,0,2,12Zm5.458,4.458L8.09,15.9a5.942,5.942,0,0,1,7.827,0l.632.555L15.44,17.717l-.631-.554a4.262,4.262,0,0,0-5.61,0l-.632.554Zm7.76-5.647V9.131H16.9v1.681Zm-8.116,0V9.131H8.782v1.681Z" />
                            </SvgIcon>
                        </Grid>
                        <Grid item>
                            <Typography variant="h6" className={classes.noChannelsMSG}>
                                No Channels Found
                            </Typography>
                        </Grid>
                    </Grid>
                )}
            </React.Fragment>
        )
    }
}

export default withStyles(styling)(SideBarRooms)
