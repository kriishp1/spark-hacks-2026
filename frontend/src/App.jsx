import './index.css'
import SignUp from './pages/SignUp.jsx'
import Landing from './pages/Landing.jsx'
import {Routes, Route} from 'react-router-dom'
import { motion } from "motion/react"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/SignUp" element={<SignUp />} />
    </Routes>
  ) 
}

export default App
