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
      <Route path="/Landing" element={<Landing />} />
<<<<<<< HEAD
      <Route path="/Dashboard" element={<Dashboard/>}/>
      <Route path="/AddReceipt" element={<InsertPage/>}/>
=======
      <Route path="/Dashboard" element={<Dashboard />}/>"
>>>>>>> dbf31860e8bb0a801a68ae5bbb6ac0137b75baa9
    </Routes>
  ) 
}

export default App
