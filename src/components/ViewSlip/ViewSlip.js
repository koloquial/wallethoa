//state
import { useEffect, useState } from 'react'; 

//style
import { Row, Col, Button, Form, Select, Alert } from 'react-bootstrap'

//functions
import getActive from '../../functions/getActive';
import returnActive from '../../functions/returnActive';

//requests
import { addNote } from '../../requests/addNote';
import { useAccount } from '../../contexts/AccountContext';
import { deleteSlip } from "../../requests/deleteSlip";
import { updateNote } from '../../requests/updateNote';
import { deleteNote } from '../../requests/deleteNote';
import { updateSlip } from '../../requests/updateSlip';

//components
import SelectDate from '../SelectDate';


const ViewSlip = ({ view, itemIndex, setView, setShowModal, slip }) => {
    //global state
    const { account, setAccount, active, setActive } = useAccount();

    //input values
    const [datePick, setDatePick] = useState(new Date(view ? view.postDate : ''));
    const [editIndex, setEditIndex] = useState();
    const [updatedNote, setUpdatedNote] = useState('');
    const [alertMsg, setAlertMsg] = useState();
    const [showAlert, setShowAlert] = useState();
    const [type, setType] = useState(view ? view.type : '');
    const [amount, setAmount] = useState(view ? view.amount : 0);
 
    //view changes
    const [edit, setEdit] = useState();
    const [confirmDelete, setConfirmDelete] = useState(false);
    
    const clearForm = (message) => {
        setConfirmDelete(false);
        setEdit(false);
        setEditIndex();
        setUpdatedNote();

        if(message){
            setAlertMsg(message);
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 2500);
        }
    }

    const setStates = (json) => {
        setAccount(json);
        getActive(json, active, setActive);
    }

    const handleUpdateNote = (e) => {
        e.preventDefault();
        let copy = {...view.notes[editIndex]}
        copy.content = updatedNote;
        updateNote(account.uid, active, slip, copy, itemIndex, editIndex)
        .then(json => { 
            setStates(json);         
            let act = returnActive(json, active);
            setView(act[slip][itemIndex])
        })
        .then(() => clearForm('Updated note.'))
    }

    const handleUpdateSlip = (e) => {
        e.preventDefault();
        let copy = {...view};
        copy.amount = amount;
        if(copy.postDate !== datePick){
            copy.postDate = datePick;
        }
        copy.type = type;
        updateSlip(account.uid, active, slip, copy, itemIndex)
        .then(json => { 
            setStates(json);         
            let act = returnActive(json, active);
            setView(act[slip][itemIndex])
        })
        .then(() => clearForm('Updated slip.'))
    }

    const handleDeleteSlip = () => {
        deleteSlip(account.uid, active, slip, itemIndex)
        .then(json => { setStates(json); setShowModal(false); })
        .then(() => clearForm('Updated slip.'))
    }

    const handleDeleteNote = () => {
        deleteNote(account.uid, active, slip, itemIndex, editIndex)
        .then(json => { 
            setStates(json);         
            let act = returnActive(json, active);
            setView(act[slip][itemIndex])
        })
        .then(() => clearForm('Deleted note.'))
    }

    const handleAddNote = (e) => {
        e.preventDefault();
        let copy = {date: new Date(), content: updatedNote};
        addNote(account.uid, active, slip, itemIndex, copy)
        .then(json => { 
            setStates(json);         
            let act = returnActive(json, active);
            setView(act[slip][itemIndex])
        })
        .then(() => clearForm('Note added.'))
    }

    return (
        <>
            {!edit ? 
                <>
                    {showAlert ? <Alert variant='success'>{alertMsg}</Alert> : <></>}
                        <Form onSubmit={handleAddNote}>
                            <Form.Group>
                                <Form.Label>
                                    Add Note:
                                </Form.Label>
                                <Form.Control 
                                    type='text' 
                                    value={updatedNote} 
                                    onChange={(e) => setUpdatedNote(e.target.value)} 
                                />
                            </Form.Group>
                            <Button type='submit'>Submit</Button>
                        </Form> 

                        <br />
                        <p>Details:</p>
                        <table>
                            <thead>
                                <tr>
                                    <th>Post Date</th>
                                    <th>Type</th>
                                    <th>Amount</th>
                                    <th>Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{view.postDate.split('T')[0]}<br />{view.postDate.split('T')[1]}</td>
                                    <td>{view.type}</td>
                                    <td>${parseFloat(view.amount).toFixed(2)}</td>
                                    <td>
                                        <Button 
                                            variant='primary' 
                                            onClick={() => {
                                                setEdit('this');
                                            }}>
                                            Edit
                                        </Button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        
                        <br />
                        <p>Notes:</p>
                        <table>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Note</th>
                                    <th>Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {view.notes && view.notes.map((note, index) => {
                                    return (
                                        <tr key={`note-${index}`}>
                                            <td>{note.date.split('T')[0]}</td>
                                            <td>{note.content}</td>
                                            <td><Button onClick={() => {
                                                setEdit('note');
                                                setUpdatedNote(note.content);
                                                setEditIndex(index);
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
                        {edit === 'this' ? 
                            <>
                                <Form onSubmit={handleUpdateSlip}>
                                    <SelectDate datePick={datePick} setDatePick={setDatePick}/>
                                    <Form.Group>
                                        <Form.Label>Update Type:</Form.Label>
                                        <Form.Select onChange={(e) => setType(e.target.value)}>
                                                {account[`${slip}Types`] && account[`${slip}Types`].map((type, index) => {
                                                    if(type === view.type){
                                                        return <option key={`${type}-${index}-${slip}-type`} selected>{type}</option>
                                                    }else{
                                                        return <option key={`${type}-${index}-${slip}-type`}>{type}</option>
                                                    }
                                                })}
                                        </Form.Select>
                                    </Form.Group>
                                
                                    {slip === 'expenses' ? 
                                    <>
                                        <Form.Group>
                                            <Form.Label>Update Payee:</Form.Label>
                                            <Form.Select onChange={(e) => setType(e.target.value)}>
                                                    {account[`${slip}Payees`] && account[slip + 'Payees'].map((type, index) => {
                                                        if(type === view.type){
                                                            return <option key={`${type}-${index}-${slip}-type`} selected>{type}</option>
                                                        }else{
                                                            return <option key={`${type}-${index}-${slip}-type`}>{type}</option>
                                                        }
                                                    })}
                                            </Form.Select>
                                        </Form.Group>
                                    </> : <></>}
                                
                                    <br />
                                    <Form.Group>
                                        <Form.Label>Update Amount:</Form.Label>
                                        <Form.Control type="number" step=".01" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} defaultValue={Number(view.amount).toFixed(2)} required />
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
                                                        setEdit(false);
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
                                    <div className='delete-container'>
                                        <p>Are you sure you want to delete:</p>
                                        <p><b>Post Date: </b>{view.postDate}</p>
                                        <p><b>Type: </b>{view.type}</p>
                                        {slip === 'expenses' ? <p><b>Type: </b>{view.payee}</p> : <></>}
                                        <p><b>Amount:</b> ${Number(view.amount).toFixed(2)}</p>
                                        <Row>
                                            <Col style={{textAlign: 'center'}}>
                                                <Button 
                                                    variant='danger' 
                                                    onClick={handleDeleteSlip}>Delete</Button>
                                            </Col>
                                            <Col style={{textAlign: 'center'}}>
                                                <Button 
                                                    variant='secondary' 
                                                    onClick={() => {
                                                        setConfirmDelete(false);
                                                    }}>
                                                        Cancel
                                                </Button>
                                            </Col>
                                        </Row>
                                    </div> : <></>}
                        </> : <></>}

                        {edit === 'note' ? 
                            <>
                                <Form onSubmit={handleUpdateNote}>
                                    <Form.Group>
                                        <Form.Label>Update Note:</Form.Label>
                                        <Form.Control 
                                            type='text' 
                                            value={updatedNote} 
                                            onChange={(e) => setUpdatedNote(e.target.value)} 
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
                                                        setEdit(false);
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
                                        <p>Are you sure you want to delete:</p>
                                        <p><b>{view.notes[editIndex].content}</b></p>
                                        <Row>
                                            <Col style={{textAlign: 'center'}}>
                                                <Button 
                                                    variant='danger' 
                                                    onClick={handleDeleteNote}>Delete</Button>
                                            </Col>
                                            <Col style={{textAlign: 'center'}}>
                                                <Button 
                                                    variant='secondary' 
                                                    onClick={() => {
                                                        setConfirmDelete(false);
                                                    }}>
                                                        Cancel
                                                </Button>
                                            </Col>
                                        </Row>
                                    </> : <></>}
                        </> : <></>}
                    </>}
                </>
    )
}

export default ViewSlip;