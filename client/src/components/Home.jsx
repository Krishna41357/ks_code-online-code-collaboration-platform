import React, { useState } from "react";
import { 
  Home as HomeIcon, 
  Info, 
  DoorOpen, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Plus,
  Code2,
  Users,
  Sparkles
} from "lucide-react";
import { v4 as uuid } from "uuid";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.js";

function Home() {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();
  const { logout, user } = useAuth();

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

    // redirect
    navigate(`/editor/${roomId}`, {
      state: {
        username,
      },
    });
    toast.success("room is created");
  };

  // when enter then also join
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

  return (
    <div className="container-fluid p-0 vh-100" style={{ background: 'transparent', overflow: 'hidden' }}>
      <div className="row g-0 h-100">
        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="position-fixed top-0 start-0 w-100 h-100 d-lg-none"
            style={{ 
              background: 'rgba(0, 0, 0, 0.7)', 
              zIndex: 1040,
              backdropFilter: 'blur(4px)'
            }}
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div 
          className={`col-auto text-light position-fixed position-lg-static ${sidebarOpen ? 'd-block' : 'd-none d-lg-flex'}`}
          style={{ 
            width: '280px',
            height: '100vh',
            zIndex: 1050,
            overflowY: 'auto',
            background: 'rgba(15, 15, 15, 0.85)',
            backdropFilter: 'blur(20px)',
            borderRight: '1px solid rgba(255,255,255,0.1)',
            boxShadow: sidebarOpen ? '4px 0 24px rgba(0,0,0,0.5)' : 'none'
          }}
        >
          <div className="d-flex flex-column h-100 p-4">
            {/* Close button for mobile */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="btn btn-link text-white position-absolute top-0 end-0 d-lg-none p-3"
              style={{ zIndex: 1051 }}
            >
              <X size={24} />
            </button>

            {/* Logo/Brand */}
            <div className="mb-4">
              <h1 className="text-white fw-bold fs-3" style={{ letterSpacing: '0.1em' }}>
                KS CODE
              </h1>
            </div>

            <hr style={{ borderColor: 'rgba(255,255,255,0.1)', margin: '0 0 24px 0' }} />

            {/* User Info */}
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

            {/* Navigation Menu */}
            <nav className="flex-grow-1">
              <div className="d-flex flex-column gap-2">
                <button
                  onClick={() => navigate("/home")}
                  className="btn text-start d-flex align-items-center gap-3 text-white"
                  style={{ 
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '12px',
                    padding: '14px 16px',
                    transition: 'all 0.2s',
                    fontWeight: '500'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                  }}
                >
                  <HomeIcon size={20} />
                  <span>Home</span>
                </button>
                
                <button
                  onClick={handleAboutUs}
                  className="btn text-start d-flex align-items-center gap-3 text-white"
                  style={{ 
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '12px',
                    padding: '14px 16px',
                    transition: 'all 0.2s',
                    fontWeight: '500'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                  }}
                >
                  <Info size={20} />
                  <span>About Us</span>
                </button>
                
                <button
                  onClick={() => navigate("/rooms")}
                  className="btn text-start d-flex align-items-center gap-3 text-white"
                  style={{ 
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '12px',
                    padding: '14px 16px',
                    transition: 'all 0.2s',
                    fontWeight: '500'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                  }}
                >
                  <DoorOpen size={20} />
                  <span>My Rooms</span>
                </button>
                
                <button
                  onClick={() => navigate("/settings")}
                  className="btn text-start d-flex align-items-center gap-3 text-white"
                  style={{ 
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '12px',
                    padding: '14px 16px',
                    transition: 'all 0.2s',
                    fontWeight: '500'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                  }}
                >
                  <Settings size={20} />
                  <span>Settings</span>
                </button>
              </div>
            </nav>

            {/* Logout Button */}
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
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(220, 53, 69, 0.2)';
                  e.currentTarget.style.borderColor = 'rgba(220, 53, 69, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(220, 53, 69, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(220, 53, 69, 0.3)';
                }}
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col" style={{ background: 'transparent', position: 'relative' }}>
          {/* Mobile Menu Toggle */}
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

          {/* Center Content */}
          <div className="d-flex align-items-center justify-content-center min-vh-100 p-3 p-sm-4">
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
                  {/* Logo */}
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

                  {/* Form */}
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
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 12px 32px rgba(102, 126, 234, 0.5)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 8px 24px rgba(102, 126, 234, 0.4)';
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
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
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
        </div>
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

        /* Custom scrollbar for sidebar */
        .col-auto::-webkit-scrollbar {
          width: 6px;
        }

        .col-auto::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.05);
        }

        .col-auto::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.2);
          border-radius: 10px;
        }

        .col-auto::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.3);
        }
      `}</style>
    </div>
  );
}

export default Home;