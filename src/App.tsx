import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import React from 'react'
import { Login } from './features/Login'
import { Register } from './features/Register'
import Dashboard from './features/Dashboard'
import { BankServiceContext, getBankService } from './services'

interface WrapperProps {
  children: React.ReactElement;
}

function Wrapper({ children }: WrapperProps) {
  const childrenWithProps = React.cloneElement(children);
  return <BankServiceContext.Provider value={getBankService()}>
    <Layout >{childrenWithProps}</Layout>;
  </BankServiceContext.Provider>
}


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Wrapper><Login /></Wrapper>} > </Route>
          <Route path="/login" element={<Wrapper><Login /></Wrapper>} >
          </Route>
          <Route path="/register" element={<Wrapper><Register /></Wrapper>}>
          </Route>
          <Route path="/dashboard" element={<Wrapper><Dashboard /></Wrapper>}>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
