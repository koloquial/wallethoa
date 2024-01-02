import { useState, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';

import Loading from '../Loading';

const CreateHOA = ({ uid }) => {
    const [loading, setLoading] = useState(false);
    const hoaName = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        //update hoa name
        fetch(`${process.env.MONGODB_URI}/users/update`, {
            method: 'UPDATE',
            body: JSON.stringify({
              uid: uid,
              hoaName: hoaName.current.value
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          })
         .then(res => res.json())
         .then(json => {
             console.log(json)
             setLoading(false);
        });
    }

    return (
        <>
            {loading ? <Loading /> : <>
                <p>Create new HOA</p>
                <Form onSubmit={handleSubmit}>
                    <Form.Group id='hoa-name'>
                        <Form.Label>HOA Name</Form.Label>
                        <Form.Control type='text' ref={hoaName} required />
                    </Form.Group>
                </Form>
                <Button disabled={loading} type='submit'>Submit</Button>
            </>}
        </>
    )
}

export default CreateHOA;