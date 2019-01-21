import React from 'react'
import CenterContent from './CenterContent'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
        background: theme.background.color.main,
    },
}))

export default () => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <CenterContent />
        </div>
    )
}
