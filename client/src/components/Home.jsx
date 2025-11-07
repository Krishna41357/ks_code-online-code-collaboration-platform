import React, { useState } from "react";
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
    <div className="container-fluid">
      <div className="row min-vh-100">
        {/* Sidebar */}
        <div 
          className={`col-auto bg-dark p-0 ${sidebarOpen ? 'd-block' : 'd-none d-md-block'}`}
          style={{ 
            minWidth: '250px',
            borderRight: '2px solid #28a745',
            position: 'relative'
          }}
        >
          <div className="d-flex flex-column h-100 p-3">
            {/* Logo/Brand */}
            

            <hr style={{ color: "white" }} />

            {/* User Info */}
            {user && (
              <div className="mb-4 text-center">
                <div className="bg-success rounded-circle d-inline-flex align-items-center justify-content-center mb-2" 
                  style={{ width: '60px', height: '60px' }}>
                  <span className="text-white fw-bold fs-4">
                    {user.username ? user.username.charAt(0).toUpperCase() : 'U'}
                  </span>
                </div>
                <p className="text-light mb-0 small">{user.username || user.email}</p>
              </div>
            )}

            {/* Navigation Menu */}
            <nav className="flex-grow-1">
              <ul className="nav flex-column">
                <li className="nav-item mb-2">
                  <button
                    onClick={() => navigate("/home")}
                    className="btn btn-outline-light w-100 text-start d-flex align-items-center"
                  >
                    <i className="bi bi-house-door me-2"></i>
                    <span>Home</span>
                  </button>
                </li>
                <li className="nav-item mb-2">
                  <button
                    onClick={handleAboutUs}
                    className="btn btn-outline-light w-100 text-start d-flex align-items-center"
                  >
                    <i className="bi bi-info-circle me-2"></i>
                    <span>About Us</span>
                  </button>
                </li>
                <li className="nav-item mb-2">
                  <button
                    onClick={() => navigate("/rooms")}
                    className="btn btn-outline-light w-100 text-start d-flex align-items-center"
                  >
                    <i className="bi bi-door-open me-2"></i>
                    <span>My Rooms</span>
                  </button>
                </li>
                <li className="nav-item mb-2">
                  <button
                    onClick={() => navigate("/settings")}
                    className="btn btn-outline-light w-100 text-start d-flex align-items-center"
                  >
                    <i className="bi bi-gear me-2"></i>
                    <span>Settings</span>
                  </button>
                </li>
              </ul>
            </nav>

            {/* Logout Button at Bottom */}
            <div className="mt-auto">
              <hr style={{ color: "white" }} />
              <button
                onClick={handleLogout}
                className="btn btn-danger w-100 d-flex align-items-center justify-content-center"
              >
                <i className="bi bi-box-arrow-right me-2"></i>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col">
          {/* Mobile Menu Toggle */}
          <button
            className="btn btn-success d-md-none m-3"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <i className="bi bi-list fs-4"></i>
          </button>

          <div className="row justify-content-center align-items-center min-vh-100">
            <div className="col-12 col-md-8 col-lg-6">
              <div className="card shadow-sm p-2 mb-5 bg-secondary rounded">
                <div className="card-body text-center bg-dark">
                  <img
                    src="/favicon.ico"
                    alt="Logo"
                    className="img-fluid mx-auto d-block"
                    style={{ maxWidth: "250px" }}
                  />
                  <hr style={{ color: "white" }}></hr>
                  <h4 className="card-title text-light mb-4">Enter the Room ID</h4>

                  <div className="form-group">
                    <input
                      type="text"
                      value={roomId}
                      onChange={(e) => setRoomId(e.target.value)}
                      className="form-control mb-2"
                      placeholder="ROOM ID"
                      onKeyUp={handleInputEnter}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="form-control mb-2"
                      placeholder="USERNAME"
                      onKeyUp={handleInputEnter}
                    />
                  </div>
                  <button
                    onClick={joinRoom}
                    className="btn btn-success btn-lg btn-block w-100"
                  >
                    JOIN
                  </button>
                  <p className="mt-3 text-light">
                    Don't have a room ID? create{" "}
                    <span
                      onClick={generateRoomId}
                      className="text-success p-2"
                      style={{ cursor: "pointer" }}
                    >
                      {" "}
                      New Room
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;