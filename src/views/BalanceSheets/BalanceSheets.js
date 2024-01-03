//state
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useAccount } from '../../contexts/AccountContext';

//style
import { Card, Container, Row, Col, Button } from 'react-bootstrap';

//components
import Loading from '../../components/Loading';
import Navigation from '../../components/Navigation';
import ActiveSheet from '../../components/ActiveSheet';

//requests
import { assignAccounts } from '../../requests/assignAccounts';

//functions
import getExpenseTotal from '../../functions/getExpenseTotal';
import getIncomeTotal from '../../functions/getIncomeTotal';
import getTotalSum from '../../functions/getTotalSum';
import CreateSheet from '../../components/CreateSheet';

//icons
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import { IoIosCheckmarkCircle } from "react-icons/io";

const BalanceSheets = () => {
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

    const setEdit = () => {

    }

    return (
        <>
            {loading ? <Loading /> : 
                <>
                    <Navigation />
                    {active ? <ActiveSheet /> : <></>}
                    <Container>
                        <CreateSheet />
                        <Card>
                            <Card.Header>
                                <p>Balance Sheets</p>
                            </Card.Header>
                            <Card.Body>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Balance</th>
                                            <th>View/Edit</th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {account.sheets.map((sheet, index) => {
                                            if(active.name === sheet.name){
                                                return (
                                                    <tr>
                                                        <td style={{textAlign: 'center'}}>{sheet.name}</td>
                                                        <td style={{textAlign: 'center'}}>${getTotalSum(sheet, getIncomeTotal, getExpenseTotal)}</td>
                                                        <td style={{textAlign: 'center'}}><Button size="sm" onClick={() => setEdit(`balance-sheet-${sheet.name}-${index}`)}><CiEdit /></Button></td>
                                                    </tr>
                                                )
                                            }else{
                                                return (
                                                    <tr>
                                                        <td style={{textAlign: 'center'}}>{sheet.name}</td>
                                                        <td style={{textAlign: 'center'}}>${getTotalSum(sheet, getIncomeTotal, getExpenseTotal)}</td>
                                                        <td style={{textAlign: 'center'}}><Button size="sm" onClick={() => setEdit(`balance-sheet-${sheet.name}-${index}`)}><CiEdit /></Button></td>
                                                    </tr>
                                                )
                                            }
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

export default BalanceSheets;