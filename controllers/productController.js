const Product = require('../models/productModel')

const { getPostData } = require('../utils')
// gets all products
// GET /api/products
async function getProducts(req, res) {
    try {
        const products = await Product.findAll()

        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(products))
    } catch (error) {
        console.log(error)
    }
}

// get single product
// GET /api/product/:id
async function getProduct(req, res, id) {
    try {
        const product = await Product.findById(id)

        if(!product) {
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: 'Product Not Found'}))
        } else {
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(product))
        }
    } catch (error) {
        console.log(error)
    }
}

// create a product
// POST /api/products
async function createProduct(req, res) {
    try {

        const body = await getPostData(req)

        const { title, description, price } = JSON.parse(body)

        const product = {
            title,
            description,
            price
        }
        const newProduct = await Product.create(product)

        res.writeHead(201, {'Content-Type': 'application/json'})
        return res.end(JSON.stringify(newProduct))

    } catch (error) {
        console.log(error)
    }
}

// update a product
// PUT /api/products/:id
async function updateProduct(req, res, id) {
    try {
        const product = await Product.findById(id)

        if(!product) {
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: 'Product Not Found'}))
        } else {
            // if body exists
            const body = await getPostData(req)
            // pull data out
            const { title, description, price } = JSON.parse(body)
    
            const productData = {
                title: title || product.title,
                description: description || product.description,
                price: price || product.price
            }
            const updProduct = await Product.update(id, productData)
    
            res.writeHead(200, {'Content-Type': 'application/json'})
            return res.end(JSON.stringify(updProduct))
        }
        
        
    } catch (error) {
        console.log(error)
    }
}

// delete product
// DELETE /api/product/:id
async function deleteProduct(req, res, id) {
    try {
        const product = await Product.findById(id)

        if(!product) {
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: 'Product Not Found'}))
        } else {
            await Product.remove(id)
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: `product ${id} removed`}))
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct

}