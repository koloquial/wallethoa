//state
import { useRef, useState } from 'react'

//style
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';

//icons
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import { IoIosCheckmarkCircle } from "react-icons/io"

const AddExpensePayee = ({ account, setAccount }) => {
    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState('');
    const [showEditPayee, setShowEditPayee] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState('');
    const payeeNameRef = useRef('');
    const updatedNameRef = useRef('');

    const handleSubmit = (e) => {
        e.preventDefault();
       
        //add expense payee
        fetch(`http://localhost:5000/users/add/expense-payee`, {
            method: 'POST',
            body: JSON.stringify({
              uid: account.uid,
              payee: payeeNameRef.current.value
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          })
         .then(res => res.json())
         .then(json => {
             setAccount(json);
             payeeNameRef.current.value = ''
             setAlertMsg('Payee added.')
             setShowAlert(true);
             setTimeout(() => setShowAlert(false), 2500)
         });
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        
        //update expense payee name
        fetch(`http://localhost:5000/users/update/expense-payee`, {
            method: 'POST',
            body: JSON.stringify({
                uid: account.uid,
                payee: updatedNameRef.current.value,
                index: showEditPayee.split('-')[1]
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
            })
            .then(res => res.json())
            .then(json => {
                setAccount(json);
                payeeNameRef.current.value = ''
                setAlertMsg('Payee name updated.')
                setShowAlert(true);
                setTimeout(() => setShowAlert(false), 2500)
            });
    }

    const editPayee = (payee, index) => {
        setShowEditPayee(`${payee}-${index}`);
    }

    const deleteExpensePayee = (payee, index) => {
        //delete expense payee
        fetch(`http://localhost:5000/users/delete/expense-payee`, {
            method: 'POST',
            body: JSON.stringify({
              uid: account.uid,
              index: index
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          })
         .then(res => res.json())
         .then(json => {
             setAccount(json);
             payeeNameRef.current.value = ''
             setAlertMsg('Payee removed.')
             setShowAlert(true);
             setTimeout(() => setShowAlert(false), 2500);
             setConfirmDelete('');
             setShowEditPayee('');
         });
    }

    return (
        <>
            {showAlert ? <Alert variant='success'>{alertMsg}</Alert> : <></>}

            <Form onSubmit={handleSubmit}>
                <Form.Group id='expense-type-name'>
                    <Form.Label>Payee Name</Form.Label>
                    <Form.Control type='text' ref={payeeNameRef} required />
                </Form.Group>
                <Button disabled={loading} type='submit'>Submit</Button>
            </Form>
            <br />
            {account.expensePayees.length ? 
            <>
                <p>Available Payees:</p>
                <ul className='no-bullets'>
                    {account.expensePayees.map((payee, index) => {
                        return (
                            <li key={`list-${payee}-${index}`} className='income-type-box'>
                                <Row>
                                    <Col>
                                        {showEditPayee === `${payee}-${index}` ?
                                            <>
                                                {confirmDelete != `${payee}-${index}` ? 
                                                    <Form onSubmit={handleUpdate}>
                                                        <Form.Group>
                                                            <Form.Label>Enter New Payee Name</Form.Label>
                                                            <Form.Control ref={updatedNameRef} type='text' placeholder={payee} required></Form.Control>
                                                        </Form.Group>

                                                        <Row>
                                                            <Col style={{textAlign: 'center'}}>
                                                                <Button variant='danger' onClick={() => setConfirmDelete(`${payee}-${index}`)}><MdDelete /></Button>
                                                            </Col>
                                                            <Col style={{textAlign: 'center'}}>
                                                                <Button variant='secondary' onClick={() => setShowEditPayee('')}><MdCancel /></Button>
                                                            </Col>
                                                            <Col style={{textAlign: 'center'}}>
                                                                <Button type='submit' onClick={() => editPayee(payee, index)}><IoIosCheckmarkCircle /></Button>
                                                            </Col>
                                                        </Row>
                                                    </Form> : 
                                                    <>
                                                        <p>Are you sure you want to delete <b>{payee}</b> ?</p>

                                                        <Row>
                                                            <Col style={{textAlign: 'center'}}>
                                                                <Button variant='danger' onClick={() => deleteExpensePayee(payee, index)}>Delete</Button>
                                                            </Col>
                                                            <Col style={{textAlign: 'center'}}>
                                                            <Button variant='secondary' onClick={() => setConfirmDelete('')}>Cancel</Button>
                                                            </Col>
                                                        </Row>
                                                    </>}
                                            </> : <p>{payee}</p>
                                        }
                                    </Col>
                                    {showEditPayee === `${payee}-${index}` ? <></> : 
                                    <Col style={{textAlign: 'right', paddingRight: '25px'}}>
                                        <Button size="sm" onClick={() => editPayee(payee, index)}><CiEdit /></Button>
                                    </Col>
                                        }
                                </Row>
                            </li>
                        )
                    })}
                </ul>
            </> : <></>}
        </>
    )
}

export default AddExpensePayee;