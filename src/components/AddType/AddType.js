//state
import { useState } from 'react'
import { useAccount } from '../../contexts/AccountContext';

//style
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';

//requests
import { addIncomeType } from '../../requests/addIncomeType';
import { updateIncomeType } from '../../requests/updateIncomeType';
import { deleteIncomeType } from '../../requests/deleteIncomeType';

import { addExpenseType } from '../../requests/addExpenseType';
import { updateExpenseType } from '../../requests/updateExpenseType';
import { deleteExpenseType } from '../../requests/deleteExpenseType';

import { addExpensePayee } from '../../requests/addExpensePayee';
import { updateExpensePayee } from '../../requests/updateExpensePayee';
import { deleteExpensePayee } from '../../requests/deleteExpensePayee';


import getActive from '../../functions/getActive';

const AddType = ({ type }) => {
    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState('');

    //view state changes
    const [edit, setEdit] = useState(false);
    const [editIndex, setEditIndex] = useState();
    const [confirmDelete, setConfirmDelete] = useState(false);

    //input references
    const [updatedName, setUpdatedName] = useState('');

    //state
    const { account, setAccount, active, setActive } = useAccount();    

    const clearForm = (message) => {
        if(message){
            setAlertMsg(message);
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 2500);
        }
         setConfirmDelete(false);
         setEdit(false);
         setUpdatedName('');
    }

    const handleNewType = (e) => {
        e.preventDefault();
        //check if a new name was entered
        if(updatedName){
            //check slip type
            if(type === 'incomeTypes'){
                addIncomeType(account.uid, updatedName)
                .then(json => {
                    setAccount(json);
                    getActive(json, active, setActive);
                })
                .then(() => clearForm('Type added.'));
            }

            if(type === 'expenseTypes'){
                addExpenseType(account.uid, updatedName)
                .then(json => {
                    setAccount(json);
                    getActive(json, active, setActive);
                })
                .then(() => clearForm('Type added.'));
            }

            if(type === 'expensePayees'){
                addExpensePayee(account.uid, updatedName)
                .then(json => {
                    setAccount(json);
                    getActive(json, active, setActive);
                })
                .then(() => clearForm('Type added.'));
            }
        }
    }

    const handleUpdateType = (e) => {
        e.preventDefault();
        //check if a new name was entered
        if(updatedName){
            //check slip type
            if(type === 'incomeTypes'){
                updateIncomeType(account.uid, updatedName, editIndex)
                .then(json => {
                    setAccount(json);
                    getActive(json, active, setActive);
                })
                .then(() => clearForm('Type name updated.')) 
            }

            if(type === 'expenseTypes'){
                updateExpenseType(account.uid, updatedName, editIndex)
                .then(json => {
                    setAccount(json);
                    getActive(json, active, setActive);
                })
                .then(() => clearForm('Type name updated.')) 
            }

            if(type === 'expensePayees'){
                updateExpensePayee(account.uid, updatedName, editIndex)
                .then(json => {
                    setAccount(json);
                    getActive(json, active, setActive);
                })
                .then(() => clearForm('Type name updated.')) 
            }
        }
    }

    const handleDeleteType = (e) => {
        e.preventDefault();
        //check if a new name was entered
        if(updatedName){
            //check slip type
            if(type === 'incomeTypes'){
                deleteIncomeType(account.uid, editIndex)
                .then(json => {
                    setAccount(json);
                    getActive(json, active, setActive);
                })
                .then(() => clearForm('Type deleted.'))
            }

            if(type === 'expenseTypes'){
                deleteExpenseType(account.uid, editIndex)
                .then(json => {
                    setAccount(json);
                    getActive(json, active, setActive);
                })
                .then(() => clearForm('Type deleted.'))
            }

            if(type === 'expensePayees'){
                deleteExpensePayee(account.uid, editIndex)
                .then(json => {
                    setAccount(json);
                    getActive(json, active, setActive);
                })
                .then(() => clearForm('Type deleted.'))
            }
        }
    }

    return (
        <>
            {!edit ?
                <>
                    <Form onSubmit={handleNewType}>
                        {showAlert ? <Alert variant='success'>{alertMsg}</Alert> : <></>}
                        
                        <Form.Group id='new-type-name'>
                            <Form.Label>Add:</Form.Label>
                            <Form.Control 
                                type='text' 
                                value={updatedName} 
                                onChange={(e) => setUpdatedName(e.target.value)} 
                                required 
                            />
                        </Form.Group>

                        <Button disabled={loading} type='submit'>Submit</Button>
                        </Form>
                    <br />

                    <p>{type === 'expensePayees' ? 'Payees:' : 'Types:'}</p>
                    <table>
                        <thead>
                            <tr>
                                <th>{type === 'expensePayees' ? 'Payee' : 'Type'}</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {account[type].map((type, index) => {
                                return (
                                    <tr key={`${type}-${index}-list-item`}>
                                        <td>{type}</td>
                                        <td>
                                            <Button onClick={() => {
                                                setEdit(true);
                                                setEditIndex(index);
                                                setUpdatedName(type);
                                                }}>Edit</Button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </> 
                : 
                <>
                    <Form onSubmit={handleUpdateType}>
                        <Form.Group>
                            <Form.Label>Enter New Name:</Form.Label>
                            <Form.Control 
                                type='text' 
                                value={updatedName} 
                                onChange={(e) => setUpdatedName(e.target.value)} 
                                required
                            />
                        </Form.Group>

                        {!confirmDelete ? 
                            <Row>
                                <Col style={{textAlign: 'center'}}>
                                    <Button 
                                        variant='danger' 
                                        onClick={() => setConfirmDelete(true)}>
                                            Delete
                                    </Button>
                                </Col>
                                <Col style={{textAlign: 'center'}}>
                                    <Button 
                                        variant='secondary' 
                                        onClick={() => {
                                            clearForm();
                                        }}>
                                            Cancel
                                    </Button>
                                </Col>
                                <Col style={{textAlign: 'center'}}>
                                    <Button type='submit'>Save</Button>
                                </Col>
                            </Row> 
                            : 
                            <></>}
                    </Form>

                    {confirmDelete ? 
                        <>
                            <p>Are you sure you want to delete <b>{updatedName}</b> ?</p>
                            <Row>
                                <Col style={{textAlign: 'center'}}>
                                    <Button 
                                        variant='danger' 
                                        onClick={handleDeleteType}>Delete</Button>
                                </Col>
                                <Col style={{textAlign: 'center'}}>
                                    <Button 
                                        variant='secondary' 
                                        onClick={() => {
                                            setConfirmDelete(false);
                                            clearForm();
                                        }}>
                                            Cancel
                                    </Button>
                                </Col>
                            </Row>
                        </> : <></>}
                </>}
        </>
    )
}

export default AddType;