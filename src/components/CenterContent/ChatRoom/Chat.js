import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles, useTheme } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing.container,
    },
    container: {
        width: '100%',
        borderRadius: 10,
        margin: theme.spacing.container,
        padding: theme.spacing.general,
        background: theme.container.color.main,
        boxShadow: theme.shadow.soft,
    },
    innerContainer: {
        height: '100%',
    },
    chatboxContainer: {
        flexGrow: 1,
        borderRadius: '0px 0px 10px 10px',
        background: theme.background.color.secondary,
    },
    inputboxContainer: {
        height: '100px',
        padding: theme.spacing.general,
    },
    rootMessage: {
        minHeight: '40px',
        marginBottom: 1,
    },
}))

// Temporary Test Code
const useFetch = url => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(async () => {
        const response = await fetch(url)
        setData(await response.json())
        setLoading(false)
    }, [])
    return { data, loading }
}

function Message(props) {
    const { data, loading } = useFetch('https://randomuser.me/api/')
    const classes = useStyles()
    const theme = useTheme()

    return (
        <div className={classes.rootMessage} style={{ background: theme.background.color.main }}>
            <Grid container>
                <Typography>{!loading ? data.results[0].name.first : '..loading'}</Typography>
            </Grid>
        </div>
    )
}

function ChatBox(props) {
    const classes = useStyles()
    return (
        <Grid container direction="column" className={classes.chatboxContainer}>
            <Message userData={props.userData} />
            <Message userData={props.userData} />
        </Grid>
    )
}

function InputBox() {
    const classes = useStyles()
    return (
        <Grid container className={classes.inputboxContainer}>
            Input
        </Grid>
    )
}

export default function Chat() {
    const classes = useStyles()

    return (
        <Grid container className={classes.root}>
            <div className={classes.container}>
                <Grid container direction="column" className={classes.innerContainer}>
                    <ChatBox />
                    <InputBox />
                </Grid>
            </div>
        </Grid>
    )
}
