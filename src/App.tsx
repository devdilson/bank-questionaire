import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import React, { useEffect } from 'react'
import { Login } from './features/login/Login'
import { BankServiceContext, getBankService } from './services'
import Dashboard from './features/dashboard/Dashboard'
import { Register } from './features/register/Register'

interface WrapperProps {
  children: React.ReactElement;
}

function AuthenticatedElement({ children }: WrapperProps) {
  const navigate = useNavigate();
  const childrenWithProps = React.cloneElement(children);
  const bankService = getBankService();

  useEffect(() => {
    if (!bankService.getCurrentUser()) {
      navigate('/login');
    }
  }, []);

  return <BankServiceContext.Provider value={getBankService()}>
    <Layout >{childrenWithProps}</Layout>;
  </BankServiceContext.Provider>
}


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Login /></Layout>} > </Route>
          <Route path="/login" element={<Layout><Login /></Layout>} >
          </Route>
          <Route path="/register" element={<Layout><Register /></Layout>}>
          </Route>
          <Route path="/dashboard" element={<AuthenticatedElement><Dashboard /></AuthenticatedElement>}>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
