'use strict'

import express from 'express'

const app = express()

import config from './config'

app.use(express.static('dist'))

if (process.env.NODE_ENV === 'production') {
    if (config.apiIP === '' || !config.apiIP) {
        console.error('API server IP not set!')
    } else {
        startServer()
    }
} else {
    startServer()
}

function startServer() {
    app.listen(config.port, () => {
        console.log('Express APP listening on port:', config.port)
    })
}
