import React from 'react'
import { Typography, Grid } from '@material-ui/core'

function Slogan() {
    return (
        <Grid container alignItems="center" direction="column">
            <Typography style={{ fontSize: 30, fontStyle: 'italic' }}>Jump right to the chat.</Typography>
            <Typography>Create a quick account to start chatting</Typography>
        </Grid>
    )
}

export default Slogan
