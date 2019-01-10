import React from 'react'

import { Grid, Typography, withStyles } from '@material-ui/core'

import qChatBlank_Icon from '../../imgs/icons/qChatBlank_Icon.svg'

const styling = themes => ({
    titleImg: {
        paddingTop: '17px',
        paddingBottom: '4px',
    },
    titleLogo: {
        color: 'white',
    },
})

const SideBarLogo = props => {
    const { classes } = props
    return (
        <React.Fragment>
            <Grid container direction="column" justify="center" alignItems="center">
                <Grid item>
                    <img className={classes.titleImg} src={qChatBlank_Icon} alt="qChat" />
                </Grid>
                <Grid item>
                    <Typography className={classes.titleLogo} variant="h6" color="secondary">
                        qChat
                    </Typography>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default withStyles(styling)(SideBarLogo)
