//state
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useAccount } from '../../contexts/AccountContext';

//style
import { Container } from 'react-bootstrap';

//components
import Loading from '../../components/Loading';
import Navigation from '../../components/Navigation';
import CreateHOA from '../../components/CreateHOA';
import CreateSheet from '../../components/CreateSheet';
import ActiveSheet from '../../components/ActiveSheet';
import Overview from '../../components/Overview';
import QuickAdd from '../../components/QuickAdd';

//requests
import { assignAccounts } from '../../requests/assignAccounts';

//functions
import getIncomeTotal from '../../functions/getIncomeTotal';
import getExpenseTotal from '../../functions/getExpenseTotal';
import getTotalSum from '../../functions/getTotalSum';

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    const { currentUser } = useAuth();
    const { account, setAccount, active, setActive } = useAccount();
    
    const navigate = useNavigate();

    useEffect(() => {
        assignAccounts(currentUser)
        .then(json => {
            console.log('json', json)
            setAccount(json);
            setActive(json.sheets[json.sheets.length - 1])
            setLoading(false);
        })
    }, [])

    return (
        <>
            {loading ? <Loading /> : 
                <>
                    {active ? <><Navigation /><ActiveSheet /></> : <></>}
                    <Container>
                        {!account.hoaName ? <CreateHOA /> : <></>}
                        {!account.sheets.length ? <CreateSheet/> : <></>}
                        {active ? 
                            <>
                                <Overview data={{
                                    title: "Overview",
                                    content: [
                                        {
                                            label: 'Starting Balance', 
                                            value: `$${Number(active.startingBalance).toFixed(2)}`
                                        },
                                        {
                                            label: 'Income Received', 
                                            value: `$${getIncomeTotal(active).toFixed(2)}`
                                        },
                                        {
                                            label: 'Expenses Paid', 
                                            value: `$${getExpenseTotal(active).toFixed(2)}`
                                        },
                                        {
                                            label: 'Current Balance', 
                                            value: `$${getTotalSum(active)}`,
                                        }
                                    ],
                                    graph: [
                                        {label: 'Income', data: getIncomeTotal(active).toFixed(2)},
                                        {label: 'Expense', data: getExpenseTotal(active).toFixed(2)}
                                    ]
                                }} />
                                <QuickAdd />
                            </> : <></>
                        }
                    </Container>
                </>
            }
        </>
    )
}

export default Dashboard;