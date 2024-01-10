//state
import { useState } from 'react'
import { useAccount } from '../../contexts/AccountContext';

//style
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';

//requests
import { addType } from '../../requests/addType';
import { updateType } from '../../requests/updateType';
import { deleteType} from '../../requests/deleteType';

//functions
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

    const handleAddType = (e) => {
        e.preventDefault();
        if(updatedName){
            addType(account.uid, updatedName, type)
            .then(json => {
                setAccount(json);
                getActive(json, active, setActive);
            })
            .then(() => clearForm('Type added.'));   
        }
    }

    const handleUpdateType = (e) => {
        e.preventDefault();
        if(updatedName){
            updateType(account.uid, updatedName, editIndex, type)
            .then(json => {
                setAccount(json);
                getActive(json, active, setActive);
            })
            .then(() => clearForm('Type name updated.'))    
        }
    }

    const handleDeleteType = (e) => {
        e.preventDefault();
        if(updatedName){
            deleteType(account.uid, editIndex, type)
            .then(json => {
                setAccount(json);
                getActive(json, active, setActive);
            })
            .then(() => clearForm('Type deleted.'))
        }
    }

    return (
        <>
            {!edit ?
                <>
                    <Form onSubmit={handleAddType}>
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

                    <p>{type === 'expensesPayees' ? 'Payees:' : 'Types:'}</p>
                    <table>
                        <thead>
                            <tr>
                                <th>{type === 'expensesPayees' ? 'Payee' : 'Type'}</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {account[type] && account[type].map((type, index) => {
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