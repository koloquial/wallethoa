//icons
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { FaRegStickyNote } from "react-icons/fa";

import { Button, Form, Row, Col } from 'react-bootstrap'
import { useRef, useState } from 'react'; 

import { addNote } from '../../requests/addNote';
import { useAccount } from '../../contexts/AccountContext';
import getActive from '../../functions/getActive';
import { deleteDeposit } from "../../requests/deleteDeposit";

const ViewDeposit = ({ item, index, setShowModal }) => {
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [edit, setEdit] = useState();
    const noteRef = useRef();
    const editNoteRef = useRef();
    const { account, setAccount, active, setActive } = useAccount();

    const handleSubmit = (e) => {
        e.preventDefault();
        let copy = {...item};
        copy.notes.push({date: new Date(), content: noteRef.current.value});

        addNote(account.uid, active, 'income', copy)
        .then(json => {
            console.log('json', json)
            setAccount(json);
            getActive(json, active, setActive)
        })
        .then(() => clearForm('Note added.'))
    }

    const clearForm = () => {
        noteRef.current.value = null;
    }

    const handleDelete = () => {
        deleteDeposit(account.uid, active, index)
        .then(json => {
            setAccount(json);
            getActive(json, active, setActive);
            setShowModal(false);
        })
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
                        <td style={{textAlign: 'center'}}>{item.postDate.split('T')[0]}</td>
                        <td style={{textAlign: 'center'}}>{item.type}</td>
                        <td style={{textAlign: 'center'}}>${Number(item.amount).toFixed(2)}</td>
                        <td style={{textAlign: 'center'}}><Button variant='primary' onClick={() => setEdit('item')}><CiEdit /></Button></td>
                    </tr>
                </tbody>
            </table>
            : <></>}

            <table>
                <thead>
                    <tr>
                        {!edit ? <>
                            <th style={{textAlign: 'left', width: '30%'}}>Date</th>
                        <th style={{textAlign: 'left'}}>Note</th>
                        </> : <><th></th></>}
                        
                        <th style={{textAlign: 'center'}}>Edit</th>

                        {!edit ? <></> : <th></th>}
                    </tr>
                </thead>
                <tbody>
                    {item.notes.map((note, index) => {
                        return (
                            <>
                                {edit === `note-${note.date}-${index}` ?
                                    <>
                                        <tr key={`note-${note.date}-${index}`}>
                                            <td>
                                                <Form.Group>
                                                    <Form.Label>Note Date</Form.Label>
                                                    <Form.Control type="text" /> 
                                                </Form.Group>
                                                
                                            </td>
                                            <td></td>
                                            <td>
                                                <Form.Group>
                                                    <Form.Label>Note</Form.Label>
                                                    <Form.Control type="text" placeholder={note.content} ref={editNoteRef} /> 
                                                </Form.Group>
                                                
                                            </td>
                                        </tr>
                                    </>
                                    :
                                    <>
                                    {edit ? <></> : 
                                    <>
                                       <tr key={`note-${note.date}-${index}`}>
                                            <td style={{textAlign: 'left'}}>{JSON.stringify(note.date).split('"')[1].split('T')[0]}</td>
                                            <td style={{textAlign: 'left'}}>{note.content}</td>
                                            <td style={{textAlign: 'center'}}><Button variant='primary' onClick={() => setEdit(`note-${note.date}-${index}`)}><CiEdit /></Button></td>
                                        </tr>
                                    </>}
                                        
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
            <Col style={{textAlign: 'center'}}><Button variant='danger' onClick={() => console.log('')}><MdDelete /></Button></Col>
            <Col style={{textAlign: 'center'}}><Button variant='secondary' onClick={() => setEdit('')}><MdCancel /></Button></Col>
            <Col style={{textAlign: 'center'}}><Button type='submit'><IoIosCheckmarkCircle /></Button></Col>
            </Row>
         : 
                <Form onSubmit={handleSubmit}>
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
                        <Col style={{textAlign: 'center'}}><Button variant='danger' onClick={() => handleDelete()}>Delete</Button></Col>
                        <Col style={{textAlign: 'center'}}><Button variant='secondary' onClick={() => setConfirmDelete(false)}>Cancel</Button></Col>
                    </Row>
                </>
                : 
                <Row>
                    <Col style={{textAlign: 'center'}}><Button variant='danger' onClick={() => setConfirmDelete(true)}>Delete Deposit</Button></Col>
                    <Col style={{textAlign: 'center'}}><Button variant='secondary' onClick={() => setShowModal(false)}>Cancel</Button></Col>
                </Row>}
            </Form>}
            
            
            
        </>
    )
}

export default ViewDeposit;