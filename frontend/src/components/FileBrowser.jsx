import React, { useState, useEffect } from 'react';
import { File, Folder, Clock, Trash2, RefreshCw, Plus, Search, Code2 } from 'lucide-react';
import axios from 'axios';

const FileBrowser = ({ onFileSelect, onCreateNew }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all'); // all, recent, deleted

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const endpoint = filterType === 'recent' ? '/files/recent/list' : '/files';
      const { data } = await axios.get(`${API_URL}${endpoint}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFiles(data);
    } catch (error) {
      console.error('Failed to fetch files:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [filterType]);

  const handleDelete = async (fileId, e) => {
    e.stopPropagation();
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/files/${fileId}/delete`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchFiles();
    } catch (error) {
      console.error('Failed to delete file:', error);
    }
  };

  const handleRestore = async (fileId, e) => {
    e.stopPropagation();
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`${API_URL}/files/${fileId}/restore`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchFiles();
    } catch (error) {
      console.error('Failed to restore file:', error);
    }
  };

  const getLanguageIcon = (language) => {
    const icons = {
      javascript: '🟨',
      python: '🐍',
      cpp: '⚙️',
      c: '🔵',
      java: '☕',
      go: '🐹',
      rust: '🦀'
    };
    return icons[language] || '📄';
  };

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.filename.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'deleted' ? file.isDeleted : !file.isDeleted;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="h-100 d-flex flex-column" style={{ background: '#0a0a0a' }}>
      {/* Header */}
      <div className="p-4 border-bottom" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="text-white fw-bold m-0 d-flex align-items-center gap-2">
            <Folder size={24} />
            My Files
          </h4>
          <button
            onClick={onCreateNew}
            className="btn btn-sm d-flex align-items-center gap-2"
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 16px',
              color: 'white',
              fontWeight: '500'
            }}
          >
            <Plus size={16} />
            New File
          </button>
        </div>

        {/* Search Bar */}
        <div className="position-relative mb-3">
          <Search size={18} className="position-absolute text-white-50" style={{ left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-control ps-5"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '14px',
              padding: '10px 12px'
            }}
          />
        </div>

        {/* Filter Tabs */}
        <div className="d-flex gap-2">
          {['all', 'recent', 'deleted'].map(type => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className="btn btn-sm"
              style={{
                background: filterType === type ? 'rgba(102, 126, 234, 0.2)' : 'rgba(255,255,255,0.05)',
                border: filterType === type ? '1px solid rgba(102, 126, 234, 0.5)' : '1px solid rgba(255,255,255,0.15)',
                color: filterType === type ? '#667eea' : '#fff',
                borderRadius: '6px',
                padding: '6px 12px',
                fontSize: '13px',
                textTransform: 'capitalize'
              }}
            >
              {type === 'recent' && <Clock size={14} className="me-1" />}
              {type === 'deleted' && <Trash2 size={14} className="me-1" />}
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* File List */}
      <div className="flex-grow-1 overflow-auto p-3">
        {loading ? (
          <div className="text-center text-white-50 py-5">
            <RefreshCw size={32} className="spin mb-2" />
            <p>Loading files...</p>
          </div>
        ) : filteredFiles.length === 0 ? (
          <div className="text-center text-white-50 py-5">
            <File size={48} className="mb-3 opacity-50" />
            <p className="mb-1">No files found</p>
            <p className="small">Create a new file to get started</p>
          </div>
        ) : (
          <div className="d-flex flex-column gap-2">
            {filteredFiles.map(file => (
              <div
                key={file._id}
                onClick={() => !file.isDeleted && onFileSelect(file)}
                className="p-3 rounded cursor-pointer"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  cursor: file.isDeleted ? 'default' : 'pointer',
                  transition: 'all 0.2s',
                  opacity: file.isDeleted ? 0.6 : 1
                }}
                onMouseEnter={(e) => {
                  if (!file.isDeleted) {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                }}
              >
                <div className="d-flex justify-content-between align-items-start">
                  <div className="flex-grow-1">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <span style={{ fontSize: '20px' }}>
                        {getLanguageIcon(file.language)}
                      </span>
                      <span className="text-white fw-semibold">{file.filename}</span>
                      {file.isDeleted && (
                        <span className="badge bg-danger small">Deleted</span>
                      )}
                    </div>
                    <div className="d-flex align-items-center gap-3 text-white-50 small">
                      <span>v{file.version}</span>
                      <span>•</span>
                      <span>{new Date(file.updatedAt).toLocaleDateString()}</span>
                      {file.collaborators?.length > 0 && (
                        <>
                          <span>•</span>
                          <span>{file.collaborators.length} collaborator(s)</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="d-flex gap-2">
                    {file.isDeleted ? (
                      <button
                        onClick={(e) => handleRestore(file._id, e)}
                        className="btn btn-sm"
                        style={{
                          background: 'rgba(40, 167, 69, 0.2)',
                          border: '1px solid rgba(40, 167, 69, 0.3)',
                          color: '#28a745',
                          padding: '4px 8px',
                          borderRadius: '6px'
                        }}
                      >
                        <RefreshCw size={14} />
                      </button>
                    ) : (
                      <button
                        onClick={(e) => handleDelete(file._id, e)}
                        className="btn btn-sm"
                        style={{
                          background: 'rgba(220, 53, 69, 0.2)',
                          border: '1px solid rgba(220, 53, 69, 0.3)',
                          color: '#dc3545',
                          padding: '4px 8px',
                          borderRadius: '6px'
                        }}
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin {
          animation: spin 1s linear infinite;
        }
        .form-control:focus {
          background: rgba(255,255,255,0.08) !important;
          border-color: rgba(102, 126, 234, 0.5) !important;
          box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.15) !important;
        }
        .form-control::placeholder {
          color: rgba(255,255,255,0.4);
        }
      `}</style>
    </div>
  );
};

export default FileBrowser;