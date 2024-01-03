//state
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

//style
import { Container } from 'react-bootstrap';

//components
import Loading from '../../components/Loading';
import Navigation from '../../components/Navigation';
import ActiveSheet from '../../components/ActiveSheet';

const Expenses = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [account, setAccount] = useState();
    const [activeSheet, setActiveSheet] = useState();
    const { currentUser, logout } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        if(currentUser){
            getUserAccount()
        }
    }, [])

    useEffect(() => {
        if(account){
            for(let i = 0; i < account.sheets.length; i++){
                if(account.sheets[i].name === activeSheet.name){
                    setActiveSheet(account.sheets[i])
                }
            }
        }
       
    }, [account])

    function getUserAccount(){
        //get user account via uid
        fetch(`http://localhost:5000/users/${currentUser.uid}`)
        .then(res => res.json(res))
        .then(json => {
            //check if response has length
            if(Object.keys(json).length === 0){
                //if no length, create new user account
                createUserAccount();
            }else{
                //if response has length, set account
                setAccount(json);
                //check if any sheets on account
                if(json.sheets.length){
                    //set active sheet to newest in sheet array
                    setActiveSheet(json.sheets[json.sheets.length - 1])
                }
                //set loading to false
                setLoading(false);
            }
        })
        .catch(err => console.log('err', err))
    }

    function createUserAccount(){
        //create user account with admin email and uid
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
            //set active account
            setAccount(json);
            //set loading to false
            setLoading(false);
        })
        .catch(err => console.log('err', err))
    }

    console.log('Account', account)

    return (
        <>
            {loading ? <Loading /> : 
                <>
                    <Navigation />
                    <Container>

                    </Container>
                </>
            }
        </>
    )
}

export default Expenses;