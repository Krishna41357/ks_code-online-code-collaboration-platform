import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './components/Home';
import EditorPage from './components/EditorPage';
import { Toaster } from 'react-hot-toast';
import Login from './components/Login';
import ProtectedRoute from './services/ProtectedRoute.jsx';
import AboutUs from './components/AboutUs.jsx';
import ComingSoon from './components/ComingSoon.jsx';

function App() {
  return (
    <>
      <div>
        <Toaster 
          position='top-center'
          toastOptions={{
            duration: 3000,
            style: {
              background: 'rgba(15, 15, 15, 0.95)',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '12px',
              padding: '12px 16px',
              fontSize: '14px',
              fontWeight: '500'
            },
            success: {
              iconTheme: {
                primary: '#667eea',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#dc3545',
                secondary: '#fff',
              },
            },
          }}
        />
      </div>    
      
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        
        {/* Protected Routes */}
        <Route 
          path='/home' 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path='/editor/:roomId' 
          element={
            <ProtectedRoute>
              <EditorPage />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path='/about' 
          element={
            <ProtectedRoute>
              <AboutUs />
            </ProtectedRoute>
          }
        />
        
        <Route 
          path='/settings' 
          element={
            <ProtectedRoute>
              <ComingSoon />
            </ProtectedRoute>
          }
        />
        
        <Route 
          path='/rooms' 
          element={
            <ProtectedRoute>
              <ComingSoon />
            </ProtectedRoute>
          }
        />

        {/* Catch all route - redirect to home or 404 */}
        <Route 
          path='*' 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </>
  );
}

export default App;