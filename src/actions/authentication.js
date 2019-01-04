import axios from 'axios'
import { AUTH_START, AUTH_UPDATE, AUTH_FAIL } from './index'
import { SITE_URL } from '../constants'

export const LoginUser = ({ username, password }) => dispatch => {
    dispatch({
        type: AUTH_START
    })

    axios
        .post(`${SITE_URL}/login/`, {
            username: username,
            password: password
        })
        .then(res => {
            console.log(res.data)
            localStorage.setItem('token', res.data.token)
            dispatch({
                type: AUTH_UPDATE,
                payload: res.data.token
            })

            //  Connect to websocket after successful authentication
            //  - This will catch errors before attempting to make the socket connection

            dispatch({
                type: 'ConnectWS',
                payload: res.data.token
            })
        })
        .catch(err => {
            dispatch({
                type: AUTH_FAIL,
                payload: 'Error Occured'
            })
        })
}

export const LogoutUser = () => {
    const token = localStorage.getItem('token')
    axios({
        method: 'post',
        url: '/logout/',
        headers: {
            'WWW-Authenticate': `Token ${token}`
        }
    })
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
    localStorage.removeItem('token')
}
