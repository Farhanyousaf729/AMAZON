import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../comp/Message'
import FormContainer from '../comp/FormContainer'
import Loader from '../comp/Loader'
import { register } from '../actions/Useraction'
function RegisterScreen() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confrimPassword, setConfrimPassword] = useState('')
    const [message, setMessage] = useState(null)
    const dispatch = useDispatch()
    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, userInfo } = userRegister
    const findLocation = useLocation()

    const navigate = useNavigate()

    const redirect = findLocation.search ? findLocation.search.split('=')[1] : "/"

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [userInfo, redirect, navigate])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confrimPassword) {
            setMessage("Password do not match")
        } else {
            dispatch(register(name, email, password))
        }
    }
    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {message && <Message variant="danger">{message}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                {/* name group */}
                <Form.Group controlId="name">

                    <Form.Label>Name</Form.Label>
                    <Form.Control type="name" placeholder="Enter your Name"
                        value={name} onChange={(e) => setName(e.target.value)}  ></Form.Control>
                </Form.Group>
                {/* mail group */}
                <Form.Group controlId="email">

                    <Form.Label>Email Adress</Form.Label>
                    <Form.Control type="email" placeholder="Enter Email Address"
                        value={email} onChange={(e) => setEmail(e.target.value)}  ></Form.Control>
                </Form.Group>{/* password group */}
                <Form.Group controlId="password">

                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Correct Password"
                        value={password} onChange={(e) => setPassword(e.target.value)}  ></Form.Control>
                </Form.Group>
                {/* confrimPassword */} 
                <Form.Group controlId="confrimPassword">

                    <Form.Label>confrim Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter confrim Password"
                        value={confrimPassword} onChange={(e) => setConfrimPassword(e.target.value)}  ></Form.Control>
                </Form.Group><Button type="submit" variant="primary" className="mt-3" >Register</Button>
            </Form>
            <Row className="py-3">
                <Col>
                    Have an a Account? <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}  >Login</Link>
                </Col>
            </Row>
        </FormContainer>

    )






}
export default RegisterScreen
