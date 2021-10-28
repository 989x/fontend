const Fastify = require('fastify')

const hostname = 'localhost'
const port = 3001

const fastifyApp = Fastify({
    logger : true
})

// console.log('fastify ->', fastifyApp)

fastifyApp.get('/', async (request, reply) => {
    reply.send('OK')
}) 

fastifyApp.post('/user', async (request, reply) => {
    console.log('request ->', request.body)
    const requestBody = { ...request.body }
    reply.send(requestBody )
})

fastifyApp.listen(port, hostname, () => {
    console.log(`server is running on ${port}`)
})

