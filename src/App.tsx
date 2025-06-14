import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import MeetingManagement from './pages/MeetingManagement';
import TaskAutomation from './pages/TaskAutomation';
import AgentCoordination from './pages/AgentCoordination';
import Settings from './pages/Settings';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/meetings" element={<MeetingManagement />} />
            <Route path="/automation" element={<TaskAutomation />} />
            <Route path="/agents" element={<AgentCoordination />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;