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
import Overview from '../../components/Overview';
import AddSlip from '../../components/AddSlip';

//requests
import { assignAccounts } from '../../requests/assignAccounts';

//functions
import { getGraphData } from '../../functions/getGraphData';
import ListSlips from '../../components/ListSlips';

const Expenses = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const { currentUser } = useAuth();
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
                            title: "Expenses Overview",
                            array: active.expenses,
                            })} />
                        <AddSlip slip={'expenses'} />
                        <ListSlips type={'expenses'} />
                    </Container>
                </>
            }
        </>
    )
}

export default Expenses;