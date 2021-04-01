const fastify = require('fastify').default

const app = fastify()

const fs = require('fs')

app.listen(3000)

app.get('/', (req, res) => {

    res.type('text/plain')

    res.send('Hello, AssemblyScript!')

})