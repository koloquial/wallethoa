//state
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useAccount } from '../../contexts/AccountContext';

//style
import { Card, Container, Row, Col, Button } from 'react-bootstrap';

//components
import Loading from '../../components/Loading';
import Navigation from '../../components/Navigation';
import ActiveSheet from '../../components/ActiveSheet';
import ChartGraph from '../../components/ChartGraph'

//requests
import { assignAccounts } from '../../requests/assignAccounts';
import Deposits from '../../components/Deposits';
import Overview from '../../components/Overview';

//functions
import getIncomeTotal from '../../functions/getIncomeTotal';
import getExpenseTotal from '../../functions/getExpenseTotal';
import AddExpense from '../../components/AddExpense';
import ExpensesList from '../../components/ExpensesList';

const Expenses = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const { currentUser, logout } = useAuth();
    const { account, setAccount, active, setActive } = useAccount();

    const navigate = useNavigate();

    const getDataset = () => {
        let data = [];
        active.income.forEach(item => {
            data.push({data: Number(item.amount).toFixed(2), label: item.type})
        })
        return data;
    }

    useEffect(() => {
        assignAccounts(currentUser)
        .then(json => {
            setAccount(json);
            setActive(json.sheets[json.sheets.length - 1])
            setLoading(false);
        })
    }, [])

    return (
        <>
            {loading ? <Loading /> : 
                <>
                    <Navigation />
                    {active ? <ActiveSheet /> : <></>}
                    <Container>
                        <Overview data={{
                            title: "Expense Overview",
                            content: [
                                {
                                    label: 'Expenses Paid', 
                                    value: `$${getExpenseTotal(active).toFixed(2)}`
                                },
                            ],
                            graph: [
                                {label: 'Expense', data: getExpenseTotal(active).toFixed(2)},
                            ]
                        }} />
                        <AddExpense />
                        <ExpensesList />
                    </Container>
                </>
            }
        </>
    )
}

export default Expenses;