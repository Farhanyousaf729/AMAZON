
import ProductModel from "../models/productmodel.js"
import asyncHandler from "express-async-handler"
import mongoose from 'mongoose'

export const Products = asyncHandler(async (req, res) => {
    console.log(req.query.keyword);
    const pageSize = 2
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}

    const count = await ProductModel.countDocuments({ ...keyword })



    const products = await ProductModel.find({ ...keyword }).limit(pageSize).skip(pageSize * (page - 1))

    res.status(200).json({ products, page, pages: Math.ceil(count / pageSize) })
    // console.log(products);

})


export const SingleProduct = asyncHandler(async (req, res) => {


    // console.log(req.params);
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.json({ message: 'Invalid ID format' });
        return;
    }
    try {
        const product = await ProductModel.findById(id);
        if (!product) {
            res.json({ message: 'Product not found' });
        } else {
            res.status(200).json(product);
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }

})
//@dec       Delete product
//@route     DELETE /api/products/:id
//@access    Private /admin
export const deleteProduct = asyncHandler(async (req, res) => {
    const product = req.params.id
    if (product) {
        await ProductModel.findByIdAndDelete(product)
        res.send({ message: "Product deleted successfully" })
    } else {
        res.status(404)
        throw new Error("Product Not Found")
    }
})



export const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body
    const product = await ProductModel.findById(req.params.id)
    if (product) {
        const alreadyReviewed = product.reviews.find((r) => r.user.toString() === req.user._id.toString())
        if (alreadyReviewed) {
            res.status(400)
            throw new Error('Product already reviewed')
        }
        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
        }
        product.reviews.push(review)
        product.numReviews = product.reviews.length
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length
        await product.save()
        res.status(201).json({ message: 'Review added' })
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

export const getTopProducts = asyncHandler(async (req, res) => {
    const products = await ProductModel.find({}).sort({ rating: -1 }).limit(3)
    
    res.json(products)
})



export const createProduct = asyncHandler(async (req, res) => {
    const product = new ProductModel({
        name: "Sample Name",
        price: 0,
        user: req.user._id,
        image: "/images/sample.jpg",
        brand: "Sample brand ",
        category: "Sample Category",
        countInStock: 0,
        numReviews: 0,
        description: "Sample description"
    })
    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})
//   //@dec       Update a product
//   //@route     Put /api/products/:id
//   //@access    Private /admin
export const updateProduct = asyncHandler(async (req, res) => {

    const { name, price, description, image, brand, category, countInStock } = req.body
    const product = await ProductModel.findById(req.params.id)
    if (product) {
        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock
        const updatedProduct = await product.save()
        res.json(updatedProduct)
    } else {
        res.status(404)
        throw new Error("Product Not Found")
    }
})












