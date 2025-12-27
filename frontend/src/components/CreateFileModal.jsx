import React, { useState } from 'react';
import { X, Code2 } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const LANGUAGES = [
  { value: "js", label: "JavaScript", icon: "🟨", description: "Dynamic web scripting" },
  { value: "py", label: "Python", icon: "🐍", description: "General-purpose programming" },
  { value: "java", label: "Java", icon: "☕", description: "Object-oriented programming" },
  { value: "cpp", label: "C++", icon: "⚙️", description: "Systems programming" },
  { value: "c", label: "C", icon: "🔵", description: "Low-level programming" },
  { value: "go", label: "Go", icon: "🐹", description: "Concurrent programming" },
  { value: "rs", label: "Rust", icon: "🦀", description: "Memory-safe systems" }
];

function CreateFileModal({ onClose, onFileCreated }) {
  const [language, setLanguage] = useState('js');
  const [creating, setCreating] = useState(false);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const handleCreate = async () => {
    setCreating(true);
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.post(
        `${API_URL}/files/create`,
        { language },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      toast.success('File created successfully');
      
      if (onFileCreated) {
        onFileCreated(data);
      }
      
      onClose();
      
      // Navigate to editor with the new file
      const username = localStorage.getItem('username') || 'User';
      navigate(`/editor/${data.fileId}`, {
        state: { 
          fileId: data.fileId,
          username: username
        }
      });
    } catch (error) {
      console.error('Failed to create file:', error);
      toast.error('Failed to create file');
    } finally {
      setCreating(false);
    }
  };

  return (
    <div 
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ 
        background: 'rgba(0,0,0,0.7)', 
        zIndex: 2000,
        backdropFilter: 'blur(8px)'
      }}
      onClick={onClose}
    >
      <div 
        className="card"
        onClick={(e) => e.stopPropagation()}
        style={{ 
          background: 'rgba(15, 15, 15, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '20px',
          width: '90%',
          maxWidth: '500px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
      >
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="text-white fw-bold m-0 d-flex align-items-center gap-2">
              <Code2 size={24} />
              Create New File
            </h5>
            <button
              onClick={onClose}
              className="btn btn-sm"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'white',
                borderRadius: '8px',
                padding: '6px 10px'
              }}
            >
              <X size={18} />
            </button>
          </div>

          <div className="mb-4">
            <label className="text-white-50 small mb-3 d-block">Select Programming Language</label>
            <div className="d-flex flex-column gap-2">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.value}
                  onClick={() => setLanguage(lang.value)}
                  className="btn text-start d-flex align-items-center gap-3"
                  style={{
                    background: language === lang.value 
                      ? 'rgba(102, 126, 234, 0.2)' 
                      : 'rgba(255,255,255,0.05)',
                    border: language === lang.value 
                      ? '1px solid rgba(102, 126, 234, 0.5)' 
                      : '1px solid rgba(255,255,255,0.15)',
                    color: 'white',
                    borderRadius: '12px',
                    padding: '14px 16px',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    if (language !== lang.value) {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (language !== lang.value) {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                    }
                  }}
                >
                  <span style={{ fontSize: '28px' }}>{lang.icon}</span>
                  <div className="flex-grow-1">
                    <div className="fw-semibold">{lang.label}</div>
                    <div className="small text-white-50">{lang.description}</div>
                  </div>
                  {language === lang.value && (
                    <span style={{ color: '#667eea', fontSize: '20px' }}>✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="d-flex gap-2">
            <button
              onClick={onClose}
              className="btn flex-grow-1"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'white',
                borderRadius: '12px',
                padding: '12px',
                fontWeight: '500'
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleCreate}
              disabled={creating}
              className="btn flex-grow-1"
              style={{
                background: creating 
                  ? 'rgba(102, 126, 234, 0.5)' 
                  : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                borderRadius: '12px',
                padding: '12px',
                color: 'white',
                fontWeight: '500',
                opacity: creating ? 0.7 : 1,
                cursor: creating ? 'not-allowed' : 'pointer'
              }}
            >
              {creating ? 'Creating...' : 'Create File'}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 576px) {
          .card {
            width: 95% !important;
            margin: 10px;
          }
        }
      `}</style>
    </div>
  );
}

export default CreateFileModal;