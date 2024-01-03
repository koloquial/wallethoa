//state
import { useRef, useState } from 'react'
import { useAccount } from '../../contexts/AccountContext';

//style
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';

//icons
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import { IoIosCheckmarkCircle } from "react-icons/io";

//requests
import { deleteExpensePayee } from '../../requests/deleteExpensePayee';
import { updateExpensePayee } from '../../requests/updateExpensePayee';
import { addExpensePayee } from '../../requests/addExpensePayee';

const AddExpensePayee = () => {
    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState('');

    //view state changes
    const [edit, setEdit] = useState();
    const [confirmDelete, setConfirmDelete] = useState();

    //input references
    const typeNameRef = useRef('');
    const updatedNameRef = useRef('');

    //state
    const { account, setAccount, active, setActive } = useAccount();    

    const clearForm = (message) => {
         setAlertMsg(message);
         setShowAlert(true);
         setConfirmDelete('');
         setEdit('');
         typeNameRef.current.value = ''
         setTimeout(() => setShowAlert(false), 2500);
    }

    return (
        <>
            {showAlert ? <Alert variant='success'>{alertMsg}</Alert> : <></>}

            <Form onSubmit={(e) => {
                e.preventDefault();
                addExpensePayee(account.uid, typeNameRef.current.value)
                .then(json => setAccount(json))
                .then(() => clearForm('Payee added.'))
            }}>
                <Form.Group id='expense-payee-name'>
                    <Form.Label>Payee Name</Form.Label>
                    <Form.Control type='text' ref={typeNameRef} required />
                </Form.Group>
                <Button disabled={loading} type='submit'>Submit</Button>
            </Form>

            <br />

            {account.expensePayees.length ? 
                <>
                    <p>Available Payees:</p>
                    <table>
                        <thead>
                            <tr>
                                <th>Payee</th>
                                <th>View/Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                        {account.expensePayees.map((type, index) => {
                            return (
                                <tr key={`expense-payees-${type}-${index}`}>
                                    <td>
                                        {edit === `expense-payees-${type}-${index}` ? 
                                            <>
                                                {confirmDelete != `expense-payees-${type}-${index}` ?
                                                    <Form onSubmit={(e) => {
                                                        e.preventDefault();
                                                        updateExpensePayee(account.uid, updatedNameRef.current.value, index)
                                                        .then(json => setAccount(json))
                                                        .then(() => clearForm('Payee updated.')) 
                                                        }}>
                                                        <Form.Group>
                                                            <Form.Label>Enter New Payee Name</Form.Label>
                                                            <Form.Control ref={updatedNameRef} type='text' placeholder={type} required></Form.Control>
                                                        </Form.Group>
                                                        <Row>
                                                            <Col style={{textAlign: 'center'}}>
                                                                <Button variant='danger' onClick={() => setConfirmDelete(`expense-payees-${type}-${index}`)}><MdDelete /></Button>
                                                            </Col>
                                                            <Col style={{textAlign: 'center'}}>
                                                                <Button variant='secondary' onClick={() => setEdit('')}><MdCancel /></Button>
                                                            </Col>
                                                            <Col style={{textAlign: 'center'}}>
                                                                <Button type='submit'><IoIosCheckmarkCircle /></Button>
                                                            </Col>
                                                        </Row>
                                                    </Form>
                                                    : 
                                                    <>
                                                        <p>Are you sure you want to delete <b>{type}</b> ?</p>
                                                        <Row>
                                                            <Col style={{textAlign: 'center'}}>
                                                                <Button 
                                                                    variant='danger' 
                                                                    onClick={() => {
                                                                        deleteExpensePayee(account.uid, index)
                                                                        .then(json => setAccount(json))
                                                                        .then(() => clearForm('Payee deleted.'))
                                                                    }
                                                                    }>Delete</Button>
                                                            </Col>
                                                            <Col style={{textAlign: 'center'}}>
                                                                <Button variant='secondary' onClick={() => setConfirmDelete('')}>Cancel</Button>
                                                            </Col>
                                                        </Row>
                                                    </>
                                                }
                                            </> 
                                            : <p>{type}</p>
                                        }
                                    </td>
                                    <td style={{textAlign: 'center'}}>
                                        {edit != `expense-payees-${type}-${index}` ?
                                            <Button size="sm" onClick={() => setEdit(`expense-payees-${type}-${index}`)}><CiEdit /></Button>
                                            : <></>}
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </> : <></>
            }
        </>
    )
}

export default AddExpensePayee;