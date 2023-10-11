import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../comp/product'
import { useEffect } from "react"
import { ListProucts } from "../actions/Productactions"
import { useDispatch, useSelector } from "react-redux"
import Message from '../comp/Message'
import Spiner from '../comp/Loader'
import { useParams, useLocation } from "react-router-dom"
import Paginate from '../comp/pagenation'
import ProductCarousel from '../comp/carsole'
const Homescreen = () => {
  const { Loading, products, error, page, pages } = useSelector(state => state.productList)
  const dispatch = useDispatch()
  const { keyword, pageNumber } = useParams()
  // const keyword = word.keyword
  // const pageNumber = word.pageNumber
  // console.log(word);
  // console.log(`${keyword} ${pageNumber}`);
  useEffect(() => {


    dispatch(ListProucts(keyword, pageNumber))


  }, [dispatch, keyword, pageNumber])



  return (
    <>
      <div className='mt-5 mb-5'>
        {
          !keyword && <ProductCarousel />
        }
      </div>

      <h1>Latest Products</h1>
      {Loading ? <p>{<Spiner />}</p> : error ? <Message varient='danger' >{error}</Message> :

        <Row>
          {products.map((product, i) => (
            <Col key={i} sm={12} md={6} lg={4} xl={3}>
              {/* <h3>{product.name}</h3> */}
              <Product product={product} />
            </Col>
          ))}
        </Row>}

      <Paginate
        pages={pages} page={page}
        keyword={keyword ? keyword : ""}
      />


    </>
  )
}
export default Homescreen