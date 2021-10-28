const Fastify = require('fastify')

const buildApp = (options = {}) => {
    const app = Fastify(options)

    app.get('/', async (request, reply) => {
        reply.send('OK')
    })

    return app
}

module.exports = buildApp