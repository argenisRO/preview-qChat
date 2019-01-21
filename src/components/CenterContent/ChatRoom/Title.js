import React from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
    root: {
        flexBasis: '130px',
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
}))

export default function Title() {
    const classes = useStyles()
    return (
        <Grid container className={classes.root}>
            <div className={classes.container}>Title</div>
        </Grid>
    )
}
