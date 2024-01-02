import { useState, useRef } from 'react';
import { Card, Form, Button } from 'react-bootstrap';

const CreateSheet = ({ uid, setAccount, setActiveSheet }) => {
    const [loading, setLoading] = useState(false);
    const sheetName = useRef();
    const startingBalance = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();

        //update hoa name
        fetch(`http://localhost:5000/users/new/sheet`, {
            method: 'POST',
            body: JSON.stringify({
              uid: uid,
              sheetName: sheetName.current.value,
              startingBalance: startingBalance.current.value
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          })
         .then(res => res.json())
         .then(json => {
             setAccount(json)
             setActiveSheet(json.sheets[json.sheets.length - 1])
            });
    }

    return (
        <Card>
            <Card.Header>
                <p>Create New Sheet</p>
            </Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group id='new-sheet'>
                        <Form.Label>Sheet Name <i>(e.g. 2024)</i></Form.Label>
                        <Form.Control type='text' ref={sheetName} required />
                    </Form.Group>
                    <Form.Group id='new-sheet'>
                        <Form.Label>Starting Balance <i>($0.00)</i></Form.Label>
                        <Form.Control type='number' step={'.01'} ref={startingBalance} required />
                    </Form.Group>
                    <Button disabled={loading} type='submit'>Submit</Button>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default CreateSheet;