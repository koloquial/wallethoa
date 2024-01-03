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
import { getAccount } from '../../requests/getAccount';
import { addAccount } from '../../requests/addAccount';

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    const { currentUser, logout } = useAuth();
    const { account, setAccount, active, setActive } = useAccount();

    const navigate = useNavigate();

    useEffect(() => {
        if(currentUser){
            getAccount(currentUser.uid)
            .then(json => {
                if(!Object.keys(json).length){
                    addAccount(currentUser.uid, currentUser.email)
                    .then(json => setAccount(json))
                    .then(() => setLoading(false))
                }else{
                    setAccount(json)
                    setActive(json.sheets[json.sheets.length - 1])
                }
            })
            .then(() => setLoading(false))
        }
    }, [])

    console.log('Account (Dashboard):', account)
    console.log('Active (Dashboard):', active)

    return (
        <>
            {loading ? <Loading /> : 
                <>
                    <Navigation />

                    {active ? <ActiveSheet /> : <></>}

                        <Container>
                            {!account.hoaName ? <CreateHOA /> : <></>}

                            {account.hoaName && !account.sheets.length ? <CreateSheet/> : <></>}

                            {active ? 
                                <>
                                    <Overview />
                                    <QuickAdd />
                                </>
                                : <></>
                            }
                        </Container>
                </>
            }
        </>
    )
}

export default Dashboard;