import express from 'express'
const router = express.Router()
import { SingleProduct, Products, deleteProduct, createProductReview, getTopProducts, createProduct, updateProduct } from "../controllers/productcontroller.js"
import { protect, admin } from "../middleware/authmiddleware.js"



router.route('/').get(Products)
    .post(protect, admin, createProduct)
router.route('/top').get(getTopProducts)
router.route('/:id').get(SingleProduct).delete(protect, admin, deleteProduct).put(protect, admin, updateProduct)

router.route('/:id/reviews').post(protect, createProductReview)
export default router