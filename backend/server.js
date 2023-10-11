import dotenv from "dotenv"
import dbconnection from "./config/db.js"
import mongoose from "mongoose"
import express from "express"
import colors from "colors"
import productRoute from "./routs/productRoute.js"
import orderRoute from "./routs/orderRoute.js"
import userRoute from "./routs/userRoute.js"
import { notFound, errorHandler } from "./middleware/errhandler.js"
import ProductModel from "./models/productmodel.js"
import asyncHandler from "express-async-handler"
import router from "./routs/uploadRoute.js"
import path from 'path'

import morgan from "morgan"
const app = express()
dotenv.config()
const port = process.env.PORT || 4000
dbconnection(process.env.DB_URL)
app.use(express.json())
app.use('/api/upload', router)
const __dirname = path.resolve()

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
if (process.env.NODE_ENV) {
  app.use(morgan('dev'))
}
console.log(process.env.NODE_ENV);

app.use('/api/products', productRoute)
app.use('/api/users', userRoute)
app.use('/api/orders', orderRoute)
app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))





if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}
else {
  app.get('/', (req, res) => {
    res.send("API is running...")
  })
}


app.use(notFound)
app.use(errorHandler)
mongoose.connection.once('open', () => {
  console.log('db is up'.cyan.underline);
  app.listen(port, () => {
    console.log(`server is up ${port}`.yellow.bold);
  })
})


