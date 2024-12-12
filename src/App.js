import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Canvas from './components/Canvas/Canvas';
import ProjectList from './components/ProjectList/ProjectList';
import Account from './components/Account/Account';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/canvas" element={<Canvas />} />
            <Route path="/projects" element={<ProjectList />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </main>
        {/* Footer Component */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;

