import Splash from './views/Splash'
import Dashboard from './views/Dashboard';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {
  return(
    <>

        <AuthProvider>
        
          <Splash />
         
        </AuthProvider>
    </>
  )
}

export default App;