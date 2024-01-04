import { useEffect, useState, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useAccount } from '../../contexts/AccountContext';
import { Card, Container, Form, Button, Row, Col } from 'react-bootstrap';
import { addHomeOwner } from '../../requests/addHomeOwner';
import getActive from '../../functions/getActive';

//icons
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import { IoIosCheckmarkCircle } from "react-icons/io";

const AddOwner = () => {
    const { currentUser } = useAuth();
    const { account, setAccount, active, setActive } = useAccount();

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const address1Ref = useRef();
    const address2Ref = useRef();
    const cityRef = useRef();
    const stateRef = useRef();
    const zipRef = useRef();
    const phoneRef = useRef();
    const emailRef = useRef();
    const emergencyNameRef = useRef();
    const emergencyPhoneRef = useRef();
    const noteRef = useRef();
    const ownershipRef = useRef();
    const duesRef = useRef();

    const clearForm = () => {

    }

    const getFormData = () => {
        let data = {
            uid: account.uid,
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            address1: address1Ref.current.value,
            address2: address2Ref.current.value,
            city: cityRef.current.value,
            state: stateRef.current.value,
            zipcode: zipRef.current.value,
            phone: phoneRef.current.value,
            email: emailRef.current.value,
            emergName: emergencyNameRef.current.value,
            emergPhone: emergencyPhoneRef.current.value,
            ownership: ownershipRef.current.value,
            dues: duesRef.current.value,
            note: noteRef.current.value,
        }
        return data;
    }

    return (
        <Card>
            <Card.Header>
                <p>Add Owner</p>
            </Card.Header>
            <Card.Body>
                <Form onSubmit={(e) => {
                    e.preventDefault();
                    addHomeOwner(getFormData())
                    .then(json => {
                        setAccount(json);
                        getActive(json, active, setActive);
                    })
                    .then(() => clearForm('Home owner Added.'))
                }}>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control ref={firstNameRef} type='text' />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control ref={lastNameRef} type='text' />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Address (line 1)</Form.Label>
                                <Form.Control ref={address1Ref} type='text' />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Address (line 2)</Form.Label>
                                <Form.Control ref={address2Ref} type='text' />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>City</Form.Label>
                                <Form.Control ref={cityRef} type='text' />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>State</Form.Label>
                                <Form.Control ref={stateRef} type='text' />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Zip</Form.Label>
                                <Form.Control ref={zipRef} type='text' />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Phone</Form.Label>
                                <Form.Control ref={phoneRef} type='text' />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control ref={emailRef} type='text' />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Emergency Contact Name</Form.Label>
                                <Form.Control ref={emergencyNameRef} type='text' />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Emergency Contact Phone</Form.Label>
                                <Form.Control ref={emergencyPhoneRef} type='text' />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Ownership (%)</Form.Label>
                                <Form.Control ref={ownershipRef} type='number' />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Monthly Dues ($)</Form.Label>
                                <Form.Control ref={duesRef} type='number' />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Note</Form.Label>
                                <Form.Control ref={noteRef} type='text' />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button type='submit'>Submit</Button>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default AddOwner;