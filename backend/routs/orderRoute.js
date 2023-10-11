import express from "express"
import { addCartItem, getOrderById, updateOrderToPaid, getMyorders, getOrders, updateOrderToDelivered } from "../controllers/ordercontroller.js"
import { protect, admin } from "../middleware/authmiddleware.js"
const OrderRoute = express.Router()


OrderRoute.route('/').post((protect), addCartItem).get(protect, admin, getOrders)

OrderRoute.route('/:id/pay').put((protect), updateOrderToPaid)
OrderRoute.route('/:id/deliver').put((protect), admin, updateOrderToDelivered)
OrderRoute.route('/order/:id').get((protect), getOrderById)
OrderRoute.route('/myorders').get((protect), getMyorders)
export default OrderRoute