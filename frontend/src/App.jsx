import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Verify from './pages/Verify.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Manufacturer from './pages/Dashboard/Manufacturer.jsx'
import Distributor from './pages/Dashboard/Distributor.jsx'
import Pharmacy from './pages/Dashboard/Pharmacy.jsx'
import Admin from './pages/Dashboard/Admin.jsx'

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard/manufacturer" element={<Manufacturer />} />
          <Route path="/dashboard/distributor" element={<Distributor />} />
          <Route path="/dashboard/pharmacy" element={<Pharmacy />} />
          <Route path="/dashboard/admin" element={<Admin />} />
        </Routes>
      </div>
    </div>
  )
}
