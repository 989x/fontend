const helpers = require('./helpers')

test('should return string value', () => {
    expect.assertions(2)

    const userIdLength = 10
    const result = helpers.generateUserId(userIdLength)

    // expect(result).toBe('STRING1')

    expect(result).toHaveLength(userIdLength)
    expect(typeof result).toBe('string')
 
})