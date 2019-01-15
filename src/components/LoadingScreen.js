import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Grid, withStyles } from '@material-ui/core'

const styling = themes => ({
    loadingLogo: {
        height: '100vh',
    },
    '@keyframes fadeAnimation': {
        from: {
            opacity: 0,
        },
        to: {
            opacity: 1,
            cy: 18,
        },
    },
})

class LoadingScreen extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    }

    render() {
        const { classes } = this.props
        return (
            <Grid container justify="center">
                <Grid container className={classes.loadingLogo} alignItems="center" justify="center">
                    <Grid item>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="290"
                            height="350"
                            viewBox="0 0 290 350">
                            <g id="Symbol_28_1" dataname="Symbol 28 – 1" transform="translate(-820 -400)">
                                {/* Inner 'C' */}
                                <path
                                    id="Path_28"
                                    dataname="Path 28"
                                    d="M-372.478,775.044a99.225,99.225,0,0,1-19.856-2,98.006,98.006,0,0,1-18.494-5.741,98.478,98.478,0,0,1-16.735-9.083,99.381,99.381,0,0,1-14.581-12.031,99.3,99.3,0,0,1-12.031-14.581,98.508,98.508,0,0,1-9.083-16.735A98.011,98.011,0,0,1-469,696.377a99.23,99.23,0,0,1-2-19.856,99.227,99.227,0,0,1,2-19.855,98.013,98.013,0,0,1,5.741-18.494,98.469,98.469,0,0,1,9.083-16.735,99.3,99.3,0,0,1,12.031-14.581,99.294,99.294,0,0,1,14.581-12.031,98.5,98.5,0,0,1,16.735-9.083A98.013,98.013,0,0,1-392.334,580a99.229,99.229,0,0,1,19.856-2,99.222,99.222,0,0,1,19.855,2,97.967,97.967,0,0,1,18.494,5.741,98.5,98.5,0,0,1,16.735,9.083,99.284,99.284,0,0,1,14.581,12.031,99.241,99.241,0,0,1,12.031,14.581,98.56,98.56,0,0,1,9.084,16.735,98.15,98.15,0,0,1,5.741,18.494c.614,3,1.094,6.085,1.426,9.159h-19.852a79.076,79.076,0,0,0-78.093-68.12A78.906,78.906,0,0,0-451.3,676.521a78.907,78.907,0,0,0,78.818,78.818,78.86,78.86,0,0,0,78.239-69.246h19.822a98.92,98.92,0,0,1-1.541,10.285,98.146,98.146,0,0,1-5.741,18.494,98.585,98.585,0,0,1-9.084,16.735,99.248,99.248,0,0,1-12.031,14.581,99.268,99.268,0,0,1-14.581,12.031,98.483,98.483,0,0,1-16.735,9.083,97.97,97.97,0,0,1-18.494,5.741A99.218,99.218,0,0,1-372.478,775.044Z"
                                    transform="translate(1332.787 -135.704)"
                                    fill="#fff"
                                />
                                {/* Outter Circle */}
                                <path
                                    id="Subtraction_4"
                                    dataname="Subtraction 4"
                                    d="M140.745,281.491a141.784,141.784,0,0,1-28.365-2.86,139.974,139.974,0,0,1-50.327-21.178A141.156,141.156,0,0,1,11.061,195.53a140.036,140.036,0,0,1-8.2-26.419,142.115,142.115,0,0,1,0-56.73A139.977,139.977,0,0,1,24.037,62.053,141.156,141.156,0,0,1,85.961,11.061a140.035,140.035,0,0,1,26.419-8.2,142.112,142.112,0,0,1,56.73,0,139.976,139.976,0,0,1,50.327,21.178A141.157,141.157,0,0,1,270.43,85.961a140.029,140.029,0,0,1,8.2,26.419,142.113,142.113,0,0,1,0,56.73,139.973,139.973,0,0,1-21.178,50.327A141.156,141.156,0,0,1,195.53,270.43a140.038,140.038,0,0,1-26.419,8.2A141.784,141.784,0,0,1,140.745,281.491Zm0-253.341a112.6,112.6,0,1,0,112.6,112.6A112.724,112.724,0,0,0,140.745,28.149Z"
                                    transform="translate(819 399.509)"
                                    fill="#fff"
                                />
                                {/* Tail */}
                                <path
                                    id="Path_29"
                                    dataname="Path 29"
                                    d="M795.235-170.356a90.856,90.856,0,0,0,.584,9.984c.125,1.114.266,2.209.478,3.673l.017.115c8.911,61.7,67.454,60.128,77.318,60.088,10.508-.043,28.019-5.864,34.318-10.208"
                                    transform="translate(192.788 765.83)"
                                    fill="none"
                                    stroke="#fff"
                                    strokeLinejoin="round"
                                    strokeWidth="20"
                                />
                                {/* Inner Side Circle */}
                                <path
                                    id="Path_30"
                                    dataname="Path 30"
                                    d="M98.522,0h1.689V197.043H98.522A98.522,98.522,0,0,1,98.522,0Z"
                                    transform="translate(861.787 442.296)"
                                    fill="#fff"
                                    // className={classes.rotateLoader}
                                />
                                {/* Bottom Circles */}
                                <circle
                                    id="Ellipse_11"
                                    dataname="Ellipse 11"
                                    cx="12"
                                    cy="12"
                                    r="12"
                                    transform="translate(896 720)"
                                    fill="#fff"
                                    style={{ animation: 'fadeAnimation 0.7s ease infinite alternate' }}
                                />
                                <circle
                                    id="Ellipse_12"
                                    dataname="Ellipse 12"
                                    cx="12"
                                    cy="12"
                                    r="12"
                                    transform="translate(950 720)"
                                    fill="#fff"
                                    style={{ animation: 'fadeAnimation 0.75s ease infinite alternate' }}
                                />
                                <circle
                                    id="Ellipse_13"
                                    dataname="Ellipse 13"
                                    cx="12"
                                    cy="12"
                                    r="12"
                                    transform="translate(1004 720)"
                                    fill="#fff"
                                    style={{ animation: 'fadeAnimation 0.8s ease infinite alternate' }}
                                />
                            </g>
                        </svg>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styling)(LoadingScreen)
