import react from 'react';
import {Spinner} from "react-bootstrap"

import React from 'react'

const Spiner = () => {
  return (
    <>
     <Spinner animation='border' role='status' style={{width : '100px' , height : '100px' , margin: 'auto' , display: 'block'}}>
        <span className='sr-only' >Loading...</span>
     </Spinner>
    </>
  )
}

export default Spiner
