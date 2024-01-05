//state
import { useRef, useState } from 'react'; 

//style
import { Row, Col, Button, Form, Select } from 'react-bootstrap'

//icons
import { CiEdit } from "react-icons/ci";

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

const ViewDeposit = ({ view, itemIndex, setShowModal, setView }) => {
    //global state
    const { account, setAccount, active, setActive } = useAccount();

    //input values
    const [datePick, setDatePick] = useState();
    const noteRef = useRef();
    const [editNote, setEditNote] = useState();
    const [editIndex, setEditIndex] = useState();
 
    //view changes
    const [edit, setEdit] = useState();
    const [confirmDelete, setConfirmDelete] = useState(false);
    
    //handle clear form
    const clearForm = (message) => {
        noteRef.current.value = null;
    }

    //handle save note
    const saveNote = () => {
        //check if edit has any changes to original
        if(edit.content !== editNote){
            //copy note
            let copy = {...edit};

            //update note content
            copy.content = editNote;

            //update note on server
            updateNote(account.uid, active, 'income', copy, itemIndex, editIndex)
            .then(json => {
                setAccount(json);
                getActive(json, active, setActive);
                setEdit();
                setEditIndex();
                let act = returnActive(json, active);
                setView(act.income[itemIndex])
            })
        }
    }

    const handleAddNote = (e) => {
        //prevent default
        e.preventDefault();

        //copy notes
        let copy = {...view};

        //push new note into notes array
        copy.notes.push({date: new Date(), content: noteRef.current.value});

        //add note array to deposit
        addNote(account.uid, active, 'income', copy)
        .then(json => {
            setAccount(json);
            getActive(json, active, setActive);
        })
        .then(() => clearForm('Note added.'))
    }

    const handleEditNoteChange = (e) => {
        setEditNote(e.target.value)
    }

    const handleUpdateDeposit = () => {

    }

    const deleteNote = () => {

    }

    const saveView = () => { 

    }

    return (
        <>
            {edit ? <p>Edit</p> : <></>}

            {!edit ? <Form onSubmit={handleAddNote}>
                    <Form.Group>
                        <Form.Label>
                            Add Note
                        </Form.Label>
                        <Form.Control type='text' ref={noteRef} />
                    </Form.Group>
                    <Button type='submit'>Submit</Button>
                </Form> : <></>}

               
            {!edit ? 
                <table>
                    <thead>
                        <tr>
                            <th style={{textAlign: 'left'}}>Post Date</th>
                            <th style={{textAlign: 'left'}}>Type</th>
                            <th style={{textAlign: 'left'}}>Amount</th>
                            <th style={{textAlign: 'center'}}>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{textAlign: 'left'}}>{view.postDate.split('T')[0]}</td>
                            <td style={{textAlign: 'left'}}>{view.type}</td>
                            <td style={{textAlign: 'left'}}>${parseFloat(view.amount).toFixed(2)}</td>
                            <td>
                                <Button 
                                    variant='primary' 
                                    onClick={() => {
                                        setEdit('this');
                                    }}>
                                    <CiEdit />
                                </Button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            : <></>}

            <table>
                <thead>
                    <tr>
                        {!edit ? 
                            <>
                                <th style={{textAlign: 'left', width: '30%'}}>Date</th>
                                <th style={{textAlign: 'left', width: 'auto'}}>Note</th>
                                <th>Edit</th>
                            </> 
                        : ''}
                    </tr>
                </thead>
                <tbody>
                    {view.notes.map((note, index) => {
                        return (
                            <>
                                {edit && edit.date === note.date ?
                                    <>
                                        <tr key={`note-${note.date}-${index}`}>
                                            <td>&nbsp;</td>
                                            <td style={{textAlign: 'left'}}>
                                                <Form.Group>
                                                    <Form.Label>Note</Form.Label>
                                                    <Form.Control 
                                                        type="text"
                                                        value={editNote} 
                                                        onChange={handleEditNoteChange}
                                                    /> 
                                                </Form.Group>
                                            </td>
                                            <td>&nbsp;</td>
                                        </tr>
                                    </>
                                    :
                                    <>
                                        {!edit ? 
                                            <>
                                                <tr key={`note-${note.date}-${index}`}>
                                                    <td style={{textAlign: 'left'}}>{JSON.stringify(note.date).split('"')[1].split('T')[0]}</td>
                                                    <td style={{textAlign: 'left'}}>{note.content}</td>
                                                    <td>
                                                        <Button 
                                                            variant='primary' 
                                                            onClick={() => {
                                                                setEditIndex(index)
                                                                setEdit(note);
                                                                setEditNote(note.content);
                                                            }}>
                                                                <CiEdit />
                                                            </Button>
                                                    </td>
                                                </tr>
                                            </>
                                        : <></>}
                                    </>
                                }
                            </>
                        )
                    })}
                    {edit === 'this' ? 
                        <tr>
                            <td>
                                <p>Select Date:</p>
                                {console.log('datepick', datePick)}
                                <SelectDate datePick={datePick} setDatePick={setDatePick}/>
                            </td>
                            <td>
                            <Form.Label>
                                    Type
                                </Form.Label>
                            <Form.Select defaultValue={view.type}>
                                {account.incomeTypes.map(item => {
                                    return <option>{item}</option>
                                })}
                            </Form.Select>
                            </td>
                            <td>
                                <Form.Label>
                                    Amount ($)
                                </Form.Label>
                                <Form.Control type='text' defaultValue={view.amount} />
                            </td>
                        </tr>
                     : <></>}
                </tbody>
            </table>



            <br />
            
            {edit && edit !== 'this' ? 
                <Row style={{width: '100%'}}>
                    <Col style={{textAlign: 'center'}}>
                        <Button 
                            variant='danger' 
                            onClick={() => deleteNote()}>Delete</Button>
                    </Col>
                    <Col style={{textAlign: 'center'}}>
                        <Button variant='secondary' onClick={() => setEdit('')}>Cancel</Button>
                    </Col>
                    <Col style={{textAlign: 'center'}}>
                        <Button onClick={() => saveNote()}>Save</Button>
                    </Col>
                </Row>
                : <></>}

            {edit === 'this' ? 
                <>
                {confirmDelete ? 
                        <>
                            <p>Are you sure you would like to delete deposit?</p>
                            <p><b>Date:</b> {view.postDate}</p>
                            <p><b>Type:</b> {view.type}</p>
                            <p><b>Amount:</b> ${view.amount}</p>
                            <Row>
                                <Col style={{textAlign: 'center'}}><Button variant='danger' onClick={() => {
                                    deleteDeposit(account.uid, active, itemIndex)
                                    .then(json => {
                                        setAccount(json);
                                        getActive(json, active, setActive);
                                        setShowModal(false);
                                    })
                                }}>Delete</Button></Col>
                                <Col style={{textAlign: 'center'}}>
                                    <Button 
                                        variant='secondary' 
                                        onClick={() => setConfirmDelete(false)}>Cancel</Button>
                                </Col>
                            </Row>
                        </>
                        : 
                        <Row>
                            <Col style={{textAlign: 'center'}}>
                                <Button 
                                    variant='danger' 
                                    onClick={() => setConfirmDelete(true)}>Delete Deposit</Button>
                            </Col>
                            <Col style={{textAlign: 'center'}}>
                                <Button 
                                    variant='secondary' 
                                    onClick={() => setEdit()}>Cancel</Button>
                            </Col>
                            <Col style={{textAlign: 'center'}}>
                                <Button onClick={() => saveView()}>Save</Button>
                            </Col>
                        </Row>
                    }
            </>
                : <></>}

               
        </>
    )
}

export default ViewDeposit;