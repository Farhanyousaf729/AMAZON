import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../comp/Message'
import Loader from '../comp/Loader'
import { useNavigate, useParams } from "react-router-dom"
import { ListProucts, deleteProduct, createProduct } from '../actions/Productactions'
import { PRODUCT_CREATE_RESET } from "../constants/Productconstant"
import Paginate from '../comp/pagenation'


function ProductListScreen() {
    const word = useParams()
    // const keyword = word.keyword
    const pageNumber = word.pageNumber
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const productList = useSelector((state) => state.productList)
    const { loading, error, products, page, pages } = productList
    const { product: createdProduct, error: errorCreate, loading: loadingCreate, success: successCreate } = useSelector(state => state.productCreate)
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = useSelector((state) => state.productDelete)
    // console.log(pageNumber);
    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET })
        if (userInfo && !userInfo.isAdmin) {
            navigate('/login')
        }
        if (successCreate) {
            navigate(`/admin/product/${createdProduct._id}/edit`)
        }
        else {
            dispatch(ListProucts('', pageNumber))

        }




    }, [dispatch, navigate, userInfo, successDelete, pageNumber, successCreate, createdProduct])
    const deleteHandler = (id) => {
        if (window.confirm("Are Your Sure")) {
            // Delete product Waiting Next Couple of Slides
            dispatch(deleteProduct(id))
        }
    }
    const createProductHandler = () => {
        //create Product next Couple of Slides }return (
      dispatch(createProduct())
    }
    return (
        <>
            <Row className="algin-items-center">
                <Col>
                    <h1>Products</h1>
                </Col>
                {loadingDelete && <Loader />}
                {loadingCreate && <Loader/>}
                {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
                {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
                <Col className="text-right">
                    <Button className="my-3" onClick={createProductHandler}>
                        <i className="fas fa-plus "></i> Create Product
                    </Button>
                </Col>
            </Row>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>
                                    ${product.price}
                                </td>
                                <td>
                                    {product.category}
                                </td>
                                <td>
                                    {product.brand}
                                </td>
                                <td>
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                        <Button variant='light' className='btn-sm'>
                                            <i className='fas fa-edit'></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button
                                        variant='danger'
                                        className='btn-sm'
                                        onClick={() => deleteHandler(product._id)}
                                    >
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>





            )}
            <Paginate
                pages={pages} page={page}
                isAdmin="true"
            />

        </>
    )
}
export default ProductListScreen





















