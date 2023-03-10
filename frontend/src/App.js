import './App.css'
import Homepage from './components/homepage/homepage'
import Login from './components/login/login'
import Register from './components/register/register'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useState } from 'react'
function App() {
  const [user, setLoginUser] = useState({})
  return (
    <>
      <Router>
        <Routes>
          <Route
            path='/'
            element={user && user._id ? <Homepage /> : <Login />}
          />
          <Route
            path='/login'
            element={<Login setLoginUser={setLoginUser} />}
          />
          <Route path='/register' element={<Register />} />
          <Route path='/card' element={<Homepage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
