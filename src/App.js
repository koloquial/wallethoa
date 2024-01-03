
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

//components
import Splash from './views/Splash'
import Dashboard from './views/Dashboard';
import Income from './views/Income';
import Expenses from './views/Expenses';
import BalanceSheets from './views/BalanceSheets';

const App = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route exact path='/splash' element={<Splash />} />
          <Route exact path='/' element={<PrivateRoute />}>
            <Route exact path='/' element={<Dashboard />} />
          </Route>
          <Route exact path='/income' element={<PrivateRoute />}>
            <Route exact path='/income' element={<Income />} />
          </Route>
          <Route exact path='/expenses' element={<PrivateRoute />}>
            <Route exact path='/expenses' element={<Expenses />} />
          </Route>
          <Route exact path='/balance-sheets' element={<PrivateRoute />}>
            <Route exact path='/balance-sheets' element={<BalanceSheets />} />
          </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;