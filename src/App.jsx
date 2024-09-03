import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

import './App.css'; // Add styles for main layout
import Navbar from './Components/Navbar/Navbar';
import Sidebar from './Components/Sidebar/Sidebar';
import Accueil from './views/Accueil/Accueil';
import Community from './views/Community';
import News from './views/News';
import Learn from './views/Learn';
import Contact from './views/Contact';
import OnlineSafetyTools from './views/OnlineSafetyTools';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';



const App = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const closeSidebar = () => {
    setSidebarVisible(false);
  };

  const handleNavClick = () => {
    setSidebarVisible(true);
  };

  return (
   /* <Router>
      <div className='app-container'>
        <Navbar onNavClick={handleNavClick} isSidebarVisible={isSidebarVisible} />
        <Sidebar isVisible={isSidebarVisible} onClose={closeSidebar} />
        <div className={`main-content ${isSidebarVisible ? 'shifted' : ''}`}>
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/community" element={<Community />} />
            <Route path="/news" element={<News />} />
            <Route path="/online-safety-tools" element={<OnlineSafetyTools />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </div>
    </Router>*/
    <RouterProvider router={router} />
  );
};

export default App;