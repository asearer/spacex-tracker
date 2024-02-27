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
import CountdownTimer from './components/CountdownTimer/CountdownTimer'; // Import CountdownTimer component
import './App.css'; // Import CSS file

function App() {
  return (
    <div className="container">
      <Header />
      <CountdownTimer /> {/* Include CountdownTimer component */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/launches" element={<AllLaunches />} />
        <Route path="/upcominglaunches" element={<UpcomingLaunches />} />
        <Route path="/pastlaunches" element={<PastLaunches />} />
        <Route path="/successful" element={<Successful />} />
        <Route path="/failed" element={<Failed />} />
        <Route path="/links" element={<Links />} />
        <Route path="/about" element={<About />} />
      </Routes>
      
      <Footer />
    </div>
  );
}

export default App;
