import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'

const styling = themes => ({
    chatroom: {
        height: '70px',
        color: 'white',
        width: '100%',
        backgroundColor: '#4A545D',
        marginBottom: '6px',
    },
})

class SideBarRooms extends Component {
    static propTypes = {
        prop: PropTypes,
    }

    state = {
        chatrooms: [
            {
                id: 0,
                title: 'Home Channel',
                description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sodales ultricies velit, non sollicitudin velit lacinia aliquet. Nam lacinia aliquet turpis, a sagittis massa.',
                img: '',
                connected: 2,
                maxConnection: 10,
            },
            {
                id: 1,
                title: 'Chill Corner',
                description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sodales ultricies velit, non sollicitudin velit lacinia aliquet. Nam lacinia aliquet turpis, a sagittis massa.',
                img: '',
                connected: 0,
                maxConnection: 10,
            },
            {
                id: 2,
                title: 'Gaming Center',
                description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sodales ultricies velit, non sollicitudin velit lacinia aliquet. Nam lacinia aliquet turpis, a sagittis massa.',
                img: '',
                connected: 4,
                maxConnection: 5,
            },
        ],
    }

    render() {
        const { classes } = this.props
        return (
            <React.Fragment>
                {this.state.chatrooms.map(room => {
                    return (
                        <Paper elevation="0" square={true} className={classes.chatroom}>
                            {room.title}
                        </Paper>
                    )
                })}
            </React.Fragment>
        )
    }
}

export default withStyles(styling)(SideBarRooms)
