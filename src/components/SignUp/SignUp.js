import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useState, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const SignUp = ({ setActive }) => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError('Passwords do not match.');
        }

        if(passwordRef.current.value < 6){
            return setError('Password needs to be at least 6 characters.');
        }

        if(emailRef.current.value.length < 5){
            return setError('Invalid email.');
        }

        try{
            setLoading(true);
            setError('');
            await signup(emailRef.current.value, passwordRef.current.value)
            navigate('/');
        }catch(err){
            setError('Failed to create account.');
        }

        setLoading(false);
    }

    return (
        <Card>
            <Card.Header>
                <p>Sign Up</p>
            </Card.Header>
            <Card.Body>
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
                    <Form.Group id='password-confirm'>
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control type='password' ref={passwordConfirmRef} required />
                    </Form.Group>
                    <Button disabled={loading} type='submit'>Sign Up</Button>
                </Form>
                <p>Have an account? <a onClick={() => setActive('login')}>Login</a></p>
            </Card.Body>
        </Card>
    )
}

export default SignUp;