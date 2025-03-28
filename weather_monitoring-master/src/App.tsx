import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WeatherDashboard from './pages/WeatherDashboard';
import CompareCities from './pages/CompareCities';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WeatherDashboard />} />
        <Route path="/compare" element={<CompareCities />} />
      </Routes>
    </Router>
  );
}

export default App;