import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    withStyles,
    InputLabel,
    Typography,
    InputBase,
    InputAdornment,
    IconButton,
    FormControl,
} from '@material-ui/core'
import { VisibilityOff, Visibility } from '@material-ui/icons'

const styling = theme => ({
    root: {
        margin: '2.5px 0px',
    },
    textInputRoot: {
        'label + &': {
            marginTop: theme.spacing.unit * 2,
        },
    },
    textInputControl: {
        height: '25px',
        width: '250px',
        padding: '10px 12px',
        color: theme.palette.secondary.main,
        borderRadius: 20,
        backgroundColor: '#4A545D',
        transition: theme.transitions.create(['box-shadow']),

        '&:focus': {
            boxShadow: '0 0 0 2px rgba(112,112,112,.25)',
        },
    },
    inputTitle: {
        left: '15px',
    },
})

class RegisterInputs extends Component {
    static propTypes = {
        handleChange: PropTypes.func.isRequired,
        classes: PropTypes.object.isRequired,
        name: PropTypes.string.isRequired,
        password: PropTypes.bool,
        title: PropTypes.string,
    }

    state = {
        showPassword: false,
    }

    handleShowPassword = () => {
        this.setState({ showPassword: !this.state.showPassword })
    }

    render() {
        const { showPassword } = this.state
        const { classes, title, name, handleChange, password } = this.props
        return (
            <FormControl className={classes.root}>
                {title && (
                    <InputLabel shrink className={classes.inputTitle}>
                        <Typography>{title}</Typography>
                    </InputLabel>
                )}

                <InputBase
                    autoComplete={password ? 'current-password' : 'username'}
                    name={name}
                    onChange={handleChange}
                    classes={{
                        root: classes.textInputRoot,
                        input: classes.textInputControl,
                    }}
                    type={password ? (showPassword ? 'text' : 'password') : 'text'}
                    endAdornment={
                        password && (
                            <InputAdornment>
                                <IconButton
                                    aria-label={`${showPassword ? 'Hide' : 'Show'} Password`}
                                    onClick={this.handleShowPassword}>
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }
                />
            </FormControl>
        )
    }
}

export default withStyles(styling)(RegisterInputs)
