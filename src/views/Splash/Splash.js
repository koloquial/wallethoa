import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import SignUp from "../../components/SignUp";
import Login from '../../components/Login';

const Splash = () => {
    const [active, setActive] = useState('login');

    return (
        <Container 
        className='d-flex align-items-center justify-content-center splash' 
        style={{minHeight: '100vh'}}
        fluid>
            <Row>
                <Col lg={12}>
                    <span className='title'>Wallet</span> <span className='title-alt'>HOA</span>
                    <p>A simple solution to record income and expenses, generate reports, and manage home owners.</p>
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