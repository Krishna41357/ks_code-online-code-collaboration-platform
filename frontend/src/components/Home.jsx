import React, { useState, useEffect } from "react";
import { 
  Home as HomeIcon, 
  Info, 
  DoorOpen, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Code2,
  Users,
  Sparkles,
  File,
  Folder,
  Clock,
  Trash2,
  RefreshCw,
  Plus,
  Search
} from "lucide-react";
import { v4 as uuid } from "uuid";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import ExtendedHomepage from "./ExtendedHomepage.jsx";
import axios from "axios";
import CreateFileModal from './CreateFileModal';

function Home() {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showFileBrowser, setShowFileBrowser] = useState(false);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (window.innerWidth >= 992) {
        if (currentScrollY < 100) {
          setSidebarVisible(true);
        } else if (currentScrollY > lastScrollY && currentScrollY > 200) {
          setSidebarVisible(false);
        } else if (currentScrollY < lastScrollY) {
          setSidebarVisible(true);
        }
      } else {
        setSidebarVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

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
      toast.error('Failed to load files');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showFileBrowser) {
      fetchFiles();
    }
  }, [filterType, showFileBrowser]);

  const handleDelete = async (fileId, e) => {
    e.stopPropagation();
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/files/${fileId}/delete`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('File deleted');
      fetchFiles();
    } catch (error) {
      toast.error('Failed to delete file');
    }
  };

  const handleRestore = async (fileId, e) => {
    e.stopPropagation();
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`${API_URL}/files/${fileId}/restore`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('File restored');
      fetchFiles();
    } catch (error) {
      toast.error('Failed to restore file');
    }
  };

  const handleFileSelect = (file) => {
    navigate(`/editor/${file._id}`, {
      state: { username: user?.username || username, fileId: file._id }
    });
  };

  const handleCreateNew = () => {
  setShowCreateModal(true);
};

  const generateRoomId = (e) => {
    e.preventDefault();
    const Id = uuid();
    setRoomId(Id);
    toast.success("Room Id is generated");
  };

  const joinRoom = () => {
    if (!roomId || !username) {
      toast.error("Both the field is required");
      return;
    }

    navigate(`/editor/${roomId}`, {
      state: { username }
    });
    toast.success("room is created");
  };

  const handleInputEnter = (e) => {
    if (e.code === "Enter") {
      joinRoom();
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleAboutUs = () => {
    navigate("/about");
  };

  const getLanguageIcon = (language) => {
    const icons = {
      javascript: '🟨', js: '🟨',
      python: '🐍', py: '🐍',
      cpp: '⚙️',
      c: '🔵',
      java: '☕',
      go: '🐹',
      rust: '🦀', rs: '🦀',
      typescript: '🔷', ts: '🔷'
    };
    return icons[language] || '📄';
  };

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.filename.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'deleted' ? file.isDeleted : !file.isDeleted;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="position-relative" style={{ background: 'transparent', overflowX: 'hidden' }}>
      {(sidebarOpen || showFileBrowser) && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100 d-lg-none"
          style={{ 
            background: 'rgba(0, 0, 0, 0.7)', 
            zIndex: 1040,
            backdropFilter: 'blur(4px)'
          }}
          onClick={() => {
            setSidebarOpen(false);
            setShowFileBrowser(false);
          }}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`position-fixed d-flex flex-column text-light ${sidebarOpen ? 'd-flex' : 'd-none d-lg-flex'}`}
        style={{ 
          width: '280px',
          height: '100vh',
          top: 0,
          left: sidebarVisible ? 0 : '-280px',
          zIndex: 1050,
          overflowY: 'auto',
          background: 'rgba(15, 15, 15, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRight: '1px solid rgba(255,255,255,0.1)',
          boxShadow: sidebarOpen || sidebarVisible ? '4px 0 24px rgba(0,0,0,0.5)' : 'none',
          transition: 'left 0.3s ease'
        }}
      >
        <div className="d-flex flex-column h-100 p-4">
          <button
            onClick={() => setSidebarOpen(false)}
            className="btn btn-link text-white position-absolute top-0 end-0 d-lg-none p-3"
            style={{ zIndex: 1051 }}
          >
            <X size={24} />
          </button>

          <div className="mb-4">
            <h1 className="text-white fw-bold fs-3" style={{ letterSpacing: '0.1em' }}>
              KS CODE
            </h1>
          </div>

          <hr style={{ borderColor: 'rgba(255,255,255,0.1)', margin: '0 0 24px 0' }} />

          {user && (
            <div className="mb-4 text-center">
              <div 
                className="d-inline-flex align-items-center justify-content-center mb-3 rounded-circle" 
                style={{ 
                  width: '80px', 
                  height: '80px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)'
                }}
              >
                <span className="text-white fw-bold fs-2">
                  {user.username ? user.username.charAt(0).toUpperCase() : 'U'}
                </span>
              </div>
              <p className="text-white mb-0 fw-medium text-truncate px-2" style={{ fontSize: '0.95rem' }}>
                {user.username || user.email}
              </p>
            </div>
          )}

          <nav className="flex-grow-1">
            <div className="d-flex flex-column gap-2">
              <button
                onClick={() => {
                  navigate("/home");
                  setSidebarOpen(false);
                }}
                className="btn text-start d-flex align-items-center gap-3 text-white"
                style={{ 
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '12px',
                  padding: '14px 16px',
                  transition: 'all 0.2s',
                  fontWeight: '500'
                }}
              >
                <HomeIcon size={20} />
                <span>Home</span>
              </button>
              
              <button
                onClick={() => {
                  setShowFileBrowser(true);
                  setSidebarOpen(false);
                }}
                className="btn text-start d-flex align-items-center gap-3 text-white"
                style={{ 
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '12px',
                  padding: '14px 16px',
                  transition: 'all 0.2s',
                  fontWeight: '500'
                }}
              >
                <Folder size={20} />
                <span>My Files</span>
              </button>
              
              <button
                onClick={() => {
                  handleAboutUs();
                  setSidebarOpen(false);
                }}
                className="btn text-start d-flex align-items-center gap-3 text-white"
                style={{ 
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '12px',
                  padding: '14px 16px',
                  transition: 'all 0.2s',
                  fontWeight: '500'
                }}
              >
                <Info size={20} />
                <span>About Us</span>
              </button>
              
              <button
                onClick={() => {
                  navigate("/rooms");
                  setSidebarOpen(false);
                }}
                className="btn text-start d-flex align-items-center gap-3 text-white"
                style={{ 
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '12px',
                  padding: '14px 16px',
                  transition: 'all 0.2s',
                  fontWeight: '500'
                }}
              >
                <DoorOpen size={20} />
                <span>My Rooms</span>
              </button>
              
              <button
                onClick={() => {
                  navigate("/settings");
                  setSidebarOpen(false);
                }}
                className="btn text-start d-flex align-items-center gap-3 text-white"
                style={{ 
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '12px',
                  padding: '14px 16px',
                  transition: 'all 0.2s',
                  fontWeight: '500'
                }}
              >
                <Settings size={20} />
                <span>Settings</span>
              </button>
            </div>
          </nav>

          <div className="mt-auto pt-4">
            <hr style={{ borderColor: 'rgba(255,255,255,0.1)', margin: '0 0 16px 0' }} />
            <button
              onClick={handleLogout}
              className="btn w-100 d-flex align-items-center justify-content-center gap-2 text-white fw-semibold"
              style={{
                background: 'rgba(220, 53, 69, 0.1)',
                border: '1px solid rgba(220, 53, 69, 0.3)',
                borderRadius: '12px',
                padding: '14px',
                transition: 'all 0.2s'
              }}
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* File Browser Modal */}
      {showFileBrowser && (
        <div
          className="position-fixed d-flex flex-column"
          style={{
            top: 0,
            right: 0,
            width: window.innerWidth < 768 ? '100%' : '500px',
            height: '100vh',
            zIndex: 1060,
            background: '#0a0a0a',
            borderLeft: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '-4px 0 24px rgba(0,0,0,0.5)'
          }}
        >
          {/* Header */}
          <div className="p-4 border-bottom" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-white fw-bold m-0 d-flex align-items-center gap-2">
                <Folder size={24} />
                My Files
              </h4>
              <div className="d-flex gap-2">
                <button
                  onClick={handleCreateNew}
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
                  New
                </button>
                <button
                  onClick={() => setShowFileBrowser(false)}
                  className="btn btn-sm"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: 'white',
                    borderRadius: '8px',
                    padding: '8px 12px'
                  }}
                >
                  <X size={16} />
                </button>
              </div>
            </div>

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
                    onClick={() => !file.isDeleted && handleFileSelect(file)}
                    className="p-3 rounded"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      cursor: file.isDeleted ? 'default' : 'pointer',
                      transition: 'all 0.2s',
                      opacity: file.isDeleted ? 0.6 : 1
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
        </div>
      )}

      {/* Main Content */}
      <div className="main-content-wrapper">
        <button
          onClick={() => setSidebarOpen(true)}
          className="btn d-lg-none position-fixed"
          style={{ 
            top: '20px', 
            left: '20px', 
            zIndex: 1030,
            borderRadius: '12px',
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)',
            color: 'white',
            padding: '10px 12px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.4)'
          }}
        >
          <Menu size={24} />
        </button>

        {!sidebarVisible && (
          <button
            onClick={() => setSidebarVisible(true)}
            className="btn d-none d-lg-flex position-fixed align-items-center justify-content-center"
            style={{ 
              top: '20px', 
              left: '20px', 
              zIndex: 1030,
              borderRadius: '12px',
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'white',
              padding: '10px 12px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
              transition: 'all 0.3s'
            }}
          >
            <Menu size={24} />
          </button>
        )}

        <section style={{ minHeight: '100vh', position: 'relative' }}>
          <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', padding: '20px' }}>
            <div className="w-100" style={{ maxWidth: '500px' }}>
              <div 
                className="card shadow-lg"
                style={{ 
                  background: 'rgba(15, 15, 15, 0.85)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '20px',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.6)'
                }}
              >
                <div className="card-body p-3 p-sm-4">
                  <div className="text-center mb-3">
                    <div 
                      className="d-inline-flex align-items-center justify-content-center mb-3 rounded-3"
                      style={{ 
                        width: '80px', 
                        height: '80px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        boxShadow: '0 12px 32px rgba(102, 126, 234, 0.4)'
                      }}
                    >
                      <Code2 size={42} className="text-white" strokeWidth={2.5} />
                    </div>
                    <hr style={{ borderColor: 'rgba(255,255,255,0.1)', margin: '0 0 16px 0' }} />
                    <h2 className="text-white fw-bold fs-4 mb-1">
                      Enter the Room ID
                    </h2>
                    <p className="text-white-50 mb-0" style={{ fontSize: '13px' }}>
                      Join or create a collaborative coding session
                    </p>
                  </div>

                  <div className="d-flex flex-column gap-3 mb-3">
                    <input
                      type="text"
                      value={roomId}
                      onChange={(e) => setRoomId(e.target.value)}
                      onKeyUp={handleInputEnter}
                      placeholder="ROOM ID"
                      className="form-control"
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        borderRadius: '12px',
                        color: '#fff',
                        fontSize: '14px',
                        padding: '12px 16px',
                        fontWeight: '500',
                        letterSpacing: '0.5px'
                      }}
                    />
                    
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      onKeyUp={handleInputEnter}
                      placeholder="USERNAME"
                      className="form-control"
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        borderRadius: '12px',
                        color: '#fff',
                        fontSize: '14px',
                        padding: '12px 16px',
                        fontWeight: '500',
                        letterSpacing: '0.5px'
                      }}
                    />
                  </div>

                  <div className="d-flex flex-column gap-2">
                    <button
                      onClick={joinRoom}
                      className="btn w-100 fw-bold text-uppercase d-flex align-items-center justify-content-center gap-2"
                      style={{ 
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        border: 'none',
                        borderRadius: '12px',
                        padding: '12px',
                        color: 'white',
                        fontSize: '15px',
                        letterSpacing: '1.5px',
                        boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
                        transition: 'all 0.3s'
                      }}
                    >
                      <Users size={18} />
                      Join Room
                    </button>

                    <div className="text-center mt-1">
                      <p className="text-white-50 mb-2" style={{ fontSize: '13px' }}>
                        Don't have a room ID?
                      </p>
                      <button
                        onClick={generateRoomId}
                        className="btn d-inline-flex align-items-center justify-content-center gap-2"
                        style={{
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.15)',
                          color: 'white',
                          borderRadius: '10px',
                          padding: '8px 18px',
                          fontWeight: '500',
                          fontSize: '13px'
                        }}
                      >
                        <Sparkles size={16} />
                        Create New Room
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ExtendedHomepage />
      </div>

      <style>{`
        .form-control::placeholder {
          color: rgba(255,255,255,0.4);
          font-weight: 500;
        }
        
        .form-control:focus {
          background: rgba(255,255,255,0.08) !important;
          border-color: rgba(255,255,255,0.25) !important;
          color: #fff !important;
          box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.15) !important;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
      {showCreateModal && (
  <CreateFileModal 
    onClose={() => setShowCreateModal(false)}
    onFileCreated={() => {
      setShowCreateModal(false);
      fetchFiles();
    }}
  />
)}
    </div>
  );
}

export default Home;