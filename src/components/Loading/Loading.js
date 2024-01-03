//style
import { Container } from 'react-bootstrap';

const Loading = () => {
    return (
        <Container 
            className='d-flex align-items-center justify-content-center splash' 
            style={{minHeight: '100vh'}}
            fluid>
            <div className='loader' />
        </Container>
    )
}

export default Loading;