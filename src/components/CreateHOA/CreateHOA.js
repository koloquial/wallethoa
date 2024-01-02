import { useState, useRef } from 'react';
import { Card, Form, Button } from 'react-bootstrap';

import Loading from '../Loading';

const CreateHOA = ({ uid, setAccount }) => {
    const [loading, setLoading] = useState(false);
    const hoaName = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
       
        //update hoa name
        fetch(`http://localhost:5000/users/update/hoa-name`, {
            method: 'POST',
            body: JSON.stringify({
              uid: uid,
              hoaName: hoaName.current.value
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          })
         .then(res => res.json())
         .then(json => setAccount(json));
    }

    return (
        <>
            {loading ? <Loading /> : 
                <Card>
                    <Card.Header>
                        <p>Create New HOA</p>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
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