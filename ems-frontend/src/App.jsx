import './App.css'
import FoooterComponent from './components/FoooterComponent'
import HeaderComponent from './components/HeaderComponent'
import ListEmployeeComponent from './components/ListEmployeeComponent'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import EmployeeComponent from './components/EmployeeComponent'
import ListDepartmentComponent from './components/ListDepartmentComponent'

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
            {/* // http://localhost:3000/add-employee */}
            <Route path='/add-employee' element={<EmployeeComponent />} />
            {/* // http://localhost:3000/edit-employee/1 */}
            <Route path='/edit-employee/:id' element={<EmployeeComponent />} />

            {/* // http://localhost:3000/departments */}
            <Route path='/departments' element={<ListDepartmentComponent />} />
            
          </Routes>
        <FoooterComponent />
      </BrowserRouter>
    </>
  )
}

export default App
