//icons
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { FaRegStickyNote } from "react-icons/fa";

import { Button, Form, Row, Col } from 'react-bootstrap'
import { useRef } from 'react'; 

import { addNote } from '../../requests/addNote';
import { useAccount } from '../../contexts/AccountContext';
import getActive from '../../functions/getActive';

const ViewDeposit = ({ item }) => {

    const noteRef = useRef();
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

    return (
        <>
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
                        <td style={{textAlign: 'center'}}><Button variant='primary'><CiEdit /></Button></td>
                    </tr>
                </tbody>
            </table>

            <table>
                <thead>
                    <tr>
                        <th style={{textAlign: 'center', width: '30%'}}>Date</th>
                        <th style={{textAlign: 'center'}}>Note</th>
                    </tr>
                </thead>
                <tbody>
                    {item.notes.map(note => {
                        return (
                            <tr>
                                <td>{JSON.stringify(note.date).split('"')[1].split('T')[0]}</td>
                                <td>{note.content}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <br />

            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>
                        Add Note
                    </Form.Label>
                    <Form.Control type='text' ref={noteRef} />
                </Form.Group>
                <div style={{textAlign: 'right'}}><Button type='submit'>Submit</Button></div>
            </Form>
            <br /><br />
            <Row>
                <Col style={{textAlign: 'center'}}><Button variant='danger'>Delete Deposit</Button></Col>
                <Col style={{textAlign: 'center'}}><Button variant='secondary'>Cancel</Button></Col>
            </Row>
        </>
    )
}

export default ViewDeposit;