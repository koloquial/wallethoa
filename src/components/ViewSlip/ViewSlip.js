//state
import { useRef, useState } from 'react'; 

//style
import { Row, Col, Button, Form, Select, Alert } from 'react-bootstrap'

//functions
import getActive from '../../functions/getActive';
import returnActive from '../../functions/returnActive';

//requests
import { addNote } from '../../requests/addNote';
import { useAccount } from '../../contexts/AccountContext';
import { deleteDeposit } from "../../requests/deleteDeposit";
import { updateNote } from '../../requests/updateNote';

//components
import SelectDate from '../SelectDate';

const ViewSlip = ({ view, itemIndex, setView }) => {
    //global state
    const { account, setAccount, active, setActive } = useAccount();

    //input values
    const [datePick, setDatePick] = useState();
    const [editIndex, setEditIndex] = useState();
    const [updatedNote, setUpdatedNote] = useState('');
    const [alertMsg, setAlertMsg] = useState();
    const [showAlert, setShowAlert] = useState();
 
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

    const handleUpdateNote = (e) => {
        e.preventDefault();
        //copy note
        let copy = {...view.notes[editIndex]}

        //update note content
        copy.content = updatedNote;

        //update note on server
        updateNote(account.uid, active, 'income', copy, itemIndex, editIndex)
        .then(json => {
            setAccount(json);
            getActive(json, active, setActive);
            let act = returnActive(json, active);
            setView(act.income[itemIndex])
        })
        .then(() => clearForm('Updated note.'))
    }

    const handleDeleteNote = (e) => {

    }


    const handleAddNote = (e) => {
        //prevent default
        e.preventDefault();

        //copy notes
        let copy = {...view};

        //push new note into notes array
        copy.notes.push({date: new Date(), content: updatedNote});

        //add note array to deposit
        addNote(account.uid, active, 'income', copy)
        .then(json => {
            setAccount(json);
            getActive(json, active, setActive);
            let act = returnActive(json, active);
            setView(act.income[itemIndex]);
            setUpdatedNote();
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
                                <td>{view.postDate.split('T')[0]}</td>
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
                            {view.notes.map((note, index) => {
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
                    
                    </>:<></>}

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