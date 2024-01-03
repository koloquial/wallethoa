import { Container, Dropdown, Row, Col } from "react-bootstrap";
import { useAccount } from '../../contexts/AccountContext';

const ActiveSheet = () => {
    const { account, setAccount, active, setActive } = useAccount();
    return (
        <div className='active-sheet'>
            <Container>
                <Row>
                    <Col>
                        <p><b>Active Sheet:</b> {active.name}</p>
                    </Col>
                    <Col style={{textAlign: 'right', paddingRight: '15px'}}>
                        <Dropdown>
                            <Dropdown.Toggle size="sm" variant="primary" id="dropdown-basic">
                                Change Active Sheet
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {account ? 
                                <>
                                    {account.sheets.map((sheet, index) => {
                                        return <Dropdown.Item key={`${sheet.name}-${index}`} onClick={() => setActive(sheet)}>{sheet.name}</Dropdown.Item>
                                    })}
                                </> : <></>}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ActiveSheet;