import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthProvider'
import { Toaster } from './components/ui/toaster'
import Navigation from './components/layout/Navigation'
import LandingPage from './pages/LandingPage'
import RoadmapPage from './pages/RoadmapPage'
import CustomerDashboard from './pages/CustomerDashboard'
import TripRequestForm from './pages/TripRequestForm'
import DeveloperRoadmap from './pages/DeveloperRoadmap'
import { useAuth } from './hooks/useAuth'
import './App.css'

const AppContent = () => {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()
  
  // Never show main navigation on public pages (they have their own navigation)
  const isPublicPage = location.pathname === '/' || location.pathname === '/landing' || location.pathname === '/developer-roadmap'
  const showNavigation = !isPublicPage && isAuthenticated

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <div className="w-8 h-8 bg-white rounded-lg"></div>
          </div>
          <p className="text-gray-600">Loading your travel dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-gray-50">
      {showNavigation && <Navigation />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<RoadmapPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/developer-roadmap" element={<DeveloperRoadmap />} />
        
        {/* Protected Routes */}
        {isAuthenticated ? (
          <>
            <Route path="/dashboard" element={<CustomerDashboard />} />
            <Route path="/trips/new" element={<TripRequestForm />} />
            <Route path="/trips" element={<div className="pt-16 p-8">Trips page coming soon...</div>} />
            <Route path="/messages" element={<div className="pt-16 p-8">Messages page coming soon...</div>} />
            <Route path="/bookings" element={<div className="pt-16 p-8">Bookings page coming soon...</div>} />
            <Route path="/profile" element={<div className="pt-16 p-8">Profile page coming soon...</div>} />
            <Route path="/settings" element={<div className="pt-16 p-8">Settings page coming soon...</div>} />
            
            {/* Consultant Routes */}
            <Route path="/consultant" element={<div className="pt-16 p-8">Consultant dashboard coming soon...</div>} />
            <Route path="/consultant/trips" element={<div className="pt-16 p-8">Trip management coming soon...</div>} />
            <Route path="/consultant/customers" element={<div className="pt-16 p-8">Customer management coming soon...</div>} />
            <Route path="/consultant/messages" element={<div className="pt-16 p-8">Consultant messages coming soon...</div>} />
            <Route path="/consultant/quotes" element={<div className="pt-16 p-8">Quote management coming soon...</div>} />
          </>
        ) : (
          <Route path="*" element={<RoadmapPage />} />
        )}
      </Routes>
      <Toaster />
    </div>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  )
}

export default App