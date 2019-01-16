import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles, Grid, FormControl, InputLabel, InputBase, Typography } from '@material-ui/core'
import qChatBlank_Icon from '../../imgs/icons/qChatBlank_Icon.svg'

const styling = theme => ({
    root: {
        height: '100vh',
    },
    root2: {
        width: '80%',
        backgroundColor: '#253646',
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
    textInputRoot: {
        'label + &': {
            marginTop: theme.spacing.unit * 2,
        },
    },
    textInputControl: {
        width: '250px',
        padding: '10px 12px',
        color: 'black',
        borderRadius: 20,
        backgroundColor: '#4A545D',
        transition: theme.transitions.create(['box-shadow']),

        '&:focus': {
            boxShadow: '0 0 0 2px rgba(112,112,112,.25)',
        },
    },
    separator: {
        width: '100%',
        border: '0.5px solid #484D52',
    },
})

class Registration extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    }

    state = {
        inputNames: ['Email Address', 'Username', 'Password', 'Confirm Password', 'Display Name'],
    }

    render() {
        const { classes } = this.props
        return (
            <Grid container justify="center" className={classes.root}>
                <Grid container justify="center" alignItems="center" className={classes.root2}>
                    <Grid item>
                        <img
                            width={265}
                            height={265}
                            src={qChatBlank_Icon}
                            alt=""
                            style={{ marginRight: '100px' }}
                        />
                    </Grid>
                    <Grid item>
                        <Grid container direction="column">
                            <hr className={classes.separator} />
                            {this.state.inputNames.map(input => {
                                return (
                                    <Grid item>
                                        <FormControl className={classes.margin}>
                                            <InputLabel shrink style={{ left: '15px' }}>
                                                <Typography>{input}</Typography>
                                            </InputLabel>
                                            <InputBase
                                                classes={{
                                                    root: classes.textInputRoot,
                                                    input: classes.textInputControl,
                                                }}
                                            />
                                        </FormControl>
                                    </Grid>
                                )
                            })}
                            <hr className={classes.separator} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styling)(Registration)
