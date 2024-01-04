//state
import { useState, useRef } from 'react'
import SelectDate from '../SelectDate';
import { useAccount } from '../../contexts/AccountContext';

//style
import { Card, Form, Button, Row, Col, InputGroup, Dropdown, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

//components
import Popup from '../Popup';
import AddExpenseType from '../AddExpenseType';
import AddExpensePayee from '../AddExpensePayee';

//requests
import { addExpense } from '../../requests/addExpense';

//functions
import getActive from '../../functions/getActive';

const AddExpense = ({ quick }) => {
    //inputs
    const amountRef = useRef();
    const noteRef = useRef('');
    const [type, setType] = useState('');
    const [payee, setPayee] = useState('');
    const [datePick, setDatePick] = useState(new Date());
    const [popupType, setPopupType] = useState('');

    //state
    const { account, setAccount, active, setActive } = useAccount();
    const [showModal, setShowModal] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState('');

    const clearForm = (message) =>{
        setType('')
        setAlertMsg(message);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 2500);
        noteRef.current.value = '';
        amountRef.current.value = null;
        setDatePick(new Date());
    }


    return (
        <Card>
            {popupType === 'type' ? 
                <Popup 
                    showModal={showModal} 
                    setShowModal={setShowModal}
                    header="Create/Edit Expense Type"
                    body={<AddExpenseType />}
                /> : <></>
            }

            {popupType === 'payee' ? 
                <Popup 
                    showModal={showModal} 
                    setShowModal={setShowModal}
                    header="Create/Edit Expense Payee"
                    body={<AddExpensePayee />}
                /> : <></>
            }
            <Card.Header>
                <Row>
                    <Col><p>Add Expense</p></Col>
                    <Col style={{textAlign: 'right', paddingRight: '25px'}}>
                        {quick ? <Link to='/expenses'>View Expenses</Link> : <></>}
                    </Col>
                </Row>
            </Card.Header>
            <Card.Body>
                {showAlert ? <Alert variant='success'>{alertMsg}</Alert> : <></>}
                <p>Select Date:</p>
                <SelectDate datePick={datePick} setDatePick={setDatePick}/>
                <br /><br />

                <Form onSubmit={(e) => {
                    e.preventDefault();
                    addExpense(account.uid, active, datePick, type, payee, noteRef.current.value, amountRef.current.value)
                    .then(json => {
                        setAccount(json);
                        getActive(json, active, setActive);
                    })
                    .then(() => clearForm('Expense added.'))
                }}>
                    <Form.Label>Select Type</Form.Label>
                    
                    <InputGroup>
                        <Dropdown onSelect={(e) => setType(e)}>                     
                            <Dropdown.Toggle size="sm">
                                {type ? type : 'Select Type'}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {account.expenseTypes.map((type, index) => {
                                    return <Dropdown.Item key={`${type}-${index}-type-dropdown`} eventKey={type}>{type}</Dropdown.Item>
                                })}
                            </Dropdown.Menu>
                            &nbsp;&nbsp;
                            <Button onClick={() => {
                                setShowModal(true);
                                setPopupType('type');
                            }}>Create/Edit Type</Button>
                        </Dropdown>
                    </InputGroup>

                    <Form.Label>Select Payee</Form.Label>
                    
                    <InputGroup>
                        <Dropdown onSelect={(e) => setPayee(e)}>                     
                            <Dropdown.Toggle size="sm">
                                {payee ? payee : 'Select Payee'}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {account.expensePayees.map((type, index) => {
                                    return <Dropdown.Item key={`${type}-${index}-payee-dropdown`} eventKey={type}>{type}</Dropdown.Item>
                                })}
                            </Dropdown.Menu>
                            &nbsp;&nbsp;
                            <Button onClick={() => {
                                setShowModal(true);
                                setPopupType('payee');
                            }}>Create/Edit Payee</Button>
                        </Dropdown>
                    </InputGroup>
                  
                    <Form.Group>
                        <Form.Label>Enter Amount <i>($0.00)</i></Form.Label>
                        <Form.Control type="number" step=".01" id="amount" ref={amountRef}></Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Enter Note</Form.Label>
                        <Form.Control type="text" id="note" ref={noteRef}></Form.Control>
                    </Form.Group>

                    <Button type="submit">Submit</Button>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default AddExpense;