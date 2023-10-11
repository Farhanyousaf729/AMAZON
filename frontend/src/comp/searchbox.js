import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from "react-router-dom"
const SearchBox = () => {
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState('')
  const submitHandler = (e) => {
    // console.log(`working`);
    e.preventDefault()
    if (keyword.trim()) {
      navigate(`/search/${keyword}`)
    } else {
      navigate('/')
    }
  }
  console.log(keyword);
  return (
    <div inline className='d-flex'>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Products...'
        className='mr-sm-2 ml-sm-5'
      ></Form.Control>
      <Button onClick={submitHandler} type='' variant='outline-success' className='p-2'>
        Search
      </Button>
    </div>
  )
}
export default SearchBox