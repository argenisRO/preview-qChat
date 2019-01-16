import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, withStyles } from '@material-ui/core'

import ChatTitle from './ChatTitle'
import ChatBox from './ChatBox'

const styling = theme => ({
    root: {
        height: '100vh',
        backgroundColor: '#263238',
    },
    root2: {
        width: '80%',
        backgroundColor: '#253646',
        padding: '60px 0px 50px 0px',
        [theme.breakpoints.up('sm')]: {
            // sm: 960px
            width: '100%',
        },
        [theme.breakpoints.up('md')]: {
            // md: 960px or larger
            width: 920,
        },
        [theme.breakpoints.up('lg')]: {
            // lg: 1280px or larger
            width: 1170,
        },
        [theme.breakpoints.up('xl')]: {
            // xl: 1920px or larger
            width: 1366,
        },
    },
})

class CenterContent extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    }

    render() {
        const { classes } = this.props
        return (
            <Grid container justify="center" className={classes.root}>
                <Grid container wrap="nowrap" direction="column" className={classes.root2}>
                    <Grid container item style={{ minHeight: '220px', borderRadius: '10px' }}>
                        <ChatTitle />
                    </Grid>
                    <Grid
                        container
                        item
                        style={{
                            borderRadius: '10px',
                            height: '100%',
                        }}>
                        <ChatBox />
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styling)(CenterContent)
