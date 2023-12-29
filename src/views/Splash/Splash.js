import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import SignUp from "../../components/SignUp";
import Login from '../../components/Login';

const Splash = () => {
    const [active, setActive] = useState('signup');

    return (
        <Container className='d-flex align-items-center justify-content-center' style={{minHeight: '100vh'}}>
            <Row>
                <Col lg={12}>
                    <h1>Wallet HOA</h1>
                </Col>
                <Col lg={12}>
                    {active === 'login' ? 
                    <Login setActive={setActive} /> 
                    : <SignUp setActive={setActive} />}
                </Col>
            </Row>
        </Container>
    )
}

export default Splash;