//state
import { useState, useRef } from 'react';
import { useAccount } from '../../contexts/AccountContext';
import { useAuth } from '../../contexts/AuthContext';

//style
import { Card, Form, Button } from 'react-bootstrap';

//requests
import { addSheet } from '../../requests/addSheet';

const CreateSheet = () => {
    const [loading, setLoading] = useState(false);
    const nameRef = useRef();
    const balanceRef = useRef();
    const { account, setAccount, active, setActive } = useAccount();
    const { currentUser } = useAuth();

    return (
        <Card>
            <Card.Header>
                <p>Create New Balance Sheet</p>
            </Card.Header>
            <Card.Body>
                <Form onSubmit={(e) => {
                    e.preventDefault()
                    addSheet(currentUser.uid, nameRef.current.value, balanceRef.current.value)
                    .then(json => {
                        setAccount(json);
                        setActive(json.sheets[json.sheets.length - 1])
                    })
                }}>
                    <Form.Group id='new-sheet'>
                        <Form.Label>Sheet Name <i>(e.g. 2024)</i></Form.Label>
                        <Form.Control type='text' ref={nameRef} required />
                    </Form.Group>
                    <Form.Group id='new-sheet'>
                        <Form.Label>Starting Balance <i>($0.00)</i></Form.Label>
                        <Form.Control type='number' step={'.01'} ref={balanceRef} required />
                    </Form.Group>
                    <Button disabled={loading} type='submit'>Submit</Button>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default CreateSheet;