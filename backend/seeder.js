import mongoose from "mongoose";
import dotenv from "dotenv";
import userModel from "./models/usermodel.js";
import productModel from "./models/productmodel.js";
import orderModle from "./models/ordermodel.js";
import colors from "colors";
import users from "./data/user.js";
import dbconnection from "./config/db.js";
import Products from "./data/products.js";
dotenv.config()
const dburl = process.env.DB_URL
dbconnection(dburl)
const importData = async () => {

    try {
        await orderModle.deleteMany()
        await productModel.deleteMany()
        await userModel.deleteMany()
        const createdUsers = await userModel.insertMany(users)
        const adminUser = createdUsers[0]._id
        const sampleProducts = Products.map(product => {
            return { ...product, user: adminUser }
        })
        await productModel.insertMany(sampleProducts)
        console.log(`Data imported`.green.inverse);
        process.exit()
    }
    catch (err) {
        console.log(` ${err}`.red.inverse);
        process.exit(1)
    }

};

const destryData = async () => {
    try {
        await orderModle.deleteMany()
        await productModel.deleteMany()
        await userModel.deleteMany()
        console.log(`Data Destry`.red.inverse)
        process.exit()
    }
    catch (e) {
        console.log(`e`.red.inverse);
        process.exit(1)
    }



}

if (process.argv[2] === '-d') {
    destryData()
}
else {
    importData()
}