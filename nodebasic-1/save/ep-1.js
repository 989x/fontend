// ep 1

// part 1

const name = "IOsonoTAN"
const nodeEnv = process.env.ENV

console.log(`My name is ${name}`)
console.log(nodeEnv)

// part 2

const http = require('http')

const hostname = 'localhost' // 127.0.0.1
const port = 3000

const server = http.createServer((req, res) => {
    console.log('inside create server')
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    res.end('My name is Tan')
})

server.listen(port, hostname, () => {
    console.log(`server is running on port ${port}`)
})