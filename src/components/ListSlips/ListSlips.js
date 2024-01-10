//style
import { Card, Button } from 'react-bootstrap';

//state
import { useAccount } from '../../contexts/AccountContext'
import { useState } from 'react';

//components
import Popup from '../Popup';
import ViewSlip from '../ViewSlip';

const ListSlips = ({ type }) => {
    const { active } = useAccount();
    const [view, setView] = useState('');
    const [itemIndex, setItemIndex] = useState()
    const [showModal, setShowModal] = useState();

    return (
        <Card>

            <Popup 
                showModal={showModal} 
                setShowModal={setShowModal}
                header={`Edit Slip`}
                body={<ViewSlip
                    slip={type} 
                    view={view}
                    setView={setView}
                    setShowModal={setShowModal} 
                    itemIndex={itemIndex}  
                />}
            />

            <Card.Header>
                <p>{type === 'income' ? 'Income' : 'Expense'} Slips</p>
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
                    {active[type].map((item, index) => {
                        return (
                            <tr key={`list-${item.postDate}-${index}`}>
                                <td>{item.postDate.split('T')[0]}</td>
                                <td>${Number(item.amount).toFixed(2)}</td>
                                <td><Button size="sm" onClick={() => {
                                    setView(item);
                                    setItemIndex(index);
                                    setShowModal(true);
                                    }}>Edit</Button>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </Card.Body>
        </Card>
    )
}

export default ListSlips;