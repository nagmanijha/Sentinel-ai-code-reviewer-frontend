// src/App.jsx
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Setting from './pages/Setting'
import ReviewHistory from './pages/ReviewHistory'
import Review from './pages/Review'
import ErrorBoundary from './components/ErrorBoundary'

function App() {
  return (
    // <ErrorBoundary>
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/review" element={<Review />} />
            <Route path="/settings" element={<Setting />} />
            <Route path="/dashboard/history" element={<ReviewHistory />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
    // </ErrorBoundary>
  )
}

export default App