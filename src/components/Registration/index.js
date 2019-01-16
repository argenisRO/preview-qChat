import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles, Grid, Typography, Button } from '@material-ui/core'
import qChatBlank_Icon from '../../imgs/icons/qChatBlank_Icon.svg'
import RegisterInputs from './RegisterInputs'
import Slogan from './Slogan'

const styling = theme => ({
    pageContainer: {
        height: '100vh',
    },
    root: {
        width: '80%',
        padding: '60px 0px',
        backgroundColor: '#253646',
        [theme.breakpoints.up('sm')]: {
            // sm: 960px
            width: '100%',
        },
        [theme.breakpoints.up('md')]: {
            // md: 960px or larger
            width: '100%',
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
    logo: {
        width: '265px',
        height: '265px',
        marginRight: '100px',
    },
    separator: {
        margin: '10px 40px 10px 40px',
        border: '1px solid #484D52',
    },
    signupButton: {
        width: '170px',
        height: '45px',
        background: '#2E4B65',
        '&:hover': {
            background: '#376D9D',
        },
    },
    loginButton: {
        color: '#658AE1',
        fontSize: 10,
        marginTop: 10,
        cursor: 'pointer',
    },
})

class Registration extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    }

    state = {
        'Email Address': { title: 'Email Address', message: '', password: false },
        Username: { title: 'Username', message: '', password: false },
        Password: { title: 'Password', message: '', password: true },
        'Confirm Password': { title: 'Confirm Password', message: '', password: true },
        'Display Name': { title: 'Display Name', message: '', password: false },
    }

    handleChange = event => {
        event.preventDefault()
        event.persist()
        const { name, value } = event.target
        this.setState({ [name]: { ...this.state[name], message: value } })
    }

    render() {
        const { classes } = this.props
        return (
            <Grid container justify="center" className={classes.pageContainer}>
                <Grid container justify="center" alignItems="center" className={classes.root}>
                    {/* <form style={{ width: '100%' }}> */}
                    <Grid container direction="column" alignItems="center" item>
                        <Grid item justify="center" style={{ marginBottom: '2%' }}>
                            <Slogan />
                        </Grid>
                        <Grid item style={{ width: '49%' }}>
                            <hr className={classes.separator} />
                        </Grid>
                        <Grid container item justify="center" alignItems="center">
                            <Grid item>
                                <img className={classes.logo} src={qChatBlank_Icon} alt="qChat Icon" />
                            </Grid>
                            <Grid item>
                                <Grid container direction="column">
                                    {Object.values(this.state).map((inputBox, key) => {
                                        const { title, password } = inputBox
                                        return (
                                            <RegisterInputs
                                                key={key}
                                                name={title}
                                                title={title}
                                                handleChange={this.handleChange}
                                                password={password}
                                            />
                                        )
                                    })}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item style={{ width: '49%' }}>
                            <hr className={classes.separator} />
                        </Grid>
                        <Grid
                            container
                            direction="column"
                            alignItems="flex-end"
                            item
                            style={{ width: '43%' }}>
                            <Button
                                type="button"
                                color="primary"
                                className={classes.signupButton}
                                onClick={this.props.test}
                                variant="contained">
                                Sign Up
                            </Button>
                            <Typography className={classes.loginButton}>
                                Already have an account? Log in instead
                            </Typography>
                        </Grid>
                    </Grid>
                    {/* </form> */}
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styling)(Registration)
