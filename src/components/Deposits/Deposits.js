//style
import { Card, Button } from 'react-bootstrap';

//icons
import { GrView } from "react-icons/gr";

//state
import { useAccount } from '../../contexts/AccountContext'
import { useState } from 'react';
import Popup from '../Popup';
import ViewDeposit from '../ViewDeposit';

const Deposits = () => {
    const { active } = useAccount();
    const [view, setView] = useState('');
    const [itemIndex, setItemIndex] = useState()
    const [showModal, setShowModal] = useState();

    return (
        <Card>
            
            <Popup 
                showModal={showModal} 
                setShowModal={setShowModal} 
                header={'Deposit'} 
                body={<ViewDeposit item={view} setShowModal={setShowModal} index={itemIndex} />}
            />

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
                                <td style={{textAlign: 'center'}}><Button size="sm" onClick={() => {
                                    setView(item);
                                    setItemIndex(index);
                                    setShowModal(true);
                                    }}><GrView /></Button></td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </Card.Body>
        </Card>
    )
}

export default Deposits;