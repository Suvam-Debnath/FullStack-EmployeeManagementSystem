import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import DepartmentList from './components/DepartmentList';
import DepartmentForm from './components/DepartmentForm';

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <BrowserRouter>
          <div className="flex flex-col min-h-screen bg-background text-foreground">
            <Header />
            <main className="flex-1 pt-20 pb-12 px-4 lg:px-8 overflow-x-hidden">
              <div className="max-w-7xl mx-auto">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  
                  <Route path="/employees" element={<EmployeeList />} />
                  <Route path="/add-employee" element={<EmployeeForm />} />
                  <Route path="/edit-employee/:id" element={<EmployeeForm />} />
                  
                  <Route path="/departments" element={<DepartmentList />} />
                  <Route path="/add-department" element={<DepartmentForm />} />
                  <Route path="/edit-department/:id" element={<DepartmentForm />} />
                </Routes>
              </div>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  );
}
