//state
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useAccount } from '../../contexts/AccountContext';

//style
import { Card, Container, Row, Col, Button } from 'react-bootstrap';

//components
import Loading from '../../components/Loading';
import Navigation from '../../components/Navigation';
import ActiveSheet from '../../components/ActiveSheet';
import ChartGraph from '../../components/ChartGraph'

//icons
import { GrView } from "react-icons/gr";

const Income = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { currentUser, logout } = useAuth();
    const { account, setAccount, active, setActive } = useAccount();

    const navigate = useNavigate();

    const getDataset = () => {
        let data = [];
        active.income.forEach(item => {
            data.push({data: Number(item.amount).toFixed(2), label: item.type})
        })
        return data;
    }

    return (
        <>
            {loading ? <Loading /> : 
                <>
                    <Navigation />
                    {active ? 
                        <ActiveSheet 
                            account={account}
                            sheet={active}
                            setActive={setActive}
                            /> : <></>}
                    <Container>
                    
                        <Card>
                            <Card.Header>
                                <p>Income Overview</p>
                            </Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col>
                                    <p><b>Total Income:</b></p>
                                    </Col>
                                    <Col xs={6} style={{textAlign: 'center'}}><ChartGraph dataset={getDataset()} /></Col>
                                </Row>
                            </Card.Body>
                        </Card>

                        <Card>
                            <Card.Header>
                                <p>Deposits</p>
                            </Card.Header>
                            <Card.Body>
                                <table>
                                    <thead>
                                        <tr>
                                            <th style={{textAlign: 'center'}}>Post Date</th>
                                            <th style={{textAlign: 'center'}}>Amount</th>
                                            <th style={{textAlign: 'center'}}>View/Edit</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {active.income.map((item, index) => {
                                        return (
                                            <tr key={`list-${item.postDate}-${index}`}>
                                                <td style={{textAlign: 'center'}}>{item.postDate.split('T')[0]}</td>
                                                <td style={{textAlign: 'center'}}>${Number(item.amount).toFixed(2)}</td>
                                                <td style={{textAlign: 'center'}}><Button size="sm" onClick={() => console.log('test')}><GrView /></Button></td>
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                                </table>
                             
                            </Card.Body>
                        </Card>
                    </Container>
                </>
            }
        </>
    )
}

export default Income;