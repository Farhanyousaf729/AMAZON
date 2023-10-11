

import asyncHandler from "express-async-handler"
import userModel from "../models/usermodel.js"
import generateToken from "../utils/generateToken.js"
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await userModel.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }
    else {
        res.status(401)
        throw new Error('Invalid credentials')
    }

})

const getUserProfile = asyncHandler(async (req, res) => {

    const user = await userModel.findOne(req.user._id)

    if (user) {
        res.status(200)
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,

        })
    }
    else {
        res.status(404)
        throw new Error('user not found')
    }


})
const RegisterUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    const existingUser = await userModel.findOne({ email })

    if (existingUser) {
        res.status(400)
        throw new Error('User Already Registered')
    }
    const user = await userModel.create({ name, email, password, })
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }

})

const UpdateUser = asyncHandler(async (req, res) => {
    // res.send("Succes")

    const user = await userModel.findById(req.user._id)
    console.log(user);
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if (req.body.password) {

            user.password = req.body.password
        }
        const updatedUser = await user.save()
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(user._id)
        })
    }
    else {
        res.status(404)
        throw new Error("User Not Found")
    }
})


const getUser = asyncHandler(async (req, res) => {

    const users = await userModel.find({})
    res.json(users)

})
const deleteUser = asyncHandler(async (req, res) => {
    // console.log(req.params.id);
    const user = req.params.id
    if (user) {
        await userModel.findByIdAndDelete(user)
        res.send({ message: "User deleted successfully" })
    } else {
        res.status(404)
        throw new Error("User Not Found")
    }
})


const getUserById = asyncHandler(async (req, res) => {
    const user = await userModel.findById(req.params.id).select('-password')
    if (user) {
        res.json(user)
    } else {
        res.status(404)
        throw new Error("User Not Found")
    }
})
//@dec       Update user
//@route     Put /api/users/:id
//@access    Private/admin
const updateUser = asyncHandler(async (req, res) => {
    const user = await userModel.findById(req.params.id)
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin
        const updatedUser = await user.save()
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error("User Not Found")
    }
})












export { authUser, getUserProfile, RegisterUser, UpdateUser, getUser, deleteUser , getUserById , updateUser }