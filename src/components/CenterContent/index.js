import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, withStyles } from '@material-ui/core'

const styling = theme => ({
    root: {
        height: 'calc(100vh - 110px)',
        padding: '10px',
        backgroundColor: 'black',
        [theme.breakpoints.up('lg')]: {
            width: 1170
        }
    },
    itemOne: {
        backgroundColor: 'white',
        height: '170px',
        marginBottom: '10px'
    },
    itemTwo: {
        backgroundColor: 'white',
        height: '100%'
    }
})

class CenterContent extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired
    }

    render() {
        const { classes } = this.props
        return (
            <Grid container justify='center'>
                <Grid container wrap='nowrap' direction='column' className={classes.root}>
                    <Grid container item className={classes.itemOne}>
                        <Grid item>Title</Grid>
                    </Grid>
                    <Grid container item className={classes.itemTwo}>
                        <Grid item>Chatroom</Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styling)(CenterContent)
