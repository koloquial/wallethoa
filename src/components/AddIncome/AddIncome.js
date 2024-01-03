//state
import { useState, useRef } from 'react'
import SelectDate from '../SelectDate';
import { useAccount } from '../../contexts/AccountContext';

//style
import { Card, Form, Button, Row, Col, InputGroup, Dropdown, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

//components
import PopUp from '../Popup';
import AddIncomeType from '../AddIncomeType';

//requests
import { addDeposit } from '../../requests/addDeposit';

const AddIncome = ({ quick }) => {
    //inputs
    const amountRef = useRef();
    const noteRef = useRef('');
    const [type, setType] = useState('');
    const [datePick, setDatePick] = useState(new Date())

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

    const getActive = (sheet) => {
        console.log('sheet', sheet)
        for(let i = 0; i < account.sheets.length; i++){
            if(account.sheets[i].name === sheet.name){
                return account.sheets[i];
            }
        }
    }

    return (
        <Card>
            <PopUp 
                showModal={showModal} 
                setShowModal={setShowModal}
                header="Create/Edit Income Type"
                body={<AddIncomeType />}
             />
            <Card.Header>
                <Row>
                    <Col><p>Add Income</p></Col>
                    <Col style={{textAlign: 'right', paddingRight: '25px'}}>
                        {quick ? <Link to='/income'>View Income</Link> : <></>}
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
                    addDeposit(account.uid, active, datePick, type, noteRef.current.value, amountRef.current.value)
                    .then(json => {
                        setAccount(json);
                        setActive(getActive(json))
                    })
                    .then(() => clearForm('Deposit added.'))
                }}>
                    <Form.Label>Select Type</Form.Label>
                    
                    <InputGroup>
                        <Dropdown onSelect={(e) => setType(e)}>                     
                            <Dropdown.Toggle size="sm">
                                {type ? type : 'Select Type'}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {account.incomeTypes.map((type, index) => {
                                    return <Dropdown.Item key={`${type}-${index}-dropdown`} eventKey={type}>{type}</Dropdown.Item>
                                })}
                            </Dropdown.Menu>
                            &nbsp;&nbsp;
                            <Button onClick={() => setShowModal(true)}>Create/Edit Type</Button>
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

export default AddIncome;