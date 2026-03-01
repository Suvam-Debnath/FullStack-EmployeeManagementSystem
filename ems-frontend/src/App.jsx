import './App.css'
import FoooterComponent from './components/FoooterComponent'
import HeaderComponent from './components/HeaderComponent'
import ListEmployeeComponent from './components/ListEmployeeComponent'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import EmployeeComponent from './components/EmployeeComponent'

function App() {

  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
          <Routes>
            {/* // http://localhost:3000 */}
            <Route path='/' element={<ListEmployeeComponent />} />
            {/* // http://localhost:3000/employees */}
            <Route path='/employees' element={<ListEmployeeComponent />} />
            {/* // http://localhost:3000/add-employee*/}
            <Route path='/add-employee' element={<EmployeeComponent />} />
          </Routes>
        <FoooterComponent />
      </BrowserRouter>
    </>
  )
}

export default App
