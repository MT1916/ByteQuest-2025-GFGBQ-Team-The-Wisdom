import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Web3Provider } from './context/Web3Context';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import DonorDashboard from './pages/DonorDashboard';
import NGODashboard from './pages/NGODashboard';
import ValidatorDashboard from './pages/ValidatorDashboard';

function App() {
  return (
    <Web3Provider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute allowedRoles={['DONOR']} />}>
              <Route path="/donor" element={<DonorDashboard />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['NGO']} />}>
              <Route path="/ngo" element={<NGODashboard />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['VALIDATOR']} />}>
              <Route path="/validator" element={<ValidatorDashboard />} />
            </Route>

          </Routes>
        </Router>
      </AuthProvider>
    </Web3Provider>
  );
}

export default App;
