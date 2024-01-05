//state
import { useRef, useState } from 'react'; 

//style
import { Row, Col, Button, Form } from 'react-bootstrap'

//icons
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import { IoIosCheckmarkCircle } from "react-icons/io";

//functions
import getActive from '../../functions/getActive';

//requests
import { addNote } from '../../requests/addNote';
import { useAccount } from '../../contexts/AccountContext';
import { deleteDeposit } from "../../requests/deleteDeposit";

const ViewDeposit = ({ item, index, setShowModal }) => {
    //global state
    const { account, setAccount, active, setActive } = useAccount();

    //input values
    const [datePick, setDatePick] = useState(new Date());
    const noteRef = useRef();
    const [editNote, setEditNote] = useState();

    //view changes
    const [edit, setEdit] = useState();
    const [confirmDelete, setConfirmDelete] = useState(false);
    
    //handle clear form
    const clearForm = (message) => {
        noteRef.current.value = null;
    }

    //handle save note
    const saveNote = () => {
        if(edit.content !== editNote){
            console.log('different notes');
        }
    }

    return (
        <>
            {!edit ? 
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
                            <td>{item.postDate.split('T')[0]}</td>
                            <td>{item.type}</td>
                            <td>${parseFloat(item.amount).toFixed(2)}</td>
                            <td>
                                <Button 
                                    variant='primary' 
                                    onClick={() => setEdit('item')}
                                >
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
                            </> 
                        : <><th></th></>}
                        
                        <th>Edit</th>

                        {!edit ? <></> : <th></th>}
                    </tr>
                </thead>
                <tbody>
                    {item.notes.map((note, index) => {
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
                                                        onChange={(e) => setEditNote(e.value)}
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
                                                    <td style={{textAlign: 'center'}}>
                                                        <Button 
                                                            variant='primary' 
                                                            onClick={() => {
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
                </tbody>
            </table>

            <br />
            
            {edit ? 
                <Row style={{width: '100%'}}>
                    <Col style={{textAlign: 'center'}}>
                        <Button 
                            variant='danger' 
                            onClick={() => console.log('')}>Delete</Button>
                    </Col>
                    <Col style={{textAlign: 'center'}}>
                        <Button variant='secondary' onClick={() => setEdit('')}>Cancel</Button>
                    </Col>
                    <Col style={{textAlign: 'center'}}>
                        <Button onClick={() => saveNote()}>Save</Button>
                    </Col>
                </Row>
                : 
                <Form onSubmit={(e) => {
                    e.preventDefault();
                    let copy = {...item};
                    copy.notes.push({date: new Date(), content: noteRef.current.value});
                    addNote(account.uid, active, 'income', copy)
                    .then(json => {
                        setAccount(json);
                        getActive(json, active, setActive)
                    })
                    .then(() => clearForm('Note added.'))
                }}>
                    <Form.Group>
                        <Form.Label>
                            Add Note
                        </Form.Label>
                        <Form.Control type='text' ref={noteRef} />
                    </Form.Group>
                    <div style={{textAlign: 'right'}}><Button type='submit'>Submit</Button></div>

                    <br /><br />
                    {confirmDelete ? 
                        <>
                            <p>Are you sure you would like to delete deposit: <b>{item.type} - ${item.amount}</b>?</p>
                            <Row>
                                <Col style={{textAlign: 'center'}}><Button variant='danger' onClick={() => {
                                    deleteDeposit(account.uid, active, index)
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
                                    onClick={() => setShowModal(false)}>Cancel</Button>
                            </Col>
                        </Row>
                    }
                </Form>
            }
        </>
    )
}

export default ViewDeposit;