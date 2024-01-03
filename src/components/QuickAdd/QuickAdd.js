//state
import { useState } from 'react';
import { useAccount } from '../../contexts/AccountContext'

//style
import { Card, Tabs, Tab } from 'react-bootstrap'; 

//components
import AddIncome from '../AddIncome';
import AddExpense from '../AddExpense';

const QuickAdd = () => {
    const [tabKey, setTabKey] = useState('income');
    const { account, setAccount, active, setActive } = useAccount();
    
    return (
        <Card>
            <Card.Header>
                <p>Quick Add</p>
            </Card.Header>
            <Card.Body>
                <Tabs
                    id="income-expense-tabs"
                    activeKey={tabKey}
                    onSelect={(k) => setTabKey(k)}> 

                    <Tab eventKey="income" title="Income">
                        <AddIncome quick={true} />
                    </Tab>

                    <Tab eventKey="expense" title="Expense">
                        <AddExpense quick={true} />
                    </Tab>
                </Tabs>
            </Card.Body>
        </Card>
    )
}

export default QuickAdd;