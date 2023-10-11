import React from 'react'
import { Row, Col, Container } from "react-bootstrap"
const Footer = () => {
    return (
        <div>
            <Container>
                <Row>
                    <Col className='text-center py-3 '>
                        CopyRights &copy;{`FarhanYousaf @ ${new Date().getFullYear()} `}
                       
                    </Col>
                </Row>
            </Container>

        </div>
    )
}

export default Footer
