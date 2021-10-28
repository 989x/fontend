const Fastify = require('fastify')
const FastifySwagger = require('fastify-swagger')  
const helpers = require('./helpers')

const hostname = 'localhost'
const port = 3001

const fastifyApp = Fastify({
    logger : true
})

fastifyApp.register(FastifySwagger, {
    routePrefix: '/documents',
    swagger: {
        info: {
            title: 'Simple LLDD',
            description: 'Example 101',
            version: '1.0.0'
        }
    },
    exposeRoute: true
}) 

const usersRoute = {
    method: 'POST',
    url: '/users',
    schema: {
        body: {
            username: {
                type: 'string'
            },
            password: {
                type: 'string'
            }
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    userId: {
                        type: 'string'
                    },
                    username: {
                        type: 'string'
                    }
                }
            }
        }
    },
    handler: async (request, reply) => {
        console.log('request ->', request.body)
        const requestBody = { ...request.body, mergedObject: true }
        // reply.send(requestBody)
        reply.send({
            ...requestBody,
            // userId: '0987654'
            
            // reandom when curl
            userId: helpers.generateUserId(10)
        })
    }
}

fastifyApp.route(usersRoute)

fastifyApp.get('/', () => {
    return ('OK')
})

fastifyApp.patch('/users', async (request, reply) => {
    reply.send('User has been updated')
})

fastifyApp.listen(port, hostname, () => {
    console.log(`server is running on ${port}`)
})

