import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useAuth } from '../../contexts/AuthContext';
import { useAccount } from '../../contexts/AccountContext';
import { Link, useNavigate } from 'react-router-dom';

function Navigation() {
  const { currentUser, logout } = useAuth();
  const { clearState } = useAccount();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try{
      await logout();
      clearState();
      navigate('/splash');
    }catch(e){
      console.log('failed to logout.');
    }
}

  return (
    <Navbar expand="lg" className='navigation'>
      <Container>
        <Navbar.Brand href="/" className='styled-font'>W</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Dashboard</Nav.Link>
            <Nav.Link href="/income">Income</Nav.Link>
            <Nav.Link href="/expenses">Expenses</Nav.Link>
            <Nav.Link href="/reports">Special Assessments</Nav.Link>
            <Nav.Link href="/home-owners">Home Owners</Nav.Link>
            <Nav.Link href="/board-members">Board Members</Nav.Link>
            <Nav.Link href="/balance-sheets">Balance Sheets</Nav.Link>
            <Nav.Link href="/reports">Generate Reports</Nav.Link>
            <NavDropdown title="Profile" id="profile-dropdown">
              <NavDropdown.Item href="/update-profile">Update Profile</NavDropdown.Item>
              <NavDropdown.Item href="/backup">Backup</NavDropdown.Item>
              <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;