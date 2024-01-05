//style
import { Card, Button } from 'react-bootstrap';

//icons
import { GrView } from "react-icons/gr";

//state
import { useAccount } from '../../contexts/AccountContext'
import { useEffect, useState } from 'react';
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
                body={<ViewDeposit 
                    view={view}
                    setView={setView}
                    setShowModal={setShowModal} 
                    itemIndex={itemIndex} 
                />}
            />

            <Card.Header>
                <p>Deposits</p>
            </Card.Header>
            <Card.Body>
                <table>
                    <thead>
                        <tr>
                            <th>Post Date</th>
                            <th>Amount</th>
                            <th>View/Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                    {active.income.map((item, index) => {
                        return (
                            <tr key={`list-${item.postDate}-${index}`}>
                                <td>{item.postDate.split('T')[0]}</td>
                                <td>${Number(item.amount).toFixed(2)}</td>
                                <td><Button size="sm" onClick={() => {
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