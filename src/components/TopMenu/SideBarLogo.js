import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import qChatBlank_Icon from '../../imgs/icons/qChatBlank_Icon.svg'
import { withStyles } from '@material-ui/core/styles'

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
