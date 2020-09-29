const http = require('http')
let {app, HOSTNAME, PORT} = require('./apiConfig')

//Starts the server
const server = http.createServer(app).listen(PORT, () => console.log('Servidor ativo em (http://)', HOSTNAME, PORT))

module.exports = server