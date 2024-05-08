import { Routes, Route } from 'react-router-dom'

import Navbar from './components/common/Navbar';
import Home from './components/common/Home'
import OctopusIndex from './components/octopus/OctopusIndex';
import Login from './components/auth/Login';
import { Logout } from './components/auth/logout';
import OctopusDetail from './components/octopus/OctopusDetail';
import OctopusEdit from './components/octopus/OctopusEdit';
import Signup from './components/auth/Signup';
import { useEffect, useState } from 'react';
import { currentUser } from './lib/auth/currentUser';


function App() {

  const [user, setUser] = useState(null)

  useEffect(() => {
    setUser(currentUser())
  }, [])

  return (
    <div data-theme="aqua" className='bg-neutral h-full'>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/octopus/:id" element={<OctopusDetail user={user} />} />
        <Route path="/octopus/:id/edit" element={<OctopusEdit />} />
        <Route path="/octopus" element={<OctopusIndex />} />
        <Route path='/login' element={<Login setUser={setUser} />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/logout' element={<Logout />} />
      </Routes>
    </div>
  )
}

export default App;
