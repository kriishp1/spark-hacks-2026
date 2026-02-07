import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './index.css'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import InsertPage from './pages/InsertPage'
import SignUp from './pages/SignUp'

function App() {
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
}

export default App
