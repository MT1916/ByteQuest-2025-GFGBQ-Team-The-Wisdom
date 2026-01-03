import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MuzakkiDashboard from './pages/MuzakkiDashboard';
import NGODashboard from './pages/NGODashboard';
import ValidatorDashboard from './pages/ValidatorDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/muzakki" element={<MuzakkiDashboard />} />
        <Route path="/ngo" element={<NGODashboard />} />
        <Route path="/validator" element={<ValidatorDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
