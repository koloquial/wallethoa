//style
import { Card, Button } from 'react-bootstrap';

//icons
import { GrView } from "react-icons/gr";

//state
import { useAccount } from '../../contexts/AccountContext'

const ExpensesList = () => {
    const { active } = useAccount();

    return (
        <Card>
            <Card.Header>
                <p>Expenses</p>
            </Card.Header>
            <Card.Body>
                <table>
                    <thead>
                        <tr>
                            <th style={{textAlign: 'center'}}>Post Date</th>
                            <th style={{textAlign: 'center'}}>Amount</th>
                            <th style={{textAlign: 'center'}}>View/Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                    {active.expenses.map((item, index) => {
                        return (
                            <tr key={`expense-list-${item.postDate}-${index}`}>
                                <td style={{textAlign: 'center'}}>{item.postDate.split('T')[0]}</td>
                                <td style={{textAlign: 'center'}}>${Number(item.amount).toFixed(2)}</td>
                                <td style={{textAlign: 'center'}}><Button size="sm" onClick={() => console.log('test')}><GrView /></Button></td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </Card.Body>
        </Card>
    )
}

export default ExpensesList;