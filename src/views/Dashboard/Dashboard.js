import { Button } from 'react-bootstrap';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

import Navigation from '../../components/Navigation';

const Dashboard = () => {
    const [error, setError] = useState('');
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <>
            <Navigation />
            <p>Dashboard</p>
            <p><b>Email:</b> {currentUser && currentUser.email}</p>
            <Link to='/update-profile'>Update Profile</Link>
        </>
    )
}

export default Dashboard;