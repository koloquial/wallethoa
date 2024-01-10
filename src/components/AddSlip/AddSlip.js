//state
import { useState, useRef } from 'react';
import { useAccount } from '../../contexts/AccountContext';

//style
import { Form, Button, Alert, Card, Row, Col } from 'react-bootstrap'

//functions
import getActive from '../../functions/getActive';

//requests
import { addSlip } from '../../requests/addSlip';

//components
import Popup from '../Popup';
import SelectDate from '../SelectDate';
import AddType from '../AddType';

const AddSlip = ({ slip }) => {
    //inputs
    const amountRef = useRef();
    const noteRef = useRef('');
    const [type, setType] = useState('');
    const [payee, setPayee] = useState('');
    const [datePick, setDatePick] = useState(new Date());

    //state
    const { account, setAccount, active, setActive } = useAccount();
    const [alertMsg, setAlertMsg] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [popupData, setPopupData] = useState('');

    const clearForm = (message) =>{
        setType('');
        setAlertMsg(message);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 2500);
        noteRef.current.value = '';
        amountRef.current.value = null;
        setDatePick(new Date());
    }

    const handleSubmit = (e) =>{
        e.preventDefault();

        let note;
        if(noteRef.current.value.length){
            note = {date: new Date(), content: noteRef.current.value}
        }

        addSlip(
            account.uid, 
            active, 
            slip,
            datePick, 
            type, 
            payee, 
            note,
            amountRef.current.value)
            .then(json => {
                setAccount(json);
                getActive(json, active, setActive);
            })
            .then(() => clearForm('Slip added.'))
    }

    const getHeader = () => {
        switch(popupData){
            case 'incomeTypes': return 'Create/Edit Deposit Type';
            case 'expensesTypes': return 'Create/Edit Expense Type';
            case 'expensesPayees': return 'Create/Edit Payee Name';
            default: return 'Edit';
        }
    }

    return (
        <>
            <Popup 
                showModal={showModal} 
                setShowModal={setShowModal}
                header={getHeader()}
                body={<AddType type={popupData} />}
            />

             <Card>
                <Card.Header>
                    <Row>
                        <Col><p>Add {slip === 'income' ? 'Income' : 'Expense'}</p></Col>
                    </Row>
                </Card.Header>
                <Card.Body>     

            <Form onSubmit={handleSubmit}>
                {showAlert ? <Alert variant='success'>{alertMsg}</Alert> : <></>}

                <SelectDate datePick={datePick} setDatePick={setDatePick}/>

                <Form.Group>
                    <Form.Label>Select Type</Form.Label>
                    <Form.Select onChange={(e) => setType(e.target.value)}>
                        <option key={'default-val'}>Select Type</option>
                            {account[`${slip}Types`] && account[`${slip}Types`] && account[`${slip}Types`].map((type, index) => {
                                return <option key={`${type}-${index}-${slip}-type`}>{type}</option>
                            })}
                    </Form.Select>
                    <Button onClick={() => {
                        setShowModal(true);
                        setPopupData(`${slip}Types`);
                    }}>Create/Edit Type</Button>
                </Form.Group>


                {slip === 'expenses' ? 
                    <Form.Group>
                        <Form.Label>Select Payee</Form.Label>
                        <Form.Select onChange={(e) => setPayee(e.target.value)}>
                            <option key={'default-val'}>Select Payee</option>
                                {account.expensesPayees && account.expensesPayees.map((type, index) => {
                                    return <option key={`${type}-${index}-expense-payee`}>{type}</option>
                                })}
                        </Form.Select>
                        <Button onClick={() => {
                            setShowModal(true);
                            setPopupData('expensesPayees');
                            }}>Create/Edit Payee</Button>
                    </Form.Group> : <></>
                }
                
                <Form.Group>
                    <Form.Label>Enter Amount <i>($0.00)</i></Form.Label>
                    <Form.Control type="number" step=".01" id="amount" ref={amountRef} required></Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Enter Note</Form.Label>
                    <Form.Control type="text" id="note" ref={noteRef}></Form.Control>
                </Form.Group>

                <Button type='submit'>Submit</Button>
            </Form>
            </Card.Body>
            </Card>
        </>
    )
}

export default AddSlip;