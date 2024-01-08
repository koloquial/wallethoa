//style
import { Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

//components
import AddSlip from '../AddSlip';

const AddDeposit = ({ quick }) => {
    return (
        <Card>
            <Card.Header>
                <Row>
                    <Col><p>Add Deposit</p></Col>
                    <Col style={{textAlign: 'right', paddingRight: '25px'}}>
                        {quick ? <Link to='/income'>View Income</Link> : <></>}
                    </Col>
                </Row>
            </Card.Header>
            <Card.Body>    
                <AddSlip slip={'deposit'} />
            </Card.Body>
        </Card>
    )
}

export default AddDeposit;