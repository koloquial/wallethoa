//state
import { useState, useRef } from 'react'
import { Link } from 'react-router-dom';
import { useAccount } from '../../contexts/AccountContext';
import { useAuth } from '../../contexts/AuthContext';

//style
import { Card, Form, Button, Row, Col, InputGroup, Dropdown, DropdownButton } from 'react-bootstrap';

//components
import SelectDate from '../SelectDate';
import Popup from '../Popup';
import AddExpenseType from '../AddExpenseType';
import AddExpensePayee from '../AddExpensePayee';

//requests
import { addExpense } from '../../requests/addExpense';

const AddExpense = ({ quick }) => {
    const [datePick, setDatePick] = useState(new Date())
    const [popupType, setPopupType] = useState();
    const [showModal, setShowModal] = useState(false);

    //inputs
    const amountRef = useRef();
    const noteRef = useRef('');
    const [type, setType] = useState('');
    const [payee, setPayee] = useState('');

    //state
    const { account, setAccount, active, setActive } = useAccount();
    const { currentUser } = useAuth();

    const clearForm = (message) => {
        setType('')
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
                        {quick ? <Link to='/expense'>View Expenses</Link> : <></>}
                    </Col>
                </Row>
            </Card.Header>
            <Card.Body>
                <p>Select Date:</p>
                <SelectDate datePick={datePick} setDatePick={setDatePick}/>
                <br /><br />

                <Form onSubmit={(e) => {
                    e.preventDefault();
                    addExpense(currentUser.uid, active, datePick, type, payee, noteRef.current.value, amountRef.current.value)
                    .then(json => setAccount(json))
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
                                    return <Dropdown.Item key={`${type}-${index}-dropdown`} eventKey={type}>{type}</Dropdown.Item>
                                })}
                            </Dropdown.Menu>
                            &nbsp;&nbsp;
                            <Button onClick={() => {
                                setPopupType('type');
                                setShowModal(true);
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
                                setPopupType('payee');
                                setShowModal(true);
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