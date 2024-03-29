//state
import { useAccount } from '../../contexts/AccountContext';

//style
import { Row, Col, Card } from 'react-bootstrap';


//components
import ChartGraph from '../ChartGraph';
import { useEffect, useState } from 'react';

const Overview = ({ data, colors }) => {
    const { account, setAccount, active, setActive } = useAccount();

    return (
        <Card>
            <Card.Header>
                <p>{data.title}</p>
            </Card.Header>
            <Card.Body>
                <Row>
                    <Col>
                        {data.content.map((item, index) => {
                            return (
                                <p key={`${item.label}-index`}>
                                    <b>{item.label}:</b><br /> {item.value}
                                </p>
                            )
                        })}
                    </Col>
                    <Col xs={6} style={{textAlign: 'center'}}>
                        <ChartGraph dataset={data.graph} colors={colors} />   
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}

export default Overview;