import React from 'react';
import { Code2, Loader } from 'lucide-react';

// Simple Loading Spinner
export const LoadingSpinner = ({ size = 40, color = '#667eea' }) => {
  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        border: `3px solid rgba(255, 255, 255, 0.1)`,
        borderTop: `3px solid ${color}`,
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }}
    />
  );
};

// Full Page Loading
export const LoadingPage = ({ message = 'Loading...' }) => {
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)',
        color: '#fff'
      }}
    >
      <div className="text-center">
        <div
          className="d-inline-flex align-items-center justify-content-center mb-4 rounded-3"
          style={{
            width: '100px',
            height: '100px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            boxShadow: '0 12px 32px rgba(102, 126, 234, 0.4)'
          }}
        >
          <Code2 size={50} className="text-white" strokeWidth={2.5} />
        </div>
        <h3 className="mb-3 fw-bold">KS CODE</h3>
        <LoadingSpinner size={40} />
        <p className="mt-3 text-white-50">{message}</p>
      </div>
    </div>
  );
};

// Inline Loading
export const LoadingInline = ({ message = 'Loading...' }) => {
  return (
    <div className="d-flex align-items-center gap-3 text-white-50 py-4">
      <LoadingSpinner size={24} />
      <span>{message}</span>
    </div>
  );
};

// Loading Overlay
export const LoadingOverlay = ({ message = 'Loading...' }) => {
  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{
        background: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(8px)',
        zIndex: 9999
      }}
    >
      <div className="text-center">
        <LoadingSpinner size={50} />
        <p className="mt-3 text-white fw-semibold">{message}</p>
      </div>
    </div>
  );
};

// Skeleton Loader for File List
export const FileListSkeleton = ({ count = 5 }) => {
  return (
    <div className="d-flex flex-column gap-2">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="p-3 rounded skeleton"
          style={{
            height: '80px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px'
          }}
        />
      ))}
    </div>
  );
};

export default LoadingPage;