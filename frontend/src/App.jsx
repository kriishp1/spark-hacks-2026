import './index.css'
import SignUp from './pages/SignUp.jsx'
import Landing from './pages/Landing.jsx'
import Login from './pages/Login.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import NewPassword from './pages/NewPassword.jsx'
import Dashboard from './pages/Dashboard.jsx'
import AboutUs from './pages/Aboutme.jsx'
import {Routes, Route} from 'react-router-dom'
import { motion } from "motion/react"
import InsertPage from './pages/InsertPage.jsx'
import Wrapper from './pages/Wrapper.jsx';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/homepage" element={<Landing />} />

      <Route path="/dashboard" element={
          <Wrapper>
            <Dashboard />
          </Wrapper>
          } 
      />

      <Route path="/addreceipt" element={
          <Wrapper>
            <InsertPage/> 
          </Wrapper>
          } 
      />

      <Route path="/new-password" element={
          <Wrapper>
            <NewPassword/> 
          </Wrapper>
          } 
      />
    </Routes>
  ) 
}

export default App
