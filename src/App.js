import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Blogs from './pages/BlogsPage';
import Login from './pages/Login';
import FAQs from './pages/FaqPage';

const App = () => {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuth(true); // Check for token to verify authentication
    }
  }, []);

  return (
    <Router> {/* Wrap the Routes inside BrowserRouter */}
      <Routes>
        {/* Login Route */}
        <Route path="/login" element={<Login setAuth={setAuth} />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={auth ? <Dashboard /> : <Login setAuth={setAuth} />}
        />
        <Route
          path="/blogs"
          element={auth ? <Blogs /> : <Login setAuth={setAuth} />}
        />
        <Route
          path="/faqs"
          element={auth ? <FAQs /> : <Login setAuth={setAuth} />}
        />

        {/* Default redirect to login */}
        <Route path="/" element={<Login setAuth={setAuth} />} />
      </Routes>
    </Router>  
  );
};

export default App;
