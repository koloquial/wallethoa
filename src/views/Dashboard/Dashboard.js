import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

import Navigation from '../../components/Navigation';
import Loading from '../../components/Loading';
import CreateHOA from '../../components/CreateHOA'

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { currentUser, logout } = useAuth();
    const [userData, setUserData] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        if(currentUser){
            getUser();
        }
    }, [])

    const createNewUser = () => {
        fetch(`${process.env.MONGODB_URI}/users/add`, {
            method: 'POST',
            body: JSON.stringify({
              uid: currentUser.uid
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          })
         .then(res => res.json())
         .then(json => {
             setUserData(json);
             setLoading(false);
        });
    }

    const getUser = () => {
        fetch(`${process.env.MONGODB_URI}/users/${currentUser.uid}`)
        .then(res => res.json())
        .then(json => {
            if(json === null){
                createNewUser()
            }else{
                setUserData(json);
                setLoading(false);
            }
        })
    }

    return (
        <>
        {loading ? <Loading /> : <>

        {!userData.hoaName ? <CreateHOA uid={currentUser.uid} /> : <></>}

            <Navigation />
            <p>Dashboard</p>
            <p><b>Email:</b> {currentUser && currentUser.email}</p>
            <Link to='/update-profile'>Update Profile</Link>

        </>
        }
            
        </>
    )
}

export default Dashboard;