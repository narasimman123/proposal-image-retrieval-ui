// src/App.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import FindIn from './components/findIn';

function App() {
  return (
    <Router>
      <FindIn />
    </Router>
  );
}

export default App;
