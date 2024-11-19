
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register';
import LoggedHome from './components/LoggedHome';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';


function App() {
  const [selected, setSelected] = useState('');

  return (
    <div className='app'>
          <Router>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route  
        path='/login' element={<Login setSelected={setSelected}/>}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/logged' element={<LoggedHome selected={selected}/>}/>
      </Routes>
    </Router>
    </div>
  )
}

export default App
