//state
import { useState, useRef } from 'react';
import { useAccount } from '../../contexts/AccountContext';

//style
import { Form, Button, Alert } from 'react-bootstrap'

//functions
import getActive from '../../functions/getActive';

//requests
import { addDeposit } from '../../requests/addDeposit';
import { addExpense } from '../../requests/addExpense';

//components
import Popup from '../Popup';
import SelectDate from '../SelectDate';
import AddType from '../AddType';


const AddSlip = ({ slip }) => {
    //inputs
    const amountRef = useRef();
    const noteRef = useRef('');
    const typeNameRef = useRef('');
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

        if(slip === 'deposit'){
            addDeposit(account.uid, active, datePick, type, {date: new Date(), content: noteRef.current.value}, amountRef.current.value)
            .then(json => {
                setAccount(json);
                getActive(json, active, setActive);
            })
            .then(() => clearForm('Deposit added.'));
        }

        if(slip === 'expense'){
            addExpense(account.uid, active, datePick, type, payee, noteRef.current.value, amountRef.current.value)
            .then(json => {
                setAccount(json);
                getActive(json, active, setActive);
            })
            .then(() => clearForm('Expense added.'))
        }
    }

    const getHeader = () => {
        switch(popupData){
            case 'incomeTypes': return 'Create/Edit Deposit Type';
            case 'expenseTypes': return 'Create/Edit Expense Type';
            case 'expensePayees': return 'Create/Edit Payee Name';
            default: return 'Edit'
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

            <Form onSubmit={handleSubmit}>
                {showAlert ? <Alert variant='success'>{alertMsg}</Alert> : <></>}

                <SelectDate datePick={datePick} setDatePick={setDatePick}/>

                {slip === 'deposit' ? 
                    <Form.Group>
                        <Form.Label>Select Type</Form.Label>
                        <Form.Select onChange={(e) => setType(e.target.value)}>
                            {account.incomeTypes.map((type, index) => {
                                return <option key={`${type}-${index}-deposit-type`}>{type}</option>
                            })}
                        </Form.Select>
                        <Button onClick={() => {
                            setShowModal(true);
                            setPopupData('incomeTypes');
                        }}>Create/Edit Type</Button>
                    </Form.Group>
                    :
                    <Form.Group>
                        <Form.Label>Select Type</Form.Label>
                        <Form.Select onChange={(e) => setType(e.target.value)}>
                            {account.expenseTypes.map((type, index) => {
                                return <option key={`${type}-${index}-expense-type`}>{type}</option>
                            })}
                        </Form.Select>
                        <Button onClick={() => {
                            setShowModal(true);
                            setPopupData('expenseTypes');
                        }}>Create/Edit Type</Button>
                    </Form.Group>
                }

                {slip == 'expense' ? 
                    <Form.Group>
                        <Form.Label>Select Payee</Form.Label>
                        <Form.Select onChange={(e) => setType(e.target.value)}>
                            {account.expensePayees.map((type, index) => {
                                    return <option key={`${type}-${index}-expens-payee`}>{type}</option>
                                })}
                        </Form.Select>
                        <Button onClick={() => {
                            setShowModal(true);
                            setPopupData('expensePayees');
                            }}>Create/Edit Payee</Button>
                    </Form.Group> : <></>
                }
                
                <Form.Group>
                    <Form.Label>Enter Amount <i>($0.00)</i></Form.Label>
                    <Form.Control type="number" step=".01" id="amount" ref={amountRef}></Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Enter Note</Form.Label>
                    <Form.Control type="text" id="note" ref={noteRef}></Form.Control>
                </Form.Group>

                <Button type='submit'>Submit</Button>
            </Form>
        </>
    )
}

export default AddSlip;