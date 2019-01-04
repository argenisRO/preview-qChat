import { SOCKET_URL } from '../constants'

let socket = null

export default function SocketMiddleware() {
    return store => next => action => {
        switch (action.type) {
            case 'ConnectWS':
                if (socket !== null) {
                    next(action)
                    break
                }

                const newSocket = new WebSocket(SOCKET_URL)

                newSocket.onopen = () => {
                    console.log('opened connection')
                }

                newSocket.onmessage = data => {
                    console.log('received', JSON.parse(data))
                }

                newSocket.onclose = () => {
                    console.log('closed connection')
                }

                newSocket.onerror = err => {
                    console.log('Error occured', err)
                }

                socket = newSocket

                break
            default:
                next(action)
                break
        }
    }
}
