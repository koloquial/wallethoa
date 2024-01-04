//state
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { AccountProvider, useAccount } from '../../contexts/AccountContext';

//style
import { Card, Container, Row, Col, Button } from 'react-bootstrap';

//components
import Loading from '../../components/Loading';
import Navigation from '../../components/Navigation';
import ActiveSheet from '../../components/ActiveSheet';

//requests
import { assignAccounts } from '../../requests/assignAccounts';

import { saveFile } from '../../functions/saveFile';

const Backup = () => {
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
                        <Card>
                            <Card.Header>
                                Backup
                            </Card.Header>
                            <Card.Body>
                                <p>Backup your account onto your hard drive by clicking on a button below to select a format to download your raw account files.  This file will contain all information stored on WalletHOA servers.</p>
                                <center>
                                    <Row>
                                        <Col><Button onClick={() => saveFile(`WalletHOA-${account.hoaName}-${new Date()}.json`, account)}>*.json</Button></Col>
                                        <Col><Button onClick={() => saveFile(`WalletHOA-${account.hoaName}-${new Date()}.txt`, account)}>*.txt</Button></Col>
                                    </Row>
                                </center>
                            </Card.Body>
                        </Card>
                    </Container>
                </>
            }
        </>
    )
}

export default Backup;