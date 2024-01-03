//state
import { useState, useRef } from 'react';
import { useAccount } from '../../contexts/AccountContext';

//style
import { Card, Form, Button } from 'react-bootstrap';

//components
import Loading from '../Loading';

//requests
import { addHOA } from '../../requests/addHOA';

const CreateHOA = () => {
    const [loading, setLoading] = useState(false);
    const hoaName = useRef();
    const { account, setAccount, active, setActive } = useAccount();

    return (
        <>
            {loading ? <Loading /> : 
                <Card>
                    <Card.Header>
                        <p>Create HOA</p>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={(e) => {
                            e.preventDefault();
                            addHOA(account.uid, hoaName.current.value)
                            .then(json => setAccount(json))
                        }}>
                            <Form.Group id='hoa-name'>
                                <Form.Label>HOA Name</Form.Label>
                                <Form.Control type='text' ref={hoaName} required />
                            </Form.Group>
                            <Button disabled={loading} type='submit'>Submit</Button>
                        </Form>
                    </Card.Body>
                </Card>
            }
        </>
    )
}

export default CreateHOA;