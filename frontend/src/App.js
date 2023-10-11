import Footer from "./comp/footer";
import Header from "./comp/header";
import { Container } from "react-bootstrap"
import Homescreen from "./screen/homescreen";
import Productscreen from "./screen/ProductScreen";
import CartScreen from "./screen/cartScreen";
import ProfileScreen from "./screen/userProfileScreen";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom"
import LoginScreen from "./screen/loginScreen";
import RegisterScreen from "./screen/registerScreen";
import ShippingScreen from "./screen/ShippeningScreen";
import PaymentScreen from "./screen/payment";
import PlaceOrderScreen from "./screen/placeOrderScreen"
import OrderScreen from "./screen/OrderScreen";
import UserListScreen from "./screen/users"
import UserEditScreen from "./screen/userEditScreen";
import ProductListScreen from "./screen/producListScreen";
import OrderListScreen from "./screen/orderListScreen";

import ProductEditScreen from "./screen/productEditScreen";
function App() {
  return (
    <>

      <Router>
        <Header />
        <Container>
          <main style={{ height: "auto" }}>
            <Routes>
              <Route exact path="/" element={<Homescreen />} />
              <Route exact path="/search/:keyword" element={<Homescreen />} />
              <Route exact path="/product/:id" element={<Productscreen />} />
              <Route exact path="/cart/:id?" element={<CartScreen />} />
              <Route exact path="/login" element={<LoginScreen />} />
              <Route exact path="/register" element={<RegisterScreen />} />
              <Route exact path="/profile" element={<ProfileScreen />} />
              <Route exact path="/shipping" element={<ShippingScreen />} />
              <Route exact path="/payment" element={<PaymentScreen />} />
              <Route exact path="/placeorder" element={<PlaceOrderScreen />} />
              <Route exact path="/order/:id" element={<OrderScreen />} />
              <Route exact path="/admin/userlist" element={<UserListScreen />} />
              <Route exact path="/admin/user/:id/edit" element={<UserEditScreen />} />
              <Route exact path="/admin/productlist" element={<ProductListScreen />} />
              <Route exact path="/admin/orderlist" element={<OrderListScreen />} />
              <Route exact path="/page/:pageNumber" element={<Homescreen />} />
              <Route exact path="/page/search/:keyword/:pageNumber" element={<Homescreen />} />
              <Route exact path="/admin/productlist/:pageNumber" element={<ProductListScreen />} />
              <Route exact path="/admin/product/:id/edit" element={<ProductEditScreen/>}/>
              
            </Routes>
          </main>
        </Container>
        <Footer />
      </Router>
    </>
  );
}

export default App;
