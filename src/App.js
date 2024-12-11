import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Canvas from './components/Canvas/Canvas';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <main className="main-content">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/canvas" element={<Canvas />} />
            <Route path="/" element={<div>Home Page</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

