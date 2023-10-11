import {createStore , combineReducers , applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools  } from "redux-devtools-extension" 
import {productListReducer , productDetailsReducer , productDeleteReducer ,  productReviewCreateReducer , productTopRatedReducer ,  productCreateReducer , productUpdateReducer} from "../reducers/Productreducer"
import { cartReducer} from "../reducers/cartReducer"
import {userLoginReducer , userRegisterReducer ,userDetailsReducer ,userUpdateProfileReducer ,userListReducer , userDeleteReducer , userUpdateReducer} from "../reducers/userReducer"
import {orderCreateReducer ,  orderDetailsReducer , orderPayReducer , orderListMyReducer ,orderListReducer ,  orderDeliverReducer} from "../reducers/orderReducer"
const cartItemsFromStorage= localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')):[]
const userInfoFromStorage= localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')):null
const shippingAddressFromStorage= localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')):{}
const reducer = combineReducers({
    productList : productListReducer,
    productDetails : productDetailsReducer,
    cart : cartReducer,
    userLogin : userLoginReducer,
    userRegister : userRegisterReducer,
    userDetails :userDetailsReducer,
    userUpdateProfile : userUpdateProfileReducer,
    orderCreate : orderCreateReducer,
    orderDetail :orderDetailsReducer ,
    orderPay : orderPayReducer,
    ordreMyList : orderListMyReducer,
    userList : userListReducer,
    userDelete :  userDeleteReducer,
    userUpdate : userUpdateReducer,
    productDelete : productDeleteReducer,
    orderList : orderListReducer,
    orderDeliver : orderDeliverReducer,
    productReviewCreate: productReviewCreateReducer,
    productTopRated :  productTopRatedReducer,
    productCreate :productCreateReducer,
    productUpdate : productUpdateReducer
})
const intialState = {
    cart : {
        cartItems : cartItemsFromStorage,
        shippingAddress:shippingAddressFromStorage
    },
    userLogin :{
        userInfo : userInfoFromStorage
    },


}
const middleware = [thunk]
const store = createStore( reducer , intialState , composeWithDevTools(applyMiddleware(...middleware)))
export default store

