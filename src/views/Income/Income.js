//state
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useAccount } from '../../contexts/AccountContext';

//style
import { Container } from 'react-bootstrap';

//components
import Loading from '../../components/Loading';
import Navigation from '../../components/Navigation';
import ActiveSheet from '../../components/ActiveSheet';

//requests
import { assignAccounts } from '../../requests/assignAccounts';
import Deposits from '../../components/Deposits';
import Overview from '../../components/Overview';

//functions
import AddIncome from '../../components/AddIncome';
import { getGraphData } from '../../functions/getGraphData';

const Income = () => {
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
                        <Overview colors={true} data={getGraphData({
                            title: "Income Overview",
                            array: active.income,
                            })} />
                        <AddIncome />
                        <Deposits />
                    </Container>
                </>
            }
        </>
    )
}

export default Income;