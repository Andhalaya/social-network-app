import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/LoginPage/index'

function App() {
  

  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
