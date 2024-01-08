//state
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useAccount } from '../../contexts/AccountContext';

//style
import { Card, Container,} from 'react-bootstrap';

//components
import Loading from '../../components/Loading';
import Navigation from '../../components/Navigation';
import ActiveSheet from '../../components/ActiveSheet';

//requests
import { assignAccounts } from '../../requests/assignAccounts';
import Overview from '../../components/Overview';

//functions
import getExpenseTotal from '../../functions/getExpenseTotal';
import AddExpense from '../../components/AddExpense';
import ExpensesList from '../../components/ExpensesList';
import ListSlips from '../../components/ListSlips';

const Expenses = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const { currentUser, logout } = useAuth();
    const { account, setAccount, active, setActive } = useAccount();

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
                        <ListSlips type={'expenses'} />
                    </Container>
                </>
            }
        </>
    )
}

export default Expenses;