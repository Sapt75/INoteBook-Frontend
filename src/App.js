import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/navbar';
import Home from "./components/home"
import About from "./components/about"
import NoteState from './context/Notes/NoteState';
import Login from "./components/login"
import Signup from "./components/signup"

function App() {
  return (
    <div>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/about' element={<About />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
          </Routes>
        </BrowserRouter>
      </NoteState>
    </div>
  )
}

export default App
