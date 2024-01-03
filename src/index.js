import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { AccountProvider } from './contexts/AccountContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <AuthProvider>
      <AccountProvider>
        <App />
      </AccountProvider>
    </AuthProvider>
);