const buildApp = require('./index')

test('should return OK', async () => {
    expect.assertions(2)

    const appOptions = {
        logger: true
    }
    const app = buildApp(appOptions)

    const results = await app.inject({
        method: 'GET',
        url: '/'
    })

    // console.log('result ->', results)
    expect(results.statusCode).toBe(200)
    expect(results.body).toBe('OK')
})