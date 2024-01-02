import { Container, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

import Navigation from '../../components/Navigation';
import Loading from '../../components/Loading';
import CreateHOA from '../../components/CreateHOA';
import CreateSheet from '../../components/CreateSheet';
import ActiveSheet from '../../components/ActiveSheet';

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { currentUser, logout } = useAuth();
    const [account, setAccount] = useState();
    const [activeSheet, setActiveSheet] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        console.log('current user uid:', currentUser.uid)
        if(currentUser){
            getUserAccount()
        }
    }, [])

    function getUserAccount(){
        fetch(`http://localhost:5000/users/${currentUser.uid}`)
        .then(res => res.json(res))
        .then(json => {
            console.log('get user:', json)
            if(Object.keys(json).length === 0){
                createUserAccount();
            }else{
                console.log('set account', json)
                setAccount(json);
                setActiveSheet(json.sheets[json.sheets.length - 1])
                setLoading(false);
            }
        })
        .catch(err => console.log('err', err))
    }

    function createUserAccount(){
        fetch(`http://localhost:5000/users/add-account`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({
                uid: currentUser.uid,
                admin: currentUser.email
            })
        })
        .then(res => res.json())
        .then(json => {
            console.log('set account', json)
            setAccount(json);
            setLoading(false);
        })
        .catch(err => console.log('err', err))
    }

    return (
        <>
            {loading ? <Loading /> : 
                <>
                    <Navigation />
                    {activeSheet ? 
                        <ActiveSheet 
                            account={account}
                            sheet={activeSheet}
                            setActiveSheet={setActiveSheet}
                            /> : <></>}

                        <Container>
                            {!account.hoaName ? 
                                <CreateHOA 
                                    uid={currentUser.uid}
                                    setAccount={setAccount} 
                                /> : <></>}
                            
                            {account.hoaName && !account.sheets.length ? 
                                <CreateSheet
                                    uid={currentUser.uid}
                                    setAccount={setAccount}
                                    setActiveSheet={setActiveSheet}
                                /> : <></>}

                            {activeSheet ? 
                                <>
                                    Starting Balance: $ {Number(activeSheet.startingBalance).toFixed(2)}
                                </> : <></>}
                        </Container>
                </>
            }
        </>
    )
}

export default Dashboard;