import React from 'react'
import {useNavigate ,Route} from "react-router-dom"
import { Nav, Container, Navbar, NavDropdown } from "react-bootstrap"
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from "react-redux"
import { LogOut } from "../actions/Useraction"
import SearchBox from './searchbox';
// import { Link } from "react-router-dom"
const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { userInfo } = useSelector(state => state.userLogin)
    // console.log(userInfo);
    const logoutHandler = () => {
        dispatch(LogOut())
    }
    return (
        <div>
            <LinkContainer to="/">
                <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                    <Container>
                        <Nav.Link to="/">
                            <Navbar.Brand>Vvork-Tech-Store</Navbar.Brand>
                        </Nav.Link>

                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav  ">
                            <SearchBox  />
                           {/* <Route render={<SearchBox/>}/>  */}
                            <Nav className="ms-auto">
                                <LinkContainer to="/cart">
                                    <Nav.Link >
                                        <Nav.Link><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>
                                    </Nav.Link>
                                </LinkContainer>

                                {userInfo ? (
                                    <NavDropdown title={userInfo.name} id="username" className='pt-2 mt-1 '>
                                        <LinkContainer to="/profile">
                                            <NavDropdown.Item>Profile</NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                    </NavDropdown>
                                ) : <LinkContainer to="/login" className='pt-4 '>
                                    <Nav.Link><i className="fas fa-user"></i>Sign In</Nav.Link>
                                </LinkContainer>}


                                {userInfo && userInfo.isAdmin && (
                                    <NavDropdown title="admin" id="adminmenu" className='pt-2 mt-1 '>
                                        <LinkContainer to="/admin/userlist">
                                            <NavDropdown.Item>Users</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to="/admin/productlist">
                                            <NavDropdown.Item>Products</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to="/admin/orderlist">
                                            <NavDropdown.Item>Orders</NavDropdown.Item>
                                        </LinkContainer>
                                    </NavDropdown>)}





                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </LinkContainer>

        </div>
    )
}

export default Header
