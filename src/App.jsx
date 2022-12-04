import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Combination, Home } from './pages';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/combination" element={<Combination />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
