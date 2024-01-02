import { Button, Dropdown, Row, Col } from "react-bootstrap";

const ActiveSheet = ({ account, sheet, setActiveSheet }) => {
    return (
        <div className='active-sheet'>
            <Row>
                <Col className='my-auto'>
                    <p><b>Active Sheet:</b> {sheet.name}</p>
                </Col>
                <Col style={{textAlign: 'right', paddingRight: '25px'}}>
                    <Dropdown>
                        <Dropdown.Toggle size="sm" variant="primary" id="dropdown-basic">
                            Change Active Sheet
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {account.sheets.map(sheet => {
                                return <Dropdown.Item onClick={() => setActiveSheet(sheet)}>{sheet.name}</Dropdown.Item>
                            })}
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>
        </div>
    )
}

export default ActiveSheet;