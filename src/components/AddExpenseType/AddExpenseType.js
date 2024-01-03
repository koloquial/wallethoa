//state
import { useRef, useState } from 'react'

//style
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';

//icons
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import { IoIosCheckmarkCircle } from "react-icons/io"

const AddExpenseType = ({ account, setAccount }) => {
    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState('');
    const [showEditType, setShowEditType] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState('');
    const typeNameRef = useRef('');
    const updatedNameRef = useRef('');

    const handleSubmit = (e) => {
        e.preventDefault();
       
        //add expense types
        fetch(`http://localhost:5000/users/add/expense-type`, {
            method: 'POST',
            body: JSON.stringify({
              uid: account.uid,
              type: typeNameRef.current.value
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          })
         .then(res => res.json())
         .then(json => {
             setAccount(json);
             typeNameRef.current.value = ''
             setAlertMsg('Type added.')
             setShowAlert(true);
             setTimeout(() => setShowAlert(false), 2500)
         });
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        
        //update expense type name
        fetch(`http://localhost:5000/users/update/expense-type`, {
            method: 'POST',
            body: JSON.stringify({
                uid: account.uid,
                type: updatedNameRef.current.value,
                index: showEditType.split('-')[1]
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
            })
            .then(res => res.json())
            .then(json => {
                setAccount(json);
                typeNameRef.current.value = ''
                setAlertMsg('Type name updated.')
                setShowAlert(true);
                setTimeout(() => setShowAlert(false), 2500)
            });
    }

    const editType = (type, index) => {
        setShowEditType(`${type}-${index}`);
    }

    const deleteExpenseType = (type, index) => {
        //delete income type
        fetch(`http://localhost:5000/users/delete/expense-type`, {
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
             typeNameRef.current.value = ''
             setAlertMsg('Type removed.')
             setShowAlert(true);
             setTimeout(() => setShowAlert(false), 2500);
             setConfirmDelete('');
             setShowEditType('');
         });
    }

    return (
        <>
            {showAlert ? <Alert variant='success'>{alertMsg}</Alert> : <></>}
            <Form onSubmit={handleSubmit}>
                <Form.Group id='expense-type-name'>
                    <Form.Label>Type Name</Form.Label>
                    <Form.Control type='text' ref={typeNameRef} required />
                </Form.Group>
                <Button disabled={loading} type='submit'>Submit</Button>
            </Form>
            <br />
            {account.expenseTypes.length ? 
            <>
                <p>Available Types:</p>
                <ul className='no-bullets'>
                    {account.expenseTypes.map((type, index) => {
                        return (
                            <li key={`list-${type}-${index}`} className='income-type-box'>
                                <Row>
                                    <Col>
                                        {showEditType === `${type}-${index}` ?
                                            <>
                                                {confirmDelete != `${type}-${index}` ? 
                                                    <Form onSubmit={handleUpdate}>
                                                        <Form.Group>
                                                            <Form.Label>Enter New Type Name</Form.Label>
                                                            <Form.Control ref={updatedNameRef} type='text' placeholder={type} required></Form.Control>
                                                        </Form.Group>

                                                        <Row>
                                                            <Col style={{textAlign: 'center'}}>
                                                                <Button variant='danger' onClick={() => setConfirmDelete(`${type}-${index}`)}><MdDelete /></Button>
                                                            </Col>
                                                            <Col style={{textAlign: 'center'}}>
                                                                <Button variant='secondary' onClick={() => setShowEditType('')}><MdCancel /></Button>
                                                            </Col>
                                                            <Col style={{textAlign: 'center'}}>
                                                                <Button type='submit' onClick={() => editType(type, index)}><IoIosCheckmarkCircle /></Button>
                                                            </Col>
                                                        </Row>
                                                    </Form> : 
                                                    <>
                                                        <p>Are you sure you want to delete <b>{type}</b> ?</p>

                                                        <Row>
                                                            <Col style={{textAlign: 'center'}}>
                                                                <Button variant='danger' onClick={() => deleteExpenseType(type, index)}>Delete</Button>
                                                            </Col>
                                                            <Col style={{textAlign: 'center'}}>
                                                            <Button variant='secondary' onClick={() => setConfirmDelete('')}>Cancel</Button>
                                                            </Col>
                                                        </Row>
                                                    </>}
                                            </> : <p>{type}</p>
                                        }
                                    </Col>
                                    {showEditType === `${type}-${index}` ? <></> : 
                                    <Col style={{textAlign: 'right', paddingRight: '25px'}}>
                                        <Button size="sm" onClick={() => editType(type, index)}><CiEdit /></Button>
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

export default AddExpenseType;