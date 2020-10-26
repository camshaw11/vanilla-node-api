// express uses this under the hood
const http = require('http')
const products = require('./data/products.json')

// kickstarts everything
const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')
    res.write('<h1>hello world</h1>')
    res.end()
})

const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log(`server running on port ${PORT}`))