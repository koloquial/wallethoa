//state
import { useEffect, useState, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useAccount } from '../../contexts/AccountContext';

//style
import { Card, Container, Form, Button, Row, Col } from 'react-bootstrap';

//components
import Loading from '../../components/Loading';
import Navigation from '../../components/Navigation';
import ActiveSheet from '../../components/ActiveSheet';
import AddOwner from '../../components/AddOwner';

//requests
import { assignAccounts } from '../../requests/assignAccounts';

//functions
import getActive from '../../functions/getActive'

const HomeOwners = () => {
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

    const addHomeOwner = () => {

    }

    const clearForm = () => {

    }

    return (
        <>
            {loading ? <Loading /> : 
                <>
                    {active ? <><Navigation /><ActiveSheet /></> : <></>}
                    <Container>
                        <Card>
                            <Card.Header>
                                <p>Home Owners</p>
                            </Card.Header>
                            <Card.Body>
                                <table>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {account.homeOwners.map(owner => {
                                            return (
                                                <tr>
                                                    <td>{owner.name}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </Card.Body>
                        </Card>

                        <AddOwner />

                        
                    </Container>
                </>}
            </>
    )
}

export default HomeOwners;