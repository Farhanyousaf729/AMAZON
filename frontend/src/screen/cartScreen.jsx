import React, { useEffect, } from 'react'
import { useParams, useLocation, useNavigate, Link } from "react-router-dom"
import { addToCart, removeFromCart } from "../actions/Cartaction"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col, ListGroup, Image, Button, Card } from 'react-bootstrap'
import Message from '../comp/Message'


function CartScreen() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()
    const location = useLocation()
    const qty = location.search ? Number(location.search.split('=')[1]) : null
    const redirect = location.search ? location.search.split('=')[1] : "/shipping"
   



    const { cartItems } = useSelector(state => state.cart)




    useEffect(() => {

        console.log('rrrrrrrrrrrrrrr');
      
        if(qty !==null){

            dispatch(addToCart(id, qty))
        }


    }, [dispatch, id , qty ]);



    const checkoutHandler = () => {
    navigate(`${redirect ? `/login?redirect=${redirect}` : "/shipping"}`)

    }
    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    console.log(cartItems.length);
    return (
        <div>
            <Row>
                <Col md={8}>
                    <h1>Shopping Cart</h1>
                    {cartItems.length === 0 ? (

                        <Message variant='danger'>
                            Your cart is empty <Link to='/'>Go Back</Link>
                        </Message>

                    ) : (
                        <ListGroup variant='flush'>
                            {cartItems.map((item) => (
                                <ListGroup.Item key={item.product}>
                                    <Row>
                                        <Col md={2}>
                                            <Image src={item.image} alt={item.name} fluid rounded />
                                        </Col>
                                        <Col md={3}>
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </Col>
                                        <Col md={2}>${item.price}</Col>
                                        <Col md={2}>
                                            {/* <Form.Control
                                                as='select'
                                                value={item.qty}
                                                onChange={(e) =>
                                                    dispatch(
                                                        addToCart(item.product, Number(e.target.value))
                                                    )
                                                }
                                            >
                                                {[...Array(item.countInStock).keys()].map((x) => (
                                                   <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))}


                                            </Form.Control> */}

                                            <select value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                                {
                                                    [...Array(item.countInStock).keys()].map((ele, i) => {
                                                        return <option value={ele + 1} key={i}>{ele + 1}</option>
                                                    })
                                                }
                                            </select>
                                        </Col>
                                        <Col md={2}>
                                            <Button
                                                type='button'
                                                variant='light'
                                                onClick={() => removeFromCartHandler(item.product)}
                                            >
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>
                                    Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                                    items
                                </h2>
                                $
                                {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btn-block'
                                    disabled={cartItems.length === 0}
                                    onClick={checkoutHandler}
                                >
                                    Proceed To Checkout
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>


        </div>


    )
}
export default CartScreen