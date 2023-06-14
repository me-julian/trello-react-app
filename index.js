'use strict'

import express from 'express'

const app = express()

import config from './config'

app.use(express.static('dist'))

if (process.env.NODE_ENV === 'production') {
    if (config.apiAddress === '' || !config.apiAddress) {
        console.error('API server address not set!')
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
