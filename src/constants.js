export const production = process.env.NODE_ENV === 'production'

export const SITE_URL = production ? window.location.origin : 'http://localhost:8000'

export const SOCKET_URL = production ? `wss://${window.location.host}/ws/` : 'ws://localhost:8000/ws/'
