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
        height: '100%',
        backgroundColor: '#253646',
        padding: '60px 0px 50px 0px',
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
                    <Grid container item style={{ minHeight: '224px', borderRadius: '10px' }}>
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
