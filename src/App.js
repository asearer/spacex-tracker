import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import AllLaunches from './components/AllLaunches/AllLaunches';
import UpcomingLaunches from './components/UpcomingLaunches/UpcomingLaunches';
import PastLaunches from './components/PastLaunches/PastLaunches';
import Successful from './components/Successful/Successful';
import Failed from './components/Failed/Failed';
import Links from './components/Links/Links';
import About from './components/About/About';

import './App.css'; // Import CSS file

function App() {
  return (
    <div className="container">
      <Header />
      
      <Navbar />
      <div className="row">
        <div className="col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/launches" element={<AllLaunches />} />
            
            
            <Route path="/successful" element={<Successful />} />
            <Route path="/failed" element={<Failed />} />
            <Route path="/links" element={<Links />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default App;
