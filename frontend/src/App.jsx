import './index.css'
import SignUp from './pages/SignUp.jsx'
import Landing from './pages/Landing.jsx'
import Login from './pages/Login.jsx'
import {Routes, Route} from 'react-router-dom'
import { motion } from "motion/react"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Landing" element={<Landing />} />
    </Routes>
  ) 
}

export default App
