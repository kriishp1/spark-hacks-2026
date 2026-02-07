import './index.css'
import SignUp from './pages/SignUp.jsx'
import Landing from './pages/Landing.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import {Routes, Route} from 'react-router-dom'
import { motion } from "motion/react"
import InsertPage from './pages/InsertPage.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/addreceipt" element={<InsertPage/>}/>
    </Routes>
  ) 
}

export default App
