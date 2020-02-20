'use strict'

const swaggerTools = require('swagger-tools')
const jsyaml = require('js-yaml')
const fs = require('fs')
const connect = require('connect')
const app = connect()
const express = require('express')
const params = require('./config/params')

app.use(express.static(__dirname + '/public'))
process.on('unhandledRejection', up => { console.dir(up); throw up})

const apiOptions = {
    swaggerUI: '/swagger.json',
    controllers: './src/controllers/',
    useStabs: true
}

const swaggerDefinitionPath = __dirname + '/api/swagger.yaml'

const spec = fs.readFileSync(swaggerDefinitionPath, 'utf-8')
const apiSwaggerDocs = jsyaml.safeLoad(spec)

const HOST = 'localhost'
const PORT = 8090
apiSwaggerDocs.host = HOST + ':' + PORT.toString()
params.baseURL = 'http://' + apiSwaggerDocs.host + '/v1/'

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(apiSwaggerDocs, middleware => {
    app.use(middleware.swaggerMetadata())
    app.use(middleware.swaggerValidator())

    // Route validated requests to appropriate controller
    app.use((req, res, next) => {
        let router = middleware.swaggerRouter(apiOptions)
        router(req, res, next)
    })

    // Serve the Swagger documents and Swagger UI
    app.use(middleware.swaggerUi());
})

module.exports = {
    app,
    HOSTNAME: apiSwaggerDocs.host,
    PORT
}

