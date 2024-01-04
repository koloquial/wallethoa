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
import getActive from '../../functions/getActive';

//icons
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import { IoIosCheckmarkCircle } from "react-icons/io";

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
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>View/Edit</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {account.homeOwners.map(owner => {
                                            return (
                                                <tr>
                                                    <td style={{textAlign: 'center'}}>{owner.address1}</td>
                                                    <td style={{textAlign: 'center'}}>{owner.address2}</td>
                                                    <td style={{textAlign: 'center'}}><Button size="sm" onClick={() => console.log('edit')}><CiEdit /></Button></td>
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