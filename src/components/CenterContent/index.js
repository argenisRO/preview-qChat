import React from 'react'
import Grid from '@material-ui/core/Grid'
import Title from './ChatRoom/Title'
import Chat from './ChatRoom/Chat'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
        padding: '60px 0px 50px',
        background: theme.background.color.secondary,
        [`@media (min-width:${theme.breakpoint.lg}px)`]: {
            margin: 'auto',
            width: '70%',
        },
    },
}))

function ChatRoom() {
    return (
        <>
            <Title />
            <Chat />
        </>
    )
}

export default () => {
    const classes = useStyles()
    return (
        <Grid container direction="column" className={classes.root}>
            <ChatRoom />
        </Grid>
    )
}
