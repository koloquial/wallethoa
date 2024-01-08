//state
import { useState, useRef } from 'react'
import SelectDate from '../SelectDate';
import { useAccount } from '../../contexts/AccountContext';

//style
import { Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

//functions
import AddSlip from '../AddSlip';

const AddExpense = ({ quick }) => {
    return (
        <Card>
            <Card.Header>
                <Row>
                    <Col><p>Add Expense</p></Col>
                    <Col style={{textAlign: 'right', paddingRight: '25px'}}>
                        {quick ? <Link to='/expenses'>View Expenses</Link> : <></>}
                    </Col>
                </Row>
            </Card.Header>
            <Card.Body>
                <AddSlip slip={'expense'} />
            </Card.Body>
        </Card>
    )
}

export default AddExpense;