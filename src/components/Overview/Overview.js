//state
import { useAccount } from '../../contexts/AccountContext';

//style
import { Row, Col, Card } from 'react-bootstrap';

//functions
import getIncomeTotal from '../../functions/getIncomeTotal';
import getExpenseTotal from '../../functions/getExpenseTotal';

//components
import ChartGraph from '../ChartGraph';
import { useEffect, useState } from 'react';

const Overview = () => {
    const { account, setAccount, active, setActive } = useAccount();
    const [incomeTotal, setIncomeTotal] = useState(getIncomeTotal(active))
    const [expenseTotal, setExpenseTotal] = useState(getExpenseTotal(active))

    useEffect(() => {
        setIncomeTotal(getIncomeTotal(active).toFixed(2))
        setExpenseTotal(getExpenseTotal(active).toFixed(2))
    })

    return (
        <Card>
            <Card.Header>
                <p>Overview</p>
            </Card.Header>
            <Card.Body>
                <Row>
                    <Col>
                        <p><b>Starting Balance:</b> ${Number(active.startingBalance).toFixed(2)}</p>
                        <p><b>Income Received:</b> ${incomeTotal}</p>
                        <p><b>Expenses Paid:</b> ${expenseTotal}</p>
                    </Col>
                    <Col xs={6} style={{textAlign: 'center'}}>
                        {incomeTotal > 0 || expenseTotal > 0 ? 
                            <ChartGraph 
                                dataset={
                                [
                                    {data: incomeTotal, label: 'Income'}, 
                                    {data: expenseTotal, label: 'Expenses'}
                                ]
                            }/> : <p><i>Add an entry to Income or Expense to show chart.</i></p>}
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}

export default Overview;