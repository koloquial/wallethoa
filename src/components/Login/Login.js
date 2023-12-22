import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useState, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const Login = ({ setActive }) => {
    const emailRef = useRef();
    const passwordRef = useRef();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { signup } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            setLoading(true);
            setError('');
            await signup(emailRef.current.value, passwordRef.current.value);
        }catch(err){
            setError('Failed to create account.');
        }

        setLoading(false);
    }

    return (
        <Card>
            <Card.Body>
                <p>Login</p>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' ref={emailRef} required />
                    </Form.Group>
                    <Form.Group id='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' ref={passwordRef} required />
                    </Form.Group>
                    <Button disabled={loading} type='submit'>Login</Button>
                </Form>
                <p>Need an account? <a onClick={() => setActive('signup')}>Sign Up</a></p>
            </Card.Body>
        </Card>
    )
}

export default Login;