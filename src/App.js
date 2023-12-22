import Splash from './views/Splash'
import Dashboard from './views/Dashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return(
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<PrivateRoute />}>
              <Route exact path='/' element={<Dashboard />} />
            </Route>
          <Route exact path='/splash' element={<Splash />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;